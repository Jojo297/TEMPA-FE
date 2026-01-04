import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import * as z from "zod";
import { Pencil, Save, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import useAdressCampus from "@/hooks/hooksCampus/useAdressCampus";
import useGetProfileMentee from "@/hooks/hooksMentee/useGetProfileMentee";
import useUpdateProfileMentee from "@/hooks/hooksMentee/useUpdateProfileMentee";
import { Spinner } from "@/components/ui/spinner";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router";
import DashboardMenteeMajorInterest from "./DashboardMenteeMajorInterest";

const profileSchema = z.object({
  fullName: z.string().min(2, "Nama harus diisi minimal 2 karakter."),
  email: z.string().email("Email tidak valid."),
  gender: z.string().min(1, "Pilih jenis kelamin."),
  educationStatus: z.string().min(1, "Pilih status pendidikan."),
  valueProvince: z.string().min(1, "Provinsi wajib dipilih."),
  valueCity: z.string().min(1, "Kota/Kabupaten wajib dipilih."),
  valueSubdistrict: z.string().min(1, "Kecamatan wajib dipilih."),
  valueWard: z.string().min(1, "Desa/Kelurahan wajib dipilih."),
  dob: z.string().min(1, "Tanggal lahir wajib diisi."),
});

export default function DashboardMenteeProfil() {
  const token = localStorage.getItem("userJwt");
  const { profile, isLoading, error, fetchProfile } = useGetProfileMentee();
  const { isLoadingEdit, errorEdit, message, updateProfile } =
    useUpdateProfileMentee();
  const [isEditing, setIsEditing] = useState(false);

  // Location states
  const [openProvince, setOpenProvince] = useState(false);
  const [openCity, setOpenCity] = useState(false);
  const [openSubdistrict, setOpenSubdistrict] = useState(false);
  const [openWard, setOpenWard] = useState(false);

  const [valueProvince, setvalueProvince] = useState("");
  const [valueCity, setvalueCity] = useState("");
  const [valueSubdistrict, setValueSubdistrict] = useState("");
  const [valueWard, setValueWard] = useState("");

  const {
    province,
    fetchProvince,
    fetchCity,
    city,
    subdistrict,
    fetchSubdistrict,
    ward,
    fetchWard,
  } = useAdressCampus();

  const displayProvince = province ?? [];
  const displayCity = city ?? [];
  const displaySubdistrict = subdistrict ?? [];
  const displayWard = ward ?? [];
  const displayProfile = profile ?? [];
  console.log(displayProfile);

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      email: "",
      gender: "",
      educationStatus: "",
      valueProvince: "",
      valueCity: "",
      valueSubdistrict: "",
      valueWard: "",
      dob: "",
    },
  });

  useEffect(() => {
    if (profile) {
      const genderMap = {
        Male: "Laki-laki",
        Female: "Perempuan",
      };

      const educationMap = {
        Siswa_Aktif__SMA_SMK_Sederajat_: "0",
        Lulusan_Baru___Gap_Year__Belum_Kuliah_: "1",
        Mahasiswa_Aktif: "2",
        Lainnya: "3",
      };

      form.reset({
        fullName: profile.username || "",
        email: profile.email || "",
        gender: genderMap[profile.gender] || profile.gender || "",
        educationStatus:
          educationMap[profile.education_status] ||
          profile.education_status ||
          "",
        valueProvince: profile.province || "",
        valueCity: profile.city || "",
        valueSubdistrict: profile.subdistrict || "",
        valueWard: profile.ward || "",
        dob: profile.date_of_birth
          ? format(new Date(profile.date_of_birth), "yyyy-MM-dd")
          : "",
      });
    }
  }, [profile, form]);

  // Set location codes to enable dropdowns
  useEffect(() => {
    if (profile && province?.length > 0) {
      const selected = province.find((p) => p.name === profile.province);
      if (selected) setvalueProvince(selected.code);
    }
  }, [profile, province]);

  useEffect(() => {
    if (profile && city?.length > 0) {
      const selected = city.find((c) => c.name === profile.city);
      if (selected) setvalueCity(selected.code);
    }
  }, [profile, city]);

  useEffect(() => {
    if (profile && subdistrict?.length > 0) {
      const selected = subdistrict.find((s) => s.name === profile.subdistrict);
      if (selected) setValueSubdistrict(selected.code);
    }
  }, [profile, subdistrict]);

  useEffect(() => {
    if (profile && ward?.length > 0) {
      const selected = ward.find((w) => w.name === profile.ward);
      if (selected) setValueWard(selected.code);
    }
  }, [profile, ward]);

  useEffect(() => {
    if (token) {
      fetchProfile(token);
    }
  }, [token, fetchProfile]);

  useEffect(() => {
    fetchProvince();
  }, [fetchProvince]);

  useEffect(() => {
    if (valueProvince) fetchCity(valueProvince);
  }, [valueProvince, fetchCity]);

  useEffect(() => {
    if (valueCity) fetchSubdistrict(valueCity);
  }, [valueCity, fetchSubdistrict]);

  useEffect(() => {
    if (valueSubdistrict) fetchWard(valueSubdistrict);
  }, [valueSubdistrict, fetchWard]);

  async function onSubmit(values) {
    try {
      await updateProfile(token, values);
      toast.success("Profil berhasil diperbarui.");
      setIsEditing(false);
      fetchProfile(token);
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal memperbarui profil.");
    }
  }

  const handleCancelEdit = () => {
    // Re-run the reset logic to revert any changes
    if (profile) {
      const genderMap = {
        Male: "Laki-laki",
        Female: "Perempuan",
      };
      const educationMap = {
        Siswa_Aktif: "0",
        Lulusan_Baru: "1",
        Mahasiswa_Aktif: "2",
        Lainnya: "3",
      };
      form.reset({
        fullName: profile.username || "",
        email: profile.email || "",
        gender: genderMap[profile.gender] || profile.gender || "",
        educationStatus:
          educationMap[profile.education_status] ||
          profile.education_status ||
          "",
        valueProvince: profile.province || "",
        valueCity: profile.city || "",
        valueSubdistrict: profile.subdistrict || "",
        valueWard: profile.ward || "",
        dob: profile.date_of_birth
          ? format(new Date(profile.date_of_birth), "yyyy-MM-dd")
          : "",
      });
    }
    setIsEditing(false);
  };

  return (
    <>
      <div className="min-h-screen bg-[#F7F9F6] mb-6 font-sans">
        <div className="mb-2">
          {/* breadcum */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild className="hover:text-primary">
                  <Link to="/dashboard-mentee">Beranda</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem className="text-primary">
                <BreadcrumbPage className="text-primary">
                  Akun Anda
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="bg-[#003631] text-white rounded-xl p-6 relative w-full mx-auto shadow-md mb-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Akun Anda</h1>
            <p className="text-sm text-white/80 mt-1 max-w-md mx-auto">
              Kelola informasi akun Anda di sini.
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md  mx-auto">
          <div className="my-2 flex justify-end">
            <Button
              onClick={isEditing ? handleCancelEdit : () => setIsEditing(true)}
              variant={isEditing ? "destructive" : "secondary"}
              size="sm"
              className="shadow-md text-white"
            >
              {isEditing ? (
                <X className="mr-2 h-4 w-4" />
              ) : (
                <Pencil className="mr-2 h-4 w-4" />
              )}
              {isEditing ? "Batal" : "Edit Profil"}
            </Button>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Asli</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nama Lengkap"
                          disabled={!isEditing}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="email@contoh.com"
                          type="email"
                          disabled
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jenis Kelamin</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!isEditing}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih jenis kelamin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                          <SelectItem value="Perempuan">Perempuan</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="educationStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status Pendidikan Saat Ini</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!isEditing}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih status pendidikan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0">
                            Siswa Aktif (SMA/SMK/Sederajat)
                          </SelectItem>
                          <SelectItem value="1">
                            Lulusan Baru / Gap Year (Belum Kuliah)
                          </SelectItem>
                          <SelectItem value="2">Mahasiswa Aktif</SelectItem>
                          <SelectItem value="3">Lainnya</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal Lahir</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              type="button"
                              disabled={!isEditing}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(new Date(field.value), "PPP", {
                                  locale: id,
                                })
                              ) : (
                                <span>Pilih tanggal lahir</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto overflow-hidden p-0"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) =>
                              field.onChange(
                                date ? format(date, "yyyy-MM-dd") : ""
                              )
                            }
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                            captionLayout="dropdown"
                            fromYear={1900}
                            toYear={new Date().getFullYear()}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Province */}
                <FormField
                  control={form.control}
                  name="valueProvince"
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
                              disabled={!isEditing}
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? displayProvince.find(
                                    (item) => item.name === field.value
                                  )?.name || field.value
                                : "Pilih Provinsi"}
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
                                {displayProvince.map((item) => (
                                  <CommandItem
                                    value={item.name}
                                    key={item.code}
                                    onSelect={() => {
                                      field.onChange(item.name);
                                      setvalueProvince(item.code);
                                      setOpenProvince(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        item.name === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {item.name}
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
                  name="valueCity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kabupaten / Kota</FormLabel>
                      <Popover open={openCity} onOpenChange={setOpenCity}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              disabled={!isEditing}
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? displayCity.find(
                                    (item) => item.name === field.value
                                  )?.name || field.value
                                : "Pilih Kota/Kabupaten"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                          <Command>
                            <CommandInput placeholder="Cari kota/kabupaten..." />
                            <CommandList>
                              <CommandEmpty>Kota tidak ditemukan.</CommandEmpty>
                              <CommandGroup>
                                {displayCity.map((item) => (
                                  <CommandItem
                                    value={item.name}
                                    key={item.code}
                                    onSelect={() => {
                                      field.onChange(item.name);
                                      setvalueCity(item.code);
                                      setOpenCity(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        item.name === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {item.name}
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
                  name="valueSubdistrict"
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
                              disabled={!isEditing}
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? displaySubdistrict.find(
                                    (item) => item.name === field.value
                                  )?.name || field.value
                                : "Pilih Kecamatan"}
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
                                {displaySubdistrict.map((item) => (
                                  <CommandItem
                                    value={item.name}
                                    key={item.code}
                                    onSelect={() => {
                                      field.onChange(item.name);
                                      setValueSubdistrict(item.code);
                                      setOpenSubdistrict(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        item.name === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {item.name}
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
                  name="valueWard"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kelurahan / Desa</FormLabel>
                      <Popover open={openWard} onOpenChange={setOpenWard}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              disabled={!isEditing}
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? displayWard.find(
                                    (item) => item.name === field.value
                                  )?.name || field.value
                                : "Pilih Kelurahan/Desa"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                          <Command>
                            <CommandInput placeholder="Cari kelurahan/desa..." />
                            <CommandList>
                              <CommandEmpty>
                                Kelurahan/Desa tidak ditemukan.
                              </CommandEmpty>
                              <CommandGroup>
                                {displayWard.map((item) => (
                                  <CommandItem
                                    value={item.name}
                                    key={item.code}
                                    onSelect={() => {
                                      field.onChange(item.name);
                                      setValueWard(item.code);
                                      setOpenWard(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        item.name === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {item.name}
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

              {isEditing && (
                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    className="bg-[#003631] hover:bg-[#003631]/90"
                    disabled={!form.formState.isDirty || isLoadingEdit}
                  >
                    {isLoadingEdit ? (
                      <div className="flex items-center gap-2">
                        <Spinner /> Menyimpan...
                      </div>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" /> Simpan Perubahan
                      </>
                    )}
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </div>
      </div>

      <DashboardMenteeMajorInterest />
    </>
  );
}
