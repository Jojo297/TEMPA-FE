import {
  Plus,
  Trash2,
  Loader2,
  ListChecks,
  Users,
  GraduationCap,
  UserCheck,
  CheckCircle2Icon,
  AlertCircleIcon,
  Copy,
} from "lucide-react";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

import { jwtDecode } from "jwt-decode";
import useGetProgramChart from "@/hooks/hooksCampus/useGetProgramChart";
import useAddMentor from "@/hooks/hooksCampus/useAddMentor"; // Impor hook baru
import useDeleteMentor from "@/hooks/hooksCampus/useDeleteMentor";
import useGetAllMentors from "@/hooks/hooksCampus/useGetAllMentors"; // Impor hook get all mentors
import useDetailCampus from "@/hooks/hooksCampus/useDetailCampus"; // Impor hook untuk detail kampus
import { Button } from "@/components/ui/button";
import { getColumns } from "@/components/columns";
import { DataTable } from "@/components/data-table";

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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardCampusBerandaSkeleton from "@/components/DashboardCampusBerandaSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Skema validasi untuk form tambah mentor
const addMentorSchema = z
  .object({
    name: z.string().min(3, "Nama mentor minimal 3 karakter."),
    nik: z
      .string()
      .min(1, "NIK wajib diisi.")
      .max(20, "NIK terlalu panjang.")
      .regex(/^\d+$/, "NIK hanya boleh berisi angka."),
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

// --- Custom Tooltip (Untuk menampilkan detail saat hover) ---

const DOMAIN_URL = import.meta.env.VITE_DOMAIN_URL;

export default function DashboardCampusBeranda() {
  const navigate = useNavigate();
  const token = localStorage.getItem("userJwt");
  const decode = jwtDecode(token);
  const campusName = decode.verif.campus_name;

  // console.log(decode);
  const [jurusanDipilih, setJurusanDipilih] = useState("");
  const [isCampusValid, setCampusValid] = useState(true);
  const { programs, isLoading, error, fetchPrograms } = useGetProgramChart();
  const { detailCampus, fetchDetailCampus } = useDetailCampus(); // Gunakan hook untuk mendapatkan detail kampus
  const { addMentor, isLoading: isAddingMentor } = useAddMentor();
  const {
    // Pastikan ini ada
    mentors,
    isLoading: isLoadingMentors,
    fetchMentors,
  } = useGetAllMentors(); // Gunakan hook untuk data mentor
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deleteMentor, isLoading: isDeletingMentor } = useDeleteMentor();

  // Setup React Hook Form
  const form = useForm({
    resolver: zodResolver(addMentorSchema),
    defaultValues: {
      name: "",
      nik: "",
      password: "",
      confirmPassword: "",
      mentor_type: "default", // Nilai default untuk tipe mentor
    },
  });

  const onSubmit = async (values) => {
    const payload = {
      name: values.name,
      nik: values.nik,
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
    [token, deleteMentor, fetchMentors]
  );

  // fetch program for chart
  useEffect(() => {
    if (token) {
      fetchPrograms(token);
      fetchDetailCampus(token); // Panggil fetch untuk detail kampus
      fetchMentors(token); // Panggil fetch untuk data mentor
    }
  }, [token, fetchPrograms, fetchDetailCampus, fetchMentors]);

  const totalPrograms = programs?.length || 0;
  const totalMentors = mentors.length;
  const totalMajors = detailCampus?.major?.length || 0;
  const totalMentees =
    programs?.reduce((acc, program) => acc + (program.total_mentee || 0), 0) ||
    0;

  const columns = useMemo(
    () => getColumns(handleDeleteMentor, () => fetchMentors(token)),
    [handleDeleteMentor, fetchMentors, token]
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-800">{label}</p>
          <p className="text-xs text-gray-700">
            Total Pendaftar:{" "}
            <span className="font-bold text-base text-teal-600">
              {payload[0].value}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return <DashboardCampusBerandaSkeleton />;
  }

  const CustomLegend = () => (
    <div className="flex justify-end items-center gap-6 text-sm">
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full border border-gray-100 bg-[#A0D9D0]" />
        <span className="text-white">Laki-Laki</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full border border-gray-100 bg-[#5CC6BA]" />
        <span className="text-white">Perempuan</span>
      </div>
    </div>
  );

  // Dalam kasus ini, kita tidak memerlukan state 'jurusanDipilih' karena sudah dihapus
  const chartData = programs ?? [];

  // Render Label di atas Bar (meniru Label shadcn)
  const renderCustomBarLabel = ({ x, y, width, value }) => {
    return (
      <text
        // MENGUBAH 'x' agar berada di tengah bar: x + width / 2
        x={x + width / 2}
        y={y}
        fill="#FFFFFF"
        textAnchor="middle"
        dy={-6} // Menempatkan label di atas bar
        style={{ fontSize: "10px", fontWeight: 600 }}
      >
        {value}
      </text>
    );
  };

  return (
    <>
      {/* HEADER */}
      <div className="">
        <p className="text-sm text-gray-700">SELAMAT DATANG,</p>
        <h1 className="text-3xl font-bold text-[#003631]">{campusName}</h1>
      </div>

      {/* === STATS CARDS === */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {/* Card Total Program */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-5">
          <div className="bg-blue-100 text-blue-600 rounded-full p-3">
            <ListChecks size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Program</p>
            <p className="text-2xl font-bold text-gray-800">{totalPrograms}</p>
          </div>
        </div>

        {/* Card Total Jurusan */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-5">
          <div className="bg-orange-100 text-orange-600 rounded-full p-3">
            <GraduationCap size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Jurusan</p>
            <p className="text-2xl font-bold text-gray-800">{totalMajors}</p>
          </div>
        </div>

        {/* Card Total Mentor */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-5">
          <div className="bg-green-100 text-green-600 rounded-full p-3">
            <Users size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Mentor</p>
            <p className="text-2xl font-bold text-gray-800">{totalMentors}</p>
          </div>
        </div>

        {/* Card Total Mentee */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-5">
          <div className="bg-purple-100 text-purple-600 rounded-full p-3">
            <UserCheck size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Mentee</p>
            <p className="text-2xl font-bold text-gray-800">{totalMentees}</p>
          </div>
        </div>
      </div>
      {/* === END STATS CARDS === */}

      <main className="flex-1 pt-6 ">
        {/* === CHART SECTION === */}
        <section className="bg-white w-full rounded-xl p-6 text-gray-800 shadow-md mb-6 border border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h3 className="text-xl font-bold">
              Jumlah Pendaftaran Mentee per Program
            </h3>
          </div>

          <div className="h-80 w-full">
            {/* === START: Conditional Rendering === */}
            {chartData && chartData.length > 0 ? (
              // Jika ada data program, tampilkan BarChart
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 20, left: 0, bottom: 50 }}
                >
                  <XAxis
                    dataKey="program_name"
                    stroke="#013D3A"
                    tickLine={false}
                    tick={{
                      angle: -25,
                      textAnchor: "middle",
                      dy: 15,
                    }}
                    interval={0}
                    height={50}
                    style={{ fontSize: "10px" }}
                  />

                  <YAxis
                    stroke="#013D3A"
                    tickLine={false}
                    axisLine={false}
                    style={{ fontSize: "10px" }}
                    allowDecimals={false}
                    tickFormatter={(value) => `${value} Mentee`}
                  />

                  <Tooltip cursor={false} content={<CustomTooltip />} />

                  <Bar
                    dataKey="total_mentee"
                    fill="#5CC6BA"
                    radius={[4, 4, 0, 0]}
                    minPointSize={5}
                  >
                    <LabelList
                      dataKey="total_mentee" // Pastikan ini sesuai dengan key di data Anda
                      content={(props) => <text {...props} fill="#013D3A" />} // Mengubah warna label menjadi gelap
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              // Jika tidak ada data program, tampilkan pesan
              <div className="flex flex-col gap-4 justify-center items-center h-full text-center p-4">
                <p className="text-gray-700 text-lg font-medium">
                  Belum ada program yang dibuat oleh kampus ini. Klik tombol
                  dibawah untuk membuat program.
                </p>
                <Button
                  onClick={() => navigate("/dashboard-campus/program")}
                  className="bg-secondary text-primary hover:bg-secondary hover:opacity-50 transition"
                >
                  Buat Program
                </Button>
              </div>
            )}
          </div>

          <div className="text-center mt-4 text-xs text-gray-600">
            Data Pendaftaran Mentee Total (Per Program)
          </div>
        </section>

        {/* Mentor Section */}
        <section className="bg-white rounded-xl p-6 pt-6 text-gray-800 shadow-md border">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <h3 className="text-lg font-semibold text-[#013D3A]">
              Kelola Mentor
            </h3>

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
                      <FormField
                        control={form.control}
                        name="nik"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>NIK</FormLabel>
                            <FormControl>
                              <Input placeholder="Masukkan NIK" {...field} />
                            </FormControl>
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
          <Alert className="mb-2 bg-blue-50 border-blue-200">
            <AlertCircleIcon className="h-5 w-5 text-blue-600" />
            <AlertTitle className="ml-2 text-blue-800 font-semibold">
              Informasi Login Mentor
            </AlertTitle>
            <AlertDescription className="ml-2 text-blue-700 mt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                Silakan bagikan tautan ini kepada mentor Anda untuk masuk ke
                dalam sistem:{" "}
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
                  navigator.clipboard.writeText(`${DOMAIN_URL}/login-mentor`);
                  toast.success("Link berhasil disalin!");
                }}
              >
                <Copy size={14} className="mr-2" />
                Salin Link
              </Button>
            </AlertDescription>
          </Alert>

          <DataTable
            columns={columns}
            data={mentors}
            isLoading={isLoadingMentors}
          />
        </section>
      </main>
    </>
  );
}
