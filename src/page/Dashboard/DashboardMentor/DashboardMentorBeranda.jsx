import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import {
  Calendar,
  Users,
  Clock,
  ChevronDown,
  ListCheck,
  UserCheck,
  Home,
  Map,
} from "lucide-react";
import useGetProgramChart from "@/hooks/hooksMentor/useGetProgramChart";
import { Button } from "@/components/ui/button";
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import DeleteProgram from "@/components/DeleteProgram";
import { jwtDecode } from "jwt-decode";

export default function DashboardMentorBeranda() {
  const token = localStorage.getItem("userJwt");
  const decode = jwtDecode(token);
  // console.log(decode);
  const mentorName = decode.username;
  const mentorNik = decode.nik;
  const superMentor = decode.mentorType === "super_mentor";
  const { programs, totalProgram, isLoading, error, fetchPrograms } =
    useGetProgramChart();

  const displayTotalProgram = totalProgram ?? 0;

  const chartData = programs ?? [];

  const totalMentees = chartData.reduce(
    (acc, curr) => acc + (curr.total_mentee || 0),
    0
  );

  useEffect(() => {
    if (token) {
      fetchPrograms(token);
    }
  }, [token, fetchPrograms]);

  const displayProgram = [
    {
      id: 44,
      program_name: "asdd",
      description: "sssssssssssssssssssssssssssssssssssssssssssssssssssss",
      start_date: "2025-12-01T00:00:00.000Z",
      end_date: "2025-12-05T00:00:00.000Z",
      capacity: 100,
      onsiteLocationName: "sdsdsds",
      major_name: "Informatika",
      image_url:
        "http://localhost:8080/public/program_images/program-1765187165403-654485458.jpg",
      sesi_program: "onsite",
      visibility: "public",
    },
    {
      id: 43,
      program_name: "asdasd",
      description:
        "ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
      start_date: "2025-12-01T00:00:00.000Z",
      end_date: "2025-12-05T00:00:00.000Z",
      capacity: 111,
      onsiteLocationName: null,
      major_name: "Elektronika",
      image_url:
        "http://localhost:8080/public/program_images/program-1765081300655-974877072.png",
      sesi_program: "onsite",
      visibility: "public",
    },
  ];

  // badge for status program
  const getBadgeClass = (start_date, end_date) => {
    const today = new Date();
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    if (endDate.getTime() < today.getTime()) {
      return {
        text: "Tutup",
        bgColor: "bg-red-100",
        textColor: "text-red-800",
      };
    } else if (startDate.getTime() > today.getTime()) {
      return {
        text: "Buka",
        bgColor: "bg-green-200",
        textColor: "text-green-800",
      };
    } else {
      return {
        text: "Sedang Berjalan",
        bgColor: "bg-blue-100",
        textColor: "text-blue-800",
      };
    }
  };

  // Badge visibility
  const getBadgeVisibility = (visibility) => {
    const v = visibility ? visibility.toLowerCase() : "unknown";
    switch (v) {
      case "public":
        return {
          text: "Public",
          bgColor: "bg-blue-500",
          textColor: "text-white",
        };
      case "private":
        return {
          text: "Private",
          bgColor: "bg-neutral-800",
          textColor: "text-white",
        };
      default:
        return {
          text: "Unknown",
          bgColor: "bg-gray-500",
          textColor: "text-white",
        };
    }
  };

  // Get location
  const getLocation = (type_sesi, item) => {
    const lowerType = type_sesi ? type_sesi.toLowerCase() : "unknown";
    switch (lowerType) {
      case "online":
        return "Zoom/Gmeet";
      case "onsite":
        return item.onsiteLocationName;
      default:
        return "Tempat belum ditentukan";
    }
  };

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

  return (
    <div className="p-2 w-full">
      {/* HEADER */}
      <div>
        <p className="text-sm text-gray-700">SELAMAT DATANG,</p>
        <h1 className="text-3xl font-bold text-[#003631]">
          {mentorName} - {mentorNik}
        </h1>
      </div>

      {/* === STATS CARDS === */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
        {/* Card Total Program */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-5">
          <div className="bg-blue-100 text-blue-600 rounded-full p-3">
            <ListCheck size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Program</p>
            <p className="text-2xl font-bold text-gray-800">
              {displayTotalProgram}
            </p>
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

      {/* === CHART SECTION === */}
      <main className="flex-1 pt-6 mb-4 ">
        <section className="bg-white w-full rounded-xl p-6 text-primary shadow-md mb-6 border border-gray-200">
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
            ) : // Jika tidak ada data program, tampilkan pesan
            superMentor ? (
              <div className="flex flex-col gap-4 justify-center items-center h-full text-center p-4">
                <p className="text-gray-700 text-lg font-medium">
                  Belum ada program yang dibuat oleh kampus ini. Klik tombol
                  dibawah untuk membuat program.
                </p>
                <Button
                  onClick={() => navigate("/dashboard-mentor/program")}
                  className="bg-secondary text-white hover:bg-secondary hover:opacity-50 transition"
                >
                  Buat Program
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-4 justify-center items-center h-full text-center p-4">
                <p className="text-gray-700 text-lg font-medium">
                  Belum ada program yang dibuat oleh kampus ini atau Anda belum
                  ditambahkan untuk mengatur program
                </p>
              </div>
            )}
          </div>

          <div className="text-center mt-4 text-xs text-gray-600">
            Data Pendaftaran Mentee Total (Per Program)
          </div>
        </section>
      </main>
    </div>
  );
}
