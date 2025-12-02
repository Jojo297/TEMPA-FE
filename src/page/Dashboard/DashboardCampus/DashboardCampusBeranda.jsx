import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
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
import KampusDataForm from "./DashboardCampusRegisterMitra";
import CampusFirst from "./CampusFirst";
import { jwtDecode } from "jwt-decode";
import useGetProgramChart from "@/hooks/hooksCampus/useGetProgramChart";
import { Button } from "@/components/ui/button";

const rawData = [
  { program: "Web Development Dasar", total_mentee: 50 },
  { program: "Data Science Lanjut", total_mentee: 35 },
  { program: "UI/UX Design Bootcamp", total_mentee: 78 },
  { program: "Jaringan Komputer", total_mentee: 20 },
  { program: "Manajemen Proyek Digital", total_mentee: 65 },
];

const mentorListDummy = [
  { id: 1, nama: "Lorem ipsum", detail: "lorem ipsum | lorem ipsum" },
  { id: 2, nama: "Lorem ipsum", detail: "lorem ipsum | lorem ipsum" },
  { id: 3, nama: "Lorem ipsum", detail: "lorem ipsum | lorem ipsum" },
  { id: 4, nama: "Lorem ipsum", detail: "lorem ipsum | lorem ipsum" },
];

// --- Custom Tooltip (Untuk menampilkan detail saat hover) ---
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="text-sm font-semibold text-[#013D3A]">{label}</p>
        <p className="text-xs text-gray-600">
          Total Mentee:{" "}
          <span className="font-bold text-base text-teal-600">
            {payload[0].value}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export default function DashboardCampusBeranda() {
  const navigate = useNavigate();
  const token = localStorage.getItem("userJwt");
  const decode = jwtDecode(token);
  const campusName = decode.verif.campus_name;

  // console.log(decode);
  const [jurusanDipilih, setJurusanDipilih] = useState("");
  const [isCampusValid, setCampusValid] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mentorList, setMentorList] = useState(mentorListDummy);
  const { programs, isLoading, error, fetchPrograms } = useGetProgramChart();

  useEffect(() => {
    if (token) {
      fetchPrograms(token);
    }
  }, [token]);

  const handleTambahMentor = () => {
    if (!emailMentor.trim())
      return alert("Masukkan email mentor terlebih dahulu!");
    const newMentor = {
      id: mentorList.length + 1,
      nama: "Mentor Baru",
      detail: emailMentor + " | Baru ditambahkan",
    };
    setMentorList([...mentorList, newMentor]);
    setEmailMentor("");
    setIsModalOpen(false);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const sortedPayload = [...payload].sort((a, b) =>
        a.value > b.value ? 1 : -1
      );
      return (
        <div className="bg-[#013D3A] p-2 rounded-md border border-[#5CC6BA] text-white text-xs shadow-lg opacity-95">
          <p className="font-bold mb-1">{label}</p>
          {sortedPayload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

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
      <div className="px-10 pt-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#013D3A]">
            SELAMAT DATANG, <br />
            {campusName}
          </h1>
        </div>
      </div>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* === CHART SECTION (TIDAK DIUBAH SESUAI PERMINTAAN) === */}
        <section className="bg-[#013D3A] w-full rounded-xl p-6 text-white shadow-2xl mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h3 className="text-xl font-bold">
              Jumlah Pendaftaran Mentee per Program
            </h3>
            {/* Dropdown sudah dihapus sesuai permintaan */}
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
                    stroke="#FFFFFF"
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
                    stroke="#FFFFFF"
                    tickLine={false}
                    axisLine={false}
                    style={{ fontSize: "10px" }}
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
                      content={renderCustomBarLabel}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              // Jika tidak ada data program, tampilkan pesan
              <div className="flex flex-col gap-4 justify-center items-center h-full text-center p-4">
                <p className="text-white text-lg font-medium">
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

          <div className="text-center mt-4 text-xs text-white/70">
            Data Pendaftaran Mentee Total (Per Program)
          </div>
        </section>

        {/* === KELOLA MENTOR (TIDAK DIUBAH!) === */}
        <section className="bg-[#013D3A] rounded-xl p-6 text-white shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <h3 className="text-lg font-semibold">Kelola Mentor</h3>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#5CC6BA] text-[#013D3A] hover:bg-[#4ab6a9] flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-semibold"
            >
              <Plus size={16} /> Tambah Mentor
            </button>
          </div>

          <div className="divide-y divide-white/10">
            {mentorList.map((mentor) => (
              <div
                key={mentor.id}
                className="flex justify-between items-center py-3"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded text-[#5CC6BA] bg-transparent border-white/50 focus:ring-[#5CC6BA]"
                  />
                  <div>
                    <p className="font-semibold text-base">{mentor.nama}</p>
                    <p className="text-sm text-gray-300">{mentor.detail}</p>
                  </div>
                </div>
                <Trash2
                  size={18}
                  className="text-white/70 cursor-pointer hover:text-red-400 transition"
                />
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* === MODAL TAMBAH MENTOR (TIDAK DIUBAH) === */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-[#F8FCFA] rounded-xl shadow-lg p-6 w-[600px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#013B35]">
                Tambahkan Mentor
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-600 hover:text-black"
              >
                ✕
              </button>
            </div>

            <label className="block text-sm mb-2 text-gray-700">
              Masukkan email untuk menambahkan mentor
            </label>
            <input
              type="email"
              placeholder="contoh: mentor@email.com"
              value={emailMentor}
              onChange={(e) => setEmailMentor(e.target.value)}
              className="w-full border rounded-full px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-[#013B35]"
            />

            <div className="flex justify-end">
              <button
                onClick={handleTambahMentor}
                className="bg-[#A0DCE5] text-[#013B35] font-semibold px-6 py-2 rounded-full hover:bg-[#8AD0D9] transition"
              >
                Tambahkan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
