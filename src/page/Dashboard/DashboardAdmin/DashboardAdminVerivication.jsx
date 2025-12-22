import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
import useGetDetailVerificationCampus from "@/hooks/hooksAdmin/useGetDetailVerificationCampus";
import { DisplayMapsLocation } from "@/components/DisplayMapsLocation";
import useAcceptCampus from "@/hooks/hooksAdmin/useAcceptCampus";
import useRejectCampus from "@/hooks/hooksAdmin/useRejectCampus";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import DashboardAdminVerificationSkeleton from "@/components/DashboardAdminVerificationSkeleton";
import RejectCampus from "@/components/RejectCampus";
import { Check } from "lucide-react";

export default function DashboardAdminVerivication() {
  const { id } = useParams();
  const navigate = useNavigate();
  const idCampus = parseInt(id);
  const token = localStorage.getItem("userJwt");
  const { detailCampus, isLoading, error, fetchDetailVerificationCampus } =
    useGetDetailVerificationCampus();
  const { isLoadingAccept, errorAccept, successMessage, acceptCampus } =
    useAcceptCampus();

  const displayCampus = detailCampus ?? [];
  // console.log(displayCampus);

  useEffect(() => {
    if (token) {
      fetchDetailVerificationCampus(token, idCampus);
    }
  }, [token]);

  const onSubmitAccept = async () => {
    if (token) {
      const result = await acceptCampus(token, idCampus);
      if (result.success) {
        toast.success(result.message || "Kampus berhasil diterima");
        navigate("/dashboard-admin/kampus");
      } else {
        toast.error(result.message || "Gagal menerima kampus");
      }
    }
  };

  if (isLoading) {
    return <DashboardAdminVerificationSkeleton />;
  }
  return (
    <>
      {/* breadcum */}
      <Breadcrumb className="mb-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="hover:text-primary">
              <Link to="/dashboard-admin/beranda">Beranda</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="hover:text-primary">
              <Link to="/dashboard-admin/kampus">Kampus</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="text-primary">
            <BreadcrumbPage className="text-primary">
              Verifikasi Kampus
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section className="mt-7 max-w-7xl bg-[#F8FAFB] mx-auto mb-20 flex flex-col items-start">
        {/* ====================== CARD PROGRAM ====================== */}
        <div className=" w-full mb-10">
          <div className="bg-white shadow-md rounded-xl p-6 border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[#013B35]">
                Verifikasi Kampus
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nama Program */}
              <div className="space-y-2">
                <Label>Nama Kampus</Label>
                <div className="p-2 border rounded-md bg-gray-50 text-sm text-gray-700">
                  {displayCampus.campus_name || "Data Kosong"}
                </div>
              </div>

              {/* Pilih Jurusan */}
              <div className="space-y-2">
                <Label>Email Kampus</Label>
                <div className="p-2 border rounded-md bg-gray-50 text-sm text-gray-700">
                  {displayCampus.email_campus || "Data Kosong"}
                </div>
              </div>

              {/* Jenis Pelaksanaan (Online/Onsite) */}
              <div className="space-y-2">
                <Label>Deskripsi Kampus</Label>
                <div className="p-2 border rounded-md bg-gray-50 text-sm text-gray-700">
                  {displayCampus.description || "Data Kosong"}
                </div>
              </div>

              {/* Tanggal Mulai Pendaftaran */}
              <div className="space-y-2">
                <Label>Website Kampus</Label>
                <div className="p-2 border rounded-md bg-gray-50 text-sm text-gray-700">
                  {displayCampus.website_campus || "Data Kosong"}
                </div>
              </div>

              {/* Tanggal Akhir Pendaftaran */}
              <div className="space-y-2">
                <Label>Provinsi</Label>
                <div className="p-2 border rounded-md bg-gray-50 text-sm text-gray-700">
                  {displayCampus.province || "Data Kosong"}
                </div>
              </div>

              {/* Tanggal Mulai Pelaksanaan */}
              <div className="space-y-2">
                <Label>Kota/Kabupaten</Label>
                <div className="p-2 border rounded-md bg-gray-50 text-sm text-gray-700">
                  {displayCampus.city || "Data Kosong"}
                </div>
              </div>

              {/* Tanggal Akhir Pelaksanaan */}
              <div className="space-y-2">
                <Label>Kecamatan</Label>
                <div className="p-2 border rounded-md bg-gray-50 text-sm text-gray-700">
                  {displayCampus.subdistrict || "Data Kosong"}
                </div>
              </div>

              {/* Waktu Mulai */}
              <div className="space-y-2">
                <Label>Desa/kelurahan</Label>
                <div className="p-2 border rounded-md bg-gray-50 text-sm text-gray-700">
                  {displayCampus.ward || "Data Kosong"}
                </div>
              </div>

              {/* Waktu Selesai */}
            </div>
            <div className="w-full mt-6">
              <Label>Titik Lokasi</Label>
              {displayCampus.lat && displayCampus.lng ? (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${displayCampus.lat},${displayCampus.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white shadow-md rounded-xl h-fit block transition hover:shadow-lg"
                >
                  <div className="p-2 border mt-2 rounded-md bg-gray-50 text-sm text-gray-700">
                    <DisplayMapsLocation
                      lat={displayCampus.lat}
                      lng={displayCampus.lng}
                    />
                  </div>
                </a>
              ) : (
                <div className="p-2 border mt-2 rounded-md bg-gray-50 text-sm text-gray-700">
                  Data Kosong
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <RejectCampus token={token} idCampus={idCampus} />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="hover:bg-primary transition hover:opacity-45">
                    <Check size={16} /> Terima Kampus
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Terima Verifikasi Kampus?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Apakah Anda yakin ingin menerima verifikasi kampus ini?
                      Kampus akan mendapatkan akses penuh ke sistem.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <Button
                      onClick={onSubmitAccept}
                      disabled={isLoadingAccept}
                      className="bg-primary hover:bg-primary/90"
                    >
                      {isLoadingAccept ? (
                        <div className="flex items-center gap-2">
                          <Spinner /> Memproses...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          Ya, terima
                        </div>
                      )}
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
