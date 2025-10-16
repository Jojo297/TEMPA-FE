import React from "react";
import { Link, useParams } from "react-router-dom";
import { MapPin, Calendar, Users, Clock, Map, Home } from "lucide-react";

// *** ASUMSI IMPORTS: Pastikan semua komponen dan data ini tersedia di proyek Anda ***
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { kampusList } from "@/lib/kampusList";
import kuliah from "../assets/kuliah.png";
// Ganti dengan import aktual di proyek Anda

// --- Data Placeholder untuk kampusList (Hanya untuk referensi) ---
// ASUMSI: kampus.id = 1 adalah Politeknik Negeri Batam

// ------------------------------------------------------------------

// === DATA PROGRAM PER KAMPUS (Dibuat berdasarkan konten gambar) ===
const programData = {
  // ID 1: Politeknik Negeri Batam
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
      Image: kuliah, // Placeholder
    },
    {
      Program: "KULIAH BERSERTIFIKAT 1 HARI",
      Kampus: "Politeknik Negeri Batam",
      Jurusan: "Manajemen Bisnis",
      Tipe: "Onsite",
      Deskripsi:
        "Di program Manajemen Bisnis Polibatam, mahasiswa mempelajari strategi bisnis, manajemen keuangan, pemasaran, dan kewirausahaan untuk membangun kemampuan dalam mengelola dan mengembangkan usaha secara profesional.",
      Tanggal: "10 Oktober 2025",
      Waktu: "09.00 WIB - 12.00 WIB",
      Peserta: "20 Orang",
      Tempat: "Gedung TA II.12",
      Image: kuliah, // Placeholder
    },
    {
      Program: "KULIAH BERSERTIFIKAT 1 HARI",
      Kampus: "Politeknik Negeri Batam",
      Jurusan: "Teknik Elektro",
      Tipe: "Onsite",
      Deskripsi:
        "Di program Teknik Elektro Polibatam, mahasiswa mempelajari dasar kelistrikan, sistem kontrol, elektronika, dan mikrokontroler untuk merancang serta mengembangkan berbagai sistem dan perangkat berbasis listrik.",
      Tanggal: "10 Oktober 2025",
      Waktu: "09.00 WIB - 12.00 WIB",
      Peserta: "20 Orang",
      Tempat: "Gedung TA II.12",
      Image: kuliah,
    },
    {
      Program: "KULIAH BERSERTIFIKAT 1 HARI",
      Kampus: "Politeknik Negeri Batam",
      Jurusan: "Teknik Mesin",
      Tipe: "Onsite",
      Deskripsi:
        "Di program Teknik Mesin Polibatam, mahasiswa mempelajari prinsip perancangan, manufaktur, dan perawatan mesin serta penerapannya dalam industri modern.",
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
      Kampus: "Insitut Teknologi Batam",
      Jurusan: "Teknik Informatika",
      Tipe: "Onsite",
      Deskripsi:
        "Di program Teknik Informatika ITEBA, mahasiswa mempelajari dasar pemrograman, pengembangan web menggunakan PHP, serta konsep basis data dan teknologi jaringan untuk membangun solusi digital yang efisien.",
      Tanggal: "10 Oktober 2025",
      Waktu: "09.00 WIB - 12.00 WIB",
      Peserta: "20 Orang",
      Tempat: "Gedung TA II.12",
      Image: kuliah,
    },
    {
      Program: "KULIAH BERSERTIFIKAT 1 HARI",
      Kampus: "Insitut Teknologi Batam",
      Jurusan: "Manajemen",
      Tipe: "Onsite",
      Deskripsi:
        "Di program Manajemen ITEBA, mahasiswa mempelajari perencanaan bisnis, pengelolaan sumber daya, serta strategi pemasaran dan keuangan untuk menciptakan manajer yang adaptif dan berdaya saing tinggi.",
      Tanggal: "10 Oktober 2025",
      Waktu: "09.00 WIB - 12.00 WIB",
      Peserta: "20 Orang",
      Tempat: "Gedung TA II.12",
      Image: kuliah,
    },
    {
      Program: "KULIAH BERSERTIFIKAT 1 HARI",
      Kampus: "Insitut Teknologi Batam",
      Jurusan: "Teknik Industri",
      Tipe: "Onsite",
      Deskripsi:
        "Di program Teknik Industri ITEBA, mahasiswa mempelajari perancangan, optimalisasi, dan pengelolaan sistem produksi serta proses bisnis agar lebih efisien dan produktif.",
      Tanggal: "10 Oktober 2025",
      Waktu: "09.00 WIB - 12.00 WIB",
      Peserta: "20 Orang",
      Tempat: "Gedung TA II.12",
      Image: kuliah,
    },
    {
      Program: "KULIAH BERSERTIFIKAT 1 HARI",
      Kampus: "Insitut Teknologi Batam",
      Jurusan: "K3 & Kesehatan Lingkungan",
      Tipe: "Onsite",
      Deskripsi:
        "Di program K3 (Keselamatan dan Kesehatan Kerja) ITEBA, mahasiswa mempelajari cara mengidentifikasi, menganalisis, dan mengendalikan risiko di lingkungan kerja untuk menciptakan tempat kerja yang aman dan sehat.",
      Tanggal: "10 Oktober 2025",
      Waktu: "09.00 WIB - 12.00 WIB",
      Peserta: "20 Orang",
      Tempat: "Gedung TA II.12",
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
        "Di program Pendidikan Bahasa Inggris UIB, mahasiswa mempelajari keterampilan berbahasa Inggris, metode pengajaran, linguistik, serta penerapan teknologi dalam pembelajaran untuk menjadi pendidik yang profesional dan komunikatif.",
      Tanggal: "10 Oktober 2025",
      Waktu: "09.00 WIB - 12.00 WIB",
      Peserta: "20 Orang",
      Tempat: "Gedung TA II.12",
      Image: kuliah,
    },
    {
      Program: "KULIAH BERSERTIFIKAT 1 HARI",
      Kampus: "Universitas Internasional Batam (UIB)",
      Jurusan: "Manajemen",
      Tipe: "Onsite",
      Deskripsi:
        "Di program Manajemen UIB, mahasiswa mempelajari analisis bisnis, kepemimpinan, inovasi, serta strategi pengambilan keputusan berbasis data untuk mencetak calon pemimpin dan profesional bisnis yang siap bersaing di tingkat global.",
      Tanggal: "10 Oktober 2025",
      Waktu: "09.00 WIB - 12.00 WIB",
      Peserta: "20 Orang",
      Tempat: "Gedung TA II.12",
      Image: kuliah,
    },
    {
      Program: "KULIAH BERSERTIFIKAT 1 HARI",
      Kampus: "Universitas Internasional Batam (UIB)",
      Jurusan: "Arsitektur",
      Tipe: "Onsite",
      Deskripsi:
        "Di program Arsitektur UIB, mahasiswa mempelajari perancangan bangunan, estetika ruang, dan teknologi konstruksi, serta mengembangkan kreativitas dalam menciptakan desain yang fungsional, berkelanjutan, dan bernilai seni tinggi.",
      Tanggal: "10 Oktober 2025",
      Waktu: "09.00 WIB - 12.00 WIB",
      Peserta: "10 Orang",
      Tempat: "Gedung Utama Kampus",
      Image: kuliah,
    },
    {
      Program: "KULIAH BERSERTIFIKAT 1 HARI",
      Kampus: "Universitas Internasional Batam (UIB)",
      Jurusan: "Teknologi Informasi",
      Tipe: "Onsite",
      Deskripsi:
        "Di program Teknologi Informasi UIB, mahasiswa mempelajari pengelolaan sistem informasi, jaringan komputer, keamanan data, serta pengembangan solusi digital untuk mendukung transformasi teknologi di berbagai sektor industri.",
      Tanggal: "10 Oktober 2025",
      Waktu: "09.00 WIB - 12.00 WIB",
      Peserta: "10 Orang",
      Tempat: "Gedung Utama Kampus",
      Image: kuliah,
    },
  ],
  // Data Program untuk kampus lain (ID 2, 3, dst.) akan ditambahkan di sini
};

// --- KOMPONEN PROGRAM CARD ---
const ProgramCard = ({ program }) => (
  <div className="flex flex-col lg:flex-row border rounded-2xl overflow-hidden shadow-lg bg-white transition hover:shadow-xl">
    {/* Bagian Kiri: Gambar dan Judul Program Utama */}
    <div
      className="lg:w-1/3 flex flex-col justify-end bg-cover bg-center p-6 text-white"
      // Menggunakan background image dengan overlay warna untuk efek keren
      style={{
        backgroundImage: `linear-gradient(rgba(1, 59, 53, 0.4), rgba(1, 59, 53, 0.7)), url(${program.Image})`,
        backgroundColor: "#013B35",
        minHeight: "200px",
      }}>
      <h3 className="text-3xl font-extrabold leading-tight drop-shadow-lg">
        {program.Program}
      </h3>
    </div>

    {/* Bagian Kanan: Detail dan Tombol */}
    <div className="lg:w-2/3 p-6 flex flex-col justify-between">
      <div>
        {/* Deskripsi */}
        <p className="text-gray-600 mb-4 text-sm">{program.Deskripsi}</p>

        {/* Info Utama: Kampus, Jurusan, Tipe */}
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

        {/* Grid Detail Waktu & Tempat */}
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

      {/* Tombol Aksi */}
      <button className="w-full lg:w-auto self-start min-w-[659px] px-10 py-3 bg-[#013B35] text-white rounded-xl font-bold hover:bg-[#015f53] transition-all duration-300">
        Ikut Program
      </button>
    </div>
  </div>
);

// --- KOMPONEN UTAMA ---
export default function CampusProgram() {
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
      <Navbar />

      {/* 1. Header Kampus (Menggunakan struktur dari CampusJurusanPage) */}
      <header className="px-10 pt-10 pb-0 bg-white">
        <div className="max-w-7xl mx-auto rounded-xl shadow-lg overflow-hidden">
          {/* Gambar Gedung */}
          <div className="grid grid-cols-1 grid-rows-1 gap-3 h-[400px]">
            <img
              src={kampus.image}
              alt="Gedung Utama"
              className="col-span-2 row-span-2 w-full h-full object-cover rounded-tl-xl rounded-bl-xl"
            />
          </div>

          {/* Info Kampus di Bawah Gambar */}
          <div className="bg-[#013B35] text-white px-12 py-6 flex justify-between items-center rounded-b-xl -mt-16 relative z-10">
            <div className="flex items-center space-x-4">
              <div className="bg-white p-3 rounded-full shadow-lg border-4 border-gray-100 -mt-10">
                <img
                  src={kampus.logo}
                  alt={`${kampus.name} Logo`}
                  className="w-20 h-20 object-contain"
                />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {kampus.name}
                </h1>
                <div className="flex items-center text-gray-300 mt-1">
                  <MapPin size={16} className="mr-2" />
                  <span className="text-sm">{kampus.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Konten Program */}
      <section className="mt-12 max-w-6xl mx-auto px-6 md:px-0 mb-20 flex flex-col items-start w-full">
        {/* Tombol Navigasi (Menggunakan struktur dari CampusJurusanPage) */}
        <div className="flex flex-wrap gap-4 mb-10 justify-start">
          <Link
            to={`/campus-detail/${kampus.id}`}
            className="px-6 py-2 border border-[#013B35] text-[#013B35] rounded-full font-semibold hover:bg-[#013B35] hover:text-white transition">
            Deskripsi
          </Link>
          <Link
            to={`/campus/${kampus.id}/prestasi`}
            className="px-6 py-2 border border-[#013B35] text-[#013B35] rounded-full font-semibold hover:bg-[#013B35] hover:text-white transition">
            Prestasi
          </Link>
          <Link
            to={"/campus/${kampus.id}/jurusan"}
            className="px-6 py-2 border border-[#013B35] text-[#013B35] rounded-full font-semibold hover:bg-[#013B35] hover:text-white transition">
            Jurusan          
          </Link>
          <Link
            to={`/campus/${kampus.id}/program`}
            // Kelas aktif sesuai dengan tampilan gambar (warna biru/hijau tua)
            className="px-6 py-2 border bg-[#013B35] text-white rounded-full font-semibold">
            Program
          </Link>
        </div>

        {/* List Program */}
        <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 space-y-8 w-full">
          <h2 className="text-2xl font-bold text-[#013B35] text-center mb-6">
            Program yang Ditawarkan {kampus.name}
          </h2>
          <p className="text-gray-700 leading-relaxed text-center max-w-3xl mx-auto mb-8">
            Melalui TEMPA, Politeknik Negeri Batam membuka ruang bagi siswa
            untuk menjalani minat, mengenal dunia kampus, dan mempersiapkan arah
            masa depan melalui berbagai program pembelajaran dan pengalaman
            langsung.
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

      <Footer />
    </div>
  );
}
