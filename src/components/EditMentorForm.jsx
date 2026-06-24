import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Pencil, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import useEditMentor from "@/hooks/hooksCampus/useEditMentor";

const editMentorSchema = z
  .object({
    name: z.string().min(3, "Nama mentor minimal 3 karakter."),
    password: z
      .string()
      .optional()
      .refine(
        (val) => val === undefined || val.length === 0 || val.length >= 8,
        {
          message: "Password minimal 8 karakter jika diisi.",
        },
      ),
    confirmPassword: z.string().optional(),
    mentor_type: z.string().min(1, "Tipe mentor wajib dipilih."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan konfirmasi password tidak cocok.",
    path: ["confirmPassword"],
  });

export default function EditMentorForm({ mentor, onUpdated }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { editMentor, isLoading } = useEditMentor();
  const token = localStorage.getItem("userJwt");

  const form = useForm({
    resolver: zodResolver(editMentorSchema),
    defaultValues: {
      name: mentor.name || "",
      password: "",
      confirmPassword: "",
      mentor_type: mentor.mentor_type || "default",
    },
  });

  // Efek ini akan berjalan setiap kali prop 'mentor' berubah.
  // Ini memastikan form di-reset dengan data terbaru setelah pembaruan berhasil.
  useEffect(() => {
    form.reset({
      name: mentor.name || "",
      password: "",
      confirmPassword: "",
      mentor_type: mentor.mentor_type || "default",
    });
  }, [mentor, form.reset]);

  const handleOpenChange = (open) => {
    setIsModalOpen(open);
    if (!open) {
      // Reset state saat modal ditutup
      setShowPassword(false);
      form.reset({
        name: mentor.name || "",
        password: "",
        confirmPassword: "",
        mentor_type: mentor.mentor_type || "default",
      });
    }
  };

  const onSubmit = async (values) => {
    console.log(values);
    const payload = {
      name: values.name,
      mentor_type: values.mentor_type,
    };

    if (values.password) {
      payload.password = values.password;
    }
    // console.log(payload);

    try {
      const result = await editMentor(token, mentor.id, payload);
      toast.success(result.message || "Mentor berhasil diperbarui!");
      onUpdated(); // Panggil callback untuk refresh data
      handleOpenChange(false); // Tutup modal dan reset state
    } catch (error) {
      toast.error(error.message || "Gagal memperbarui mentor.");
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 text-blue-500 hover:bg-blue-100 hover:text-blue-600"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Edit Mentor</DialogTitle>
              <DialogDescription>
                Ubah data mentor. Kosongkan password jika tidak ingin
                mengubahnya.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {/* mentor name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Mentor</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan nama lengkap" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mentor_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipe Mentor</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih tipe mentor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="super_mentor">
                          Super Mentor
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="change-password"
                  checked={showPassword}
                  onCheckedChange={setShowPassword}
                />
                <Label htmlFor="change-password">Ubah Password</Label>
              </div>

              {showPassword && (
                <>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password Baru</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Minimal 8 karakter"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Konfirmasi Password Baru</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Ulangi password baru"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
