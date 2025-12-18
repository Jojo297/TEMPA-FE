import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetDashboardData from "@/hooks/hooksAdmin/useGetDashboardData";
import {
  GraduationCap,
  ListCheck,
  University,
  UserCheck,
  Users,
} from "lucide-react";
import { useEffect } from "react";
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

export default function DashboardAdminBeranda() {
  const { dashboardData, isLoading, error, fetchDashboardData } =
    useGetDashboardData();
  const token = localStorage.getItem("userJwt");
  const navigate = useNavigate();

  const data = [
    {
      id: 1,
      name: "Universitas Teknologi Digital",
      desc: "Jakarta Selatan | Terakreditasi A",
      status: "Belum Diverifikasi",
      statusClasses: "text-amber-600 border-amber-200 bg-amber-50",
    },
    {
      id: 2,
      name: "Institut Sains & Bisnis",
      desc: "Bandung | Terakreditasi B",
      status: "Belum Diverifikasi",
      statusClasses: "text-amber-600 border-amber-200 bg-amber-50",
    },
    {
      id: 3,
      name: "Politeknik Harapan Bangsa",
      desc: "Surabaya | Terakreditasi A",
      status: "Data Diterima",
      statusClasses: "text-green-600 border-green-200 bg-green-50",
    },
    {
      id: 4,
      name: "Akademi Kreatif Nusantara",
      desc: "Yogyakarta | Terakreditasi C",
      status: "Data Ditolak",
      statusClasses: "text-red-600 border-red-200 bg-red-50",
    },
  ];

  const chartData = dashboardData?.program_per_campus ?? [];
  console.log(chartData);

  useEffect(() => {
    if (token) {
      fetchDashboardData(token);
    }
  }, [token]);

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

  return (
    <div className="p-2 w-full">
      {/* HEADER */}
      <div className="mb-6">
        <p className="text-sm text-gray-700">SELAMAT DATANG,</p>
        <h1 className="text-3xl font-bold text-[#003631]">Admin Tempa</h1>
      </div>

      {/* === STATS CARDS === */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 mb-6">
        {/* Card Total Program */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md flex items-center gap-5">
          <div className="bg-blue-100 text-blue-600 rounded-full p-3">
            <University size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Campus</p>
            <p className="text-2xl font-bold text-gray-800">{0}</p>
          </div>
        </div>

        {/* Card Total Jurusan */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md flex items-center gap-5">
          <div className="bg-orange-100 text-orange-600 rounded-full p-3">
            <GraduationCap size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Program</p>
            <p className="text-2xl font-bold text-gray-800">{0}</p>
          </div>
        </div>

        {/* Card Total Mentee */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md flex items-center gap-5">
          <div className="bg-purple-100 text-purple-600 rounded-full p-3">
            <UserCheck size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Mentee</p>
            <p className="text-2xl font-bold text-gray-800">{0}</p>
          </div>
        </div>
      </div>
      {/* === END STATS CARDS === */}

      {/* === CHART SECTION === */}
      <section className="bg-white w-full rounded-xl p-6 text-gray-800 shadow-md mb-6 border border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h3 className="text-xl font-bold">
            Jumlah Progam Berdasarkan Kampus
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
                Belum ada Kampus yang terdaftar.
              </p>
            </div>
          )}
        </div>

        <div className="text-center mt-4 text-xs text-gray-600">
          Data Program (Per Kampus)
        </div>
      </section>

      {/* verivication campus */}
      <div className="bg-white text-gray-900 shadow-md rounded-xl border border-gray-200 p-6 sm:p-8">
        <h2 className="text-2xl font-bold mb-8 text-primary">
          Verifikasi Kampus
        </h2>

        <div className="rounded-md border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow className="hover:bg-gray-50 border-b border-gray-200">
                <TableHead className="text-gray-700 font-bold w-[50px]">
                  No
                </TableHead>
                <TableHead className="text-gray-700 font-bold">
                  Kampus
                </TableHead>
                <TableHead className="text-gray-700 font-bold">
                  Status
                </TableHead>
                <TableHead className="text-gray-700 font-bold text-right">
                  Aksi
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-gray-50 border-b border-gray-100 transition-colors"
                >
                  <TableCell className="font-medium text-gray-700">
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-semibold text-base truncate text-gray-900">
                          {item.name}
                        </p>
                        <p className="text-gray-500 text-xs truncate">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 text-xs rounded-md border ${item.statusClasses} font-semibold whitespace-nowrap`}
                    >
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <button
                      onClick={() => navigate("/dashboard-admin/verifikasi")}
                      className="bg-secondary text-white font-semibold px-6 py-1.5 text-sm rounded-md shadow-sm hover:bg-[#003631]/90 transition"
                    >
                      Verifikasi
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
