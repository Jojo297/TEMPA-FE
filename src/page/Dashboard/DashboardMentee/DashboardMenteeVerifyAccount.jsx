import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
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
import useAdressCampus from "@/hooks/hooksCampus/useAdressCampus";

import { Button } from "@/components/ui/button";
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
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Nama harus diisi minimal 2 karakter.",
  }),
  email: z.string().email({
    message: "Email tidak valid.",
  }),
  gender: z.string({
    required_error: "Silakan pilih jenis kelamin.",
  }),
  educationStatus: z.string({
    required_error: "Silakan pilih status pendidikan.",
  }),
  valueProvince: z.string().min(1, "Provinsi wajib dipilih."),
  valueCity: z.string().min(1, "Kota/Kabupaten wajib dipilih."),
  valueSubdistrict: z.string().min(1, "Kecamatan wajib dipilih."),
  valueWard: z.string().min(1, "Desa/Kelurahan wajib dipilih."),
  terms: z.boolean().refine((val) => val === true, {
    message: "Anda harus menyetujui Syarat & Ketentuan.",
  }),
  consent: z.boolean().refine((val) => val === true, {
    message: "Anda harus menyetujui pembagian data.",
  }),
});

export default function DashboardMenteeVerifyAccount() {
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

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      gender: "",
      educationStatus: "",
      valueProvince: "",
      valueCity: "",
      valueSubdistrict: "",
      valueWard: "",
      terms: false,
      consent: false,
    },
  });

  function onSubmit(values) {
    console.log(values);
    // Lakukan proses submit data di sini
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl text-primary font-bold">
          Verifikasi Akun Mentee
        </h1>
        <p className="text-gray-500">
          Lengkapi data diri Anda untuk verifikasi akun.
        </p>
      </div>

      <div className="bg-white p-8 shadow-md rounded-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Asli</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama lengkap" {...field} />
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
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Kelamin</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
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
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Siswa Aktif (SMA/SMK/Sederajat)">
                          Siswa Aktif (SMA/SMK/Sederajat)
                        </SelectItem>
                        <SelectItem value="Lulusan Baru / Gap Year (Belum Kuliah)">
                          Lulusan Baru / Gap Year (Belum Kuliah)
                        </SelectItem>
                        <SelectItem value="Mahasiswa Aktif">
                          Mahasiswa Aktif
                        </SelectItem>
                        <SelectItem value="Lainnya">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Saya telah membaca dan menyetujui Syarat & Ketentuan yang
                      berlaku. *
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="consent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Saya bersedia data saya dibagikan kepada pihak kampus
                      mitra untuk keperluan administrasi dan verifikasi program.
                      *
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Verifikasi Akun
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
