import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import KampusDataForm from "./KampusDataForm";
import CampusFirst from "./CampusFirst";
import { jwtDecode } from "jwt-decode";

const chartData = [
  { jurusan: "Informatika", Laki_laki: 25, Perempuan: 50 },
  { jurusan: "Manajemen Bisnis", Laki_laki: 40, Perempuan: 90 },
  { jurusan: "Mesin", Laki_laki: 35, Perempuan: 80 },
  { jurusan: "Elektronika", Laki_laki: 15, Perempuan: 35 },
];

const mentorListDummy = [
  { id: 1, nama: "Lorem ipsum", detail: "lorem ipsum | lorem ipsum" },
  { id: 2, nama: "Lorem ipsum", detail: "lorem ipsum | lorem ipsum" },
  { id: 3, nama: "Lorem ipsum", detail: "lorem ipsum | lorem ipsum" },
  { id: 4, nama: "Lorem ipsum", detail: "lorem ipsum | lorem ipsum" },
];

export default function DashboardCampusBeranda() {
  const navigate = useNavigate();
  const token = localStorage.getItem("userJwt");
  const decode = jwtDecode(token);
  console.log(decode);
  const [jurusanDipilih, setJurusanDipilih] = useState("");
  const [isCampusValid, setCampusValid] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailMentor, setEmailMentor] = useState("");
  const [mentorList, setMentorList] = useState(mentorListDummy);

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

  if (!decode.verif) {
    return <CampusFirst />;
  }

  return (
    <>
      {/* HEADER */}
      <div className="px-10 pt-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#013D3A]">
            SELAMAT DATANG,
            <br /> MITRA TEMPA
          </h1>
        </div>
      </div>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* === CHART SECTION (TIDAK DIUBAH SESUAI PERMINTAAN) === */}
        <section className="bg-[#013D3A] rounded-xl p-6 text-white shadow-lg mb-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <h3 className="text-lg font-semibold">
              Jumlah Pendaftaran Program per Jurusan
            </h3>

            {/* === DROPDOWN PILIH JURUSAN (SUDAH AKTIF) === */}
            <div className="relative w-full md:w-auto">
              <select
                className="bg-transparent text-white rounded-md px-3 py-1 text-xs border border-white/30 focus:outline-none pr-6 cursor-pointer"
                value={jurusanDipilih}
                onChange={(e) => setJurusanDipilih(e.target.value)}
              >
                <option value="" className="bg-[#013D3A]">
                  Pilih Jurusan
                </option>
                {chartData.map((item, index) => (
                  <option
                    key={index}
                    value={item.jurusan}
                    className="bg-[#013D3A]"
                  >
                    {item.jurusan}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end text-sm mb-4">
            <CustomLegend />
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
              >
                <XAxis
                  dataKey="jurusan"
                  stroke="#FFFFFF"
                  tickLine={false}
                  style={{ fontSize: "10px" }}
                />
                <YAxis
                  stroke="#FFFFFF"
                  tickLine={false}
                  style={{ fontSize: "10px" }}
                  domain={[0, 100]}
                />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.1)" }}
                  content={<CustomTooltip />}
                />
                <Bar dataKey="Laki_laki" fill="#A0D9D0" stackId="a" />
                <Bar dataKey="Perempuan" fill="#5CC6BA" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
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
