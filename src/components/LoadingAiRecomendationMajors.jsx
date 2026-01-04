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
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 bg-white text-center">
      <div className="max-w-md w-full">
        {/* Kontainer Animasi Robot/AI */}
        <div className="relative w-40 h-40 mb-8 mx-auto">
          {/* Lingkaran luar yang berdenyut */}
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
          {/* Lingkaran dalam yang berdenyut dengan delay */}
          <div
            className="absolute inset-0 bg-primary/20 rounded-full animate-ping"
            style={{ animationDelay: "1s" }}
          ></div>
          {/* Ikon Robot di tengah */}
          <div className="absolute inset-2 flex items-center justify-center bg-primary rounded-full shadow-2xl">
            <img
              src={robotLoading}
              alt="AI Robot sedang berpikir"
              className="w-24 h-24 object-contain"
            />
          </div>
        </div>
        {/* Teks Loading Dinamis */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          AI sedang memproses jawaban Anda...
        </h2>
        <p className="text-base text-gray-600 transition-opacity duration-500 min-h-[48px] flex items-center justify-center">
          {loadingText}
        </p>
        {/* Animasi Dots Berkedip */}
        <div className="flex space-x-1.5 mt-4 justify-center">
          <div
            className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
