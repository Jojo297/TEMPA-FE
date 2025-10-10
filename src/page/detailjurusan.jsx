import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin, // Untuk lokasi kampus di header
  Check, // Ikon centang untuk daftar Program Studi
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";
// Aset gambar. Sesuaikan path ini dengan struktur proyek Anda
import logo2 from "../assets/logo-text.png";
import Gedung from "../assets/Gedung.jpg";
// Asumsi path untuk logo dan gambar Polibatam
import POLIBATAM_LOGO from "../assets/polibatam-logo.png";
import TI_LOGO from "../assets/if.jpg";

// --- Data Dummy untuk Halaman Detail Kampus ---
const politeknikData = {
  name: "Politeknik Negeri Batam",
  location: "Batam, Riau Islands, Indonesia",
  description:
    "Sebagai perguruan tinggi vokasi, Politeknik Negeri Batam menyelenggarakan program Diploma 3 (D3) dan Diploma 4 (D4) yang dinaungi oleh beberapa jurusan dan program studi yang relevan dengan keutuhan industri 4.",
  jurusan: [
    {
      name: "Teknik Informatika",
      logo: TI_LOGO,
      prodi: [
        { name: "Diploma 3 Teknik Informatika", level: "D3" },
        { name: "Diploma 3 Teknologi Geomatika", level: "D3" },
        { name: "Sarjana Terapan Animasi", level: "D4" },
        { name: "Sarjana Terapan Teknologi Rekayasa Multimedia", level: "D4" },
        { name: "Sarjana Terapan Rekayasa Keamanan Siber", level: "D4" },
        { name: "Sarjana Terapan Rekayasa Perangkat Lunak", level: "D4" },
        { name: "Sarjana Terapan Teknologi Permainan", level: "D4" },
        { name: "Magister Terapan (S2) / Teknik Komputer", level: "S2" },
      ],
      description:
        "Sebagai jurusan yang berperan penting dalam mencetak talenta digital masa depan, Teknik Informatika Polibatam menghadirkan beberapa program studi unggulan berikut:",
    },
    { name: "Manajemen Bisnis" },
    { name: "Teknik Elektro" },
    { name: "Teknik Mesin" },
  ],
  // Asumsi path gambar sesuai dengan gambar yang diunggah
  gallery: [
    Gedung, // Gambar utama/lebar
    "/assets/meeting-room.jpg", 
    "/assets/library.jpg", 
    "/assets/students.jpg", 
    "/assets/class-room.jpg", 
  ],
};

const MajorDetailPage = () => {
  const [activeTab, setActiveTab] = useState("Jurusan");
  const [activeMajor, setActiveMajor] = useState("Teknik Informatika");

  const activeMajorData = politeknikData.jurusan.find(
    (j) => j.name === activeMajor
  );
  const prodiList = activeMajorData?.prodi || [];

  // Logika untuk membagi daftar prodi menjadi 2 kolom
  const halfLength = Math.ceil(prodiList.length / 2);
  const prodiLeft = prodiList.slice(0, halfLength);
  const prodiRight = prodiList.slice(halfLength);

  return (
    <div className="min-h-screen bg-[#F8FAF8] font-sans">
      
      {/* 1. Navbar (Diambil dari LandingPage, disesuaikan ke warna putih) */}
      <nav className="bg-white text-[#013B35] px-10 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-2">
          <img
            src={logo2}
            alt="Logo TEMPA"
            className="h-8 w-auto object-contain"
          />
        </div>

        <ul className="flex items-center space-x-10 text-sm font-medium">
          <li><Link to="#kampus" className="hover:text-[#00BFA6]">Kampus</Link></li>
          <li><Link to="#jurusan" className="hover:text-[#00BFA6]">Jurusan</Link></li>
          <li><Link to="#program" className="hover:text-[#00BFA6]">Program</Link></li>
          <li><Link to="#masuk" className="hover:text-[#00BFA6]">Masuk</Link></li>
          <li>
            <Link
              to="#daftar"
              className="bg-[#013B35] text-white px-4 py-1.5 rounded-full font-semibold hover:bg-opacity-90 transition">
              Daftar
            </Link>
          </li>
        </ul>
      </nav>

      {/* 2. Header Kampus & Galeri Gambar */}
      <header className="px-10 pt-10 pb-0 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Galeri Grid */}
          <div className="grid grid-cols-3 grid-rows-2 gap-3 h-[400px]">
            {/* Gambar Utama/Wide (Col 1 & 2, Row 1 & 2) */}
            <img 
                src={politeknikData.gallery[0]} 
                alt="Kampus Utama" 
                className="col-span-2 row-span-2 w-full h-full object-cover rounded-tl-xl rounded-bl-xl"
            />
            {/* Gambar Kecil Kanan Atas */}
            <img 
                src={politeknikData.gallery[1]} 
                alt="Ruang Rapat" 
                className="w-full h-full object-cover rounded-tr-xl"
            />
            {/* Gambar Kecil Kanan Bawah */}
            <img 
                src={politeknikData.gallery[2]} 
                alt="Perpustakaan" 
                className="w-full h-full object-cover rounded-br-xl"
            />
          </div>

          {/* Info Utama Kampus */}
          <div className="bg-[#013B35] text-white px-12 py-6 flex justify-between items-center rounded-b-xl -mt-16 relative z-10">
            {/* Logo dan Nama Kampus */}
            <div className="flex items-center space-x-4">
              <div className="bg-white p-2 rounded-full shadow-lg border-4 border-gray-100 -mt-10">
                <img 
                    src={POLIBATAM_LOGO} 
                    alt="Polibatam Logo" 
                    className="w-16 h-16 object-contain"
                />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold">
                  {politeknikData.name}
                </h1>
                <div className="flex items-center text-gray-300 mt-1">
                  <MapPin size={16} className="mr-2" />
                  <span className="text-sm">{politeknikData.location}</span>
                </div>
              </div>
            </div>
            
            {/* Tombol Lihat Selengkapnya (Jika ada) */}
            <Link 
              to="#detail" 
              className="bg-[#96CCEC] text-[#013B35] px-6 py-2 rounded-full font-semibold hover:bg-white transition hidden md:block" // Sembunyikan jika tidak perlu
            >
              Lihat Selengkapnya
            </Link>
          </div>
        </div>
      </header>
      
      {/* 3. Konten Utama: Tabs & Detail Jurusan */}
      <main className="max-w-7xl mx-auto px-10 py-12">
        {/* Tabs Navigasi */}
        <div className="flex space-x-4 border-b-2 border-gray-200 mb-8">
          {['Deskripsi', 'Prestasi', 'Jurusan', 'Program'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-8 text-base font-semibold transition-colors duration-200 rounded-t-lg ${
                activeTab === tab
                  ? "bg-[#B9E6FF] border-b-4 border-[#00BFA6] text-[#013B35]"
                  : "text-gray-600 hover:text-[#013B35] hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Konten Jurusan */}
        {activeTab === "Jurusan" && (
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-[#0A0A0A] mb-4">
              Jurusan Politeknik Negeri Batam
            </h2>
            <p className="text-gray-700 mb-8 max-w-4xl leading-relaxed">
              {politeknikData.description}
            </p>

            <div className="flex space-x-10">
              {/* Sidebar Jurusan (Panel Kiri) */}
              <div className="w-64 flex flex-col space-y-0.5 flex-shrink-0">
                {politeknikData.jurusan.map((jurusan, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveMajor(jurusan.name)}
                    className={`text-left p-3 font-semibold text-base transition-colors border ${
                      activeMajor === jurusan.name
                        ? "bg-[#013B35] text-white border-[#013B35] shadow-lg"
                        : "bg-white text-gray-800 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {jurusan.name}
                  </button>
                ))}
              </div>

              {/* Detail Jurusan Aktif (Panel Kanan) */}
              <div className="flex-1">
                <div className="bg-white p-6 border border-gray-200">
                    {/* Header Jurusan Aktif */}
                    <div className={`bg-[#013B35] text-white p-5 rounded-lg flex items-center`}>
                        <img 
                            src={activeMajorData.logo || TI_LOGO} 
                            alt={`Logo ${activeMajorData.name}`} 
                            className="w-20 h-20 object-contain mr-4"
                        />
                        <div>
                            <span className="text-sm font-light">TEKNIK INFORMATIKA POLIBATAM</span>
                            <h3 className="text-xl font-bold">{activeMajorData.name}</h3>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 border border-gray-200 mt-4 rounded-xl shadow-md">
                    <p className="text-gray-700 mb-6 leading-relaxed text-sm">
                      {activeMajorData.description}
                    </p>

                    {/* Daftar Program Studi (Dibuat 2 kolom) */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                      {/* Kolom Kiri */}
                      <div>
                        {prodiLeft.map((prodi, index) => (
                          <div key={`left-${index}`} className="flex items-start mb-3">
                            <Check size={18} className="text-[#00BFA6] flex-shrink-0 mt-1 mr-2" />
                            <p className="text-sm text-gray-800">
                              <span className="font-medium">{prodi.name}</span>
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Kolom Kanan */}
                      <div>
                        {prodiRight.map((prodi, index) => (
                          <div key={`right-${index}`} className="flex items-start mb-3">
                            <Check size={18} className="text-[#00BFA6] flex-shrink-0 mt-1 mr-2" />
                            <p className="text-sm text-gray-800">
                              <span className="font-medium">{prodi.name}</span>
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 4. Footer (Diambil dari LandingPage) */}
      <footer className="bg-[#013B36] text-white py-12 px-8 mt-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo dan Deskripsi Footer */}
          <div>
            <div className="p-4">
              <img
                src={logo2}
                alt="Logo TEMPA"
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-gray-300 text-sm mt-3 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            {/* Icon Sosial Media */}
            <div className="flex space-x-4 mt-5 text-xl">
              <FaFacebookF className="hover:text-[#75B4C6] cursor-pointer" />
              <FaInstagram className="hover:text-[#75B4C6] cursor-pointer" />
              <FaYoutube className="hover:text-[#75B4C6] cursor-pointer" />
              <FaXTwitter className="hover:text-[#75B4C6] cursor-pointer" />
            </div>
          </div>

          {/* Kolom Link Footer */}
          <div>
            <h2 className="font-semibold mb-4 text-lg">TOP 4 KAMPUS</h2>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Politeknik Negeri Batam</li>
              <li>Politeknik Negeri Batam</li>
              <li>Politeknik Negeri Batam</li>
              <li>Politeknik Negeri Batam</li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-4 text-lg">TOP 4 PERUSAHAAN</h2>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Suit Nusapersada</li>
              <li>Suit Nusapersada</li>
              <li>Suit Nusapersada</li>
              <li>Suit Nusapersada</li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-4 text-lg">BANTUAN</h2>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Tentang Kami</li>
              <li>FAQs</li>
              <li>Help Center</li>
              <li>Terms and Condition</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-600 mt-10 pt-5 text-center text-sm text-gray-400">
          © 2025 TEMPA. All rights reserved.
        </div>
      </footer>
    </div>
  );
};