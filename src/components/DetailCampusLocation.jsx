import { Pencil, Save, X, Loader2, ChevronsUpDown, Check } from "lucide-react";
import { DisplayMapsLocation } from "./DisplayMapsLocation";
import Info from "./Info";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ManageMapsCampusLocation } from "./ManageMapsCampusLocation";
import useAdressCampus from "@/hooks/hooksCampus/useAdressCampus";
import useEditDataCampus from "@/hooks/hooksCampus/useEditDataCampus";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import useUpdateLocationCampus from "@/hooks/hooksCampus/useUpdateLocationCampus";

const LocationSchema = z.object({
  lat: z.number({ required_error: "Latitude wajib diisi." }),
  lng: z.number({ required_error: "Longitude wajib diisi." }),
});

const editLocationSchema = z.object({
  province: z.string().min(1, "Provinsi wajib dipilih."),
  city: z.string().min(1, "Kota/Kabupaten wajib dipilih."),
  subdistrict: z.string().min(1, "Kecamatan wajib dipilih."),
  ward: z.string().min(1, "Desa/Kelurahan wajib dipilih."),
  selectedLocation: LocationSchema.refine(
    (data) => data.lat !== null && data.lng !== null,
    {
      message: "Titik lokasi wajib dipilih dari peta.",
      path: ["lat"],
    }
  ),
});

export default function DetailCampusLocation({
  location,
  refetchCampusData,
  campusName,
  idCampus,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem("userJwt");

  const {
    province,
    fetchProvince,
    city,
    fetchCity,
    subdistrict,
    fetchSubdistrict,
    ward,
    fetchWard,
  } = useAdressCampus();
  const { isLoading: isSaving, editDataCampus } = useEditDataCampus();

  const { isLoading, error, successMessage, updateLocation } =
    useUpdateLocationCampus();

  const [openProvince, setOpenProvince] = useState(false);
  const [openCity, setOpenCity] = useState(false);
  const [openSubdistrict, setOpenSubdistrict] = useState(false);
  const [openWard, setOpenWard] = useState(false);

  const [provinceCode, setProvinceCode] = useState("");
  const [cityCode, setCityCode] = useState("");
  const [subdistrictCode, setSubdistrictCode] = useState("");

  const form = useForm({
    resolver: zodResolver(editLocationSchema),
    defaultValues: {
      province: location.province || "",
      city: location.city || "",
      subdistrict: location.subdistrict || "",
      ward: location.ward || "",
      selectedLocation: {
        lat: location.lat || null,
        lng: location.lng || null,
      },
    },
    mode: "onChange",
  });

  const displayProvince = province ?? [];

  // fetch province
  useEffect(() => {
    if (displayProvince.length <= 0) {
      fetchProvince();
    }
  }, [fetchProvince]);

  // take city based on province
  useEffect(() => {
    // Pastikan valueProvince ada (tidak kosong) sebelum memanggil API kota
    if (provinceCode) {
      fetchCity(provinceCode);
    }
  }, [provinceCode, fetchCity]); // Triggered whenever valueProvince changes

  // fetch Subdistrict base on city
  useEffect(() => {
    if (cityCode) {
      fetchSubdistrict(cityCode);
    }
  }, [cityCode, fetchSubdistrict]); // Triggered whenever valueCity changes

  // fetch ward base on Subdistrict
  useEffect(() => {
    if (subdistrictCode) {
      fetchWard(subdistrictCode);
    }
  }, [subdistrictCode, fetchWard]); // Triggered whenever valueProvince changes

  useEffect(() => {
    if (isEditing && province?.length > 0 && location.province) {
      const currentProvince = province.find(
        (p) => p.name === location.province
      );
      if (currentProvince) setProvinceCode(currentProvince.code);
    }
  }, [isEditing, province, location.province]);

  useEffect(() => {
    if (isEditing && city?.length > 0 && location.city) {
      const currentCity = city.find((c) => c.name === location.city);
      if (currentCity) setCityCode(currentCity.code);
    }
  }, [isEditing, city, location.city]);

  useEffect(() => {
    if (isEditing && subdistrict?.length > 0 && location.subdistrict) {
      const currentSubdistrict = subdistrict.find(
        (s) => s.name === location.subdistrict
      );
      if (currentSubdistrict) setSubdistrictCode(currentSubdistrict.code);
    }
  }, [isEditing, subdistrict, location.subdistrict]);

  const handleLocationChange = (newLocation) => {
    form.setValue("selectedLocation", newLocation, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.reset({
      province: location.province || "",
      city: location.city || "",
      subdistrict: location.subdistrict || "",
      ward: location.ward || "",
      selectedLocation: {
        lat: location.lat || null,
        lng: location.lng || null,
      },
    });
  };

  const onSubmit = async (data) => {
    const payload = {
      idCampus: idCampus,
      province: data.province,
      city: data.city,
      subdistrict: data.subdistrict,
      ward: data.ward,
      lat: data.selectedLocation.lat,
      lng: data.selectedLocation.lng,
    };

    // console.log(payload);

    try {
      const result = await updateLocation(token, payload);
      if (result) {
        toast.success("Lokasi berhasil diperbarui!");
        await refetchCampusData();
        setIsEditing(false);
      }
    } catch (error) {
      toast.error(error.message || "Gagal memperbarui lokasi.");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 space-y-6 w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#013B35]">
          Lokasi {campusName}
        </h2>
        {isEditing ? (
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isSaving}
          >
            <X size={16} className="mr-2" /> Batal
          </Button>
        ) : (
          <Button
            type="button"
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-[#013B35] text-white"
          >
            <Pencil size={18} /> Edit Lokasi
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {/* Province */}
                <FormField
                  control={form.control}
                  name="province"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Provinsi</FormLabel>
                      <Popover
                        open={openProvince}
                        onOpenChange={setOpenProvince}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value || "Pilih Provinsi"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                          <Command>
                            <CommandInput placeholder="Cari provinsi..." />
                            <CommandList>
                              <CommandEmpty>
                                Provinsi tidak ditemukan.
                              </CommandEmpty>
                              <CommandGroup>
                                {province?.map((p) => (
                                  <CommandItem
                                    value={p.name}
                                    key={p.code}
                                    onSelect={() => {
                                      form.setValue("province", p.name);
                                      setProvinceCode(p.code);
                                      form.setValue("city", "");
                                      form.setValue("subdistrict", "");
                                      form.setValue("ward", "");
                                      setOpenProvince(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        p.name === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {p.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* City */}
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kota/Kabupaten</FormLabel>
                      <Popover open={openCity} onOpenChange={setOpenCity}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              disabled={!provinceCode}
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value || "Pilih Kota/Kabupaten"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                          <Command>
                            <CommandInput placeholder="Cari kota..." />
                            <CommandList>
                              <CommandEmpty>Kota tidak ditemukan.</CommandEmpty>
                              <CommandGroup>
                                {city?.map((c) => (
                                  <CommandItem
                                    value={c.name}
                                    key={c.code}
                                    onSelect={() => {
                                      form.setValue("city", c.name);
                                      setCityCode(c.code);
                                      form.setValue("subdistrict", "");
                                      form.setValue("ward", "");
                                      setOpenCity(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        c.name === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {c.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Subdistrict */}
                <FormField
                  control={form.control}
                  name="subdistrict"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kecamatan</FormLabel>
                      <Popover
                        open={openSubdistrict}
                        onOpenChange={setOpenSubdistrict}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              disabled={!cityCode}
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value || "Pilih Kecamatan"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                          <Command>
                            <CommandInput placeholder="Cari kecamatan..." />
                            <CommandList>
                              <CommandEmpty>
                                Kecamatan tidak ditemukan.
                              </CommandEmpty>
                              <CommandGroup>
                                {subdistrict?.map((s) => (
                                  <CommandItem
                                    value={s.name}
                                    key={s.code}
                                    onSelect={() => {
                                      form.setValue("subdistrict", s.name);
                                      setSubdistrictCode(s.code);
                                      form.setValue("ward", "");
                                      setOpenSubdistrict(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        s.name === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {s.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Ward */}
                <FormField
                  control={form.control}
                  name="ward"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kelurahan/Desa</FormLabel>
                      <Popover open={openWard} onOpenChange={setOpenWard}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              disabled={!subdistrictCode}
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value || "Pilih Kelurahan/Desa"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                          <Command>
                            <CommandInput placeholder="Cari kelurahan..." />
                            <CommandList>
                              <CommandEmpty>
                                Kelurahan tidak ditemukan.
                              </CommandEmpty>
                              <CommandGroup>
                                {ward?.map((w) => (
                                  <CommandItem
                                    value={w.name}
                                    key={w.code}
                                    onSelect={() => {
                                      form.setValue("ward", w.name);
                                      setOpenWard(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        w.name === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {w.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Map */}
              <FormField
                control={form.control}
                name="selectedLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titik Lokasi</FormLabel>
                    <FormControl>
                      <ManageMapsCampusLocation
                        onLocationSelect={handleLocationChange}
                        initialLat={field.value.lat}
                        initialLng={field.value.lng}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end items-center">
                <div className="flex gap-2">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex gap-2 items-center">
                        <Loader2 size={16} className="mr-2 animate-spin" />{" "}
                        Menyimpan...
                      </div>
                    ) : (
                      <div className="flex gap-2 items-center">
                        <Save size={16} className="mr-2" />
                        Simpan
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      ) : (
        <div className="flex flex-col gap-10 justify-center pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Info label="Provinsi" value={location.province} />
            <Info label="Kota / Kabupaten" value={location.city} />
            <Info label="Kecamatan" value={location.subdistrict} />
            <Info label="Kelurahan / Desa" value={location.ward} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#013B35] mb-4">
              Titik Lokasi
            </h2>
            <div className="p-1 bg-gray-200 rounded-xl overflow-hidden">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <DisplayMapsLocation lat={location.lat} lng={location.lng} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
