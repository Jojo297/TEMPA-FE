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
import useGetAllMentee from "@/hooks/hooksAdmin/useGetAllMentee";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DashboardAdminMentee() {
  const navigate = useNavigate();
  const token = localStorage.getItem("userJwt");
  const { menteeData, isLoadingMentee, errorMentee, fetchAllMentee } =
    useGetAllMentee();
  const [searchQuery, setSearchQuery] = useState("");

  const displayMentee = menteeData ?? [];
  console.log(displayMentee.map((item) => item.registered_programs));
  // search campus by name
  const filteredMentee = displayMentee.filter((item) =>
    item.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // fetch all campus
  useEffect(() => {
    if (token) {
      fetchAllMentee(token);
    }
  }, [token]);

  if (isLoadingMentee) {
    return <DashboardAdminCampusSkeleton />;
  }

  // get status color and label for verivication status campus
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-green-600 border-green-200 bg-green-50";
      case "on_going":
        return "text-amber-600 border-amber-200 bg-amber-50";
      case "uncompleted":
        return "text-red-600 border-red-200 bg-red-50";
      default:
        return "text-gray-600 border-gray-200 bg-gray-50";
    }
  };

  // rename verification status campus
  const getStatusLabel = (status) => {
    switch (status) {
      case "completed":
        return "Lulus";
      case "on_going":
        return "Sedang Berjalan";
      case "uncompleted":
        return "Tidak Lulus";
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
            <BreadcrumbPage className="text-primary">Mentee</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className=" mb-8 text-center">
        <div className="bg-primary text-white rounded-xl p-6 shadow">
          <h1 className="text-2xl font-bold mb-2">Mentee</h1>
          <p className="text-sm max-w-2xl mx-auto">
            Kelola data mentee yang terdaftar dalam sistem. Pantau informasi
            pengguna mentee dan pastikan data akun yang ditampilkan valid.
          </p>
        </div>
      </div>
      {/* verivication campus */}
      <div className="bg-white text-gray-900 shadow-md rounded-xl border border-gray-200 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-primary">Mentee</h2>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Cari mentee..."
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
                  Nama Pengguna
                </TableHead>
                <TableHead className="text-gray-700  font-bold">
                  Email
                </TableHead>
                <TableHead className="text-gray-700  font-bold">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMentee.length > 0 ? (
                filteredMentee.map((item, index) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-gray-50 border-b border-gray-100 transition-colors"
                  >
                    <TableCell className="font-medium text-gray-700">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="min-w-0">
                          <p className="font-semibold text-base truncate text-gray-900">
                            {item.username}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-semibold text-base truncate text-gray-900">
                        {item.email}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="bg-secondary hover:bg-secondary hover:opacity-70 transition">
                            Lihat Detail
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Detail Program</DialogTitle>
                            <DialogDescription>
                              Daftar program yang diikuti oleh mentee.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="max-h-[400px] overflow-y-auto pr-2">
                            {item.registered_programs &&
                            item.registered_programs.length > 0 ? (
                              <div className="grid gap-4">
                                {item.registered_programs.map(
                                  (program, idx) => (
                                    <div
                                      key={idx}
                                      className="border rounded-lg p-4 bg-gray-50 space-y-3"
                                    >
                                      <div className="space-y-1">
                                        <Label className="text-xs text-gray-500">
                                          Nama Program
                                        </Label>
                                        <div className="font-medium text-sm text-gray-900">
                                          {program.program_name}
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                          <Label className="text-xs text-gray-500">
                                            Status
                                          </Label>
                                          <div
                                            className={`text-sm capitalize font-medium px-2 py-1 rounded-md border w-fit ${getStatusColor(
                                              program.completion_status
                                            )}`}
                                          >
                                            {getStatusLabel(
                                              program.completion_status
                                            )}
                                          </div>
                                        </div>
                                        <div className="space-y-1">
                                          <Label className="text-xs text-gray-500">
                                            Tanggal Selesai
                                          </Label>
                                          <div className="text-sm font-medium text-gray-900">
                                            {program.completion_date
                                              ? new Date(
                                                  program.completion_date
                                                ).toLocaleDateString("id-ID", {
                                                  day: "numeric",
                                                  month: "long",
                                                  year: "numeric",
                                                })
                                              : "-"}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            ) : (
                              <div className="text-center py-6 text-gray-500 text-sm">
                                Belum ada program yang diikuti.
                              </div>
                            )}
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button>Tutup</Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-8 text-gray-500"
                  >
                    Tidak ada data mentee yang ditemukan.
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
