import React from "react";
import robot from "@/assets/robot-sad.png"; // pastikan gambar ada di folder assets
import { AlertCircle } from "lucide-react";

export default function KampusVerifikasiGagal() {
  return (
    <main className="flex-grow flex flex-col items-center justify-center min-h-[60vh] p-4">
      <div className="bg-white rounded-3xl p-8 md:p-12 flex flex-col items-center gap-8 max-w-2xl w-full shadow-2xl border border-gray-100 relative overflow-hidden animate-fade-in">
        {/* Decorative Top Bar - Red for Error state */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-rose-600" />

        {/* Image Section with Glow */}
        <div className="relative">
          <div className="absolute inset-0 bg-red-100 rounded-full blur-3xl opacity-60" />
          <img
            src={robot}
            alt="Robot Sedih"
            className="w-40 md:w-52 object-contain relative z-10 drop-shadow-sm"
          />
        </div>

        {/* Text Content */}
        <div className="text-center space-y-4 z-10 max-w-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-[#013D3A] tracking-tight">
            Verifikasi Gagal
          </h2>

          <div className="space-y-3">
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Maaf, data yang Anda masukkan belum dapat diverifikasi.
            </p>

            <div className="flex items-center justify-center gap-2 text-red-700 bg-red-50 px-5 py-3 rounded-xl border border-red-100 text-sm font-medium">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>Silakan cek email Anda untuk informasi lebih lanjut.</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
