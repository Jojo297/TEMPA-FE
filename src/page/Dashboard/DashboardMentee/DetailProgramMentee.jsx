import SidebarWithNavbar from "@/components/SidebarWithNavbar";
import Footer from "@/components/Footer";
import kuliah from "@/assets/kuliah.png";
import React from "react";
import { Calendar } from "lucide-react";
import { Navigate, useNavigate } from "react-router";
// Asumsi 'kuliah' diimpor dengan benar, jika tidak, ganti dengan URL gambar mock
// import kuliah from "@/assets/kuliah.png";

const DetailProgramMentee = () => {
  const navigate = useNavigate();
  return (
    <SidebarWithNavbar>
      {/* Hanya satu <main> yang dibutuhkan di sini. 
        Saya menghapus main dan div ganda yang tidak perlu.
      */}
      <main className="px-10 pt-4 pb-6 flex-1">
        {/* Gambar Header */}
        <div className="relative rounded-xl overflow-hidden shadow-md mb-10">
          <img
            src={kuliah}
            alt="Program"
            className="w-full h-72 object-cover"
          />
          {/* Overlay konten di bawah gambar */}
          <div className="absolute bottom-0 left-0 right-0 bg-[#0E3B3D]/90 text-white p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">
                KULIAH BERSERTIFIKAT 1 HARI
              </h1>
              <div className="flex items-center gap-2 text-gray-300 text-sm mt-2">
                <Calendar size={16} />
                <span>10 Oktober 2025</span>
              </div>
            </div>
            <button
              onClick={() => navigate("/dashboard-mentee/program/daftar")}
              className="mt-4 sm:mt-0 bg-[#B4D0E7] text-[#0E3B3D] font-semibold px-6 py-2 rounded-md hover:bg-[#A3C5E0] transition flex-shrink-0">
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

            <ul className="text-gray-700 space-y-2 text-sm sm:text-base">
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
              <h3 className="font-semibold text-[#0E3B3D] mb-2">Fasilitas:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm sm:text-base">
                <li>Sertifikat</li>
                <li>Ilmu dari mentor profesional</li>
                <li>Lunch & snack</li>
                <li>Kesempatan networking dengan mahasiswa dan dosen</li>
              </ul>
            </div>
          </div>

          {/* Informasi Mentor */}
          <div className="bg-white shadow-md rounded-xl p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4 text-[#0E3B3D]">
              Informasi Mentor
            </h2>
            <div className="space-y-2 text-gray-700 text-sm sm:text-base">
              <p>
                <strong>Nama:</strong> Nama Mentor
              </p>
              <p>
                <strong>Email:</strong> PKProgram@gmail.com
              </p>
            </div>
          </div>
        </div>
      </main>
    </SidebarWithNavbar>
  );
};

export default DetailProgramMentee;
