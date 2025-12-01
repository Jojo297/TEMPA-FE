import { ManageMapsCampusLocation } from "@/components/ManageMapsCampusLocation";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import useAdressCampus from "@/hooks/hooksCampus/useAdressCampus";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useRegisterMitraCampus from "@/hooks/hooksCampus/useRegisterMitraCampus";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import useDebounce from "@/hooks/hooksCampus/useDebounce";
import axios from "axios";

// Skema untuk validasi data lokasi (lat/lng)
const LocationSchema = z
  .object({
    lat: z
      .number({
        required_error: "Latitude wajib diisi.",
      })
      .min(-90, "Latitude tidak valid.")
      .max(90, "Latitude tidak valid."),
    lng: z
      .number({
        required_error: "Longitude wajib diisi.",
      })
      .min(-180, "Longitude tidak valid.")
      .max(180, "Longitude tidak valid."),
  })
  .refine((data) => data.lat !== null && data.lng !== null, {
    message: "Titik lokasi (Latitude dan Longitude) wajib dimasukkan.",
  });

// Skema utama untuk form registrasi kampus
const RegisterMitraSchema = z.object({
  // 1. Nama Kampus (Input Teks)
  campusName: z
    .string()
    .trim()
    .min(1, "Nama Kampus wajib diisi.")
    .max(225, "Nama Kampus maksimal 225 karakter."),

  // 2. Email Kampus (Input Email)
  emailCampus: z
    .string()
    .trim()
    .min(1, "Email Kampus wajib diisi.")
    .email("Format Email tidak valid."),

  // 3. Deskripsi Kampus (Textarea)
  description: z
    .string()
    .trim()
    .min(10, "Deskripsi Kampus minimal 10 karakter.")
    .max(500, "Deskripsi Kampus maksimal 500 karakter."),

  // 4. Website Kampus (Input Teks - diasumsikan URL)
  websiteCampus: z
    .string()
    .trim()
    .url("Website harus berupa URL yang valid (misal: https://kampus.ac.id).")
    .min(1, "Website Kampus wajib diisi."),

  // 5. Provinsi (Combobox - nilainya adalah Code)
  // Code biasanya berupa string non-kosong
  valueProvince: z.string().trim().min(1, "Provinsi wajib dipilih."),

  // 6. Kota/Kabupaten (Combobox - nilainya adalah Code)
  valueCity: z.string().trim().min(1, "Kota/Kabupaten wajib dipilih."),

  // 7. Kecamatan (Combobox - nilainya adalah Code)
  valueSubdistrict: z.string().trim().min(1, "Kecamatan wajib dipilih."),

  // 8. Desa/Kelurahan (Combobox - nilainya adalah Code)
  valueWard: z.string().trim().min(1, "Desa/Kelurahan wajib dipilih."),

  // 9. Titik Lokasi (Maps - ini harus berupa objek {lat, lng})
  // Kami mengasumsikan formData memiliki properti selectedLocation
  selectedLocation: LocationSchema,
  isCampusVerifiedByApi: z.boolean(),
});

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function DashboardCampusRegisterMitra() {
  const navigate = useNavigate();
  const token = localStorage.getItem("userJwt");
  const [openProvince, setOpenProvince] = React.useState(false);
  const [openCity, setOpenCity] = React.useState(false);
  const [openSubdistrict, setOpenSubdistrict] = React.useState(false);
  const [openWard, setOpenWard] = React.useState(false);
  const [valueProvince, setvalueProvince] = React.useState("");
  const [valueCity, setvalueCity] = React.useState("");
  const [valueSubdistrict, setValueSubdistrict] = React.useState("");
  const [valueWard, setValueWard] = React.useState("");
  const [selectedLocation, setSelectedLocation] = useState({
    lat: null,
    lng: null,
  });
  const [selectedAddress, setSelectedAddress] = useState("");
  const {
    province,
    fetchProvince,
    fetchCity,
    city,
    subdistrict,
    fetchSubdistrict,
    ward,
    fetchWard,
    error,
  } = useAdressCampus();
  const { isLoadingRegister, errorRegisterMitraCampus, registerMitraCampus } =
    useRegisterMitraCampus();

  const form = useForm({
    resolver: zodResolver(RegisterMitraSchema),
    defaultValues: {
      campusName: "",
      emailCampus: "",
      description: "",
      websiteCampus: "",
      valueProvince: "",
      valueCity: "",
      valueSubdistrict: "",
      valueWard: "",
      selectedLocation: {
        lat: null,
        lng: null,
      },
      isCampusVerifiedByApi: false,
    },

    mode: "onBlur",
  });

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = form;

  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  // get real-time value from field campusName
  const campusNameValue = form.watch("campusName");

  // Value that will trigger the API after 500ms
  const debouncedSearchTerm = useDebounce(campusNameValue, 500);

  // fetch campus search from api
  const fetchCampusSuggestions = async (keyword) => {
    // Jangan panggil API jika keyword kurang dari 3 karakter
    if (!keyword || keyword.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsSearching(true);
    try {
      // Panggil endpoint Express.js Anda
      const response = await axios.get(
        `${API_BASE_URL}/validate-campus/${keyword}`
      );

      if (response.data.status === "success") {
        // Asumsikan respons.data.data adalah array kampus
        setSuggestions(response.data.data);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching campus suggestions:", error);
      setSuggestions([]);
    } finally {
      setIsSearching(false);
    }
  };

  const displayProvince = province ?? [];
  const displayCity = city ?? [];
  const displaySubdistrict = subdistrict ?? [];
  const displayWard = ward ?? [];
  // console.log(displayProvince);

  // trigger after debouncedSearchTerm changes
  useEffect(() => {
    fetchCampusSuggestions(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  // fetch province
  useEffect(() => {
    if (displayProvince.length <= 0) {
      fetchProvince();
    }
  }, [fetchProvince]);

  // take city based on province
  useEffect(() => {
    // Pastikan valueProvince ada (tidak kosong) sebelum memanggil API kota
    if (valueProvince) {
      fetchCity(valueProvince);
    }
  }, [valueProvince, fetchCity]); // Triggered whenever valueProvince changes

  // fetch Subdistrict base on city
  useEffect(() => {
    if (valueCity) {
      fetchSubdistrict(valueCity);
    }
  }, [valueCity, fetchSubdistrict]); // Triggered whenever valueCity changes

  // fetch ward base on Subdistrict
  useEffect(() => {
    if (valueSubdistrict) {
      fetchWard(valueSubdistrict);
    }
  }, [valueSubdistrict, fetchWard]); // Triggered whenever valueProvince changes

  const handleLocationChange = async (location) => {
    setSelectedLocation(location);

    form.setValue("selectedLocation", location, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (data) => {
    // console.log("Data kampus dikirim:", data);

    const saveDataRegister = await registerMitraCampus(token, data);
    if (saveDataRegister) {
      toast.success("Data Berhasil disimpan!");
      form.reset();
      navigate("/campus-verification/welcome");
    }

    console.error(errorRegisterMitraCampus);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-[#013B36] w-full mx-auto text-center text-white  py-6 rounded-md">
        <h2 className="text-2xl font-semibold">Bergabung Sebagai Mitra</h2>
        <p className="text-gray-300 text-sm mt-1">
          Kami membutuhkan beberapa informasi. Silakan isi data kampus di bawah
          ini.
        </p>
      </section>

      {/* Form */}
      <main className="flex justify-center w-full mt-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              onSubmit,
              // error handler
              (errors) => {
                console.error("Validasi Gagal:", errors);
                console.log("Status Form:", { isValid, isDirty, isSubmitting });
              }
            )}
            className="bg-[#013B36] text-white w-full rounded-lg p-8 shadow-lg"
          >
            <div className="grid grid-cols-2 gap-5">
              <input
                type="hidden"
                {...form.register("isCampusVerifiedByApi")}
                value={form.watch("isCampusVerifiedByApi").toString()} // Pastikan dikirim sebagai string 'true'/'false'
              />

              {/* 1. Campus Name */}
              <FormField
                control={form.control}
                name="campusName"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Nama Kampus (Cari)</FormLabel>

                    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          {/* PENTING: Gunakan Button sebagai Trigger untuk menghindari konflik input. */}

                          {/* Nilai yang ditampilkan adalah nilai yang sudah dipilih di RHF. */}

                          <Button
                            variant="outline"
                            role="combobox"
                            className="w-full justify-between bg-white text-black hover:bg-white/90"
                          >
                            {field.value
                              ? field.value // Menampilkan nilai RHF yang sudah dipilih
                              : "Cari & Pilih nama kampus..."}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      {/* Dropdown/Suggestions */}
                      <PopoverContent
                        className="w-[--radix-popover-trigger-width] p-0"
                        align="start"
                      >
                        <Command>
                          <CommandInput
                            placeholder="Ketik nama kampus untuk mencari..."
                            onValueChange={(value) => {
                              form.setValue("campusName", value);
                              form.setValue("isCampusVerifiedByApi", false);
                            }}
                            value={campusNameValue}
                          />

                          {isSearching ? (
                            <div className="p-2 text-center text-sm">
                              Mencari data kampus...
                            </div>
                          ) : suggestions.length > 0 ? (
                            <CommandGroup>
                              {suggestions.map((campus) => (
                                <CommandItem
                                  key={campus.id}
                                  onSelect={() => {
                                    // Set nilai ke RHF dan tutup popover
                                    form.setValue("campusName", campus.nama, {
                                      shouldValidate: true,
                                    });
                                    form.setValue(
                                      "isCampusVerifiedByApi",
                                      true
                                    );
                                    setPopoverOpen(false);
                                  }}
                                  value={campus.nama}
                                >
                                  {campus.nama} ({campus.kode})
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          ) : debouncedSearchTerm.length >= 3 &&
                            !isSearching ? (
                            <CommandEmpty>
                              Tidak ada hasil. Anda dapat melanjutkan dengan
                              nama manual.
                            </CommandEmpty>
                          ) : (
                            <div className="p-2 text-sm text-gray-500">
                              Ketik minimal 3 karakter untuk mencari.
                            </div>
                          )}
                        </Command>
                      </PopoverContent>
                    </Popover>

                    {fieldState.error && (
                      <FormMessage>{fieldState.error.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />

              {/* 2. Email Kampus */}
              <FormField
                control={form.control}
                name="emailCampus"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Email Kampus</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white text-black"
                        type="email"
                        placeholder="Masukkan email kampus"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-100">
                      Gunakan email resmi kampus.
                    </FormDescription>
                    {fieldState.error && (
                      <FormMessage>{fieldState.error.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />

              {/* 3. Deskripsi Kampus */}
              <FormField
                control={form.control}
                name="description"
                render={({ field, fieldState }) => (
                  <FormItem className="">
                    <FormLabel>Deskripsi Kampus</FormLabel>
                    <FormControl>
                      <Textarea
                        className="bg-white text-black"
                        placeholder="Tuliskan deskripsi singkat kampus"
                        {...field}
                      />
                    </FormControl>
                    {fieldState.error && (
                      <FormMessage>{fieldState.error.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />

              {/* 4. Website Kampus */}
              <FormField
                control={form.control}
                name="websiteCampus"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Website Kampus</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white text-black"
                        type="text"
                        placeholder="Masukkan link website kampus"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-100">
                      Contoh: https://kampusku.ac.id
                    </FormDescription>
                    {fieldState.error && (
                      <FormMessage>{fieldState.error.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />

              {/* provinsi */}
              <FormField
                control={form.control}
                name="valueProvince"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Provinsi</FormLabel>
                    <FormControl>
                      <Popover
                        open={openProvince}
                        onOpenChange={setOpenProvince}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openCity}
                            className={`w-full justify-between ${
                              valueProvince
                                ? "text-black"
                                : "text-gray-500 hover:text-gray-500"
                            }`}
                          >
                            {valueProvince
                              ? displayProvince.find(
                                  (framework) =>
                                    framework.code === valueProvince
                                )?.name
                              : "Pilih Provinsi..."}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput
                              placeholder="Cari Provinsi..."
                              className="h-9 w-full"
                            />
                            <CommandList>
                              <CommandEmpty>
                                Provonsi tidak ditemukan.
                              </CommandEmpty>
                              <CommandGroup>
                                {displayProvince.map((framework) => (
                                  <CommandItem
                                    key={framework.code}
                                    value={framework.name}
                                    onSelect={(currentValue) => {
                                      field.onChange(framework.name);
                                      setvalueProvince(framework.code);
                                      setOpenProvince(false);
                                    }}
                                  >
                                    {framework.name}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        valueProvince === framework.name
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>

                    {fieldState.error && (
                      <FormMessage>{fieldState.error.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />

              {/* kota/kabupaten */}
              <FormField
                control={form.control}
                name="valueCity"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Kota/Kabupaten</FormLabel>
                    <FormControl>
                      <Popover open={openCity} onOpenChange={setOpenCity}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openCity}
                            className={`w-full justify-between ${
                              valueCity
                                ? "text-black"
                                : "text-gray-500 hover:text-gray-500"
                            }`}
                          >
                            {valueCity
                              ? displayCity.find(
                                  (framework) => framework.code === valueCity
                                )?.name
                              : "Kota/Kabupaten"}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput
                              placeholder="Cari Kota/Kabupaten..."
                              className="h-9 w-full"
                            />
                            <CommandList>
                              <CommandEmpty>
                                Kota/Kabupaten tidak ditemukan.
                              </CommandEmpty>
                              <CommandGroup>
                                {displayCity.map((framework) => (
                                  <CommandItem
                                    key={framework.code}
                                    // Ganti value-nya menjadi framework.code agar lebih mudah dicari
                                    value={framework.name}
                                    onSelect={(currentCode) => {
                                      setvalueCity(framework.code);
                                      field.onChange(framework.name);
                                      setOpenCity(false);
                                    }}
                                  >
                                    {framework.name}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        // Bandingkan dengan code, bukan name
                                        framework.code === valueCity
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    {fieldState.error && (
                      <FormMessage>{fieldState.error.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />

              {/* kecamatan */}
              <FormField
                control={form.control}
                name="valueSubdistrict"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Kecamatan</FormLabel>
                    <FormControl>
                      <Popover
                        open={openSubdistrict}
                        onOpenChange={setOpenSubdistrict}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openSubdistrict}
                            className={`w-full justify-between ${
                              valueSubdistrict
                                ? "text-black"
                                : "text-gray-500 hover:text-gray-500"
                            }`}
                          >
                            {valueSubdistrict
                              ? displaySubdistrict.find(
                                  (framework) =>
                                    framework.code === valueSubdistrict
                                )?.name
                              : "Pilih Kecamatan..."}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput
                              placeholder="Search kecamatan..."
                              className="h-9 w-full"
                            />
                            <CommandList>
                              <CommandEmpty>
                                Kecamatan tidak ditemukan.
                              </CommandEmpty>
                              <CommandGroup>
                                {displaySubdistrict.map((framework) => (
                                  <CommandItem
                                    key={framework.code}
                                    value={framework.name}
                                    onSelect={(currentValue) => {
                                      setValueSubdistrict(framework.code);
                                      field.onChange(framework.name);
                                      setOpenSubdistrict(false);
                                    }}
                                  >
                                    {framework.name}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        framework.code === valueSubdistrict
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>

                    {fieldState.error && (
                      <FormMessage>{fieldState.error.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />

              {/* desa/kelurahan */}
              <FormField
                control={form.control}
                name="valueWard"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Desa/Kelurahan</FormLabel>
                    <FormControl>
                      <Popover open={openWard} onOpenChange={setOpenWard}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openSubdistrict}
                            className={`w-full justify-between ${
                              valueWard
                                ? "text-black"
                                : "text-gray-500 hover:text-gray-500"
                            }`}
                          >
                            {valueWard
                              ? displayWard.find(
                                  (framework) => framework.code === valueWard
                                )?.name
                              : "Pilih Kecamatan..."}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput
                              placeholder="Search kecamatan..."
                              className="h-9 w-full"
                            />
                            <CommandList>
                              <CommandEmpty>
                                Kecamatan tidak ditemukan.
                              </CommandEmpty>
                              <CommandGroup>
                                {displayWard.map((framework) => (
                                  <CommandItem
                                    key={framework.code}
                                    value={framework.name}
                                    onSelect={(currentValue) => {
                                      setValueWard(framework.code);
                                      field.onChange(framework.name);
                                      setOpenWard(false);
                                    }}
                                  >
                                    {framework.name}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        framework.code === valueWard
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>

                    {fieldState.error && (
                      <FormMessage>{fieldState.error.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>

            {/* maps */}
            <FormField
              control={form.control}
              name="selectedLocation"
              render={({ field, fieldState }) => (
                <FormItem className="mt-5">
                  <FormLabel>Masukkan Titik Lokasi</FormLabel>
                  {/* Komponen Peta Anda */}
                  <ManageMapsCampusLocation
                    onLocationSelect={handleLocationChange}
                  />

                  {/* Tampilkan Pesan Error Validasi */}
                  {fieldState.error && (
                    <FormMessage className="mt-5">
                      {fieldState.error.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />

            {/* button submit */}
            <div className="flex justify-center ">
              <Button
                type="submit"
                disabled={isLoadingRegister}
                className={`
                mt-8 bg-[#5CC6BA] text-[#013D3A] font-semibold px-12 py-2 rounded-md transition duration-300
                ${
                  isLoadingRegister
                    ? "cursor-not-allowed" // Style saat loading/disabled
                    : "hover:bg-[#4bb2a8]" // Style saat aktif
                }`}
              >
                {isLoadingRegister ? (
                  <>
                    <Spinner />
                    <span>Loading...</span>
                  </>
                ) : (
                  "Kirim"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </div>
  );
}
