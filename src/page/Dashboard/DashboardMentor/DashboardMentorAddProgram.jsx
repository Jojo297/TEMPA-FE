import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Pencil,
  Plus,
  Calendar as CalendarIcon,
} from "lucide-react"; // Import CalendarIcon
import { format } from "date-fns"; // Import format date library
import { id } from "date-fns/locale"; // Import bahasa Indonesia untuk format

// Import yang diperlukan dari Zod & React Hook Form
import { useForm, useController } from "react-hook-form"; // Import useController
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ManageMapsCampusLocation } from "@/components/ManageMapsCampusLocation";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormDescription,
  FormField as ShadcnFormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils"; // Anggap Anda memiliki fungsi cn untuk menggabungkan class Tailwind
import { SearchMajors } from "@/components/SearchMajors";
import { SearchMajorsProgramForm } from "@/components/SearchMajorsProgramForm";
import useAddProgram from "@/hooks/hooksMentor/useAddProgram";
import { toast } from "sonner";
import { SearchMajorsProgramFormMentor } from "@/components/SearchMajorsProgramFormMentor";
import useGetBalance from "@/hooks/hooksMentor/useGetBalance";

// =====================================================================
// KOMPONEN BARU: DatePicker yang terintegrasi dengan React Hook Form
// =====================================================================
const DatePickerRHF = ({ name, control, placeholder = "Pilih Tanggal" }) => {
  const { field } = useController({ name, control });

  // Konversi nilai string (YYYY-MM-DD) dari RHF menjadi objek Date
  const selectedDate = field.value ? new Date(field.value) : undefined;

  // Fungsi handler untuk memperbarui RHF
  const handleDateSelect = (date) => {
    // Simpan tanggal dalam format string YYYY-MM-DD agar kompatibel dengan Zod string validation
    const formattedDate = date ? format(date, "yyyy-MM-dd") : "";
    field.onChange(formattedDate);
  };

  const currentYear = new Date().getFullYear();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-between text-left font-normal",
            !field.value && "text-muted-foreground",
          )}
        >
          {field.value
            ? format(selectedDate, "PPP", { locale: id }) // Format tanggal yang ramah pengguna
            : placeholder}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          initialFocus
          captionLayout="dropdown" // Tambahkan layout dropdown jika ingin ada dropdown bulan/tahun
          fromYear={currentYear}
          toYear={currentYear + 5}
        />
      </PopoverContent>
    </Popover>
  );
};

const MAX_FILE_SIZE = 2000000; // 2MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const ProgramSchema = z
  .object({
    bannerImage: z
      .any()
      .refine((files) => files?.length == 1, "Banner gambar wajib diunggah.")
      .refine(
        (files) => files?.[0]?.size <= MAX_FILE_SIZE,
        `Ukuran file maksimal adalah 2MB.`,
      )
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        ".jpg, .jpeg, .png dan .webp adalah format yang didukung.",
      ),
    name: z.string().min(3, "Nama program harus memiliki minimal 3 karakter."),
    majorName: z
      .number({ invalid_type_error: "Jurusan wajib dipilih." })
      .min(1, "Jurusan wajib dipilih."),
    programType: z.string().min(1, { message: "Pilih Jenis Pelaksanaan." }),
    visibility: z.string().min(1, { message: "Pilih Visibilitas." }),
    startRegisDate: z.string().min(1, "Tanggal mulai pendaftaran wajib diisi."),
    endRegisDate: z.string().min(1, "Tanggal akhir pendaftaran wajib diisi."),
    startDateProgram: z.string().min(1, "Tanggal mulai program wajib diisi."),
    endDateProgram: z.string().min(1, "Tanggal akhir program wajib diisi."),
    startTime: z.string().min(1, "Waktu mulai wajib diisi."),
    endTime: z.string().min(1, "Waktu selesai wajib diisi."),
    capacity: z.coerce
      .number({ invalid_type_error: "Kuota harus berupa angka." })
      .min(1, "Kuota minimal 1 peserta.")
      .int("Kuota harus berupa bilangan bulat."),

    // FIELD BARU/DIUBAH
    onlineLink: z.string().optional(), // Link hanya dibutuhkan jika online
    onsiteLocationName: z.string().optional(), // Nama tempat hanya dibutuhkan jika onsite

    mapLat: z
      .number({
        invalid_input: "Berikan Titik Lokasi",
      })
      .optional(),
    mapLng: z
      .number({
        invalid_input: "Berikan Titik Lokasi",
      })
      .optional(),

    description: z
      .string()
      .min(20, "Deskripsi harus memiliki minimal 20 karakter."),
    benefits: z.array(z.string()).min(1, "Minimal harus ada 1 benefit."),
    terms: z
      .array(z.string())
      .min(1, "Minimal harus ada 1 Syarat & Ketentuan."),
  })
  .refine((data) => data.startRegisDate <= data.endRegisDate, {
    message: "Tanggal mulai pendaftaran tidak boleh setelah tanggal akhir.",
    path: ["endRegisDate"],
  })
  // Tambahkan refine kedua untuk Program Date
  .refine((data) => data.startDateProgram <= data.endDateProgram, {
    message: "Tanggal mulai program tidak boleh setelah tanggal akhir program.",
    path: ["endDateProgram"],
  })
  .refine(
    (data) => {
      // Validasi: Jika ONSITE, nama lokasi, lat, dan lng wajib diisi
      if (data.programType === "onsite") {
        return (
          data.onsiteLocationName &&
          data.onsiteLocationName.trim().length > 0 &&
          data.mapLat &&
          data.mapLng
        );
      }
      return true;
    },
    {
      message: "Nama tempat dan lokasi peta wajib diisi untuk program Onsite.",
      path: ["onsiteLocationName"],
    },
  );

// =====================================================================
// Komponen Utama
// =====================================================================
export default function DashboardMentorAddProgram() {
  const navigate = useNavigate();
  const initialProgramState = {
    bannerImage: undefined,
    name: "",
    majorName: undefined,
    programType: "", // Nilai awal UNDEFINED
    startRegisDate: "",
    endRegisDate: "",
    startDateProgram: "",
    endDateProgram: "",
    startTime: "", // Tambahkan nilai awal string kosong
    endTime: "", // Tambahkan nilai awal string kosong
    visibility: "", // Nilai awal UNDEFINED
    onsiteLocationName: "",
    mapLat: undefined, // Diubah ke undefined agar Zod number/refine bekerja lebih baik
    mapLng: undefined, // Diubah ke undefined
    capacity: 0,
    description: "",
    benefits: [],
    terms: [],
    imageUrl: "",
  };
  const token = localStorage.getItem("userJwt");
  const [newBenefit, setNewBenefit] = useState("");
  const [newTerm, setNewTerm] = useState("");
  const [bannerPreview, setBannerPreview] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // hook add program
  const { addProgram, isLoading, error } = useAddProgram();
  const {
    balance,
    quotaMentee,
    isLoadingWallet,
    error: errorWallet,
    getWallet,
  } = useGetBalance();

  useEffect(() => {
    if (token) {
      getWallet(token);
    }
  }, [token, getWallet]);

  const displayQuotaMentee = quotaMentee ?? 0;
  // console.log(displayQuotaMentee);

  const form = useForm({
    // Gunakan nama variabel 'form' untuk props FormField
    resolver: zodResolver(ProgramSchema),
    defaultValues: initialProgramState, // Pastikan ini sesuai dengan skema
  });

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
    register,
    setValue,
  } = form;

  // Buat registrasi manual untuk input file
  const bannerImageRef = register("bannerImage");

  const programType = watch("programType");
  const isOnline = programType === "online";
  const programVisibility = watch("visibility");
  // HAPUS: handleSelectChange (RHF field.onChange akan menggantikannya)

  const handleAddListItem = (type, newItem, setNewItem) => {
    // ... (Logika tetap sama, menggunakan setValue) ...
    if (newItem.trim() !== "") {
      const field = type === "benefit" ? "benefits" : "terms";
      const currentList = watch(field);
      const newList = [...currentList, newItem.trim()];

      setValue(field, newList, { shouldValidate: true });
      setNewItem("");
    }
  };

  const handleRemoveListItem = (type, index) => {
    // ... (Logika tetap sama, menggunakan setValue) ...
    const field = type === "benefit" ? "benefits" : "terms";
    const currentList = watch(field);
    const newList = currentList.filter((_, i) => i !== index);

    setValue(field, newList, { shouldValidate: true });
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);

    // Menggunakan setValue langsung
    setValue("onsiteLocationName", location.name, { shouldValidate: true });
    setValue("mapLat", location.lat, { shouldValidate: true });
    setValue("mapLng", location.lng, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    console.log(data);
    const token = localStorage.getItem("userJwt");
    if (!token) {
      alert("Sesi Anda telah berakhir. Silakan login kembali.");
      return;
    }

    if (data.capacity > displayQuotaMentee) {
      form.setError("capacity", {
        type: "manual",
        message: `Kuota melebihi batas langganan Anda. Sisa kuota saat ini: ${displayQuotaMentee}. Silakan isi ulang saldo wallet Anda.`,
      });
      return; // Berhenti disini
    }

    // 1. Buat objek FormData
    const formData = new FormData();

    // 2. Tambahkan semua data ke FormData
    // Sesuaikan nama field dengan yang diharapkan oleh API
    formData.append("bannerImage", data.bannerImage[0]); // FIX: Sesuai dengan backend multer
    formData.append("name", data.name);
    formData.append("majorName", data.majorName); // FIX: Sesuai dengan req.body backend
    formData.append("programType", data.programType); // FIX: Sesuai dengan req.body backend
    formData.append("visibility", data.visibility);
    formData.append("startRegisDate", data.startRegisDate); // FIX: Sesuai dengan req.body backend
    formData.append("endRegisDate", data.endRegisDate); // FIX: Sesuai dengan req.body backend
    formData.append("startDateProgram", data.startDateProgram); // FIX: Sesuai dengan req.body backend
    formData.append("endDateProgram", data.endDateProgram); // FIX: Sesuai dengan req.body backend
    // formData.append("execution_date", data.execDate); // Backend tidak menggunakan ini
    formData.append("startTime", data.startTime); // FIX: Sesuai dengan req.body backend
    formData.append("endTime", data.endTime); // FIX: Sesuai dengan req.body backend
    formData.append("capacity", data.capacity);
    formData.append("description", data.description);
    formData.append("benefits", data.benefits);
    formData.append("terms", data.terms);

    // Tambahkan field kondisional
    if (data.programType === "online") {
      // formData.append("online_link", data.onlineLink || ""); // Backend tidak menggunakan ini
    } else {
      formData.append("location_name", data.onsiteLocationName); // Backend tidak menggunakan ini
      formData.append("mapLat", data.mapLat); // FIX: Sesuai dengan req.body backend
      formData.append("mapLng", data.mapLng); // FIX: Sesuai dengan req.body backend
    }

    // 3. Panggil action dari hook
    try {
      const result = await addProgram(token, formData);
      if (result.success) {
        toast.success(result.message || "Program berhasil ditambahkan!");
        navigate("/dashboard-mentor/program");
      }
    } catch (error) {
      toast.error(error.message || "Gagal menambahkan program.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* breadcum */}
        <Breadcrumb className="mb-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild className="hover:text-primary">
                <Link to="/dashboard-mentor/beranda">Beranda</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild className="hover:text-primary">
                <Link to="/dashboard-mentor/program">Program</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="text-primary">
              <BreadcrumbPage className="text-primary">
                Tambah Program
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* ... (HEADER BANNER) ... */}
        <div className="relative rounded-xl overflow-hidden shadow-md mb-10">
          <div className="relative">
            <img
              src={bannerPreview || "https://placehold.co/1200x400"}
              alt="Program Banner"
              className="w-full h-72 object-cover"
            />
            <label
              htmlFor="banner-upload"
              className="absolute top-4 right-4 bg-white text-[#013B35] px-4 py-2 rounded-full shadow-md flex items-center gap-2 cursor-pointer hover:bg-gray-100 transition-all"
            >
              <Pencil size={16} /> Upload Banner
              <Input
                id="banner-upload"
                type="file"
                className="hidden"
                accept="image/png, image/jpeg, image/webp"
                {...bannerImageRef}
                onChange={(event) => {
                  // Jalankan onChange dari register RHF
                  bannerImageRef.onChange(event);

                  const file = event.target.files?.[0];
                  if (file) {
                    setBannerPreview(URL.createObjectURL(file));
                  }
                }}
              />
            </label>
          </div>
        </div>
        {/* Tambahkan FormMessage di sini untuk menampilkan error validasi banner */}
        <ShadcnFormField
          control={control}
          name="bannerImage"
          render={() => (
            <FormItem>
              <FormMessage className="" />
            </FormItem>
          )}
        />

        <section className="mt-7 max-w-7xl bg-[#F8FAFB] mx-auto mb-20 flex flex-col items-start">
          {/* ====================== CARD PROGRAM ====================== */}
          <div className=" w-full mb-10">
            <div className="bg-white shadow-md rounded-xl p-6 border">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#013B35]">
                  Detail Program
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nama Program */}
                <ShadcnFormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Program</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Contoh: BootCamp Web Developer"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Pilih Jurusan */}
                <ShadcnFormField
                  control={control}
                  name="majorName"
                  render={({ field }) => (
                    <FormItem className="flex flex-col ">
                      <FormLabel className="mb-[10px]">Pilih Jurusan</FormLabel>
                      <FormControl>
                        <SearchMajorsProgramFormMentor
                          value={field.value} // field.value sekarang adalah ID (number)
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Jenis Pelaksanaan (Online/Onsite) */}
                <ShadcnFormField
                  control={control}
                  name="programType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jenis Pelaksanaan</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Jenis Pelaksanaan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="online">Online</SelectItem>
                          <SelectItem value="onsite">Onsite</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Tanggal Mulai Pendaftaran */}
                <ShadcnFormField
                  control={control}
                  name="startRegisDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Tanggal Mulai Pendaftaran</FormLabel>
                      <DatePickerRHF
                        name="startRegisDate"
                        control={control}
                        placeholder="Tanggal Mulai Daftar"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Tanggal Akhir Pendaftaran */}
                <ShadcnFormField
                  control={control}
                  name="endRegisDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Tanggal Akhir Pendaftaran</FormLabel>
                      <DatePickerRHF
                        name="endRegisDate"
                        control={control}
                        placeholder="Tanggal Akhir Daftar"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Tanggal Mulai Pelaksanaan */}
                <ShadcnFormField
                  control={control}
                  name="startDateProgram"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Tanggal Mulai Program</FormLabel>
                      <DatePickerRHF
                        name="startDateProgram"
                        control={control}
                        placeholder="Tanggal Mulai Program"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Tanggal Akhir Pelaksanaan */}
                <ShadcnFormField
                  control={control}
                  name="endDateProgram"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Tanggal AKhir Program</FormLabel>
                      <DatePickerRHF
                        name="endDateProgram"
                        control={control}
                        placeholder="Tanggal Akhir Program"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Waktu Mulai */}
                <ShadcnFormField
                  control={control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Waktu Mulai</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Waktu Selesai */}
                <ShadcnFormField
                  control={control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Waktu Selesai</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Kuota */}
                <ShadcnFormField
                  control={control}
                  name="capacity"
                  render={({ field }) => {
                    const isOverLimit = field.value > displayQuotaMentee;

                    return (
                      <FormItem>
                        <div className="flex justify-between items-end">
                          <FormLabel>Kuota Peserta</FormLabel>
                          <span
                            className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${
                              isOverLimit
                                ? "bg-red-50 text-red-600 border-red-100"
                                : "bg-emerald-50 text-emerald-700 border-emerald-100"
                            }`}
                          >
                            Tersedia: {displayQuotaMentee} Peserta
                          </span>
                        </div>

                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Contoh: 50"
                            {...field}
                            className={
                              isOverLimit
                                ? "border-red-500 focus-visible:ring-red-500"
                                : ""
                            }
                          />
                        </FormControl>

                        <FormMessage />

                        <FormDescription className="text-[11px] leading-relaxed">
                          <span>
                            Jumlah peserta yang dapat ditampung dalam program
                            ini. Pastikan kuota mencukupi kapasitas mentor.
                          </span>
                        </FormDescription>
                      </FormItem>
                    );
                  }}
                />

                {/* ========================================================= */}
                {/* START: Input Lokasi/Link yang Terpisah & Kondisional */}
                {/* ========================================================= */}
                {!isOnline && (
                  <ShadcnFormField
                    control={control}
                    name="onsiteLocationName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Tempat/Alamat Lokasi</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Contoh: Ruang Meeting A Kampus"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* visibility */}
                <div className={!isOnline ? "col-span-1" : "col-span-2"}>
                  <ShadcnFormField
                    control={control}
                    name="visibility"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Visibilitas Program</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih Visibilitas" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          * <span className="font-bold">Public:</span> terlihat
                          oleh semua mentee dan mentor.{" "}
                          <span className="font-bold">Private:</span> hanya Anda
                          dan para mentor.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* 3. Koordinat Peta (Hanya muncul jika ONSITE) */}
                {!isOnline && (
                  <div className="col-span-1 md:col-span-2">
                    <ShadcnFormField
                      control={control}
                      name="mapLat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pilih Lokasi di Peta</FormLabel>
                          <FormControl>
                            <ManageMapsCampusLocation
                              onLocationSelect={handleLocationSelect}
                              initialLat={watch("mapLat")}
                              initialLng={watch("mapLng")}
                            />
                          </FormControl>
                          <FormDescription>
                            *Klik peta untuk memilih atau geser marker untuk
                            akurasi.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* ========================================================= */}
                {/* END: Input Lokasi/Link yang Terpisah & Kondisional */}
                {/* ========================================================= */}

                <div className="col-span-1 md:col-span-2">
                  <ShadcnFormField
                    control={control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Detail Kegiatan / Deskripsi</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Jelaskan secara rinci kegiatan yang akan dilaksanakan..."
                            rows={5}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Benefit */}
                {/* ... (Konten Benefit tidak berubah) ... */}
                <div className="col-span-1 md:col-span-2">
                  <ShadcnFormField
                    control={control}
                    name="benefits"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Benefit (Keuntungan Peserta)</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <ul className="list-disc list-inside text-gray-700 space-y-1 p-3 border rounded-xl bg-gray-50">
                              {field.value.length > 0 ? (
                                field.value.map((item, index) => (
                                  <li
                                    key={index}
                                    className="flex justify-between items-center"
                                  >
                                    {item}
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      className="text-red-500 hover:bg-red-50 hover:text-red-600 h-6"
                                      onClick={() =>
                                        handleRemoveListItem("benefit", index)
                                      }
                                    >
                                      Hapus
                                    </Button>
                                  </li>
                                ))
                              ) : (
                                <li className="text-gray-500">
                                  Belum ada benefit yang ditambahkan.
                                </li>
                              )}
                            </ul>
                            <div className="flex gap-2">
                              <Input
                                placeholder="Contoh: E-Certificate"
                                value={newBenefit}
                                onChange={(e) => setNewBenefit(e.target.value)}
                              />
                              <Button
                                type="button"
                                onClick={() =>
                                  handleAddListItem(
                                    "benefit",
                                    newBenefit,
                                    setNewBenefit,
                                  )
                                }
                                disabled={newBenefit.trim() === ""}
                              >
                                <Plus size={16} className="mr-2" /> Tambah
                              </Button>
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Syarat dan Ketentuan */}
                {/* ... (Konten Syarat dan Ketentuan tidak berubah) ... */}
                <div className="col-span-1 md:col-span-2">
                  <ShadcnFormField
                    control={control}
                    name="terms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Syarat dan Ketentuan</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <ul className="list-disc list-inside text-gray-700 space-y-1 p-3 border rounded-xl bg-gray-50">
                              {field.value.length > 0 ? (
                                field.value.map((item, index) => (
                                  <li
                                    key={index}
                                    className="flex justify-between items-center"
                                  >
                                    {item}
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      className="text-red-500 hover:bg-red-50 hover:text-red-600 h-6"
                                      onClick={() =>
                                        handleRemoveListItem("term", index)
                                      }
                                    >
                                      Hapus
                                    </Button>
                                  </li>
                                ))
                              ) : (
                                <li className="text-gray-500">
                                  Belum ada syarat yang ditambahkan.
                                </li>
                              )}
                            </ul>
                            <div className="flex gap-2">
                              <Input
                                placeholder="Contoh: Wajib membawa laptop"
                                value={newTerm}
                                onChange={(e) => setNewTerm(e.target.value)}
                              />
                              <Button
                                type="button"
                                onClick={() =>
                                  handleAddListItem("term", newTerm, setNewTerm)
                                }
                                disabled={newTerm.trim() === ""}
                              >
                                <Plus size={16} className="mr-2" /> Tambah
                              </Button>
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Tombol Upload */}
                <div className="col-span-1 md:col-span-2 flex justify-end mt-4">
                  <Button type="submit" size="lg" disabled={isLoading}>
                    {isSubmitting ? "Membuat Program..." : "Buat Program"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </Form>
  );
}
