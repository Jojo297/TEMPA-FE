import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Users, TrendingUp, VenusAndMars } from "lucide-react";

const COLORS = ["#013B35", "#26C6B5", "#D1FAE5"];

// Helper untuk membersihkan teks enum status pendidikan yang berantakan
const formatStatus = (text) =>
  text?.replace(/_/g, " ").replace(/\s+/g, " ").trim();

// Tambahkan library format date jika diperlukan, atau tetap gunakan toLocaleDateString
export function ParticipantAnalytics({ menteeList }) {
  const stats = useMemo(() => {
    if (!menteeList || menteeList.length === 0) return null;

    // Mengambil data distribusi (asumsi data ini sama di setiap item menteeList dari backend)
    const cityDistribution = menteeList[0]?.city_distribution || [];
    const educationDistribution =
      menteeList[0]?.education_status_distribution || [];

    // Hitung Tren Pendaftaran
    const trendMap = {};
    menteeList.forEach((m) => {
      const date = new Date(m.create_at).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
      });
      trendMap[date] = (trendMap[date] || 0) + 1;
    });

    const trendData = Object.keys(trendMap)
      .map((date) => ({
        date,
        pendaftar: trendMap[date],
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(-7);

    return {
      total: menteeList.length,
      trendData,
      cityDistribution,
      educationDistribution,
    };
  }, [menteeList]);

  if (!stats) return null;
  const { cityDistribution, educationDistribution } = stats;

  const totalEducation =
    stats.educationDistribution.reduce((acc, curr) => acc + curr.total, 0) || 1;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6 mt-4">
      {/* Kolom Kiri: Demografi (4 Kolom) */}
      <div className="lg:col-span-4 space-y-4">
        {/* Card Total */}
        <div className="bg-white p-5 rounded-xl border shadow-sm flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-lg text-primary">
              <Users size={20} />
            </div>
            <p className="text-sm font-semibold text-gray-500 uppercase">
              Total Peserta
            </p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>

        {/* Card Detail Demografi */}
        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <div className="space-y-6">
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

      {/* Kolom Kanan: Area Chart (8 Kolom) */}
      <div className="lg:col-span-8 bg-white p-6 rounded-xl border shadow-sm flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-primary mb-1">
              <TrendingUp size={18} />
              <span className="text-sm font-bold uppercase tracking-wider">
                Tren Pendaftaran
              </span>
            </div>
            <p className="text-xs text-gray-400 font-medium">
              Statistik pertumbuhan peserta dalam 7 periode terakhir
            </p>
          </div>
        </div>

        <div className="flex-1 w-full min-h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={stats.trendData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorPendaftar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#013B35" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#013B35" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#F3F4F6"
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#9CA3AF", fontWeight: 500 }}
                dy={15}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#9CA3AF" }}
              />
              <Tooltip
                cursor={{
                  stroke: "#013B35",
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                }}
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                }}
              />
              <Area
                type="monotone"
                dataKey="pendaftar"
                stroke="#013B35"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorPendaftar)"
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
