import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

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

export default function DashboardAdminVerivication() {
  const { id } = useParams();
  const idCampus = parseInt(id);
  const token = localStorage.getItem("userJwt");
  const { detailCampus, isLoading, error, fetchDetailVerificationCampus } =
    useGetDetailVerificationCampus();

  const displayCampus = detailCampus ?? [];
  console.log(displayCampus);

  useEffect(() => {
    if (token) {
      fetchDetailVerificationCampus(token, idCampus);
    }
  }, [token]);
  return (
    <>
      {/* breadcum */}
      <Breadcrumb className="mb-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="hover:text-primary">
              <Link to="/dashboard-admin">Beranda</Link>
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
              <Button className="bg-red-500 hover:bg-red-500 hover:opacity-60 transition text-white px-4 py-2 text-sm rounded-lg shadow-md flex items-center gap-2">
                Tolak Kampus
              </Button>
              <Button className="hover:bg-primary transition hover:opacity-45">
                Terima Kampus
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
