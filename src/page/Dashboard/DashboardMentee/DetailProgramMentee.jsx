import SidebarWithNavbar from "@/components/SidebarWithNavbar";
import Footer from "@/components/Footer";

import React from "react";
import { Calendar } from "lucide-react";
import kuliah from "@/assets/kuliah.png";

const DetailProgramMentee = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <SidebarWithNavbar />

      {/* Konten utama */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Gambar Header */}
          <div className="relative rounded-xl overflow-hidden shadow-md mb-10">
            <img
              src={kuliah}
              alt="Program"
              className="w-full h-72 object-cover"
            />
            {/* Overlay konten di bawah gambar */}
            <div className="absolute bottom-0 left-0 right-0 bg-[#0E3B3D]/90 text-white p-6 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">
                  KULIAH BERSERTIFIKAT 1 HARI
                </h1>
                <div className="flex items-center gap-2 text-gray-300 text-sm mt-2">
                  <Calendar size={16} />
                  <span>10 Oktober 2025</span>
                </div>
              </div>
              <button className="bg-[#B4D0E7] text-[#0E3B3D] font-semibold px-6 py-2 rounded-md hover:bg-[#A3C5E0] transition">
                Daftar Sekarang
              </button>
            </div>
          </div>

          {/* Bagian Detail dan Mentor */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Detail Program */}
            <div className="md:col-span-2 bg-white shadow-md rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4 text-[#0E3B3D]">
                Detail Program
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>

              <ul className="text-gray-700 space-y-2">
                <li>
                  <strong>Jenis Kegiatan:</strong> Onsite
                </li>
                <li>
                  <strong>Batas Akhir Pendaftaran:</strong> 9 Oktober 2025
                </li>
                <li>
                  <strong>Tanggal Pelaksanaan:</strong> 10 Oktober 2025
                </li>
                <li>
                  <strong>Tempat:</strong> Politeknik Negeri Batam, Gedung Tower
                  A, Lantai 1B, Ruangan 3B
                </li>
                <li>
                  <strong>Waktu:</strong> 10.00 – 17.00 WIB
                </li>
              </ul>

              <div className="mt-6">
                <h3 className="font-semibold text-[#0E3B3D] mb-2">
                  Fasilitas:
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Sertifikat</li>
                  <li>Ilmu dari mentor profesional</li>
                  <li>Lunch & snack</li>
                  <li>Kesempatan networking dengan mahasiswa dan dosen</li>
                </ul>
              </div>
            </div>

            {/* Informasi Mentor */}
            <div className="bg-white shadow-md rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4 text-[#0E3B3D]">
                Informasi Mentor
              </h2>
              <p>
                <strong>Nama:</strong> Nama Mentor
              </p>

              <p>
                <strong>Email:</strong> PKProgram@gmail.com
              </p>
            </div>
          </div>
        </main>
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default DetailProgramMentee;
