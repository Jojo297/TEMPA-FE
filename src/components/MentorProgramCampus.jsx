import useGetDetailProgram from "@/hooks/hooksCampus/useGetDetailProgram";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table";
import { getColumns } from "@/components/columns";
import { Pencil, Plus, Trash2, Check, ChevronsUpDown } from "lucide-react";
import NotFounPages from "./NotFoundPages";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useGetAllMentors from "@/hooks/hooksCampus/useGetAllMentors";
import useUpdateProgramMentors from "@/hooks/hooksCampus/useUpdateProgramMentors";
import { toast } from "sonner";
import axios from "axios";
import { useParams } from "react-router-dom";

/* ========================== COMPONENT INFO ========================== */
function Info({ label, value }) {
  return (
    <div>
      <p className="font-medium text-gray-600">{label}</p>
      <p className="text-gray-900">{value || "-"}</p>
    </div>
  );
}

const addMentorsFormSchema = z.object({
  mentorsToAdd: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
        nik: z.any(),
      })
    )
    .min(1, "Minimal harus ada 1 mentor yang ditambahkan."),
});

export default function MentorProgramCampus({
  mentorList,
  onRemoveMentor,
  onUpdateSuccess,
}) {
  console.log(mentorList);
  const { id } = useParams();
  const idProgram = parseInt(id);
  const token = localStorage.getItem("userJwt");

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [openCombobox, setOpenCombobox] = useState(false);
  const [selectedMentorIdFromCombobox, setSelectedMentorIdFromCombobox] =
    useState("");

  const { mentors: allMentors, fetchMentors } = useGetAllMentors();
  const { updateProgramMentors, isLoading: isUpdatingMentors } =
    useUpdateProgramMentors();

  useEffect(() => {
    if (token) {
      fetchMentors(token);
    }
  }, [token, fetchMentors]);

  const form = useForm({
    resolver: zodResolver(addMentorsFormSchema),
    defaultValues: {
      mentorsToAdd: [],
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  const mentorsToAdd = watch("mentorsToAdd");

  useEffect(() => {
    if (isDialogOpen) {
      // Pre-populate the form with existing mentors from the program
      const initialMentors =
        mentorList?.map((mentor) => ({
          id: mentor.mentor_id,
          name: mentor.name,
          nik: mentor.nik,
        })) || [];
      reset({ mentorsToAdd: initialMentors });
    } else {
      reset({ mentorsToAdd: [] });
    }
  }, [isDialogOpen, mentorList, reset]);

  const handleAddMentorToList = () => {
    if (!selectedMentorIdFromCombobox) {
      toast.error("Pilih mentor terlebih dahulu.");
      return;
    }

    const mentorToAdd = allMentors.find(
      (item) => item.id === parseInt(selectedMentorIdFromCombobox)
    );

    if (mentorToAdd) {
      const isAlreadyAdded = mentorsToAdd.some((m) => m.id === mentorToAdd.id);

      if (isAlreadyAdded) {
        toast.warning("Mentor ini sudah ada dalam daftar.");
        return;
      }

      const newMentorsList = [
        ...mentorsToAdd,
        {
          id: mentorToAdd.id,
          name: mentorToAdd.name,
          nik: mentorToAdd.nik,
        },
      ];
      setValue("mentorsToAdd", newMentorsList, { shouldValidate: true });
      setSelectedMentorIdFromCombobox("");
      setOpenCombobox(false);
    } else {
      toast.error("Mentor tidak ditemukan.");
    }
  };

  const handleRemoveMentorFromList = (idToRemove) => {
    const newMentorsList = mentorsToAdd.filter((m) => m.id !== idToRemove);
    setValue("mentorsToAdd", newMentorsList, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    // Backend mengharapkan array objek mentor, data.mentorsToAdd sudah dalam format yang benar.
    try {
      const result = await updateProgramMentors(
        token,
        idProgram,
        data.mentorsToAdd
      );
      toast.success(result.message || "Daftar mentor berhasil diperbarui!");
      setIsDialogOpen(false); // Tutup dialog setelah berhasil
      onUpdateSuccess(); // Panggil fungsi refetch dari komponen induk
    } catch (error) {
      toast.error(error.message || "Gagal memperbarui mentor.");
    }
  };

  // Filter mentor yang tersedia (belum ada di program dan belum dipilih)
  const availableMentorsForAdding = allMentors.filter((mentor) => {
    // Hanya tampilkan mentor yang belum ada di daftar 'mentorsToAdd'
    const isInCurrentList = mentorsToAdd.some((m) => m.id === mentor.id);
    return !isInCurrentList;
  });

  const columns = getColumns(
    onRemoveMentor, // Gunakan fungsi dari props
    () => {},
    false
  );

  return (
    <div className="max-w-6xl mx-auto mb-10">
      <div className="bg-white shadow-md rounded-xl p-6 border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#013B35]">Mentor</h2>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-[#013B35] text-white">
                {mentorList && mentorList.length > 0 ? (
                  <Pencil size={18} />
                ) : (
                  <Plus size={18} />
                )}
                {mentorList && mentorList.length > 0
                  ? "Edit Mentor"
                  : "Tambah Mentor"}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleSubmit(onSubmit)}>
                <DialogHeader>
                  <DialogTitle>
                    {mentorList && mentorList.length > 0
                      ? "Edit Mentor Program"
                      : "Tambah Mentor ke Program"}
                  </DialogTitle>
                  <DialogDescription>
                    {mentorList && mentorList.length > 0
                      ? "Tambah atau hapus mentor dari program ini."
                      : "Pilih mentor yang ingin ditambahkan ke program ini."}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-3">
                    <Label htmlFor="mentor-select">Pilih Mentor</Label>
                    <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                      <div className="flex gap-2">
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openCombobox}
                            className="flex-grow justify-between"
                          >
                            {selectedMentorIdFromCombobox
                              ? allMentors.find(
                                  (item) =>
                                    item.id ===
                                    parseInt(selectedMentorIdFromCombobox)
                                )?.name
                              : "Pilih Mentor..."}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <Button
                          variant="default"
                          size="icon"
                          type="button"
                          onClick={handleAddMentorToList}
                          disabled={!selectedMentorIdFromCombobox}
                        >
                          <Plus size={16} />
                        </Button>
                      </div>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Cari Mentor..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>Mentor tidak ditemukan.</CommandEmpty>
                            <CommandGroup>
                              {availableMentorsForAdding.map((item) => (
                                <CommandItem
                                  key={item.id}
                                  value={item.name}
                                  onSelect={() => {
                                    setSelectedMentorIdFromCombobox(
                                      item.id.toString()
                                    );
                                    setOpenCombobox(false);
                                  }}
                                >
                                  {item.name}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      selectedMentorIdFromCombobox ===
                                        item.id.toString()
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
                  </div>
                  <div className="grid gap-3 mt-4">
                    <Label>Daftar Mentor yang akan ditambahkan</Label>
                    <div className="space-y-2">
                      {mentorsToAdd.length > 0 ? (
                        mentorsToAdd.map((mentor) => (
                          <div
                            key={mentor.id}
                            className="flex items-center gap-2 border p-2 rounded-md"
                          >
                            <span className="flex-grow">{mentor.name}</span>
                            <Button
                              variant="destructive"
                              size="icon"
                              type="button"
                              onClick={() =>
                                handleRemoveMentorFromList(mentor.id)
                              }
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">
                          Belum ada mentor yang dipilih.
                        </p>
                      )}
                      {errors.mentorsToAdd && (
                        <p className="text-sm text-red-500">
                          {errors.mentorsToAdd.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Batal
                    </Button>
                    <Button type="submit" disabled={isUpdatingMentors}>
                      {isUpdatingMentors ? "Menyimpan..." : "Simpan"}
                    </Button>
                  </DialogFooter>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="w-full gap-4">
          {mentorList?.length <= 0 || mentorList === undefined ? (
            <NotFounPages message="Mentor Belum Ditambahkan" />
          ) : (
            <DataTable columns={columns} data={mentorList} />
          )}
        </div>
      </div>
    </div>
  );
}
