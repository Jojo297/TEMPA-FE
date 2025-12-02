import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { isTokenValid } from "@/utils/authHelper"; // Import fungsi dari langkah 1
import { jwtDecode } from "jwt-decode";
import useRegisterMitraCampus from "@/hooks/hooksCampus/useRegisterMitraCampus";

const ProtectedRoute = ({ allowedRoles, Component }) => {
  const token = localStorage.getItem("userJwt");
  const decode = jwtDecode(token);
  console.log(decode);
  const isAuthenticated = isTokenValid(token, allowedRoles);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    // Jika tidak valid, redirect ke halaman depan ('/' adalah halaman login/homepage)
    return <Navigate to="/" replace />;
  }

  if (allowedRoles.includes("campus")) {
    const { isLoading, checkVeirificationCampus, isVerify } =
      useRegisterMitraCampus();

    const displayVerification = isVerify ?? {};

    useEffect(() => {
      if (token) {
        checkVeirificationCampus(token);
      }
    }, [token]);
    const status = displayVerification.verification_status;

    // Tentukan rute-rute yang dikecualikan dari pengecekan status 'accepted'
    const verificationPaths = [
      "/campus-verification",
      "/campus-verification/welcome",
      "/campus-verification/form-data",
      "/campus-verification/waiting-register-mitra",
    ];

    // Cek apakah user sedang mencoba mengakses rute yang dikecualikan
    const isVerificationPath = verificationPaths.some((path) =>
      location.pathname.startsWith(path)
    );

    // Logika utama: Jika status BUKAN 'accepted', dan user TIDAK berada di rute yang dikecualikan
    if (status !== "accepted" && !isVerificationPath) {
      // Redireksi ke rute verifikasi HANYA jika mencoba mengakses dashboard utama
      return <Navigate to="/campus-verification/welcome" replace />;
    }

    // Logika Tambahan: Jika status sudah 'accepted', user tidak boleh ada di halaman 'welcome'
    if (
      status === "accepted" &&
      location.pathname === "/campus-verification/welcome"
    ) {
      // Paksa user yang sudah terverifikasi masuk ke dashboard utama
      return <Navigate to="/dashboard-campus/beranda" replace />;
    }
  }

  return (
    <Component>
      <Outlet />
    </Component>
  );
};

export default ProtectedRoute;
