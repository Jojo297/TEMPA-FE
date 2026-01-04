import useGetDashboardData from "@/hooks/hooksAdmin/useGetDashboardData";
import DashboardAdminBerandaSkeleton from "@/components/DashboardAdminBerandaSkeleton";
import { jwtDecode } from "jwt-decode";
import {
  GraduationCap,
  ListCheck,
  Search,
  University,
  UserCheck,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import useGetProgramCampusChart from "@/hooks/hooksAdmin/useGetProgramCampusChart";

export default function DashboardAdminBeranda() {
  const { dashboardData, isLoading, error, fetchDashboardData } =
    useGetDashboardData();
  const {
    programChartData,
    isLoadingProgramChart,
    errorProgramChart,
    fetchProgramCampusChart,
  } = useGetProgramCampusChart();
  const token = localStorage.getItem("userJwt");
  const decode = jwtDecode(token);

  const chartData = dashboardData?.program_per_campus ?? [];

  const displayDashboardData = dashboardData ?? [];
  const displayProgramChartData = programChartData ?? [];
  // console.log(displayProgramChartData);

  // fetch program campus for chart
  useEffect(() => {
    if (token) {
      fetchProgramCampusChart(token);
    }
  }, [token]);

  // fetch dashboard data (total campus, total program, total mentee and data chart)
  useEffect(() => {
    if (token) {
      fetchDashboardData(token);
    }
  }, [token]);

  if (isLoading) {
    return <DashboardAdminBerandaSkeleton />;
  }

  // card hover in chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-800">{label}</p>
          <p className="text-xs text-gray-700">
            Total Program:{" "}
            <span className="font-bold text-base text-teal-600">
              {payload[0].value}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  // card hover in chart mentee
  const CustomTooltipMentee = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-800">{label}</p>
          <p className="text-xs text-gray-700">
            Total Mentee:{" "}
            <span className="font-bold text-base text-teal-600">
              {payload[0].value}
            </span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {payload[0].payload.campus_name}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-2 w-full">
      {/* HEADER */}
      <div className="mb-6">
        <p className="text-sm text-gray-700">SELAMAT DATANG,</p>
        <h1 className="text-3xl font-bold text-[#003631]">{decode.username}</h1>
      </div>

      {/* === CARDS === */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 mb-6">
        {/* Card Total Program */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md flex items-center gap-5">
          <div className="bg-blue-100 text-blue-600 rounded-full p-3">
            <University size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Campus</p>
            <p className="text-2xl font-bold text-gray-800">
              {displayDashboardData.total_campus_accepted}
            </p>
          </div>
        </div>

        {/* Card Total Jurusan */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md flex items-center gap-5">
          <div className="bg-orange-100 text-orange-600 rounded-full p-3">
            <GraduationCap size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Program</p>
            <p className="text-2xl font-bold text-gray-800">
              {displayDashboardData.total_program}
            </p>
          </div>
        </div>

        {/* Card Total Mentee */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md flex items-center gap-5">
          <div className="bg-purple-100 text-purple-600 rounded-full p-3">
            <UserCheck size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Mentee</p>
            <p className="text-2xl font-bold text-gray-800">
              {displayDashboardData.total_mentee}
            </p>
          </div>
        </div>
      </div>
      {/* === END CARDS === */}

      {/* === CHART SECTION === */}
      <section className="bg-white w-full rounded-xl p-6 text-gray-800 shadow-md mb-6 border border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h3 className="text-xl font-bold">
            Jumlah Progam Berdasarkan Kampus{" "}
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
                  dataKey="campus_name"
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
                  tickFormatter={(value) => `${value} Program`}
                />

                <Tooltip cursor={false} content={<CustomTooltip />} />

                <Bar
                  dataKey="total_program"
                  fill="#5CC6BA"
                  radius={[4, 4, 0, 0]}
                  minPointSize={5}
                >
                  <LabelList
                    dataKey="total_program" // Pastikan ini sesuai dengan key di data Anda
                    content={(props) => <text {...props} fill="#013D3A" />} // Mengubah warna label menjadi gelap
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            // Jika tidak ada data program, tampilkan pesan
            <div className="flex flex-col gap-4 justify-center items-center h-full text-center p-4">
              <p className="text-gray-700 text-lg font-medium">
                Belum ada Program yang terdaftar.
              </p>
            </div>
          )}
        </div>

        <div className="text-center mt-4 text-xs text-gray-600">
          Data Mentee (Per Program)
        </div>
      </section>
      {/* === END CHART SECTION === */}

      {/* === CHART PROGRAM SECTION === */}
      <section className="bg-white w-full rounded-xl p-6 text-gray-800 shadow-md mb-6 border border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h3 className="text-xl font-bold">
            Jumlah Pendaftaran Mentee per Program
          </h3>
        </div>

        <div className="h-80 w-full">
          {/* === START: Conditional Rendering === */}
          {displayProgramChartData && displayProgramChartData.length > 0 ? (
            // Jika ada data program, tampilkan BarChart
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={displayProgramChartData}
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

                <Tooltip cursor={false} content={<CustomTooltipMentee />} />

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
                Belum ada Kampus yang terdaftar.
              </p>
            </div>
          )}
        </div>

        <div className="text-center mt-4 text-xs text-gray-600">
          Data Program (Per Kampus)
        </div>
      </section>
      {/* === END CHART PROGRAM SECTION === */}
    </div>
  );
}
