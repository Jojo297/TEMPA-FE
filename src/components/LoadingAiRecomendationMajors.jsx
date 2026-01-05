import { useEffect, useState } from "react";
import robotLoading from "@/assets/robotLoading.png";

// Daftar teks yang akan ditampilkan secara bergantian
const loadingMessages = [
  "Menganalisis minat akademik Anda...",
  "Menghubungkan kekuatan diri dengan profesi...",
  "Mengevaluasi preferensi lingkungan kerja...",
  "Mempertimbangkan motivasi karir Anda...",
  "Menyusun rekomendasi yang dipersonalisasi...",
];

export default function LoadingAiRecomendationMajors() {
  const [loadingText, setLoadingText] = useState(loadingMessages[0]);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Mengatur interval untuk mengganti teks setiap 2.5 detik
    const interval = setInterval(() => {
      setLoadingText((currentText) => {
        const currentIndex = loadingMessages.indexOf(currentText);
        const nextIndex = (currentIndex + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
    }, 2500);

    // Membersihkan interval saat komponen di-unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 text-center">
      <div className="max-w-md w-full">
        {/* Kontainer Animasi AI Thinking State */}
        <div className="flex flex-col items-center justify-center mb-10">
          <div className="relative flex items-center justify-center w-24 h-24">
            {/* Efek Cahaya Halus di Latar Belakang (Glow) */}
            <div className="absolute inset-0 bg-[#10403D]/20 rounded-full blur-xl animate-pulse"></div>

            {/* Animasi Orbital/Lingkaran AI */}
            <div className="absolute w-full h-full border-t-2 border-b-2 border-[#10403D] rounded-full animate-spin"></div>
            <div className="absolute w-full h-full border-r-2 border-l-2 border-[#10403D]/30 rounded-full animate-spin [animation-duration:3s]"></div>

            {/* Tiga Titik Berdenyut (AI Pulse Dots) */}
            <div className="flex space-x-1.5 z-10">
              <div className="w-3 h-3 bg-[#10403D] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-3 h-3 bg-[#10403D] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-3 h-3 bg-[#10403D] rounded-full animate-bounce"></div>
            </div>
          </div>

          {/* Teks Indikator di Bawah Animasi */}
          <div className="mt-6 flex flex-col items-center">
            <span className="text-sm font-medium text-gray-400 tracking-widest uppercase animate-pulse">
              AI sedang menganalisis
            </span>
            <p className="text-xs text-gray-400 mt-1">{loadingText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
