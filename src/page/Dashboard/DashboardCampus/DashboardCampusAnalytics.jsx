import React, { useEffect } from "react";
import {
  BarChart3,
  Users,
  MousePointerClick,
  Trophy,
  Download,
  Calendar,
  ChevronRight,
  MapPin,
  Lock,
} from "lucide-react";
import { useNavigate } from "react-router";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import useGetDashboardStatistics from "@/hooks/hooksCampus/useGetDashboardStatistics";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import AnalyticsPageSkeletonLoading from "@/components/AnalyticsPageSkeletonLoading";

const PremiumLockOverlay = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/20 backdrop-blur-[2px] animate-in fade-in duration-500">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center border border-white/50 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#013B35] to-orange-400"></div>
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-orange-50 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-blue-50 rounded-full opacity-50 blur-3xl"></div>

        <div className="relative z-10">
          <div className="w-20 h-20 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm transform rotate-3 hover:rotate-0 transition-transform duration-300 ring-4 ring-white">
            <Lock className="w-10 h-10 text-orange-500" />
          </div>

          <h3 className="text-2xl font-bold text-[#013B35] mb-3 tracking-tight">
            Fitur Terkunci
          </h3>

          <p className="text-gray-500 mb-8 leading-relaxed text-sm">
            Halaman analitik ini eksklusif untuk mitra Premium. Tingkatkan
            kemitraan Anda untuk mengakses wawasan mendalam tentang performa
            program.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => navigate("/dashboard-campus/berlangganan")}
              className="w-full bg-[#013B35] hover:opacity-80 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-[#013B35]/20 transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2 group"
            >
              <span>Berlangganan Premium</span>
              <ChevronRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>

            <button
              onClick={() => navigate(-1)}
              className="w-full bg-white hover:bg-gray-50 text-gray-600 font-semibold py-3 px-6 rounded-xl border border-gray-200 transition-colors text-sm"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AnalyticsPage = () => {
  const token = localStorage.getItem("userJwt");
  const navigate = useNavigate();
  const {
    statistics,
    isLoading,
    error,
    status,
    clearStatistics,
    fetchDashboardStatistics,
  } = useGetDashboardStatistics();

  useEffect(() => {
    // Membersihkan state hook (error, success message) saat komponen unmount
    return () => {
      clearStatistics();
    };
  }, [token, clearStatistics]);

  // fetch data
  useEffect(() => {
    if (token) {
      fetchDashboardStatistics(token);
    }
  }, [token, fetchDashboardStatistics]);

  const displayData = statistics ?? {};
  // console.log(displayData);

  // get total profile and program visits
  const total_profile_visits = displayData.total_profile_visits ?? 0;
  const total_program_visits = displayData.total_program_visits ?? 0;

  // get major favorit
  const favorite_major =
    displayData?.major_interests?.length > 0
      ? displayData.major_interests.reduce((prev, current) =>
          prev.total_interest > current.total_interest ? prev : current
        )
      : null;

  const majorInterest = displayData?.major_interests ?? [];

  // get address city mentee (get top 5)
  const cityDistribution =
    displayData?.mentee_demographics?.city_distribution || [];
  const educationDistribution =
    displayData?.mentee_demographics?.education_status_distribution || [];

  const formatStatus = (text) =>
    text?.replace(/_/g, " ").replace(/\s+/g, " ").trim();

  // Hitung total khusus untuk edukasi agar persentase akurat berdasarkan data edukasi yang ada
  const totalEducation =
    educationDistribution.reduce((acc, curr) => acc + curr.total, 0) || 1;

  if (isLoading) {
    return <AnalyticsPageSkeletonLoading />;
  }

  const isLocked = status === 403;

  return (
    <div className="relative min-h-screen bg-gray-50 text-gray-800 font-sans">
      {isLocked && <PremiumLockOverlay />}

      <div
        className={`transition-all duration-500 ${
          isLocked
            ? "blur-md pointer-events-none select-none h-screen overflow-hidden opacity-40"
            : ""
        }`}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#013B35]">
              Analitik Mendalam
            </h1>
            <p className="text-gray-500 text-sm">
              Data statistik ketertarikan mentee terhadap profil dan program
              Anda.
            </p>
          </div>
        </div>

        {/* Grid Statistik Utama */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card 1: Profil Visits */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-blue-400 flex items-center gap-4 cursor-help">
                  <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
                    <Users size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Total Kunjungan Profil
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900 font-mono">
                      {total_profile_visits}
                    </h3>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-white p-3 shadow-xl border border-gray-100 rounded-xl max-w-[250px]">
                <div className="space-y-2 text-gray-700">
                  <p className="font-bold text-xs uppercase text-blue-600">
                    Engagement Valid
                  </p>
                  <p className="text-xs">
                    Dihitung dari kunjungan unik dengan durasi minimal 5 detik.
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Card 2: Program Visits */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-orange-400 flex items-center gap-4 cursor-help">
                  <div className="bg-orange-50 p-3 rounded-lg text-orange-600">
                    <MousePointerClick size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Total Kunjungan Program
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900 font-mono">
                      {total_program_visits}
                    </h3>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-white p-3 shadow-xl border border-gray-100 rounded-xl max-w-[250px]">
                <div className="space-y-2 text-gray-700">
                  <p className="font-bold text-xs uppercase text-orange-600">
                    Minat Program
                  </p>
                  <p className="text-xs">
                    Total akumulasi klik pada detail seluruh program aktif Anda.
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Card 3: Favorite Major */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-yellow-400 flex items-center gap-4">
            <div className="bg-yellow-50 p-3 rounded-lg text-yellow-600">
              <Trophy size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Jurusan Terfavorit
              </p>
              <h3 className="text-xl font-bold text-gray-900 truncate max-w-[150px]">
                {favorite_major?.total_interest > 0
                  ? favorite_major.major_name
                  : "N/A"}
              </h3>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Chart Minat Jurusan */}
          <div className="lg:col-span-8 bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h4 className="font-bold text-[#013B35] text-lg">
                  Minat Jurusan
                </h4>
                <p className="text-xs text-gray-400 mt-1">
                  Data diambil berdasarkan pilihan minat saat pendaftaran
                  mentee.
                </p>
              </div>
              <BarChart3 size={20} className="text-gray-300" />
            </div>

            <div className="space-y-6">
              {majorInterest.map((item, index) => (
                <div key={index} className="group cursor-default">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700 group-hover:text-[#013B35] transition-colors uppercase">
                      {item.major_name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-900">
                        {item.total_interest}
                      </span>
                      <span className="text-[10px] text-gray-400 uppercase font-bold">
                        Mentee
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-[#013B35] h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${
                          (item.total_interest /
                            (favorite_major?.total_interest || 1)) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Insights & Demographics */}
          <div className="lg:col-span-4 space-y-6">
            {/* Inshight Card */}
            <div className="bg-[#013B35] p-6 rounded-2xl text-white shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4">
                <BarChart3 size={120} />
              </div>
              <h4 className="text-sm font-bold uppercase tracking-widest opacity-80 mb-4">
                Insight Kampus
              </h4>
              <p className="text-lg font-medium leading-relaxed mb-6">
                Jurusan{" "}
                <span className="text-orange-300 font-bold underline decoration-2">
                  {favorite_major?.major_name || "---"}
                </span>{" "}
                saat ini paling diminati oleh pendaftar.
              </p>
              <button
                onClick={() => navigate("/dashboard-campus/add-program")}
                className="flex items-center text-xs font-bold gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition w-full justify-center border border-white/20"
              >
                Tambah Program Baru <ChevronRight size={14} />
              </button>
            </div>

            {/* Demographics Card (UX Improved with Progress Bars) */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md">
              <h4 className="font-bold text-gray-900 text-sm mb-6 flex items-center gap-2">
                <MapPin size={16} className="text-red-500" />
                Analisis Demografi
              </h4>

              <div className="space-y-8">
                {/* City Distribution - Condensed & Professional */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Sebaran Kota Terbanyak
                    </p>
                    <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-500">
                      {cityDistribution.length} Kota
                    </span>
                  </div>

                  <div className="space-y-2 max-h-[160px] overflow-y-auto pr-2 custom-scrollbar">
                    {cityDistribution
                      .sort((a, b) => b.total - a.total)
                      .slice(0, 5) // Tampilkan Top 5 saja agar profesional
                      .map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 rounded-lg bg-gray-50/50 border border-transparent hover:border-gray-200 transition-all"
                        >
                          <div className="flex items-center gap-2">
                            <span className="flex items-center justify-center w-5 h-5 text-[10px] font-bold bg-white border border-gray-200 rounded-full text-gray-400">
                              {index + 1}
                            </span>
                            <span className="text-xs font-semibold text-gray-700 truncate max-w-[120px]">
                              {item.city}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-black text-[#013B35]">
                              {item.total}
                            </span>
                            <span className="text-[10px] text-gray-400">
                              Mentee
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200"></div>

                {/* Education Distribution */}
                <div className="space-y-4">
                  <p className="text-xs font-medium text-gray-500">
                    Distribusi Tingkat Sekolah
                  </p>
                  {educationDistribution.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600 font-medium">
                          {formatStatus(item.status)}
                        </span>
                        <span className="font-bold text-[#013B35]">
                          {item.total}
                        </span>
                      </div>
                      <div className="w-full bg-gray-50 rounded-full h-2">
                        <div
                          className="bg-orange-400 h-2 rounded-full"
                          style={{
                            width: `${(item.total / totalEducation) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
