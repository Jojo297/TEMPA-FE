import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { X, Pencil, Plus, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import useUpdateStandardMajor from "@/hooks/hooksAdmin/useUpdateStandardMajor";
import { useNavigate } from "react-router";

// Zod Schema
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const majorSchema = z.object({
  major_name: z.string().min(3, "Nama jurusan minimal 3 karakter."),
  description: z.string().min(20, "Deskripsi minimal 20 karakter."),
  prospek_kerja: z
    .array(z.string().min(1, "Prospek kerja tidak boleh kosong."))
    .min(1, "Minimal harus ada 1 prospek kerja."),
  logo: z
    .any()
    .optional()
    .refine(
      (files) =>
        !files || files.length === 0 || files?.[0]?.size <= MAX_FILE_SIZE,
      `Ukuran logo maksimal 5MB.`
    )
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Format logo yang didukung: .jpg, .jpeg, .png, .webp."
    ),
  banner: z
    .any()
    .optional()
    .refine(
      (files) =>
        !files || files.length === 0 || files?.[0]?.size <= MAX_FILE_SIZE,
      `Ukuran banner maksimal 2MB.`
    )
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Format banner yang didukung: .jpg, .jpeg, .png, .webp."
    ),
});

export default function MajorEditForm({ initialData, onClose, onSave }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("userJwt");
  const { isLoading, updateMajor } = useUpdateStandardMajor();
  const [newProspect, setNewProspect] = useState("");
  const [logoPreview, setLogoPreview] = useState(initialData.logo_url || null);
  const [bannerPreview, setBannerPreview] = useState(
    initialData.banner_url || null
  );

  const form = useForm({
    resolver: zodResolver(majorSchema),
    defaultValues: {
      major_name: initialData.major_name || "",
      description: initialData.description || "",
      prospek_kerja: Array.isArray(initialData.prospek_kerja)
        ? initialData.prospek_kerja
        : typeof initialData.prospek_kerja === "string"
        ? [initialData.prospek_kerja]
        : [],
      logo: undefined,
      banner: undefined,
    },
  });

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = form;

  const prospects = watch("prospek_kerja");

  const handleAddProspect = () => {
    if (newProspect.trim()) {
      setValue("prospek_kerja", [...prospects, newProspect.trim()], {
        shouldValidate: true,
      });
      setNewProspect("");
    }
  };

  const handleRemoveProspect = (index) => {
    const updatedProspects = prospects.filter((_, i) => i !== index);
    setValue("prospek_kerja", updatedProspects, { shouldValidate: true });
  };

  const handleClose = () => {
    if (isDirty) {
      if (
        window.confirm(
          "Anda memiliki perubahan yang belum disimpan. Yakin ingin keluar?"
        )
      ) {
        onClose();
      }
    } else {
      navigate(-1);
    }
  };

  const onSubmit = async (data) => {
    // console.log(data);
    const formData = new FormData();
    formData.append("major_name", data.major_name);
    formData.append("description", data.description);
    data.prospek_kerja.forEach((p) => formData.append("prospek_kerja", p));

    if (data.logo && data.logo.length > 0) {
      formData.append("logo", data.logo[0]);
    }
    if (data.banner && data.banner.length > 0) {
      formData.append("banner", data.banner[0]);
    }

    const result = await updateMajor(token, initialData.id, formData);

    if (result.success) {
      toast.success(result.message || "Jurusan berhasil diperbarui!");
      onSave();
    } else {
      toast.error(result.error || "Gagal memperbarui jurusan.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 border">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-[#013B35]">
          {initialData.description === null ||
          initialData.prospek_kerja === null ||
          initialData.banner_url === null
            ? "Tambahkan Detail Jurusan"
            : "Ubah Jurusan"}
        </h2>
        <button
          onClick={handleClose}
          className="text-gray-600 hover:text-black"
        >
          <X size={24} />
        </button>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Banner and Logo */}
          <div className="space-y-4">
            {/* banner */}
            <FormField
              control={control}
              name="banner"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Banner Jurusan</FormLabel>
                  <FormControl>
                    <div className="relative rounded-xl overflow-hidden shadow-md">
                      <div className="relative">
                        <img
                          src={
                            bannerPreview ||
                            "https://placehold.co/1200x400/E2E8F0/E2E8F0"
                          }
                          alt="Banner Preview"
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
                            accept="image/*"
                            {...fieldProps}
                            onChange={(e) => {
                              onChange(e.target.files);
                              const file = e.target.files?.[0];
                              if (file) {
                                setBannerPreview(URL.createObjectURL(file));
                              } else {
                                setBannerPreview(
                                  initialData.banner_url || null
                                );
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* logo */}
            {/* <FormField
              control={control}
              name="logo"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Logo Jurusan</FormLabel>
                  <FormControl>
                    <div className="mt-2 relative h-32 w-32 rounded-full border border-dashed border-gray-300 flex items-center justify-center">
                      {logoPreview ? (
                        <img
                          src={logoPreview}
                          alt="Logo Preview"
                          className="h-full w-full object-cover rounded-full"
                        />
                      ) : (
                        <div className="text-center text-gray-500 text-sm">
                          <p>Tidak ada logo</p>
                        </div>
                      )}
                      <label
                        htmlFor="logo-upload"
                        className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer rounded-full"
                      >
                        <div className="text-white flex items-center gap-2 bg-black/50 px-3 py-1 rounded-md text-xs">
                          <Pencil size={14} /> Ganti
                        </div>
                        <Input
                          id="logo-upload"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          {...fieldProps}
                          onChange={(e) => {
                            onChange(e.target.files);
                            const file = e.target.files?.[0];
                            setLogoPreview(
                              file
                                ? URL.createObjectURL(file)
                                : initialData.logo_url
                            );
                          }}
                        />
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>

          {/* Major Name */}
          <FormField
            control={control}
            name="major_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Jurusan</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan nama jurusan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deskripsi</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Jelaskan tentang jurusan ini"
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Job Prospects */}
          <FormField
            control={control}
            name="prospek_kerja"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prospek Kerja</FormLabel>
                <div className="space-y-3">
                  {prospects.length > 0 && (
                    <div className="space-y-2 p-3 border rounded-lg bg-gray-50">
                      {prospects.map((prospect, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <p className="text-sm">{prospect}</p>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-red-500 hover:bg-red-100"
                            onClick={() => handleRemoveProspect(index)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Contoh: Web Developer"
                      value={newProspect}
                      onChange={(e) => setNewProspect(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddProspect();
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={handleAddProspect}
                      disabled={!newProspect.trim()}
                    >
                      <Plus size={16} className="mr-2" /> Tambah
                    </Button>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Batal
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
