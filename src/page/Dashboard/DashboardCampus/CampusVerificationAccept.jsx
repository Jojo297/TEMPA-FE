import React from "react";
import logo from "@/assets/logo-text.png";
import robot from "@/assets/robot-happy.png";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function CampusVerificationAccept({ campusName }) {
  const navigate = useNavigate();
  return (
    <main className="flex-grow flex flex-col items-center justify-center min-h-[60vh] p-4">
      <div className="bg-white rounded-3xl p-8 md:p-12 flex flex-col items-center gap-6 max-w-2xl w-full shadow-2xl border border-gray-100 relative overflow-hidden animate-fade-in">
        {/* Decorative Top Bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#5CC6BA] to-[#013D3A]" />

        {/* Image Section with Glow */}
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-100 rounded-full blur-3xl opacity-50" />
          <img
            src={robot}
            alt="Robot Senang"
            className="w-40 md:w-52 object-contain relative z-10 drop-shadow-sm"
          />
        </div>

        {/* Text Content */}
        <div className="text-center space-y-3 z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#013D3A] tracking-tight">
            Verifikasi Berhasil!
          </h2>

          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-lg mx-auto">
            Halo{" "}
            <span className="font-bold text-[#013D3A]">
              {campusName || "Mitra Kampus"}
            </span>
            , terima kasih sudah bergabung. Mari wujudkan ekosistem pendidikan
            yang adaptif, inovatif, dan berdampak nyata.
          </p>
        </div>

        {/* Action Button */}
        <div className="w-full max-w-xs mt-4">
          <Button
            onClick={() => navigate("/dashboard-campus/beranda")}
            className="w-full bg-[#5CC6BA] hover:bg-[#4ab3a7] text-[#013D3A] font-bold py-6 rounded-xl text-lg shadow-lg hover:shadow-emerald-200 transition-all duration-300 transform hover:-translate-y-1"
          >
            Lanjutkan ke Dashboard
          </Button>
        </div>
      </div>
    </main>
  );
}
