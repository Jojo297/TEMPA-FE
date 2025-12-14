import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { Calendar, Users, Clock, ChevronDown } from "lucide-react";

export default function DashboardMentorBeranda() {
  // -------------------------
  // STATE HALAMAN
  // -------------------------
  const [page, setPage] = useState("main");

  // -------------------------
  // DATA CHART
  // -------------------------
  const data = [
    { jurusan: "Informatika", total_mentee: 105 },
    { jurusan: "Manajemen Bisnis", total_mentee: 150 },
    { jurusan: "Mesin", total_mentee: 70 },
    { jurusan: "Elektronika", total_mentee: 35 },
  ];

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

  // -------------------------------------------------------------------
  // 📌 HALAMAN 2 (SEMUA PROGRAM + FILTER)
  // -------------------------------------------------------------------
  if (page === "all-programs") {
    return (
      <div className="p-6 lg:p-10 w-full bg-white">
        {/* HEADER HIJAU */}
        <div className="bg-[#003631] text-center py-10 rounded-3xl text-white mb-10">
          <h1 className="text-3xl font-bold">Daftar Program yang Diampu</h1>
        </div>

        {/* FILTER */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <select className="border rounded-xl px-4 py-3 w-full md:w-1/4">
            <option>Online/Onsite</option>
            <option>Online</option>
            <option>Onsite</option>
          </select>

          <select className="border rounded-xl px-4 py-3 w-full md:w-1/4">
            <option>Pilih Jurusan</option>
            <option>Informatika</option>
            <option>Manajemen Bisnis</option>
            <option>Mesin</option>
          </select>

          <input
            type="text"
            placeholder="Cari Program"
            className="border rounded-xl px-4 py-3 w-full md:w-1/3"
          />
        </div>

        {/* LIST PROGRAM LENGKAP */}
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="w-full bg-white border rounded-2xl shadow-md overflow-hidden mb-6 flex flex-col lg:flex-row">
            {/* IMAGE */}
            <div className="relative w-full lg:w-1/3 h-48 lg:h-auto">
              <img
                src=""
                alt="Program"
                className="w-full h-full object-cover"
              />
              <h1 className="absolute bottom-4 left-4 text-white text-2xl font-extrabold drop-shadow-lg">
                KULIAH <br /> BERSERTIFIKAT
              </h1>
            </div>

            {/* CONTENT */}
            <div className="flex-1 px-6 py-4">
              <p className="text-center text-gray-700 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>

              <div className="flex justify-center gap-4 text-sm text-gray-700 mt-3">
                <span>Politeknik Negeri Batam</span>•<span>Informatika</span>•
                <span>Onsite</span>
              </div>

              <div className="border-b my-4"></div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-sm text-gray-700">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>10 Oktober 2025</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    <span>20 Orang</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>09.00 WIB - 12.00 WIB</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Tempat:</span>
                    <span>Gedung TA lt.12</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-5">
                <button className="flex-1 bg-[#DB0945] text-white py-2 rounded-lg">
                  Hapus Program
                </button>
                <button className="flex-1 bg-[#96CCEC] text-[#003631] py-2 rounded-lg">
                  Lihat Detail
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* BACK BUTTON */}
        <button
          className="mt-6 w-full bg-gray-200 hover:bg-gray-300 py-3 rounded-xl"
          onClick={() => setPage("main")}>
          Kembali ke Halaman Utama
        </button>
      </div>
    );
  }

  // -------------------------------------------------------------------
  // 📌 HALAMAN 1 (UTAMA)
  // -------------------------------------------------------------------
  return (
    <div className="p-6 lg:p-10 w-full bg-white">
      {/* HEADER */}
      <div>
        <p className="text-sm text-gray-700">SELAMAT DATANG,</p>
        <h1 className="text-3xl font-bold text-[#003631]">NAMA MENTOR</h1>
      </div>

      {/* CHART */}
      <div className="mt-8 bg-[#003631] p-6 rounded-3xl shadow-xl">
        <h2 className="text-white text-lg font-semibold mb-4">
          Jumlah Pendaftar Program per Jurusan
        </h2>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 20, left: 0, bottom: 50 }}>
              <XAxis
                dataKey="jurusan"
                stroke="#FFFFFF"
                tickLine={false}
                tick={{ angle: -25, dy: 10, fontSize: 11 }}
                interval={0}
                height={50}
              />

              <YAxis
                stroke="#FFFFFF"
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />

              <Tooltip cursor={false} content={<CustomTooltip />} />

              <Bar dataKey="total_mentee" fill="#5CC6BA" radius={[6, 6, 0, 0]}>
                <LabelList
                  dataKey="total_mentee"
                  content={(props) => (
                    <text
                      {...props}
                      fill="#FFFFFF"
                      fontSize={12}
                      fontWeight="bold"
                      textAnchor="middle"
                      dy={-6}>
                      {props.value}
                    </text>
                  )}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <p className="text-white text-xs text-center mt-3 opacity-70">
          Total pendaftar dalam satu jurusan
        </p>
      </div>

      {/* LIST PROGRAM (2 ITEM) */}
      <h2 className="mt-10 mb-4 text-2xl font-bold text-[#003631]">
        Daftar Program yang Diampu
      </h2>

      {[1, 2].map((item) => (
        <div
          key={item}
          className="w-full bg-white border rounded-2xl shadow-md overflow-hidden mb-6 flex flex-col lg:flex-row">
          {/* IMAGE */}
          <div className="relative w-full lg:w-1/3 h-48 lg:h-auto">
            <img src="" alt="Program" className="w-full h-full object-cover" />
            <h1 className="absolute bottom-4 left-4 text-white text-2xl font-extrabold drop-shadow-lg">
              KULIAH <br /> BERSERTIFIKAT
            </h1>
          </div>

          {/* CONTENT */}
          <div className="flex-1 px-6 py-4">
            <p className="text-center text-gray-700 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>

            <div className="flex justify-center gap-4 text-sm text-gray-700 mt-3">
              <span>Politeknik Negeri Batam</span>•<span>Informatika</span>•
              <span>Onsite</span>
            </div>

            <div className="border-b my-4"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-sm text-gray-700">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>10 Oktober 2025</span>
                </div>

                <div className="flex items-center gap-2">
                  <Users size={16} />
                  <span>20 Orang</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>09.00 WIB - 12.00 WIB</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-semibold">Tempat:</span>
                  <span>Gedung TA lt.12</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-5">
              <button className="flex-1 bg-[#DB0945] text-white py-2 rounded-lg">
                Hapus Program
              </button>
              <button className="flex-1 bg-[#96CCEC] text-[#003631] py-2 rounded-lg">
                Lihat Detail
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* SEE MORE BUTTON → PINDAH HALAMAN */}
      <div className="w-full mt-6">
        <button
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#003631] text-white rounded-xl hover:bg-[#002820]"
          onClick={() => setPage("all-programs")}>
          Lihat lebih banyak
          <ChevronDown size={20} />
        </button>
      </div>
    </div>
  );
}
