import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import useAddMateri from "@/hooks/hooksMentor/useAddMateri";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const materiSchema = z
  .object({
    title: z.string().min(1, "Judul harus diisi"),
    description: z.string().min(1, "Deskripsi harus diisi"),
    visibility: z.enum(["public", "private"]),
    type: z.enum(["file", "kuis", "video"]),
    url: z.string().optional(),
    file: z.any().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === "file") {
      const fileList = data.file;

      if (!(fileList instanceof FileList) || fileList.length === 0) {
        return ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "File harus diunggah",
          path: ["file"],
        });
      }

      const file = fileList[0];
      const extension = file.name.split(".").pop().toLowerCase();
      const allowedExtensions = ["pdf", "docx", "xlsx", "xls", "pptx", "ppt"];
      const maxFileSize = 30 * 1024 * 1024;

      if (!allowedExtensions.includes(extension)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Hanya file .pdf, .docx, .xlsx, .xls, .pptx, dan .ppt",
          path: ["file"],
        });
      }

      if (file.size > maxFileSize) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Ukuran file maksimal 30MB",
          path: ["file"],
        });
      }
    }

    if (["kuis", "video"].includes(data.type)) {
      if (!data.url) {
        return ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Link harus diisi",
          path: ["url"],
        });
      }

      if (!z.string().url().safeParse(data.url).success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Format link tidak valid",
          path: ["url"],
        });
      }
    }
  });

export default function MentorAddMateriProgram({
  onCancel,
  onSubmitSuccess,
  idProgram,
}) {
  const form = useForm({
    resolver: zodResolver(materiSchema),
    defaultValues: {
      title: "",
      description: "",
      visibility: "public",
      type: "file",
      url: "",
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    resetField,
    setValue,
    formState: { errors },
  } = form;
  const selectedType = watch("type");
  const selectedFile = watch("file");
  const [previewUrl, setPreviewUrl] = useState(null);

  // DEBUG: Lacak perubahan pada selectedFile
  console.log("Watched File State:", selectedFile);

  const { addMateri, isLoading, error, isSuccess, resetState } = useAddMateri();

  useEffect(() => {
    if (selectedFile && selectedFile.length > 0) {
      const file = selectedFile[0];
      const url = URL.createObjectURL(file);
      // DEBUG: Pastikan URL preview berhasil dibuat
      console.log("Preview URL created:", url);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedFile]);

  const onSubmit = async (data) => {
    // Cukup kirim objek `data` mentah dari form.
    // Hook `useAddMateri` akan menanganinya menjadi FormData.
    console.log("Submitting raw data:", data);

    try {
      const token = localStorage.getItem("userJwt");
      const response = await addMateri(token, idProgram, data);
      toast.success("Materi berhasil ditambahkan!");
      onCancel();
      form.reset();

      resetState();
      onSubmitSuccess();
    } catch (error) {
      console.error("Error adding materi:", error);
      toast.error(
        error?.response?.data?.message || "Gagal menambahkan materi!",
      );
      resetState();
    }
  };

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Judul</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan judul materi" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deskripsi</FormLabel>
                <FormControl>
                  <ReactQuill
                    theme="snow"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="visibility"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Visibilitas</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih visibilitas" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipe Materi</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    if (value === "file") {
                      resetField("url");
                    } else {
                      resetField("file");
                    }
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tipe materi" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="file">File</SelectItem>
                    <SelectItem value="kuis">Kuis</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {selectedType === "file" ? (
            <FormField
              control={control}
              name="file"
              render={({ field: { onChange, onBlur, name, ref } }) => (
                <FormItem>
                  <FormLabel>Upload File</FormLabel>
                  <FormControl>
                    <input
                      type="file"
                      accept=".pdf,.docx,.xlsx,.xls,.pptx,.ppt"
                      onChange={(e) => {
                        setValue("file", e.target.files, {
                          shouldValidate: true,
                        });
                      }}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    />
                  </FormControl>
                  <FormMessage />
                  {selectedFile && selectedFile.length > 0 && previewUrl && (
                    <div className="mt-2 border rounded-md p-3 bg-gray-50 relative">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6 text-gray-400 hover:text-red-500"
                        onClick={() => resetField("file")}
                      >
                        <X size={16} />
                      </Button>
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Preview File:
                      </p>
                      <div className="flex items-center gap-3">
                        {selectedFile[0].type.startsWith("image/") ? (
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="h-16 w-16 object-cover rounded-md border"
                          />
                        ) : (
                          <div className="h-16 w-16 flex items-center justify-center bg-gray-200 rounded-md border text-gray-500 text-xs font-bold uppercase">
                            {selectedFile[0].name.split(".").pop()}
                          </div>
                        )}
                        <div className="flex-1 overflow-hidden">
                          <p
                            className="text-sm font-medium truncate"
                            title={selectedFile[0].name}
                          >
                            {selectedFile[0].name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(selectedFile[0].size / 1024 / 1024).toFixed(2)} MB
                          </p>
                          <a
                            href={previewUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Lihat File
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </FormItem>
              )}
            />
          ) : (
            <FormField
              control={control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Link {selectedType === "kuis" ? "Kuis" : "Video"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`Masukkan link ${selectedType}`}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {selectedType === "kuis"
                      ? "Anda dapat memasukkan link dari Google Form, Quizizz, dll."
                      : "Anda dapat memasukkan link dari YouTube, Cloud Storage, dll."}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className="flex justify-end gap-3 mt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Batal
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
