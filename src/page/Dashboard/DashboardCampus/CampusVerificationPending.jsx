import robot from "@/assets/robot-info.png";
import { Loader2 } from "lucide-react";

export default function CampusVerificationPending() {
  return (
    <main className="flex-grow flex flex-col items-center justify-center min-h-[60vh] p-4">
      <div className="bg-white rounded-3xl p-8 md:p-12 flex flex-col items-center gap-8 max-w-2xl w-full shadow-2xl border border-gray-100 relative overflow-hidden animate-fade-in">
        {/* Decorative Top Bar - Amber/Yellow for Pending state */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-orange-500" />

        {/* Image Section with Glow */}
        <div className="relative">
          <div className="absolute inset-0 bg-amber-100 rounded-full blur-3xl opacity-60" />
          <img
            src={robot}
            alt="Robot Info"
            className="w-40 md:w-52 object-contain relative z-10 drop-shadow-sm"
          />
        </div>

        {/* Text Content */}
        <div className="text-center space-y-3 z-10 max-w-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-[#013D3A] tracking-tight">
            Verifikasi Sedang Diproses
          </h2>

          <div className="space-y-1">
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Data kemitraan Anda telah kami terima dan sedang dalam tahap
              peninjauan oleh tim kami.
            </p>
            <p className="text-gray-500 text-sm md:text-base">
              Mohon tunggu beberapa saat, kami akan segera mengabari anda lewat
              email.
            </p>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-2 px-5 py-2.5 bg-amber-50 text-amber-700 rounded-full text-sm font-medium border border-amber-100 shadow-sm">
          <Loader2 className="w-4 h-4 animate-spin" />
          Status: Menunggu Konfirmasi
        </div>
      </div>
    </main>
  );
}
