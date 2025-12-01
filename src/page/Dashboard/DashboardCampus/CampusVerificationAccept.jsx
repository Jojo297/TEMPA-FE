import React from "react";
import logo from "@/assets/logo-text.png";
import robot from "@/assets/robot-happy.png"; // pakai gambar robot yang sama

export default function CampusVerificationAccept({ campusName }) {
  return (
    <main className="flex-grow flex flex-col items-center justify-center">
      {" "}
      <div className="bg-[#013D3A] rounded-lg p-8 text-white flex flex-col items-center gap-4 max-w-3xl w-full shadow-lg relative animate-fade-in">
        {/* Judul Utama */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mt-4 uppercase">
          {" "}
          Verifikasi Berhasil
        </h2>

        {/* Teks Deskriptif */}
        <p className="text-base md:text-lg text-center leading-relaxed max-w-2xl px-2">
          {" "}
          Halo <span className="font-bold text-teal-300">{campusName}</span>,
          terima kasih sudah bergabung dalam mewujudkan ekosistem pendidikan
          yang adaptif, inovatif, dan berdampak nyata bagi masa depan.
        </p>

        {/* Gambar Robot */}
        <img
          src={robot}
          alt="Robot Senang"
          className="w-32 md:w-40 object-contain mt-4"
        />
      </div>
    </main>
  );
}
