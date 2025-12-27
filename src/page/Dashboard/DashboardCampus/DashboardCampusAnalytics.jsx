import React from "react";
import {
  BarChart3,
  Users,
  MousePointerClick,
  Trophy,
  Download,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const AnalyticsPage = () => {
  const navigate = useNavigate();
  // Mock Data untuk Jurusan
  const minatJurusan = [
    { nama: "Teknik Informatika", peminat: 145, color: "bg-[#013B35]" },
    { nama: "Sistem Informasi", peminat: 98, color: "bg-[#01524a]" },
    { nama: "Desain Komunikasi Visual", peminat: 76, color: "bg-[#026b61]" },
    { nama: "Manajemen Bisnis", peminat: 54, color: "bg-[#038578]" },
    { nama: "Teknik Elektro", peminat: 32, color: "bg-[#049e8f]" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-gray-800 font-sans">
      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#013B35]">
            Analitik Mendalam
          </h1>
          <p className="text-gray-500 text-sm">
            Data statistik ketertarikan mentee terhadap program dan jurusan
            Anda.
          </p>
        </div>

        {/* <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50 transition shadow-sm text-gray-600">
            <Calendar size={16} />
            Desember 2025
          </button>
          <button className="flex items-center gap-2 bg-[#013B35] text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition shadow-md">
            <Download size={16} />
            Ekspor PDF
          </button>
        </div> */}
      </div>

      {/* Grid Statistik Utama */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Tooltip>
          <TooltipTrigger asChild>
            {/* Card 1 */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-blue-400 flex items-center gap-4">
              <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
                <Users size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Total Kunjungan Profil
                </p>
                <h3 className="text-2xl font-bold text-gray-900 font-mono">
                  1,284
                </h3>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent className="bg-white p-3 shadow-xl border border-gray-100 rounded-xl max-w-[250px]">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
                <Users size={14} />
                <span>Metrik Kunjungan</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Jumlah mentee yang melihat profil kampus Anda. Data dihitung
                berdasarkan <strong>kunjungan unik</strong> dengan durasi
                menetap minimal <strong>5 detik</strong> untuk memastikan
                kualitas ketertarikan.
              </p>
            </div>
          </TooltipContent>
        </Tooltip>

        {/* Card 2 - UPDATED: Total Kunjungan Program */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 border-l-4 border-l-orange-400">
              <div className="bg-orange-50 p-3 rounded-lg text-orange-600">
                <MousePointerClick size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Total Kunjungan Program
                </p>
                <h3 className="text-2xl font-bold text-gray-900 font-mono">
                  856
                </h3>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent className="bg-white p-3 shadow-xl border border-gray-100 rounded-xl max-w-[250px]">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-wider">
                <MousePointerClick size={14} />
                <span>Metrik Interaksi</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Akumulasi klik pada <strong>Detail Program</strong>. Menunjukkan
                seberapa sering mentee menggali informasi lebih dalam mengenai
                kurikulum, mentor, dan jadwal program Anda.
              </p>
            </div>
          </TooltipContent>
        </Tooltip>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-yellow-400 flex items-center gap-4">
          <div className="bg-yellow-50 p-3 rounded-lg text-yellow-600">
            <Trophy size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">
              Jurusan Terfavorit
            </p>
            <h3 className="text-xl font-bold text-gray-900 truncate max-w-[150px]">
              Teknik Informatika
            </h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Chart Minat Jurusan - UPDATED (Lebih Luas) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h4 className="font-bold text-[#013B35] text-lg">
                Minat Jurusan
              </h4>
              <p className="text-xs text-gray-400 mt-1">
                Data diambil berdasarkan pilihan minat/ketertarikan jurusan yang
                diisi oleh mentee.
              </p>
            </div>
            <BarChart3 size={20} className="text-gray-300" />
          </div>

          <div className="space-y-6">
            {minatJurusan.map((item, index) => (
              <div key={index} className="group cursor-default">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-[#013B35] transition-colors">
                    {item.nama}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900">
                      {item.peminat}
                    </span>
                    <span className="text-[10px] text-gray-400 uppercase font-bold">
                      Mentee
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
                  <div
                    className={`${item.color} h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(1,59,53,0.2)]`}
                    style={{ width: `${(item.peminat / 150) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Tambahan / Insight Cepat */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#013B35] p-6 rounded-2xl text-white shadow-lg relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4">
              <BarChart3 size={120} />
            </div>

            <h4 className="text-sm font-bold uppercase tracking-widest opacity-80 mb-4">
              Insight Bulan Ini
            </h4>
            <p className="text-lg font-medium leading-relaxed mb-6">
              Program{" "}
              <span className="text-orange-300 underline decoration-2 underline-offset-4 font-bold">
                Teknik Informatika
              </span>{" "}
              memiliki pertumbuhan minat tertinggi sebesar 24% dibandingkan
              bulan lalu.
            </p>
            <button
              onClick={() => navigate("/dashboard-campus/add-program")}
              className="flex items-center text-xs font-bold gap-1 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-full transition"
            >
              Buat Program Untuk Kampus Anda <ChevronRight size={14} />
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 text-sm mb-4">
              Demografi Terbanyak
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Asal Kota</span>
                <span className="font-bold text-[#013B35]">Batam (62%)</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Tingkat Sekolah</span>
                <span className="font-bold text-[#013B35]">SMA/SMK (88%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
