import React from "react";
import { Link, useParams } from "react-router-dom";
import { MapPin, Calendar, Users, Clock, Map, Home } from "lucide-react";

import SidebarWithNavbar from "@/components/SidebarWithNavbar";
import Footer from "@/components/Footer";
import { kampusList } from "@/lib/kampusList";
import kuliah from "@/assets/kuliah.png";
import { CampusHeaderProfile } from "@/components/campusHeaderProfile";

// --- Data Program per Kampus ---
const programData = {
  1: [
    {
      Program: "KULIAH BERSERTIFIKAT 1 HARI",
      Kampus: "Politeknik Negeri Batam",
      Jurusan: "Teknik Informatika",
      Tipe: "Onsite",
      Deskripsi:
        "Di program Informatika Polibatam, mahasiswa belajar coding menggunakan Python untuk memahami logika pemrograman, analisis data, dan pengembangan aplikasi dasar.",
      Tanggal: "10 Oktober 2025",
      Waktu: "09.00 WIB - 12.00 WIB",
      Peserta: "20 Orang",
      Tempat: "Gedung TA II.12",
      Image: kuliah,
    },
  ],
  2: [
    {
      Program: "KULIAH BERSERTIFIKAT 1 HARI",
      Kampus: "Institut Teknologi Batam (ITEBA)",
      Jurusan: "Teknik Informatika",
      Tipe: "Onsite",
      Deskripsi:
        "Mahasiswa mempelajari dasar pemrograman, pengembangan web menggunakan PHP, serta konsep basis data dan teknologi jaringan untuk membangun solusi digital yang efisien.",
      Tanggal: "10 Oktober 2025",
      Waktu: "09.00 WIB - 12.00 WIB",
      Peserta: "20 Orang",
      Tempat: "Gedung A ITEBA",
      Image: kuliah,
    },
    {
      Program: "KULIAH BERSERTIFIKAT 1 HARI",
      Kampus: "Institut Teknologi Batam (ITEBA)",
      Jurusan: "Manajemen",
      Tipe: "Onsite",
      Deskripsi:
        "Mahasiswa mempelajari perencanaan bisnis, pengelolaan sumber daya, serta strategi pemasaran dan keuangan untuk mencetak manajer yang adaptif dan berdaya saing tinggi.",
      Tanggal: "10 Oktober 2025",
      Waktu: "09.00 WIB - 12.00 WIB",
      Peserta: "20 Orang",
      Tempat: "Gedung B ITEBA",
      Image: kuliah,
    },
  ],
  3: [
    {
      Program: "KULIAH BERSERTIFIKAT 1 HARI",
      Kampus: "Universitas Internasional Batam (UIB)",
      Jurusan: "Pendidikan Bahasa Inggris",
      Tipe: "Onsite",
      Deskripsi:
        "Mahasiswa mempelajari keterampilan berbahasa Inggris, metode pengajaran, linguistik, serta penerapan teknologi dalam pembelajaran untuk menjadi pendidik yang profesional.",
      Tanggal: "10 Oktober 2025",
      Waktu: "09.00 WIB - 12.00 WIB",
      Peserta: "20 Orang",
      Tempat: "Gedung Utama UIB",
      Image: kuliah,
    },
    {
      Program: "KULIAH BERSERTIFIKAT 1 HARI",
      Kampus: "Universitas Internasional Batam (UIB)",
      Jurusan: "Manajemen",
      Tipe: "Onsite",
      Deskripsi:
        "Mahasiswa mempelajari analisis bisnis, kepemimpinan, inovasi, serta strategi pengambilan keputusan berbasis data untuk mencetak calon pemimpin yang siap bersaing di tingkat global.",
      Tanggal: "10 Oktober 2025",
      Waktu: "09.00 WIB - 12.00 WIB",
      Peserta: "20 Orang",
      Tempat: "Gedung Utama UIB",
      Image: kuliah,
    },
  ],
};

// --- Program Card ---
const ProgramCard = ({ program }) => (
  <div className="flex flex-col lg:flex-row border rounded-2xl overflow-hidden shadow-lg bg-white transition hover:shadow-xl">
    <div
      className="lg:w-1/3 flex flex-col justify-end bg-cover bg-center p-6 text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(1, 59, 53, 0.4), rgba(1, 59, 53, 0.7)), url(${program.Image})`,
        backgroundColor: "#013B35",
        minHeight: "200px",
      }}
    >
      <h3 className="text-3xl font-extrabold leading-tight drop-shadow-lg">
        {program.Program}
      </h3>
    </div>

    <div className="lg:w-2/3 p-6 flex flex-col justify-between">
      <div>
        <p className="text-gray-600 mb-4 text-sm">{program.Deskripsi}</p>
        <div className="flex flex-wrap items-center space-x-4 mb-4">
          <div className="flex items-center text-[#013B35] font-semibold text-lg">
            <Home size={18} className="mr-2" />
            <span>{program.Kampus}</span>
          </div>
          <div className="px-3 py-1 bg-green-100 text-[#013B35] rounded-full text-sm font-medium mt-2 sm:mt-0">
            {program.Jurusan}
          </div>
          <div className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mt-2 sm:mt-0">
            {program.Tipe}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-gray-700 text-sm mb-6 border-t pt-4">
          <div className="flex items-center">
            <Calendar size={16} className="mr-2 text-[#013B35]" />
            <span>{program.Tanggal}</span>
          </div>
          <div className="flex items-center">
            <Clock size={16} className="mr-2 text-[#013B35]" />
            <span>{program.Waktu}</span>
          </div>
          <div className="flex items-center">
            <Users size={16} className="mr-2 text-[#013B35]" />
            <span>{program.Peserta}</span>
          </div>
          <div className="flex items-center">
            <Map size={16} className="mr-2 text-[#013B35]" />
            <span>Tempat: {program.Tempat}</span>
          </div>
        </div>
      </div>

      <button className="w-full lg:w-auto self-start min-w-[559px] px-10 py-3 bg-[#013B35] text-white rounded-xl font-bold hover:bg-[#015f53] transition-all duration-300">
        Ikut Program
      </button>
    </div>
  </div>
);

// --- Halaman Utama ---
export default function DashboardCampusProgram() {
  const { id } = useParams();
  const campusId = parseInt(id);
  const kampus = kampusList.find((k) => k.id === campusId);
  const currentProgramData = programData[campusId] || [];

  if (!kampus) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        <p className="text-xl font-semibold">Kampus tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAF8] font-sans flex flex-col">
      {/* Header Kampus */}
      <CampusHeaderProfile kampus={kampus} />

      {/* Navigasi Dashboard */}
      <section className="mt-12 max-w-6xl mx-auto px-6 md:px-0 mb-20 flex flex-col items-start w-full">
        <div className="flex flex-wrap gap-4 mb-10 justify-start">
          <Link
            to={`/dashboard-mentee/kampus/${kampus.id}`}
            className="px-6 py-2 border border-[#013B35] text-[#013B35] rounded-full font-semibold hover:bg-[#013B35] hover:text-white transition"
          >
            Deskripsi
          </Link>
          <Link
            to={`/dashboard-mentee/kampus/${kampus.id}/prestasi`}
            className="px-6 py-2 border border-[#013B35] text-[#013B35] rounded-full font-semibold hover:bg-[#013B35] hover:text-white transition"
          >
            Prestasi
          </Link>
          <Link
            to={`/dashboard-mentee/kampus/${kampus.id}/jurusan`}
            className="px-6 py-2 border border-[#013B35] text-[#013B35] rounded-full font-semibold hover:bg-[#013B35] hover:text-white transition"
          >
            Jurusan
          </Link>
          <Link
            to={`/dashboard-mentee/kampus/${kampus.id}/program`}
            className="px-6 py-2 border bg-[#013B35] text-white rounded-full font-semibold"
          >
            Program
          </Link>
        </div>

        {/* List Program */}
        <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 space-y-8 w-full">
          <h2 className="text-2xl font-bold text-[#013B35] text-center mb-6">
            Program yang Ditawarkan {kampus.name}
          </h2>
          <p className="text-gray-700 leading-relaxed text-center max-w-3xl mx-auto mb-8">
            Melalui TEMPA, {kampus.name} membuka ruang bagi siswa untuk
            menjalani minat, mengenal dunia kampus, dan mempersiapkan arah masa
            depan melalui berbagai program pembelajaran dan pengalaman langsung.
          </p>

          <div className="space-y-6">
            {currentProgramData.length > 0 ? (
              currentProgramData.map((program, index) => (
                <ProgramCard key={index} program={program} />
              ))
            ) : (
              <p className="text-center text-gray-500">
                Data Program belum tersedia untuk kampus ini.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
