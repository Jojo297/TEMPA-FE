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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import DashboardCampusBerandaSkeleton from "@/components/DashboardCampusBerandaSkeleton";

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

  // add new mentor
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
    [handleDeleteMentor, fetchMentors, token],
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
        <div className="bg-white p-6 rounded-xl border border-gray-200 border-l-4 border-l-blue-400 shadow-sm flex items-center gap-5">
          <div className="bg-blue-100 text-blue-600 rounded-full p-3">
            <ListChecks size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Program</p>
            <p className="text-2xl font-bold text-gray-800">{totalPrograms}</p>
          </div>
        </div>

        {/* Card Total Jurusan */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 border-l-4 border-l-orange-400 shadow-sm flex items-center gap-5">
          <div className="bg-orange-100 text-orange-600 rounded-full p-3">
            <GraduationCap size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Jurusan</p>
            <p className="text-2xl font-bold text-gray-800">{totalMajors}</p>
          </div>
        </div>

        {/* Card Total Mentor */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 border-l-4 border-l-green-400 shadow-sm flex items-center gap-5">
          <div className="bg-green-100 text-green-600 rounded-full p-3">
            <Users size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Mentor</p>
            <p className="text-2xl font-bold text-gray-800">{totalMentors}</p>
          </div>
        </div>

        {/* Card Total Mentee */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 border-l-4 border-l-purple-400 shadow-sm flex items-center gap-5">
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
      </main>
    </>
  );
}
