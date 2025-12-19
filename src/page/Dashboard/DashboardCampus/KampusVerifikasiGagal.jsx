import React from "react";
import logo from "@/assets/logo-text.png";
import robot from "@/assets/robot-sad.png"; // pastikan gambar ada di folder assets

export default function KampusVerifikasiGagal() {
  return (
    <main className="flex-grow flex flex-col items-center justify-center">
      {" "}
      <div className="bg-[#013D3A] rounded-lg p-8 text-white flex flex-col items-center gap-4 max-w-3xl w-full shadow-lg relative animate-fade-in">
        {/* Judul Utama */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mt-4 uppercase">
          {" "}
          Verifikasi Gagal
        </h2>

        {/* Teks Deskriptif */}
        <p className="text-base md:text-lg text-center leading-relaxed max-w-2xl px-2">
          {" "}
          Maaf, data yang anda masukkan belum dapat diverifikasi. Silahkan cek
          email anda untuk informasi lebih lanjut.
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
