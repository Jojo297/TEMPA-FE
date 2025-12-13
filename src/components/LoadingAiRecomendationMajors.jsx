import { useEffect, useState } from "react";
import robotLoading from "@/assets/robotLoading.png";

export default function LoadingAiRecomendationMajors() {
  // State untuk teks loading yang dinamis
  const [loadingText, setLoadingText] = useState("Menganalisis minat Anda");

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 bg-gray-50">
      {/* Kontainer Animasi Robot/AI */}
      <div className="relative w-32 h-32 mb-6">
        {/* Base Lingkaran / Otak AI */}
        <div className="absolute inset-0 bg-secondary rounded-full opacity-30 animate-ping-slow"></div>

        {/* Ikon Utama */}
        <div className="absolute inset-0 flex items-center justify-center bg-primary rounded-full shadow-lg">
          <img
            src={robotLoading}
            alt=""
            srcset=""
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Teks Loading Dinamis */}
      <h2 className="text-xl font-semibold text-gray-800 text-center mb-2">
        AI sedang berpikir...
      </h2>

      <p className="text-md text-gray-600 font-medium text-center transition-opacity duration-500">
        {loadingText}
      </p>

      {/* Animasi Dots Berkedip (Opsional) */}
      <div className="flex space-x-1 mt-4">
        <div
          className="w-2 h-2 bg-primary rounded-full animate-pulse"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="w-2 h-2 bg-primary rounded-full animate-pulse"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-2 h-2 bg-primary rounded-full animate-pulse"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>

      {/* Tambahkan custom CSS untuk ping-slow di file CSS global atau blok style jika perlu */}
      <style jsx global>{`
        @keyframes ping-slow {
          0% {
            transform: scale(0.6);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
}
