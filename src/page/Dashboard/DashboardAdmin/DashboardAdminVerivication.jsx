import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { ManageMapsCampusLocation } from "@/components/ManageMapsCampusLocation";
import { Button } from "@/components/ui/button";
import useGetDetailVerificationCampus from "@/hooks/hooksAdmin/useGetDetailVerificationCampus";
import { DisplayMapsLocation } from "@/components/DisplayMapsLocation";
import useAcceptCampus from "@/hooks/hooksAdmin/useAcceptCampus";
import useRejectCampus from "@/hooks/hooksAdmin/useRejectCampus";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import DashboardAdminVerificationSkeleton from "@/components/DashboardAdminVerificationSkeleton";

const RejectSchema = z.object({
  reason: z
    .string()
    .min(10, "Alasan penolakan wajib diisi minimal 10 karakter."),
});

export default function DashboardAdminVerivication() {
  const { id } = useParams();
  const navigate = useNavigate();
  const idCampus = parseInt(id);
  const token = localStorage.getItem("userJwt");
  const { detailCampus, isLoading, error, fetchDetailVerificationCampus } =
    useGetDetailVerificationCampus();
  const { isLoadingAccept, errorAccept, successMessage, acceptCampus } =
    useAcceptCampus();
  const { isLoadingReject, rejectCampus } = useRejectCampus();

  const displayCampus = detailCampus ?? [];
  // console.log(displayCampus);

  useEffect(() => {
    if (token) {
      fetchDetailVerificationCampus(token, idCampus);
    }
  }, [token]);

  const formReject = useForm({
    resolver: zodResolver(RejectSchema),
    defaultValues: {
      reason: "",
    },
  });

  const onRejectSubmit = async (data) => {
    // console.log(data);
    if (token) {
      const result = await rejectCampus(token, idCampus, data.reason);
      if (result.success) {
        toast.success(result.message || "Kampus berhasil ditolak");
        navigate("/dashboard-admin");
      } else {
        toast.error(result.message || "Gagal menolak kampus");
      }
    }
  };

  const onSubmitAccept = async () => {
    if (token) {
      const result = await acceptCampus(token, idCampus);
      if (result.success) {
        toast.success(result.message || "Kampus berhasil diterima");
        navigate("/dashboard-admin");
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
                  {displayCampus.campus_name}
                </div>
              </div>

              {/* Pilih Jurusan */}
              <div className="space-y-2">
                <Label>Email Kampus</Label>
                <div className="p-2 border rounded-md bg-gray-50 text-sm text-gray-700">
                  {displayCampus.email_campus}
                </div>
              </div>

              {/* Jenis Pelaksanaan (Online/Onsite) */}
              <div className="space-y-2">
                <Label>Deskripsi Kampus</Label>
                <div className="p-2 border rounded-md bg-gray-50 text-sm text-gray-700">
                  {displayCampus.description}
                </div>
              </div>

              {/* Tanggal Mulai Pendaftaran */}
              <div className="space-y-2">
                <Label>Website Kampus</Label>
                <div className="p-2 border rounded-md bg-gray-50 text-sm text-gray-700">
                  {displayCampus.website_campus}
                </div>
              </div>

              {/* Tanggal Akhir Pendaftaran */}
              <div className="space-y-2">
                <Label>Provinsi</Label>
                <div className="p-2 border rounded-md bg-gray-50 text-sm text-gray-700">
                  {displayCampus.province}
                </div>
              </div>

              {/* Tanggal Mulai Pelaksanaan */}
              <div className="space-y-2">
                <Label>Kota/Kabupaten</Label>
                <div className="p-2 border rounded-md bg-gray-50 text-sm text-gray-700">
                  {displayCampus.city}
                </div>
              </div>

              {/* Tanggal Akhir Pelaksanaan */}
              <div className="space-y-2">
                <Label>Kecamatan</Label>
                <div className="p-2 border rounded-md bg-gray-50 text-sm text-gray-700">
                  {displayCampus.subdistrict}
                </div>
              </div>

              {/* Waktu Mulai */}
              <div className="space-y-2">
                <Label>Desa/kelurahan</Label>
                <div className="p-2 border rounded-md bg-gray-50 text-sm text-gray-700">
                  {displayCampus.ward}
                </div>
              </div>

              {/* Waktu Selesai */}
            </div>
            <div className="w-full mt-6">
              <Label>Titik Lokasi</Label>
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
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-red-500 hover:bg-red-500 hover:opacity-60 transition text-white px-4 py-2 text-sm rounded-lg shadow-md flex items-center gap-2">
                    Tolak Kampus
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Tolak Verifikasi Kampus</DialogTitle>
                    <DialogDescription>
                      Apakah Anda yakin ingin menolak verifikasi kampus ini?
                      Berikan alasan penolakan di bawah ini.
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...formReject}>
                    <form
                      onSubmit={formReject.handleSubmit(onRejectSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={formReject.control}
                        name="reason"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Alasan Penolakan</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Contoh: Dokumen legalitas tidak lengkap atau tidak valid..."
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button" variant="outline">
                            Batal
                          </Button>
                        </DialogClose>
                        <Button
                          type="submit"
                          variant="destructive"
                          disabled={isLoadingReject}
                        >
                          {isLoadingReject ? (
                            <div className="flex items-center gap-2">
                              <Spinner /> Memproses...
                            </div>
                          ) : (
                            "Tolak Kampus"
                          )}
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
              <Button
                onClick={onSubmitAccept}
                disabled={isLoadingAccept}
                className="hover:bg-primary transition hover:opacity-45"
              >
                {isLoadingAccept ? (
                  <div className="flex items-center gap-2">
                    <Spinner /> Memproses...
                  </div>
                ) : (
                  "Terima Kampus"
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
