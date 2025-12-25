import useGetAllCampus from "@/hooks/hooksAdmin/useGetAllCampus";
import DashboardAdminCampusSkeleton from "@/components/DashboardAdminCampusSkeleton";
import { CirclePlus, Loader2, Search, X } from "lucide-react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useGetStandardMajors from "@/hooks/hooksAdmin/useGetStandardMajors";
import DynamicIcon from "@/components/DynamicIcon";
import { toast } from "sonner";
import AdminAddStandartMajor from "@/components/AdminAddStandartMajor";
import useDeleteStandardMajor from "@/hooks/hooksAdmin/useDeleteStandardMajor";
import AdminMajorsListSkeleton from "@/components/AdminMajorsListSkeleton";

export default function DashboardAdminMajors() {
  const navigate = useNavigate();
  const token = localStorage.getItem("userJwt");
  const { standardMajors, isLoading, error, fetchStandardMajors } =
    useGetStandardMajors();
  const { deleteMajor, isLoading: isDeleting } = useDeleteStandardMajor();
  const [searchQuery, setSearchQuery] = useState("");

  const displayMajors = standardMajors ?? [];
  // console.log(displayMajors);

  // search majors by name
  const filteredMajors = displayMajors.filter((item) =>
    item.major_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteMajor = async (id) => {
    const result = await deleteMajor(token, id);
    if (result.success) {
      toast.success(result.message || "Jurusan berhasil dihapus.");
      // Panggil kembali fetchStandardMajors untuk memperbarui daftar
      fetchStandardMajors(token);
    } else {
      toast.error(result.error || "Gagal menghapus jurusan.");
    }
  };

  // fetch all campus
  useEffect(() => {
    if (token) {
      fetchStandardMajors(token);
    }
  }, [token]);

  if (isLoading) {
    return <AdminMajorsListSkeleton />;
  }

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
            <BreadcrumbPage className="text-primary">Jurusan</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* header */}
      <div className=" mb-8 text-center">
        <div className="bg-primary text-white rounded-xl p-6 shadow">
          <h1 className="text-2xl font-bold mb-2">Jurusan</h1>
          <p className="text-sm max-w-2xl mx-auto">
            Kelola data jurusan standar yang tersedia dalam sistem. Anda dapat
            melihat detail dan mengelola informasi setiap jurusan.
          </p>
        </div>
      </div>

      {/* Majors Card */}
      <div className=" text-gray-900">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-primary">Jurusan</h2>
          <div className="flex gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Cari jurusan..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <AdminAddStandartMajor
              token={token}
              onSuccess={() => fetchStandardMajors(token)}
            />
          </div>
        </div>

        {/* card majors */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {filteredMajors.map((item) => (
            <div
              key={item.id}
              className="relative group bg-primary rounded-xl transition-transform duration-300 ease-in-out hover:scale-105"
            >
              <Link
                to={`/dashboard-admin/jurusan-detail/${item.id}`}
                className="flex flex-col items-center justify-center p-6 h-full w-full"
              >
                <DynamicIcon name={item.logo_url} size={48} color="white" />
                <p className="mt-2 text-sm font-medium text-center text-white">
                  {item.major_name}
                </p>
              </Link>
              {/* button delete major */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                  >
                    <X size={16} />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Hapus Jurusan "{item.major_name}"?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Tindakan ini tidak dapat diurungkan. Ini akan menghapus
                      jurusan secara permanen dari server.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDeleteMajor(item.id)}
                      disabled={isDeleting}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      {isDeleting && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Hapus
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
