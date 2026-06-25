import { CirclePlus, Loader2, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
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
import HeaderPage from "@/components/HeaderPage";

export default function DashboardAdminMajors() {
  const token = localStorage.getItem("userJwt");
  const { standardMajors, isLoading, error, fetchStandardMajors } =
    useGetStandardMajors();
  const { deleteMajor, isLoading: isDeleting } = useDeleteStandardMajor();
  const [searchQuery, setSearchQuery] = useState("");

  const displayMajors = standardMajors ?? [];
  // console.log(displayMajors);

  // search majors by name
  const filteredMajors = displayMajors.filter((item) =>
    item.major_name.toLowerCase().includes(searchQuery.toLowerCase()),
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
      <HeaderPage
        title={"Jurusan"}
        description={
          "Kelola data jurusan standar yang tersedia dalam sistem. Anda dapat melihat detail dan mengelola informasi setiap jurusan."
        }
        badge={"Manage Majors"}
      />

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
            <Link
              to={`/dashboard-admin/jurusan-detail/${item.id}`}
              key={item.id}
              className="group bg-white border border-gray-100 rounded-xl flex flex-col items-center justify-center p-5 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-3.5 bg-primary/5 rounded-full text-primary mb-3 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <DynamicIcon name={item.logo_url} size={40} />
              </div>
              <p className="text-sm font-bold text-gray-700 text-center group-hover:text-primary transition-colors duration-300 line-clamp-2">
                {item.major_name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
