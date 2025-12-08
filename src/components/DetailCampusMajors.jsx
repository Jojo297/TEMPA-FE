import {
  Briefcase,
  Check,
  ChevronsUpDown,
  ListCheck,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useGetAllMajorsCampus from "@/hooks/hooksCampus/useGetAllMajors";
import { toast } from "sonner";
import useEditCampusMajors from "@/hooks/hooksCampus/useEditCampusMajors";
const addMajorsFormSchema = z.object({
  majorsToAdd: z
    .array(
      z.object({
        id: z.number(),
        name: z.string().min(1, "Nama jurusan tidak boleh kosong."),
      })
    )
    .min(1, "Minimal harus ada 1 jurusan yang ditambahkan."),
});

export default function DetailCampusMajors({
  majors,
  campusId,
  refetchCampusData,
}) {
  const [openCombobox, setOpenCombobox] = useState(false);
  const [selectedMajorIdFromCombobox, setSelectedMajorIdFromCombobox] =
    useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const token = localStorage.getItem("userJwt");
  const { majorsForForm, fetchMajorsForForm } = useGetAllMajorsCampus();

  const { addMajorsToCampus, isLoading: isSubmitting } = useEditCampusMajors();
  useEffect(() => {
    if (token) {
      fetchMajorsForForm(token);
    }
  }, [token, fetchMajorsForForm]);

  const form = useForm({
    resolver: zodResolver(addMajorsFormSchema),
    defaultValues: {
      majorsToAdd: [],
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    watch,
    setValue,
    reset, // Hapus isSubmitting dari formState karena kita akan handle manual
    formState: { errors },
  } = form;

  const majorsToAdd = watch("majorsToAdd");
  // console.log("majorsToAdd:", majorsToAdd);

  const handleAddMajorToList = () => {
    if (!selectedMajorIdFromCombobox) {
      toast.error("Pilih jurusan terlebih dahulu.");
      return;
    }

    const majorToAdd = majorsForForm.find(
      (item) => item.id === parseInt(selectedMajorIdFromCombobox)
    );

    if (majorToAdd) {
      const isAlreadyAdded = majorsToAdd.some((m) => m.id === majorToAdd.id);

      if (isAlreadyAdded) {
        toast.warning("Jurusan ini sudah ada dalam daftar.");
        return;
      }

      const newMajorsList = [
        ...majorsToAdd,
        { id: majorToAdd.id, name: majorToAdd.major_name },
      ];
      setValue("majorsToAdd", newMajorsList, { shouldValidate: true });
      setSelectedMajorIdFromCombobox("");
      setOpenCombobox(false);
    } else {
      toast.error("Jurusan tidak ditemukan.");
    }
  };

  const handleRemoveMajorFromList = (idToRemove) => {
    const newMajorsList = majorsToAdd.filter((m) => m.id !== idToRemove);
    setValue("majorsToAdd", newMajorsList, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    try {
      await addMajorsToCampus({
        token: token,
        majorsToAdd: data.majorsToAdd,
      });

      // Setelah submit berhasil, panggil refetch dan tutup dialog
      refetchCampusData(); // Memuat ulang data kampus
      setIsDialogOpen(false); // Menutup dialog dengan mengubah state
      toast.success("Jurusan berhasil diperbarui!");
    } catch (error) {
      toast.error(error.message || "Gagal menyimpan jurusan.");
      console.error(error);
    }
  };

  useEffect(() => {
    // Alih-alih mereset form, kita akan menginisialisasi daftar yang sudah ada dari props
    // Ini tidak akan menjadi bagian dari form state yang akan disubmit,
    // tapi akan ditampilkan di UI. Form `majorsToAdd` tetap untuk item baru.
    // Namun, berdasarkan permintaan Anda, kita akan memulai dengan daftar kosong.
    // Jika Anda ingin menampilkan yang sudah ada dan menambahkan yang baru, logikanya perlu diubah.
    // Untuk saat ini, kita akan membiarkan `majorsToAdd` kosong pada awalnya.
    // Jika Anda ingin mengedit daftar yang ada, baris di bawah ini bisa diaktifkan kembali.
    // reset({ majorsToAdd: majors.map(m => ({ id: m.standard_major.id, name: m.standard_major.major_name })) });
    reset({ majorsToAdd: [] }); // Memastikan form selalu dimulai dengan array kosong
  }, [majors, reset]);

  // Filter jurusan yang akan ditampilkan di combobox
  const availableMajorsForAdding = majorsForForm.filter((availableMajor) => {
    // Cek apakah availableMajor.id ada di dalam daftar majors yang sudah dimiliki kampus
    const isAlreadyOnCampus = majors.some(
      (campusMajor) => campusMajor.standard_major.id === availableMajor.id
    );
    return !isAlreadyOnCampus;
  });

  return (
    <>
      <section className="mt-6 mx-auto  mb-20 w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-[#013B35]">Jurusan</h2>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2 bg-[#013B35] text-white disabled:opacity-50">
                  <Pencil size={18} /> Tambah Jurusan
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <DialogHeader>
                    <DialogTitle>Tambah Jurusan Baru</DialogTitle>
                    <DialogDescription>
                      Pilih jurusan yang ingin ditambahkan ke kampus ini.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-3">
                      <Label htmlFor="major-select">Pilih Jurusan</Label>
                      <Popover
                        open={openCombobox}
                        onOpenChange={setOpenCombobox}
                      >
                        <div className="flex gap-2">
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openCombobox}
                              className="flex-grow justify-between"
                            >
                              {selectedMajorIdFromCombobox
                                ? majorsForForm.find(
                                    (item) =>
                                      item.id ===
                                      parseInt(selectedMajorIdFromCombobox)
                                  )?.major_name
                                : "Pilih Jurusan..."}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <Button
                            variant="default"
                            size="icon"
                            type="button"
                            onClick={handleAddMajorToList}
                            disabled={!selectedMajorIdFromCombobox}
                          >
                            <Plus size={16} />
                          </Button>
                        </div>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput
                              placeholder="Cari Jurusan..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>
                                Jurusan tidak ditemukan.
                              </CommandEmpty>
                              <CommandGroup>
                                {availableMajorsForAdding.map((item) => (
                                  <CommandItem
                                    key={item.id}
                                    value={item.major_name}
                                    onSelect={() => {
                                      setSelectedMajorIdFromCombobox(
                                        item.id.toString()
                                      );
                                      setOpenCombobox(false);
                                    }}
                                  >
                                    {item.major_name}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        selectedMajorIdFromCombobox ===
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
                      <Label>Daftar Jurusan yang akan ditambahkan</Label>
                      <div className="space-y-2">
                        {majorsToAdd.length > 0 ? (
                          majorsToAdd.map((major) => (
                            <div
                              key={major.id}
                              className="flex items-center gap-2 border p-2 rounded-md"
                            >
                              <span className="flex-grow">{major.name}</span>
                              <Button
                                variant="destructive"
                                size="icon"
                                type="button"
                                onClick={() =>
                                  handleRemoveMajorFromList(major.id)
                                }
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500">
                            Belum ada jurusan yang dipilih.
                          </p>
                        )}
                        {errors.majorsToAdd && (
                          <p className="text-sm text-red-500">
                            {errors.majorsToAdd.message}
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
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Menyimpan..." : "Simpan"}
                      </Button>
                    </DialogFooter>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {majors.length <= 0 ? (
            <div>
              <div className="flex flex-col items-center justify-center py-16 ">
                <img
                  src={roboterror}
                  alt="Belum Ada Aktivitas"
                  className="w-40 mb-4"
                />
                <div className="text-center">
                  <p className="text-gray-600">Jurusan Belum Ditambahkan</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue={
                  majors.length > 0 ? majors[0].id.toString() : "item-1"
                }
              >
                {majors.map((item) => (
                  <AccordionItem
                    key={item.id}
                    value={item.id.toString()}
                    className="border-none rounded-2xl overflow-hidden shadow-sm mb-4"
                  >
                    <AccordionTrigger
                      className="w-full text-left bg-[#013B35] text-white font-semibold px-6 py-4 
                           flex justify-between items-center hover:bg-[#015f53] transition 
                           data-[state=open]:bg-[#015f53] data-[state=open]:shadow-inner
                           group" // Tambahkan group untuk style ikon rotate
                    >
                      {/* major name */}
                      <span>{item.standard_major?.major_name}</span>
                    </AccordionTrigger>

                    {/* description */}
                    <AccordionContent className="p-6 bg-gray-50 border-t border-gray-200">
                      <h3 className="text-xl font-bold text-[#013B35] mb-3">
                        Deskripsi
                      </h3>
                      <p className="text-gray-800 mb-6 leading-relaxed">
                        {item.standard_major?.description}
                      </p>

                      {/* Prospek Kerja */}
                      <h3 className="text-xl font-bold text-[#013B35] mb-3 flex items-center">
                        <Briefcase size={20} className="mr-2" />
                        Prospek Kerja
                      </h3>

                      {/* Asumsi: Data prospek kerja ada di item.standard_major.prospekKerja (perlu dimuat dari backend) */}
                      <ul className="space-y-2 list-none text-gray-700">
                        {/* Menggunakan list-none karena Anda menggunakan ikon kustom */}
                        {item.standard_major?.prospek_kerja &&
                          item.standard_major?.prospek_kerja.map(
                            (prospek, index) => (
                              <li key={index} className="flex items-start">
                                <ListCheck
                                  size={16}
                                  className="text-[#013B35] mr-2 flex-shrink-0 mt-1"
                                />
                                {prospek}
                              </li>
                            )
                          )}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
