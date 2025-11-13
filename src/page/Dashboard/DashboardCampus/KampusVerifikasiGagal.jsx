import React from "react";
import logo from "@/assets/logo-text.png";
import robot from "@/assets/robot-sad.png"; // pastikan gambar ada di folder assets

export default function KampusVerifikasiGagal() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-[#013D3A] py-4 px-8 flex items-center">
        <img src={logo} alt="Logo TEMPA" className="h-10 object-contain" />
      </header>

      {/* Konten Verifikasi Gagal */}
      <main className="flex-grow flex flex-col items-center justify-center px-6">
        <div className="bg-[#013D3A] rounded-lg p-8 text-white flex flex-col md:flex-row items-center gap-6 max-w-3xl w-full justify-center">
          <img
            src={robot}
            alt="Robot Gagal"
            className="w-32 md:w-40 object-contain animate-bounce"
          />
          <div className="text-center md:text-left">
            <p className="text-lg leading-relaxed">
              Verifikasi data mitra{" "}
              <span className="text-red-400 font-semibold">gagal</span>{" "}
              dilakukan.
              <br />
              Silakan periksa kembali data Anda
              <br />
              dan kirim ulang untuk verifikasi ulang.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#013D3A] text-white text-center py-6 mt-8">
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
