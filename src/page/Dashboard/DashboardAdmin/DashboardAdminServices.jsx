import useGetAllCampus from "@/hooks/hooksAdmin/useGetAllCampus";
import DashboardAdminCampusSkeleton from "@/components/DashboardAdminCampusSkeleton";
import { Search, Trash2, AlertTriangleIcon, Eye } from "lucide-react";
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
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
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
import { toast } from "sonner";
import useGetSubscriptionPackages from "@/hooks/hooksAdmin/useGetSubscriptionPackages";
import ServiceDialogContent from "@/components/ServiceDialogContent";
import AddServiceDialog from "@/components/AddServiceDialog";

export default function DashboardAdminServices() {
  const navigate = useNavigate();
  const token = localStorage.getItem("userJwt");
  const { packages, isLoading, error, fetchPackages } =
    useGetSubscriptionPackages();
  const [searchQuery, setSearchQuery] = useState("");
  const [services, setServices] = useState([]); // Placeholder if you want to maintain local state, but we will use displayPackage directly for reading
  const [selectedService, setSelectedService] = useState(null);
  const [isDialogEdit, setIsDialogEdit] = useState(false);

  const displayPackage = packages ?? [];
  // console.log(displayPackage);

  useEffect(() => {
    if (token) {
      fetchPackages(token);
    }
  }, [token, fetchPackages]);

  const filteredData = displayPackage.filter((item) =>
    item.package_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpdateService = (id, updatedData) => {
    toast.info("Fitur ubah layanan belum terhubung ke API.");
  };

  const handleEditClick = (item) => {
    setSelectedService(item);
    setIsDialogEdit(true);
  };

  // get status color
  const getStatusColor = (status) => {
    if (status) {
      return "text-amber-600 border-amber-200 bg-amber-50";
    } else {
      return "text-green-600 border-green-200 bg-green-50";
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
            <BreadcrumbPage className="text-primary">Layanan</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className=" mb-8 text-center">
        <div className="bg-primary text-white rounded-xl p-6 shadow">
          <h1 className="text-2xl font-bold mb-2">Layanan</h1>
          <p className="text-sm max-w-2xl mx-auto">
            Kelola data layanan yang tersedia dalam sistem. Anda dapat menambah,
            melihat, mengubah, dan menghapus layanan.
          </p>
        </div>
      </div>
      {/* verivication campus */}
      <div className="bg-white text-gray-900 shadow-md rounded-xl border border-gray-200 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-primary">Layanan</h2>
          <div className="flex gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Cari layanan..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <AddServiceDialog refetch={() => fetchPackages(token)} />
          </div>
        </div>

        <div className="rounded-md border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow className="hover:bg-gray-50 border-b border-gray-200">
                <TableHead className="text-gray-700  font-bold w-[50px]">
                  No
                </TableHead>
                <TableHead className="text-gray-700 font-bold">
                  Nama Layanan
                </TableHead>
                <TableHead className="text-gray-700 font-bold"></TableHead>

                <TableHead className="text-gray-700  font-bold">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
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
                            {item.package_name}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-3 py-1 text-xs rounded-md border ${getStatusColor(
                          item.free_trial
                        )} font-semibold whitespace-nowrap`}
                      >
                        {item.free_trial ? "Gratis Uji Coba" : "Biasa"}
                      </span>
                    </TableCell>
                    <TableCell className="flex gap-4">
                      {/* lihat detail */}
                      <Button
                        className="bg-secondary hover:bg-secondary hover:opacity-70 transition"
                        onClick={() => handleEditClick(item)}
                      >
                        {<Eye size={16} />} Lihat Detail
                      </Button>

                      {/* delete sevive */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            className={
                              "bg-red-500 hover:opacity-60 transition text-white px-4 py-2 text-sm rounded-lg shadow-md flex items-center gap-2"
                            }
                          >
                            {<Trash2 size={16} />}
                            Hapus Layanan
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader className="flex flex-col items-center gap-1">
                            <div className="bg-gray-200 p-2 rounded-sm">
                              {/* AlertTriangleIcon hanya muncul jika className kosong/null/undefined */}
                              <AlertTriangleIcon className="text-gray-400" />
                            </div>

                            <AlertDialogTitle className="text-xl font-semibold">
                              Hapus Layanan {item.package_name}?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-600 mb-4 text-center">
                              Apakah Anda yakin ingin menghapus layanan ini?
                              Mohon pertimbangkan kembali keputusan Anda karena
                              Anda tidak akan bisa mengembalikan (undo) tindakan
                              ini.
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <AlertDialogFooter className="mt-6 flex justify-end gap-3">
                            {/* Tombol Batal */}
                            <AlertDialogCancel className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg">
                              Batal
                            </AlertDialogCancel>

                            {/* Tombol Hapus (Mengikuti Style Merah di Gambar) */}
                            <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-1">
                              <Trash2 size={16} /> Hapus
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center py-8 text-gray-500"
                  >
                    Tidak ada data layanan yang ditemukan.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={isDialogEdit} onOpenChange={setIsDialogEdit}>
        {selectedService && (
          <ServiceDialogContent
            item={selectedService}
            refetch={() => fetchPackages(token)}
            onOpenChange={setIsDialogEdit}
          />
        )}
      </Dialog>
    </div>
  );
}
