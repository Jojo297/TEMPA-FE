import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import {
  ChevronDown,
  Pencil,
  FileText,
  Plus,
  ClipboardList,
  Video,
  Settings,
  Trash2,
  Check,
  X,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NotFounPages from "./NotFoundPages";
import { Button } from "@/components/ui/button";
import AddMateri from "./AddMateri";
import useEditMateri from "@/hooks/hooksCampus/useEditMateri";
import { toast } from "sonner";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

/* ========================== COMPONENT INFO ========================== */
function Info({ label, value }) {
  return (
    <div>
      <p className="font-medium text-gray-600">{label}</p>
      <p className="text-gray-900">{value || "-"}</p>
    </div>
  );
}

const editSchema = z.object({
  title: z.string().min(1, "Judul harus diisi"),
  description: z.string().min(1, "Deskripsi harus diisi"),
});

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
          Tambah Resource
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Resource</DialogTitle>
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
              <Button type="submit">Simpan</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default function MateriProgramCampus({
  materiList,
  idProgram,
  onUpdateSuccess,
}) {
  console.log(materiList);
  // Fungsi utilitas untuk mendapatkan nama file dari URL
  const getFileNameFromUrl = (url) => {
    if (!url) return "File tidak tersedia";

    // 1. Dapatkan bagian path URL (setelah domain)
    // Contoh: /public/program_materi/Materi-1.pdf
    const pathname = new URL(url).pathname;
    // console.log(materiList);

    // 2. Pisahkan path berdasarkan karakter slash (/)
    const parts = pathname.split("/");

    // 3. Ambil elemen terakhir dari array (nama file)
    return parts[parts.length - 1];
  };

  const [isAddingMateri, setIsAddingMateri] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [tempResources, setTempResources] = useState([]);
  const { editMateri, isLoading: isEditing } = useEditMateri();

  const form = useForm({
    resolver: zodResolver(editSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const handleSaveEdit = async (data, item) => {
    try {
      const token = localStorage.getItem("userJwt");
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("visibility", item.visibility || "public");
      formData.append("_method", "PUT");

      // Mengirim SEMUA resource (baik lama maupun baru) ke dalam array 'new_resources'
      // Ini memastikan resource lama (URL) dan resource baru (File) terkirim semua.
      tempResources.forEach((resource, index) => {
        formData.append(`new_resources[${index}][type]`, resource.type);

        // Hanya kirim sebagai 'file' jika tipe-nya file DAN benar-benar ada file baru (instance of File)
        if (resource.type === "file" && resource.file instanceof File) {
          formData.append(`new_resources[${index}][file]`, resource.file);
        } else {
          formData.append(
            `new_resources[${index}][url]`,
            resource.resource_url
          );
        }
      });

      // --- LOGGING UNTUK DEBUGGING ---
      console.group("Submit Edit Materi");
      console.log("Data Form:", data);
      console.log("Item Asli:", item);
      console.log("Semua Resource (State):", tempResources);
      console.log(">> Isi FormData Lengkap:", [...formData.entries()]);
      console.groupEnd();

      await editMateri(token, item.id, formData);

      toast.success("Materi berhasil diperbarui");
      onUpdateSuccess();
      setEditingId(null);
      setTempResources([]);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Gagal memperbarui materi");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mb-10">
      <div className="bg-white shadow-md rounded-xl p-6 border">
        <div className="flex justify-between items-center mb-4">
          {isAddingMateri ? (
            <h2 className="text-xl font-semibold text-[#013B35]">
              Tambah Materi Baru
            </h2>
          ) : (
            <h2 className="text-xl font-semibold text-[#013B35]">Materi</h2>
          )}

          {!isAddingMateri && (
            <Button
              onClick={() => setIsAddingMateri(true)}
              className="flex items-center gap-2 bg-[#013B35] text-white"
            >
              <Plus size={18} />
              Tambahkan Materi
            </Button>
          )}
        </div>

        <div className="w-full gap-4">
          {isAddingMateri ? (
            <AddMateri
              onCancel={() => setIsAddingMateri(false)}
              idProgram={idProgram}
              onSubmitSuccess={onUpdateSuccess}
            />
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {/* Accordion Materi */}
              {materiList.length <= 0 ? (
                <NotFounPages message={"Materi Belum Ditambahkan"} />
              ) : (
                materiList.map((item) => {
                  let kuisCount = 0;
                  let videoCount = 0;
                  const isEditing = editingId === item.id;
                  const resourcesToRender = isEditing
                    ? tempResources
                    : item.materi_resource || [];

                  // Logika untuk memeriksa apakah ada perubahan
                  let hasChanges = false;
                  if (isEditing) {
                    const { isDirty } = form.formState;
                    const originalResources = item.materi_resource || [];
                    const newResourcesAdded = tempResources.some(
                      (r) => r.isNew
                    );
                    const oldResourcesKeptCount = tempResources.filter(
                      (r) => !r.isNew
                    ).length;
                    const resourcesRemoved =
                      oldResourcesKeptCount < originalResources.length;
                    const resourcesChanged =
                      newResourcesAdded || resourcesRemoved;
                    hasChanges = isDirty || resourcesChanged;
                  }

                  return (
                    <AccordionItem
                      key={item.id}
                      value={`materi-${item.id}`}
                      className="border-b-0 p-4 rounded-lg bg-white shadow-md mb-3"
                    >
                      <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline flex items-center justify-between">
                        <div className="flex items-center flex-1">
                          <ChevronDown className="w-5 h-5 mr-3 transition-transform duration-300 data-[state=open]:rotate-180" />
                          {isEditing ? (
                            <Input
                              {...form.register("title")}
                              onClick={(e) => e.stopPropagation()}
                              className={`max-w-md h-9 mr-4 ${
                                form.formState.errors.title
                                  ? "border-red-500 focus-visible:ring-red-500"
                                  : ""
                              }`}
                            />
                          ) : (
                            item.title
                          )}
                        </div>
                        {isEditing ? (
                          <div className="flex items-center gap-2 mr-2">
                            {/* Button edit */}
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  disabled={!hasChanges}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    form.handleSubmit((data) =>
                                      handleSaveEdit(data, item)
                                    )(e);
                                  }}
                                  alt="Simpan"
                                  className="text-green-600 bg-green-50 hover:bg-green-100 h-8 w-8 p-0 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  <Check size={16} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="bg-secondary text-white">
                                <p>Simpan Perubahan</p>
                              </TooltipContent>
                            </Tooltip>

                            {/* Button Close edit */}
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setEditingId(null);
                                    setTempResources([]);
                                    form.reset();
                                  }}
                                  className="text-red-600 bg-red-50 hover:bg-red-100 h-8 w-8 p-0"
                                >
                                  <X size={16} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="text-red-600 bg-red-50">
                                <p>Batalkan Perubahan</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        ) : (
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingId(item.id);
                              setTempResources(item.materi_resource || []);
                              form.reset({
                                title: item.title,
                                description: item.description,
                              });
                            }}
                            className="text-blue-500 bg-transparent shadow-none hover:bg-blue-100 hover:text-blue-600"
                          >
                            <Pencil />
                          </Button>
                        )}

                        {!isEditing && (
                          <div
                            className="flex justify-end mr-4"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Button className="text-red-500 bg-transparent shadow-none hover:bg-red-100 hover:text-red-600">
                              <Trash2 />
                            </Button>
                          </div>
                        )}
                      </AccordionTrigger>

                      <AccordionContent className="pt-2 pl-8 space-y-2">
                        {/* deskripsi */}
                        <div className="py-3 text-gray-700">
                          {isEditing ? (
                            <textarea
                              {...form.register("description")}
                              onClick={(e) => e.stopPropagation()}
                              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                form.formState.errors.description
                                  ? "border-red-500 focus:ring-red-500"
                                  : ""
                              }`}
                              rows={3}
                            />
                          ) : (
                            item.description
                          )}
                        </div>
                        <hr />
                        {/* end deskripsi */}

                        {/* Tautan File/Resource (Nested Mapping) */}
                        {resourcesToRender && resourcesToRender.length > 0 ? (
                          resourcesToRender.map((resource, index) => {
                            // --- 1. Definisikan Ikon dan Warna secara Kondisional ---
                            let IconComponent = FileText;
                            let iconClassName = "text-green-600"; // Default untuk 'file' atau lainnya

                            if (resource.type === "kuis") {
                              IconComponent = ClipboardList;
                              iconClassName = "text-orange-500"; // Warna untuk Kuis
                            } else if (resource.type === "video") {
                              IconComponent = Video;
                              iconClassName = "text-red-500"; // Contoh warna untuk Video
                            }
                            // Anda bisa menambahkan logika lain (e.g., 'file' untuk PDF/DOCX)

                            // --- 2. Definisikan Teks Tautan ---
                            let linkText;
                            let isButton = false;

                            if (resource.type === "kuis") {
                              kuisCount++;
                              // Untuk Kuis/Link Google Form, tampilkan Judul Materi, bukan nama file yang diekstrak
                              linkText = item.title || "Mulai Kuis";
                              linkText = `Mulai Kuis ${kuisCount}`;
                              isButton = true;
                            } else if (resource.type === "video") {
                              linkText = "Lihat Video";
                              videoCount++;
                              linkText = `Lihat Video ${videoCount}`;
                              isButton = true;
                            } else {
                              // Untuk File, gunakan nama file yang diekstrak
                              if (resource.file && resource.file.name) {
                                linkText = resource.file.name;
                              } else {
                                linkText = getFileNameFromUrl(
                                  resource.resource_url
                                );
                              }
                            }

                            return (
                              <div
                                key={index}
                                className="flex items-center text-gray-600 mt-3"
                              >
                                {isButton ? (
                                  <Button
                                    asChild
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center gap-2 bg-primary hover:bg-primary hover:text-white transition hover:opacity-60 text-white"
                                  >
                                    <a
                                      target="_blank"
                                      href={resource.resource_url}
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2"
                                    >
                                      {/* 3. Render Komponen Ikon yang dipilih */}
                                      <IconComponent
                                        className={`w-5 h-5 ${iconClassName}`}
                                      />
                                      {linkText}
                                    </a>
                                  </Button>
                                ) : (
                                  <>
                                    <IconComponent
                                      className={`w-5 h-5 mr-3 ${iconClassName}`}
                                    />
                                    <a
                                      target="_blank"
                                      href={resource.resource_url}
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:underline break-all"
                                    >
                                      {linkText}
                                    </a>
                                  </>
                                )}
                                {isEditing && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 ml-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setTempResources((prev) =>
                                        prev.filter((_, i) => i !== index)
                                      );
                                    }}
                                  >
                                    <X size={14} />
                                  </Button>
                                )}
                              </div>
                            );
                          })
                        ) : (
                          <div className="text-gray-500 mt-3 italic">
                            Tidak ada sumber daya yang tersedia.
                          </div>
                        )}
                        {isEditing && (
                          <AddResourceDialog
                            onAddResource={(newResource) => {
                              setTempResources((prev) => [
                                ...prev,
                                newResource,
                              ]);
                            }}
                          />
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })
              )}
              {/* end Accordion Materi */}
            </Accordion>
          )}
        </div>
      </div>
    </div>
  );
}
