import { Button } from "@/components/ui/button";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function DashboardCampus() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  // Cek apakah sedang di route utama (/dashboard-campus)
  const isMainPage = location.pathname === "/dashboard-campus";

  const handleLogout = () => {
    try {
      setIsLoading(true);
      localStorage.removeItem("userJwt");
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header hanya tampil di halaman utama */}
      {isMainPage && (
        <header className="bg-[#013D3A] text-white py-4 px-6 flex justify-between items-center shadow-md">
          <h1 className="text-lg font-semibold tracking-wide">
            Dashboard Kampus
          </h1>
          <Button
            onClick={handleLogout}
            disabled={isLoading}
            className="bg-[#5CC6BA] text-[#013D3A] hover:bg-[#4BB3A8] font-semibold">
            {isLoading ? "Logging out..." : "Logout"}
          </Button>
        </header>
      )}

      {/* Konten utama */}
      <main className="flex-grow flex items-center justify-center">
        {isMainPage ? (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-[#013D3A]">
              Selamat Datang di Dashboard Kampus 👋
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Kelola data kampus Anda, isi form verifikasi, dan pantau status
              kerja sama dengan platform TEMPA.
            </p>
            <Button
              onClick={() => navigate("form-data")}
              className="bg-[#013D3A] hover:bg-[#024E4B] text-white px-6 py-2 rounded-lg font-semibold mt-2">
              Isi Data Kampus
            </Button>
          </div>
        ) : (
          <div className="w-full h-full">
            <Outlet />
          </div>
        )}
      </main>

      {/* Footer hanya tampil di halaman utama */}
      {isMainPage && (
        <footer className="bg-[#013D3A] text-white py-3 text-center text-sm mt-auto">
          © 2025 TIEMPA — Membangun Ekosistem Pendidikan Inovatif
        </footer>
      )}
    </div>
  );
}
