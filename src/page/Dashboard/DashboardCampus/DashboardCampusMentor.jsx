import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import useGetAllMentors from "@/hooks/hooksCampus/useGetAllMentors";
import { useCallback, useEffect, useMemo, useState } from "react";
import useDeleteMentor from "@/hooks/hooksCampus/useDeleteMentor";
import { getColumns } from "@/components/columns";
import { Plus, Loader2, AlertCircleIcon, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import useAddMentor from "@/hooks/hooksCampus/useAddMentor";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DataTable } from "@/components/data-table";
import LoadingSkeletonMentorPage from "@/components/LoadingSkeletonMentorPage";

// Skema validasi untuk form tambah mentor
const addMentorSchema = z
  .object({
    name: z.string().min(3, "Nama mentor minimal 3 karakter."),
    password: z.string().min(8, "Password minimal 8 karakter."),
    confirmPassword: z
      .string()
      .min(8, "Konfirmasi password minimal 8 karakter."),
    mentor_type: z.string().min(1, "Tipe mentor wajib dipilih."), // Pastikan ini ada
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan konfirmasi password tidak cocok.",
    path: ["confirmPassword"],
  });

const DOMAIN_URL = import.meta.env.VITE_DOMAIN_URL;

export default function DashboardCampusMentor() {
  const token = localStorage.getItem("userJwt");

  const {
    mentors,
    isLoading: isLoadingMentors,
    fetchMentors,
  } = useGetAllMentors(); // Gunakan hook untuk data mentor
  const { addMentor, isLoading: isAddingMentor } = useAddMentor();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deleteMentor, isLoading: isDeletingMentor } = useDeleteMentor();

  // fetch mentors
  useEffect(() => {
    if (token) {
      fetchMentors(token);
    }
  }, [token, fetchMentors]);

  // console.log(mentors);

  // Setup React Hook Form
  const form = useForm({
    resolver: zodResolver(addMentorSchema),
    defaultValues: {
      name: "",
      password: "",
      confirmPassword: "",
      mentor_type: "default", // Nilai default untuk tipe mentor
    },
  });

  // add new mentor
  const onSubmit = async (values) => {
    const payload = {
      name: values.name,
      password: values.password,
      mentor_type: values.mentor_type,
    };

    // console.log(payload);
    const result = await addMentor(token, payload);

    if (result.success) {
      toast.success(result.message || "Mentor berhasil ditambahkan!");
      fetchMentors(token); // Panggil ulang fetchMentors untuk refresh data
      form.reset();
      setIsModalOpen(false); // Tutup modal setelah berhasil
    } else {
      toast.error(result.error || "Gagal menambahkan mentor.");
    }
  };

  // delete mentor
  const handleDeleteMentor = useCallback(
    async (mentor) => {
      const result = await deleteMentor(token, mentor.id);
      if (result.success) {
        toast.success(result.message);
        fetchMentors(token); // Muat ulang data tabel setelah berhasil
      } else {
        toast.error(result.error);
      }
    },
    [token, deleteMentor, fetchMentors],
  );

  const columns = useMemo(
    () => getColumns(handleDeleteMentor, () => fetchMentors(token)),
    [handleDeleteMentor, fetchMentors, token],
  );

  if (isLoadingMentors) {
    return <LoadingSkeletonMentorPage />;
  }
  return (
    <>
      {" "}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto">
          {/* Breadcrumb */}
          <div className="mb-2">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild className="hover:text-primary">
                    <Link to="/dashboard-campus/beranda">Beranda</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem className="text-primary">
                  <BreadcrumbPage className="text-primary">
                    Mentor
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Header */}
          <div className="mb-8 text-center">
            <div className="bg-primary text-white rounded-xl p-6 shadow">
              <h1 className="text-3xl font-bold mb-2">Mentor</h1>
              <p className="text-emerald-100/80 text-md max-w-2xl mx-auto leading-relaxed">
                Pusat kendali mentor kampus. Tambahkan, pantau, dan
                organisasikan para ahli yang akan membimbing perjalanan sukses
                mentee Anda.
              </p>
            </div>
          </div>

          {/* Mentor Section */}
          <section className="bg-white rounded-xl p-6 pt-6 text-gray-800 shadow-md border">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <h3 className="text-lg font-semibold text-[#013D3A]">
                Kelola Mentor
              </h3>

              {/* add mentor */}
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <Form {...form}>
                  <DialogTrigger asChild>
                    <button className="bg-[#013D3A] text-white hover:bg-[#015f53] flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-semibold transition-colors">
                      <Plus size={16} /> Tambah Mentor
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] bg-white">
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      <DialogHeader>
                        <DialogTitle>Tambah Mentor Baru</DialogTitle>
                        <DialogDescription>
                          Masukkan data mentor untuk mendaftarkannya ke dalam
                          sistem.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nama Mentor</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Masukkan nama lengkap"
                                  {...field}
                                />
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
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Pilih tipe mentor" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="default">
                                    Default
                                  </SelectItem>
                                  <SelectItem value="super_mentor">
                                    Super Mentor
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
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
                              <FormLabel>Konfirmasi Password</FormLabel>
                              <FormControl>
                                <Input
                                  type="password"
                                  placeholder="Ulangi password"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <DialogFooter>
                        <Button type="submit" disabled={isAddingMentor}>
                          {isAddingMentor && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          )}
                          {isAddingMentor ? "Menyimpan..." : "Simpan"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Form>
              </Dialog>
            </div>

            {/* informasi login mentor */}
            <Alert className="relative overflow-hidden border-none bg-blue-50/50 px-4 py-3 shadow-sm ring-1 ring-blue-100">
              {/* Aksen garis di samping */}
              <div className="absolute left-0 top-0 h-full w-1 bg-blue-500" />

              <div className="flex items-start gap-3">
                <AlertCircleIcon className="mt-0.5 h-5 w-5 text-blue-600" />
                <div className="grid gap-1">
                  <AlertTitle className="text-sm font-bold leading-none tracking-tight text-blue-900">
                    Informasi Login Mentor
                  </AlertTitle>
                  <AlertDescription className="text-sm flex gap-4 items-center leading-relaxed text-blue-700/90">
                    <span>
                      Silakan bagikan tautan ini kepada mentor Anda untuk masuk
                      ke dalam sistem:{" "}
                      <a
                        href={`${window.location.origin}/login-mentor`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline font-medium hover:text-blue-900 break-all"
                      >
                        {`${DOMAIN_URL}/login-mentor`}
                      </a>
                    </span>
                    {/* button save link */}
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white border-blue-300 text-blue-700 hover:bg-blue-100 shrink-0"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${DOMAIN_URL}/login-mentor`,
                        );
                        toast.success("Link berhasil disalin!");
                      }}
                    >
                      <Copy size={14} className="mr-2" />
                      Salin Link
                    </Button>
                  </AlertDescription>
                </div>
              </div>
            </Alert>

            <DataTable
              columns={columns}
              data={mentors}
              isLoading={isLoadingMentors}
            />
          </section>
        </main>
      </div>
    </>
  );
}
