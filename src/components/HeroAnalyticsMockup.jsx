import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users, TrendingUp } from "lucide-react";

import { motion } from "framer-motion";

// ─── Static mock data for hero analytics ────────────────────────────────────
const MOCK_TREND = [
  { date: "01 Jun", pendaftar: 18 },
  { date: "05 Jun", pendaftar: 34 },
  { date: "10 Jun", pendaftar: 27 },
  { date: "15 Jun", pendaftar: 52 },
  { date: "20 Jun", pendaftar: 44 },
  { date: "25 Jun", pendaftar: 71 },
  { date: "29 Jun", pendaftar: 89 },
];

const MOCK_CITIES = [
  { city: "Batam", total: 412 },
  { city: "Jakarta", total: 278 },
  { city: "Surabaya", total: 193 },
  { city: "Bandung", total: 167 },
  { city: "Medan", total: 124 },
];

const MOCK_EDUCATION = [
  { status: "SMA / SMK Kelas 12", total: 624 },
  { status: "SMA / SMK Kelas 11", total: 389 },
  { status: "SMA / SMK Kelas 10", total: 156 },
  { status: "Lainnya", total: 78 },
];

// ─── Hero Analytics Mockup (mirip ParticipantAnalytics) ──────────────────────
export function HeroAnalyticsMockup() {
  const totalEducation = MOCK_EDUCATION.reduce((a, c) => a + c.total, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* Kolom Kiri: Demografi (4 kolom) */}
      <div className="lg:col-span-4 space-y-4">
        {/* Card Total Peserta */}
        <div className="bg-white p-5 rounded-xl border shadow-sm flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-lg text-[#013B35]">
              <Users size={20} />
            </div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Total Peminat
            </p>
          </div>
          <p className="text-2xl font-bold text-gray-900">1.247</p>
        </div>

        {/* Card Demografi */}
        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <div className="space-y-5">
            {/* Sebaran Kota */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Sebaran Kota Terbanyak
                </p>
                <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-500">
                  5 Kota
                </span>
              </div>
              <div className="space-y-1.5">
                {MOCK_CITIES.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 rounded-lg bg-gray-50/50 border border-transparent hover:border-gray-200 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center w-5 h-5 text-[10px] font-bold bg-white border border-gray-200 rounded-full text-gray-400">
                        {index + 1}
                      </span>
                      <span className="text-xs font-semibold text-gray-700 truncate max-w-[100px]">
                        {item.city}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-black text-[#013B35]">
                        {item.total}
                      </span>
                      <span className="text-[10px] text-gray-400">Peminat</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* Distribusi Tingkat Sekolah */}
            <div className="space-y-3">
              <p className="text-xs font-medium text-gray-500">
                Distribusi Tingkat Sekolah
              </p>
              {MOCK_EDUCATION.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600 font-medium">
                      {item.status}
                    </span>
                    <span className="font-bold text-[#013B35]">
                      {item.total}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(item.total / totalEducation) * 100}%`,
                      }}
                      transition={{ duration: 0.9, delay: 0.4 + index * 0.12 }}
                      className="h-1.5 rounded-full bg-orange-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Kolom Kanan: Area Chart (8 kolom) */}
      <div className="lg:col-span-8 bg-white p-6 rounded-xl border shadow-sm flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-[#013B35] mb-1">
              <TrendingUp size={18} />
              <span className="text-sm font-bold uppercase tracking-wider">
                Tren Pendaftaran
              </span>
            </div>
            <p className="text-xs text-gray-400 font-medium">
              Statistik pertumbuhan peminat dalam 7 periode terakhir
            </p>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Real-time
          </div>
        </div>

        <div className="flex-1 w-full min-h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={MOCK_TREND}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="heroGradient" x1="0" y1="0" x2="0" y2="1">
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
                allowDecimals={false}
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
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="pendaftar"
                stroke="#013B35"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#heroGradient)"
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
