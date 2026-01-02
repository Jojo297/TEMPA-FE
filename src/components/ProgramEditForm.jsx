import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Pencil,
  Plus,
  Calendar as CalendarIcon,
  X, // Import X for close button
} from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import { useForm, useController } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
import { cn } from "@/lib/utils";
import { SearchMajorsProgramForm } from "@/components/SearchMajorsProgramForm";
import useUpdateProgram from "@/hooks/hooksCampus/useUpdateProgram";
import { toast } from "sonner";
import { EditSearchMajorsProgramForm } from "./EditSearchMajorsProgramForm";

// =====================================================================
// KOMPONEN BARU: DatePicker yang terintegrasi dengan React Hook Form
// =====================================================================
const DatePickerRHF = ({ name, control, placeholder = "Pilih Tanggal" }) => {
  const { field } = useController({ name, control });

  const selectedDate = field.value ? new Date(field.value) : undefined;

  const handleDateSelect = (date) => {
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
            !field.value && "text-muted-foreground"
          )}
        >
          {field.value
            ? format(selectedDate, "PPP", { locale: id })
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
          captionLayout="dropdown"
          fromYear={currentYear}
          toYear={currentYear + 5}
        />
      </PopoverContent>
    </Popover>
  );
};

// =====================================================================
// 1. KONSTANTA DAN SKEMA VALIDASI ZOD
// =====================================================================

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
      .optional() // Jadikan opsional untuk pengeditan, karena mungkin tidak diperbarui
      .refine(
        // Izinkan jika tidak ada file (undefined) atau jika tidak ada file yang dipilih (panjang 0)
        (files) =>
          !files || files.length === 0 || files[0]?.size <= MAX_FILE_SIZE,
        `Ukuran file maksimal adalah 2MB.`
      )
      .refine(
        // Izinkan jika tidak ada file atau jika tidak ada file yang dipilih
        (files) =>
          !files ||
          files.length === 0 ||
          ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
        ".jpg, .jpeg, .png dan .webp adalah format yang didukung."
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
    startTime: z
      .string()
      .min(1, "Waktu mulai wajib diisi.")
      .transform((val) => {
        // Jika val adalah format ISO 8601, konversi ke HH:mm
        if (val && val.includes("T")) {
          return format(new Date(val), "HH:mm");
        }
        return val; // Jika sudah HH:mm, biarkan
      }),
    endTime: z.string().min(1, "Waktu selesai wajib diisi."),
    capacity: z.coerce
      .number({ invalid_type_error: "Kuota harus berupa angka." })
      .min(1, "Kuota minimal 1 peserta.")
      .int("Kuota harus berupa bilangan bulat."),

    onsiteLocationName: z.string().optional().nullable(),

    mapLat: z
      .number({
        invalid_input: "Berikan Titik Lokasi",
      })
      .optional()
      .nullable(),
    mapLng: z
      .number({
        invalid_input: "Berikan Titik Lokasi",
      })
      .optional()
      .nullable(),

    description: z
      .string()
      .min(20, "Deskripsi harus memiliki minimal 20 karakter."),
    benefits: z.array(z.string()).min(1, "Minimal harus ada 1 benefit."),
    terms: z
      .array(z.string())
      .min(1, "Minimal harus ada 1 Syarat & Ketentuan."),
    imageUrl: z.string().optional(), // URL gambar yang sudah ada
  })
  .refine((data) => data.startRegisDate <= data.endRegisDate, {
    message: "Tanggal mulai pendaftaran tidak boleh setelah tanggal akhir.",
    path: ["endRegisDate"],
  })
  .refine((data) => data.startDateProgram <= data.endDateProgram, {
    message: "Tanggal mulai program tidak boleh setelah tanggal akhir program.",
    path: ["endDateProgram"],
  })
  .refine(
    (data) => {
      if (data.programType === "onsite") {
        return (
          data.onsiteLocationName &&
          data.onsiteLocationName.trim().length > 0 &&
          data.mapLat !== undefined &&
          data.mapLat !== null &&
          data.mapLng !== undefined &&
          data.mapLng !== null
        );
      }
      return true;
    },
    {
      message: "Nama tempat dan lokasi peta wajib diisi untuk program Onsite.",
      path: ["onsiteLocationName"],
    }
  );

// =====================================================================
// Komponen Utama ProgramEditForm
// =====================================================================
export default function ProgramEditForm({ initialData, onClose, onSave }) {
  const navigate = useNavigate();
  const { updateProgram, isLoading } = useUpdateProgram();

  const [newBenefit, setNewBenefit] = useState("");
  const [newTerm, setNewTerm] = useState("");
  const [bannerPreview, setBannerPreview] = useState(
    initialData.image_url || null
  );
  const [selectedLocation, setSelectedLocation] = useState(
    initialData.lat && initialData.lng
      ? {
          name: initialData.location_name,
          lat: initialData.lat,
          lng: initialData.lng,
        }
      : null
  );

  console.log("initialData:", initialData);

  // Siapkan nilai default untuk formulir
  const defaultFormValues = {
    bannerImage: undefined, // Input file selalu undefined pada awalnya
    name: initialData.program_name || "",
    majorName: initialData.id_major || undefined, // Menggunakan id_major dari data
    programType: initialData.type_sesi || "",
    visibility: initialData.visibility || "",
    startRegisDate: initialData.start_regis_date
      ? format(new Date(initialData.start_regis_date), "yyyy-MM-dd")
      : "",
    endRegisDate: initialData.end_regis_date
      ? format(new Date(initialData.end_regis_date), "yyyy-MM-dd")
      : "",
    startDateProgram: initialData.start_program_date
      ? format(new Date(initialData.start_program_date), "yyyy-MM-dd")
      : "",
    endDateProgram: initialData.end_program_date
      ? format(new Date(initialData.end_program_date), "yyyy-MM-dd")
      : "",
    startTime: initialData.sesi_start
      ? format(new Date(initialData.sesi_start), "HH:mm")
      : "",
    endTime: initialData.sesi_end
      ? format(new Date(initialData.sesi_end), "HH:mm")
      : "",
    capacity: initialData.capacity || 0,
    onsiteLocationName: initialData.onsiteLocationName || null,
    mapLat: initialData.lat || null,
    mapLng: initialData.lng || null,
    description: initialData.description || "",
    benefits: Array.isArray(initialData.benefit)
      ? initialData.benefit
      : typeof initialData.benefit === "string"
      ? initialData.benefit.split(",").map((s) => s.trim())
      : [],
    terms: Array.isArray(initialData.terms_and_conditions)
      ? initialData.terms_and_conditions
      : typeof initialData.terms_and_conditions === "string"
      ? initialData.terms_and_conditions.split(",").map((s) => s.trim())
      : [],
    imageUrl: initialData.image_url || "",
  };

  const form = useForm({
    resolver: zodResolver(ProgramSchema),
    defaultValues: defaultFormValues,
  });

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting, isDirty },
    register,
    setValue,
    reset, // Tambahkan reset untuk mereset formulir ke nilai default
  } = form;

  // Reset formulir ketika initialData berubah (misalnya, jika program yang berbeda dipilih untuk diedit)
  useEffect(() => {
    reset(defaultFormValues);
    setBannerPreview(initialData.image_url || null);
    setSelectedLocation(
      initialData.lat && initialData.lng
        ? {
            name: initialData.location_name,
            lat: initialData.lat,
            lng: initialData.lng,
          }
        : null
    );
  }, [initialData]);

  const bannerImageRef = register("bannerImage");

  const programType = watch("programType");
  const isOnline = programType === "online";

  const handleAddListItem = (type, newItem, setNewItem) => {
    if (newItem.trim() !== "") {
      const field = type === "benefit" ? "benefits" : "terms";
      const currentList = watch(field);
      const newList = [...currentList, newItem.trim()];

      setValue(field, newList, { shouldValidate: true });
      setNewItem("");
    }
  };

  const handleRemoveListItem = (type, index) => {
    const field = type === "benefit" ? "benefits" : "terms";
    const currentList = watch(field);
    const newList = currentList.filter((_, i) => i !== index);

    setValue(field, newList, { shouldValidate: true });
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setValue("onsiteLocationName", location.name, { shouldValidate: true });
    setValue("mapLat", location.lat, { shouldValidate: true });
    setValue("mapLng", location.lng, { shouldValidate: true });
  };

  const handleClose = () => {
    if (isDirty) {
      if (
        window.confirm(
          "Anda memiliki perubahan yang belum disimpan. Apakah Anda yakin ingin keluar?"
        )
      ) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  const onSubmit = async (data) => {
    const token = localStorage.getItem("userJwt");
    if (!token) {
      toast.error("Sesi Anda telah berakhir. Silakan login kembali.");
      return;
    }

    const formData = new FormData();

    // Hanya tambahkan bannerImage jika ada file baru yang diunggah
    if (data.bannerImage && data.bannerImage.length > 0) {
      formData.append("bannerImage", data.bannerImage[0]);
    }

    // Tambahkan field lainnya
    formData.append("name", data.name);
    formData.append("majorName", data.majorName);
    formData.append("programType", data.programType);
    formData.append("visibility", data.visibility);
    formData.append("startRegisDate", data.startRegisDate);
    formData.append("endRegisDate", data.endRegisDate);
    formData.append("startDateProgram", data.startDateProgram);
    formData.append("endDateProgram", data.endDateProgram);
    formData.append("startTime", data.startTime);
    formData.append("endTime", data.endTime);
    formData.append("capacity", data.capacity);
    formData.append("description", data.description);

    // FIX: Kirim array dengan benar untuk FormData
    // Backend (Express/Multer) akan mem-parse ini sebagai array
    data.benefits.forEach((benefit) => {
      formData.append("benefits", benefit);
    });
    data.terms.forEach((term) => {
      formData.append("terms", term);
    });

    // Tambahkan field kondisional
    if (data.programType === "onsite") {
      formData.append("onsiteLocationName", data.onsiteLocationName);
      formData.append("mapLat", data.mapLat);
      formData.append("mapLng", data.mapLng);
    }

    try {
      const result = await updateProgram(token, initialData.id, formData);

      toast.success("Program berhasil diperbarui!");
      onSave();
    } catch (error) {
      toast.error(error.message || "Gagal memperbarui program.");
      console.error("Error updating program:", error);
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.error("VALIDATION ERRORS:", errors);
      // Tampilkan error ke toast agar langsung terlihat
      toast.error(
        "Ada kesalahan validasi pada formulir. Silakan periksa kolom yang ditandai."
      );
    }
  }, [errors]);

  return (
    <div className="max-w-6xl mx-auto mb-10">
      <div className="bg-white shadow-md rounded-xl p-6 border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#013B35]">
            Edit Detail Program
          </h2>
          {/* cancel form */}
          <button
            onClick={handleClose}
            className="text-gray-600 hover:text-black"
          >
            <X size={24} />
          </button>
        </div>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Banner Image */}
            <div className="relative rounded-xl overflow-hidden shadow-md">
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
                      bannerImageRef.onChange(event);
                      const file = event.target.files?.[0];
                      if (file) {
                        setBannerPreview(URL.createObjectURL(file));
                      } else {
                        setBannerPreview(initialData.image_url || null); // Kembali ke gambar asli jika tidak ada file yang dipilih
                      }
                    }}
                  />
                </label>
              </div>
              {errors.bannerImage && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.bannerImage.message}
                </p>
              )}
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
                      <EditSearchMajorsProgramForm
                        value={field.value}
                        onChange={field.onChange}
                        initialMajorName={initialData.major_name}
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
                      onValueChange={(value) => {
                        field.onChange(value);
                        // Hapus field terkait ketika jenis program berubah
                        if (value === "online") {
                          setValue("onsiteLocationName", null);
                          setValue("mapLat", null);
                          setValue("mapLng", null);
                        } else {
                          // onsite
                          setValue("onlineLink", null);
                        }
                      }}
                      value={field.value}
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

              {/* Tanggal Mulai Program */}
              <ShadcnFormField
                control={control}
                name="startDateProgram"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Tanggal Pelaksanaan</FormLabel>
                    <DatePickerRHF
                      name="startDateProgram"
                      control={control}
                      placeholder="Tanggal Mulai Program"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tanggal Selesai Program */}
              <ShadcnFormField
                control={control}
                name="endDateProgram"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Tanggal Akhir Program</FormLabel>
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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kuota Peserta</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Contoh: 50"
                        {...field}
                        min="1"
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value, 10))
                        } // Pastikan tipe angka
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 2. Input Nama Tempat/Alamat (Hanya muncul jika ONSITE) */}
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
                          value={field.value || ""} // Pastikan komponen terkontrol
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
                        value={field.value}
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
                    name="mapLat" // Gunakan mapLat untuk pemicu validasi
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
                                  setNewBenefit
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

              {/* Tombol Simpan */}
              <div className="col-span-1 md:col-span-2 flex justify-end mt-4 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={handleClose}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting || isLoading}
                >
                  {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
