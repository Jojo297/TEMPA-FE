import {
  Pencil,
  Save,
  X,
  Plus,
  Trash2,
  Loader2,
  ExternalLink,
  Globe,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useEditCampusInfo from "@/hooks/hooksCampus/useEditCampusInfo";
import { toast } from "sonner";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Controller } from "react-hook-form";

// Skema validasi menggunakan Zod
const descriptionSchema = z.object({
  campusWebsite: z
    .string()
    .url("Format URL tidak valid (contoh: https://kampus.ac.id)")
    .min(1, "Website kampus wajib diisi."),
  description: z
    .string()
    .min(20, "Deskripsi harus memiliki minimal 20 karakter."),
  vision: z.string().min(10, "Visi harus memiliki minimal 10 karakter."),
  mission: z
    .array(
      z.object({
        value: z.string().min(5, "Misi harus memiliki minimal 5 karakter."),
      }),
    )
    .min(1, "Minimal harus ada 1 misi."),
});

export default function DetailCampusDescription({
  DescriptionSection,
  refetchCampusData,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem("userJwt");

  // Hook untuk edit data
  const { editCampusDescription, isLoading, error, clearState } =
    useEditCampusInfo();

  // Setup React Hook Form
  const form = useForm({
    resolver: zodResolver(descriptionSchema),
    mode: "onChange",
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "mission",
  });

  // Reset form dengan data terbaru saat mode edit diaktifkan atau data prop berubah
  useEffect(() => {
    const missionArray = (DescriptionSection.visi?.mission || []).map((m) => ({
      value: m,
    }));

    reset({
      campusWebsite: DescriptionSection.campusWebsite || "", // Tambahkan ini
      description: DescriptionSection.desc || "",
      vision: DescriptionSection.visi?.vision || "",
      mission: missionArray,
    });
  }, [DescriptionSection, reset]); // Tambahkan reset ke dependency

  const handleSave = async (data) => {
    const payload = {
      token,
      campus_website: data.campusWebsite, // Tambahkan ini (sesuaikan key dengan backend)
      description: data.description,
      vision_mission: {
        vision: data.vision,
        mission: data.mission.map((m) => m.value),
      },
    };

    try {
      // Set loading state di sini jika ada (misal: setIsLoading(true))

      await editCampusDescription(payload);
      // console.log(payload);
      toast.success("Deskripsi berhasil diperbarui!");

      if (refetchCampusData) {
        await refetchCampusData();
      }

      setIsEditing(false);
      window.scrollTo(0, 0);
    } catch (e) {
      toast.error(e.message || "Gagal menyimpan perubahan.");
      console.error(e);
    }
  };

  const handleCancel = () => {
    reset(); // Reset form defaultValues
    setIsEditing(false);
  };

  return (
    <section className="bg-white rounded-2xl shadow-md p-8 md:p-10 space-y-6 w-full mt-5">
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold text-[#013B35]">Deskripsi Kampus</h2>
        <div className="flex gap-2">
          {!isEditing ? (
            <>
              {/* button redirect */}
              <Button
                variant="outline"
                className="border-[#013B35] text-[#013B35] hover:bg-[#013B35]/5"
                onClick={() =>
                  window.open(DescriptionSection.campusWebsite || "", "_blank")
                }
              >
                <span>Lihat Website Kampus</span>
                <ExternalLink size={16} className="ml-2" />
              </Button>

              {/* button edit */}
              <Button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-[#013B35] text-white"
              >
                <Pencil size={16} /> Edit Deskripsi
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex items-center gap-2 border-red-500 text-red-500 hover:bg-red-50"
            >
              <X size={16} /> Batal Edit
            </Button>
          )}
        </div>
      </div>

      {isEditing ? (
        <form
          onSubmit={handleSubmit(handleSave)}
          className="space-y-6 bg-gray-50/50 p-6 rounded-xl border border-dashed border-gray-300"
        >
          {/* input website */}
          <div className="space-y-2">
            <label className="font-semibold text-lg flex items-center gap-2">
              <Globe size={18} className="text-[#013B35]" /> URL Website Kampus
            </label>
            <Input
              {...register("campusWebsite")}
              placeholder="https://contohkampus.ac.id"
              className="bg-white"
            />

            {errors.campusWebsite && (
              <p className="text-sm text-red-500">
                {errors.campusWebsite.message}
              </p>
            )}
          </div>

          {/* input description */}
          <div className="space-y-2">
            <label className="font-semibold text-lg mb-2">
              Deskripsi Kampus
            </label>

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <ReactQuill
                  {...field}
                  theme="snow"
                  placeholder="Tulis deskripsi tentang kampus Anda..."
                  onChange={(content) => field.onChange(content)}
                  className={`bg-white ${errors.description ? "border-red-500" : ""}`}
                />
              )}
            />

            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Visi</h3>
            <Textarea
              {...register("vision")}
              className="w-full"
              rows={3}
              placeholder="Tuliskan visi kampus..."
            />
            {errors.vision && (
              <p className="text-sm text-red-500">{errors.vision.message}</p>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Misi</h3>
            <div className="space-y-2">
              {fields.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    {...register(`mission.${index}.value`)}
                    className="flex-grow"
                    placeholder={`Misi #${index + 1}`}
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
              {errors.mission && (
                <p className="text-sm text-red-500">
                  {errors.mission.root?.message || errors.mission.message}
                </p>
              )}
              <Button
                type="button"
                variant="outline"
                onClick={() => append({ value: "" })}
                className="mt-2"
              >
                <Plus size={16} className="mr-2" /> Tambah Misi
              </Button>
            </div>
            {isEditing && (
              <div className="flex justify-end">
                <Button
                  type="submit"
                  onClick={handleSubmit(handleSave)}
                  disabled={isLoading}
                  className="flex  items-center gap-2 bg-[#013B35] text-white disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Save size={16} />
                  )}
                  {isLoading ? "Menyimpan..." : "Simpan"}
                </Button>
              </div>
            )}
          </div>
        </form>
      ) : (
        <>
          <div className="text-gray-700 mt-4 w-full overflow-hidden break-words">
            <div
              className="whitespace-pre-wrap 
             [&_ol]:list-decimal [&_ol]:ml-5 
             [&_ul]:list-disc [&_ul]:ml-5 
             [&_li]:mb-1
             [&_p]:mb-4 
             [&_a]:text-blue-600 [&_a]:underline"
              dangerouslySetInnerHTML={{
                __html:
                  DescriptionSection.desc || "Deskripsi belum ditambahkan.",
              }}
            />
          </div>
          <div className="mt-6">
            <h3 className="font-semibold text-lg">Visi</h3>
            <p className="text-gray-700 mt-2">
              {DescriptionSection.visi?.vision || "Visi belum ditambahkan."}
            </p>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold text-lg">Misi</h3>
            {DescriptionSection.visi?.mission &&
            DescriptionSection.visi.mission.length > 0 ? (
              <ul className="list-disc list-inside mt-2 text-gray-700">
                {DescriptionSection.visi.mission.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 mt-2">Misi belum ditambahkan.</p>
            )}
          </div>
        </>
      )}
    </section>
  );
}
