import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo-text.png";
import robot from "@/assets/robot-happy.png"; // pastikan gambar robot sudah ada di folder assets

export default function KampusVerifikasi() {
  const navigate = useNavigate();

  useEffect(() => {
    // Setelah 3 detik, pindah ke halaman verifikasi berhasil
    const timer = setTimeout(() => {
      navigate("/kampus-verifikasi-berhasil");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-[#013D3A] py-4 px-8 flex items-center">
        <img src={logo} alt="Logo TIEMPA" className="h-10 object-contain" />
      </header>

      {/* Konten Verifikasi */}
      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="bg-[#013D3A] rounded-lg p-8 text-white flex flex-col md:flex-row items-center gap-6 max-w-3xl w-full justify-center">
          <img
            src={robot}
            alt="Robot Verifikasi"
            className="w-32 md:w-40 object-contain animate-bounce"
          />
          <p className="text-lg text-center md:text-left leading-relaxed">
            Verifikasi data mitra sedang berlangsung, <br />
            mohon tunggu sesaat.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#013D3A] text-white text-center py-6">
        <h1 className="text-xl font-bold">
          <span className="text-[#5CC6BA]">T</span>EMPA
        </h1>
        <p className="text-sm text-gray-300 mt-1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <div className="flex justify-center gap-4 mt-3">
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-twitter"></i>
        </div>
        <p className="text-xs text-gray-400 mt-3">
          © 2025 TEMPA. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
