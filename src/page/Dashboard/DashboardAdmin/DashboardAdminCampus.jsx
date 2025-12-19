import useGetAllCampus from "@/hooks/hooksAdmin/useGetAllCampus";
import DashboardAdminCampusSkeleton from "@/components/DashboardAdminCampusSkeleton";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function DashboardAdminCampus() {
  const navigate = useNavigate();
  const token = localStorage.getItem("userJwt");
  const { campusData, isLoadingCampus, errorCampus, fetchAllCampus } =
    useGetAllCampus();
  const [searchQuery, setSearchQuery] = useState("");

  const displayCampus = campusData ?? [];

  // search campus by name
  const filteredCampus = displayCampus.filter((item) =>
    item.campus_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // fetch all campus
  useEffect(() => {
    if (token) {
      fetchAllCampus(token);
    }
  }, [token]);

  if (isLoadingCampus) {
    return <DashboardAdminCampusSkeleton />;
  }

  // get status color and label for verivication status campus
  const getStatusColor = (status) => {
    switch (status) {
      case "accepted":
        return "text-green-600 border-green-200 bg-green-50";
      case "pending":
        return "text-amber-600 border-amber-200 bg-amber-50";
      case "rejected":
        return "text-red-600 border-red-200 bg-red-50";
      default:
        return "text-gray-600 border-gray-200 bg-gray-50";
    }
  };

  // rename verification status campus
  const getStatusLabel = (status) => {
    switch (status) {
      case "accepted":
        return "Diterima";
      case "pending":
        return "Belum dicek";
      case "null":
        return "Belum dicek";
      case "rejected":
        return "Ditolak";
      default:
        return status;
    }
  };
  return (
    <div className="p-2 w-full">
      {/* breadcum */}
      <Breadcrumb className="mb-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="hover:text-primary">
              <Link to="/dashboard-admin/beranda">Beranda</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="text-primary">
            <BreadcrumbPage className="text-primary">Kampus</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className=" mb-8 text-center">
        <div className="bg-primary text-white rounded-xl p-6 shadow">
          <h1 className="text-2xl font-bold mb-2">Kampus</h1>
          <p className="text-sm max-w-2xl mx-auto">
            Kelola data kampus yang terdaftar dalam sistem. Lakukan verifikasi
            terhadap pengajuan kampus baru, pantau status pendaftaran, dan
            pastikan informasi kampus yang ditampilkan valid.
          </p>
        </div>
      </div>
      {/* verivication campus */}
      <div className="bg-white text-gray-900 shadow-md rounded-xl border border-gray-200 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-primary">Verifikasi Kampus</h2>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Cari kampus..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-md border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow className="hover:bg-gray-50 border-b border-gray-200">
                <TableHead className="text-gray-700  font-bold w-[50px]">
                  No
                </TableHead>
                <TableHead className="text-gray-700  font-bold">
                  Kampus
                </TableHead>
                <TableHead className="text-gray-700  font-bold">
                  Status
                </TableHead>
                <TableHead className="text-gray-700 text-center font-bold">
                  Aksi
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCampus.length > 0 ? (
                filteredCampus.map((item, index) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-gray-50 border-b border-gray-100 transition-colors"
                  >
                    <TableCell className="font-medium text-gray-700">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={item.logo_url}
                          alt=""
                          className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-base truncate text-gray-900">
                            {item.campus_name}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-3 py-1 text-xs rounded-md border ${getStatusColor(
                          item.verification_status
                        )} font-semibold whitespace-nowrap`}
                      >
                        {getStatusLabel(item.verification_status)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {item.verification_status === "accepted" ? (
                        <button
                          onClick={() =>
                            navigate(
                              `/dashboard-admin/detail-kampus/${item.id}`
                            )
                          }
                          className="px-4 py-1.5 text-sm hover:underline"
                        >
                          Lihat Detail
                        </button>
                      ) : (
                        <Button
                          onClick={() =>
                            navigate(
                              `/dashboard-admin/verifikasi-campus/${item.id}`
                            )
                          }
                          className="bg-secondary text-white font-semibold px-6 py-1.5 text-sm rounded-md shadow-sm hover:bg-secondary hover:opacity-45 transition"
                        >
                          Verifikasi
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-8 text-gray-500"
                  >
                    Tidak ada data kampus yang ditemukan.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
