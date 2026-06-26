import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import SidebarCampusVerivication from "@/components/SidebarCampusVerivication";
import useRegisterMitraCampus from "@/hooks/hooksCampus/useRegisterMitraCampus";

import CampusVerificationAccept from "./CampusVerificationAccept";
import CampusVerificationPending from "./CampusVerificationPending";
import KampusVerifikasiGagal from "./KampusVerifikasiGagal";

export default function DashboardCampusVerivication() {
  const token = localStorage.getItem("userJwt");
  const { isLoading, checkVeirificationCampus, isVerify } =
    useRegisterMitraCampus();

  const displayVerification = isVerify ?? {};

  // 1. Ambil Status Verifikasi (Hook/Side Effect)
  useEffect(() => {
    if (token) {
      checkVeirificationCampus(token);
    }
  }, [token]);

  const status = displayVerification.verification_status;
  console.log(status);

  // 2. Tentukan Konten yang akan Dirender
  let contentToRender;

  if (status === "accepted") {
    // Jika accepted, tampilkan halaman berhasil
    contentToRender = <CampusVerificationAccept />;
  } else if (status === "pending") {
    // Jika pending, tampilkan halaman pending
    contentToRender = <CampusVerificationPending />;
  } else if (status === "rejected") {
    // Jika rejected, tampilkan halaman gagal
    contentToRender = <KampusVerifikasiGagal />;
  }
  // else if (status === "null") {
  //   // Jika rejected, tampilkan halaman gagal
  //   contentToRender = <KampusVerifikasiGagal />;
  // }
  else {
    // Default: Jika status null/undefined (misalnya baru masuk)
    // Arahkan ke rute anak index yang sesuai (misalnya /welcome) atau tampilkan error
    // Karena Anda menggunakan children route di /campus-verification,
    // kita biarkan Outlet merender anak-anaknya.
    contentToRender = <Outlet />;
  }

  return (
    <SidebarCampusVerivication>
      <main className="lg:px-4 pt-4 pb-6 flex-1 bg-[#F8FAFB] rounded-xl">
        {/* 3. Render Konten yang Dipilih */}
        {contentToRender}
      </main>
    </SidebarCampusVerivication>
  );
}
