import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./ui/button";
import { Plus, X } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";

const resourceSchema = z
  .object({
    type: z.enum(["file", "kuis", "video"]),
    url: z.string().optional(),
    file: z.any().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === "file") {
      if (!data.file || data.file.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "File harus diunggah",
          path: ["file"],
        });
      } else {
        const file = data.file[0];
        const extension = file.name.split(".").pop().toLowerCase();
        const allowedExtensions = ["pdf", "docx", "xlsx", "xls", "pptx", "ppt"];
        const maxFileSize = 30 * 1024 * 1024; // 30MB

        if (!allowedExtensions.includes(extension)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "Hanya file .pdf, .docx, .xlsx, .xls, .pptx, dan .ppt yang diperbolehkan",
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
    } else if (["kuis", "video"].includes(data.type)) {
      if (!data.url) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Link harus diisi",
          path: ["url"],
        });
      } else if (!z.string().url().safeParse(data.url).success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Format link tidak valid",
          path: ["url"],
        });
      }
    }
  });

function AddResourceDialog({ onAddResource }) {
  const [open, setOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const form = useForm({
    resolver: zodResolver(resourceSchema),
    defaultValues: {
      type: "file",
      url: "",
    },
  });

  const { control, handleSubmit, watch, resetField, reset } = form;
  const selectedType = watch("type");
  const selectedFile = watch("file");

  useEffect(() => {
    if (selectedFile && selectedFile.length > 0) {
      const file = selectedFile[0];
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedFile]);

  const onSubmit = (data) => {
    let processedFile = null;

    if (data.type === "file" && data.file && data.file.length > 0) {
      const originalFile = data.file[0];
      // Ganti spasi dengan tanda hubung (-) pada nama file
      const newFileName = originalFile.name.replace(/\s+/g, "-");
      processedFile = new File([originalFile], newFileName, {
        type: originalFile.type,
        lastModified: originalFile.lastModified,
      });
    }

    const newResource = {
      id: `temp-${Date.now()}`,
      type: data.type,
      resource_url: data.type === "file" ? previewUrl || "" : data.url,
      file: processedFile,
      isNew: true,
    };
    onAddResource(newResource);
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="mt-3 flex items-center gap-2 text-[#013B35] border-[#013B35] hover:bg-[#013B35]/10"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
        >
          <Plus size={16} />
          Tambahkan Materi
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Materi</DialogTitle>
          <DialogDescription>
            Tambahkan file, kuis, atau video baru.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
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
                      <SelectTrigger className="max-w-96">
                        <SelectValue
                          placeholder="Pilih tipe materi"
                          className="max-w-96"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-w-96">
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
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Upload File</FormLabel>
                    <FormControl>
                      <Input
                        {...fieldProps}
                        value={undefined}
                        type="file"
                        accept=".pdf,.docx,.xlsx,.xls,.pptx,.ppt"
                        className="w-full min-w-0 max-w-96"
                        onChange={(event) => {
                          onChange(event.target.files); // ✅ INI SUDAH BENAR!
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                    {selectedFile && selectedFile.length > 0 && previewUrl && (
                      <div className="mt-2 border max-w-96 rounded-md p-3 bg-gray-50 relative overflow-hidden">
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
                          <div className="flex-1 min-w-0 overflow-hidden">
                            <p
                              className="text-sm font-medium w-full truncate"
                              title={selectedFile[0].name}
                            >
                              {selectedFile[0].name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {(selectedFile[0].size / 1024 / 1024).toFixed(2)}{" "}
                              MB
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

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Batal
              </Button>
              <Button type="submit">Tambahkan</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddResourceDialog;
