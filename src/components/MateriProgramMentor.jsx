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

import NotFounPages from "./NotFoundPages";
import { Button } from "@/components/ui/button";
import AddMateri from "./AddMateri";
import useEditMateri from "@/hooks/hooksMentor/useEditMateri";
import { toast } from "sonner";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Spinner } from "./ui/spinner";
import DeleteMateriDialog from "./DeleteMateriDialog";
import AddResourceDialog from "./AddResourceDialog";
import MentorAddMateriProgram from "./MentorAddMateriProgram";
import MentorDeleteMateriDialog from "./MentorDeleteMateriDialog";

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

export default function MateriProgramMentor({
  materiList,
  idProgram,
  onUpdateSuccess,
}) {
  // get name file
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
  const token = localStorage.getItem("userJwt");
  const [isAddingMateri, setIsAddingMateri] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [tempResources, setTempResources] = useState([]);
  const { editMateri, isLoading } = useEditMateri();

  const form = useForm({
    resolver: zodResolver(editSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  // handle edit materi
  const handleSaveEdit = async (data, item) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("visibility", item.visibility || "public");
      formData.append("_method", "PUT");

      tempResources.forEach((resource, index) => {
        formData.append(`new_resources[${index}][type]`, resource.type);

        if (resource.type === "file" && resource.file instanceof File) {
          formData.append(`new_resources[${index}][file]`, resource.file);
        } else {
          formData.append(
            `new_resources[${index}][url]`,
            resource.resource_url
          );
        }
      });

      // --- DEBUGGING ---
      // console.group("Submit Edit Materi");
      // console.log("Data Form:", data);
      // console.log("Item Asli:", item);
      // console.log("Semua Resource (State):", tempResources);
      // console.log(">> Isi FormData Lengkap:", [...formData.entries()]);
      // console.groupEnd();

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
        <div className="flex justify-between items-center mb-4 mt-4">
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
            <MentorAddMateriProgram
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
                          // Button Close edit
                          <div className="flex items-center gap-2 mr-2">
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
                          // button change component to edit
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
                        {/* button delete materi */}
                        {!isEditing && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="mr-4"
                          >
                            <MentorDeleteMateriDialog
                              idMateri={item.id}
                              materiName={item.title}
                              onDeleteSuccess={onUpdateSuccess}
                              token={token}
                            />
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

                        {/* materi */}
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
                                  // delete materi (file/video/kuis)
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
                            Materi belum ditambahkan.
                          </div>
                        )}
                        {isEditing && (
                          // button add resource dialog
                          <div className="flex justify-between">
                            <AddResourceDialog
                              onAddResource={(newResource) => {
                                setTempResources((prev) => [
                                  ...prev,
                                  newResource,
                                ]);
                              }}
                            />
                            {/* Button submit edit */}

                            <Button
                              disabled={!hasChanges}
                              onClick={(e) => {
                                e.stopPropagation();
                                form.handleSubmit((data) =>
                                  handleSaveEdit(data, item)
                                )(e);
                              }}
                              alt="Simpan"
                              className="text-green-600 bg-green-50 mr-4 hover:bg-green-100 px-3 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {isLoading ? (
                                <div className="flex items-center gap-2">
                                  <Spinner />
                                  Menyimpan...
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <Check size={16} />
                                  Simpan
                                </div>
                              )}
                            </Button>
                          </div>
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
