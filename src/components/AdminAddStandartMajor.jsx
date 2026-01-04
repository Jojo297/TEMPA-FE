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
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useAddStandardMajor from "@/hooks/hooksAdmin/useAddStandardMajor";
import { CirclePlus, icons, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router";
import { DialogClose } from "@radix-ui/react-dialog";

const majorSchema = z.object({
  major_name: z.string().min(1, "Nama jurusan wajib diisi"),
  icon_name: z.string().min(1, "Nama ikon wajib diisi"),
});

export default function AdminAddStandartMajor({ token }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, data, error, addMajor } = useAddStandardMajor();
  let newIdMajor = 0;
  //   console.log(newIdMajor);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(majorSchema),
    defaultValues: {
      major_name: "",
      icon_name: "",
    },
  });

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const iconName = watch("icon_name");
  // Cek apakah iconName yang diketik ada di library Lucide
  const SelectedIcon = icons[iconName];

  const onSubmit = async (formData) => {
    const payload = {
      major_name: formData.major_name,
      logo_url: formData.icon_name,
    };

    const result = await addMajor(token, payload);

    if (result.success) {
      toast.success("Jurusan berhasil ditambahkan");
      newIdMajor = result.data.id;
      console.log(result.data);
      navigate(`/dashboard-admin/jurusan-detail/${newIdMajor}`);
      setIsOpen(false);
    } else {
      toast.error(result.error || "Gagal menambahkan jurusan");
    }
  };

  //   console.log(newIdMajor);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>
            <CirclePlus /> Tambah Jurusan
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Tambah/Edit Jurusan</DialogTitle>
            <DialogDescription>
              Masukkan nama jurusan dan nama komponen dari Lucide Icons.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 py-4">
            {/* Input Nama Jurusan */}
            <div className="grid gap-2">
              <Label htmlFor="major_name">Nama Jurusan</Label>
              <Input
                id="major_name"
                placeholder="Contoh: Informatika"
                {...register("major_name")}
                className={errors.major_name ? "border-red-500" : ""}
              />
              {errors.major_name && (
                <span className="text-xs text-red-500">
                  {errors.major_name.message}
                </span>
              )}
            </div>

            {/* Input Nama Ikon */}
            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="icon_name">Nama Ikon Lucide</Label>
                {/* Preview Ikon secara Real-time */}
                {SelectedIcon && (
                  <SelectedIcon size={20} className="text-primary" />
                )}
              </div>

              <Input
                id="icon_name"
                placeholder="Contoh: Cpu, Database, Monitor"
                {...register("icon_name")}
                className={errors.icon_name ? "border-red-500" : ""}
              />

              <div className="bg-slate-50 p-2 rounded-md border border-dashed border-slate-300">
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  <strong>Instruksi:</strong> Buka{" "}
                  <a
                    href="https://lucide.dev/icons"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    lucide.dev
                  </a>
                  , cari ikon, lalu copy nama komponennya (PascalCase).
                </p>
              </div>

              {errors.icon_name && (
                <span className="text-xs text-red-500">
                  {errors.icon_name.message}
                </span>
              )}
              {iconName && !SelectedIcon && (
                <span className="text-[10px] text-orange-600 font-medium">
                  Nama ikon tidak ditemukan di library Lucide.
                </span>
              )}
            </div>

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Batal
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Simpan Jurusan
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
