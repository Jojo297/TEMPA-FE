import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Asset Imports
import polibatamImage from "../assets/polibatam.jpeg";
import itebaImage from "../assets/iteba.jpg";
import uibImage from "../assets/uib.jpeg";
import logoPolibatam from "../assets/logo-polibatam.png";
import logoIteba from "../assets/logo-iteba.png";
import logoUib from "../assets/logo-uib.png";
import tiLogo from "../assets/if.jpg";
import elektroLogo from "../assets/ELEKTRO.png";
import tmLogo from "../assets/TM.jpg";
import gedung from "../assets/Gedung.jpg";
import hanggar from "../assets/Hanggar.jpeg";
import tecno from "../assets/Techno.jpg";
import POLIBATAM_LOGO from "../assets/logo-polibatam.png";

// === KAMPUS LIST ===
const kampusList = [
  {
    id: 1,
    name: "Politeknik Negeri Batam",
    image: polibatamImage,
    logo: logoPolibatam,
    location: "Batam, Riau Islands, Indonesia",
  },
  {
    id: 2,
    name: "Institut Teknologi Batam (ITEBA)",
    image: itebaImage,
    logo: logoIteba,
    location: "Batam, Riau Islands, Indonesia",
  },
  {
    id: 3,
    name: "Universitas Internasional Batam (UIB)",
    image: uibImage,
    logo: logoUib,
    location: "Batam, Riau Islands, Indonesia",
  },
];

// === DATA JURUSAN PER KAMPUS ===
const jurusanData = {
  1: [
    {
      Jurusan: "Teknik Informatika",
      content: (
        <div className="flex flex-col lg:flex-row gap-6 p-4">
          <div className="w-full lg:w-1/3 flex justify-center items-start">
            <img
              src={tiLogo}
              alt="Teknik Informatika Polibatam"
              className="max-w-[200px] h-auto object-contain"
            />
          </div>
          <div className="w-full lg:w-2/3 text-gray-700 leading-relaxed">
            <p className="mb-4">
              Sebagai jurusan yang berperan penting dalam mencetak talenta digital masa depan, Teknik Informatika Polibatam menghadirkan beberapa program studi unggulan berikut:
            </p>
            <div className="flex flex-col sm:flex-row">
              <ul className="list-disc ml-5 space-y-1 w-full sm:w-1/2">
                <li>Diploma 3 Teknik Informatika</li>
                <li>Diploma 3 Teknologi Geomatika</li>
                <li>Sarjana Terapan Animasi</li>
                <li>Sarjana Terapan Teknologi Rekayasa Multimedia</li>
              </ul>
              <ul className="list-disc ml-5 space-y-1 w-full sm:w-1/2 mt-4 sm:mt-0">
                <li>Sarjana Terapan Rekayasa Keamanan Siber</li>
                <li>Sarjana Terapan Rekayasa Perangkat Lunak</li>
                <li>Sarjana Terapan Teknologi Permainan</li>
                <li>Magister Terapan (S2) / Teknik Komputer</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      Jurusan: "Teknik Elektro",
      content: (
        <div className="flex flex-col lg:flex-row gap-6 p-4">
          <div className="w-full lg:w-1/3 flex justify-center items-start">
            <img
              src={elektroLogo}
              alt="Teknik Elektro Polibatam"
              className="max-w-[200px] h-auto object-contain"
            />
          </div>
          <div className="w-full lg:w-2/3 text-gray-700 leading-relaxed">
            <p className="mb-4">
              Sebagai jurusan yang berperan penting dalam dunia Elektronika, Teknik Elektro Polibatam menghadirkan beberapa program studi unggulan berikut:
            </p>
            <div className="flex flex-col sm:flex-row">
              <ul className="list-disc ml-5 space-y-1 w-full sm:w-1/2">
                <li>Diploma 3 Teknik Elektronika Manufaktur</li>
                <li>Diploma 3 Teknik Instrumentasi</li>
                <li>Sarjana Terapan Teknik Robotika</li>
                <li>Sarjana Terapan Teknologi Rekayasa Elektronika</li>
              </ul>
              <ul className="list-disc ml-5 space-y-1 w-full sm:w-1/2 mt-4 sm:mt-0">
                <li>Sarjana Terapan Rekayasa Pembangkit Energi</li>
                <li>Sarjana Terapan Mekatronika</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      Jurusan: "Teknik Mesin",
      content: (
        <div className="flex flex-col lg:flex-row gap-6 p-4 items-center lg:items-start">
          <div className="w-full lg:w-1/3 flex justify-center items-start">
            <img
              src={tmLogo}
              alt="Teknik Mesin Polibatam"
              className="max-w-[200px] h-auto object-contain"
            />
          </div>
          <div className="w-full lg:w-2/3 text-gray-700 leading-relaxed">
            <p className="mb-4">
              Jurusan Teknik Mesin Polibatam fokus pada pengembangan kompetensi di bidang perancangan, manufaktur, dan perawatan mesin industri. Program studi unggulan:
            </p>
            <ul className="list-disc ml-5 space-y-1">
              <li>Diploma 3 Teknik Mesin</li>
              <li>Sarjana Terapan Teknik Perancangan dan Konstruksi Kapal</li>
              <li>Sarjana Terapan Teknologi Rekayasa Kimia Industri</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      Jurusan: "Management Bisnis",
      content: (
        <p className="p-4 text-gray-700 leading-relaxed">
          Jurusan Management Bisnis Polibatam menyiapkan lulusan yang siap bersaing dalam dunia usaha. Program studi unggulan: D3 Akuntansi, S.Tr. Akuntansi Manajerial, S.Tr. Administrasi Bisnis Terapan.
        </p>
      ),
    },
  ],
  // Placeholder data for ITEBA and UIB (IDs 2 & 3) using Jurusan structure
  2: [
    { Jurusan: "Teknologi Informasi", content: <p className="p-4 text-gray-700">Program studi: S1 Teknik Informatika, S1 Sistem Informasi.</p> },
    { Jurusan: "Desain", content: <p className="p-4 text-gray-700">Program studi: S1 Desain Komunikasi Visual (DKV).</p> },
    { Jurusan: "Rekayasa Industri", content: <p className="p-4 text-gray-700">Program studi: S1 Teknik Industri.</p> },
  ],
  3: [
    { Jurusan: "Hukum", content: <p className="p-4 text-gray-700">Program studi: S1 Ilmu Hukum.</p> },
    { Jurusan: "Bisnis dan Akuntansi", content: <p className="p-4 text-gray-700">Program studi: S1 Akuntansi, S1 Manajemen.</p> },
    { Jurusan: "Teknik", content: <p className="p-4 text-gray-700">Program studi: S1 Teknik Sipil, S1 Teknik Elektro.</p> },
    { Jurusan: "Pariwisata", content: <p className="p-4 text-gray-700">Program studi: S1 Pariwisata.</p> },
  ],
};

// --- MAIN COMPONENT ---
const CampusJurusanPage = () => {
  const { id } = useParams();
  const campusId = parseInt(id);
  const kampus = kampusList.find((k) => k.id === campusId);

  // State: Initialize with the first Jurusan name if available
  const currentJurusanData = jurusanData[campusId] || [];
  const initialJurusan = currentJurusanData[0]?.Jurusan || null;
  const [openJurusan, setOpenJurusan] = useState(initialJurusan);

  // Toggle function for the accordion
  const toggleJurusan = (jurusanName) => {
    setOpenJurusan(openJurusan === jurusanName ? null : jurusanName);
  };

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
      
      {/* 2. Header Kampus & Galeri Gambar (Problematic: Missing asset variables) */}
      <header className="px-10 pt-10 pb-0 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 grid-rows-2 gap-3 h-[400px]">
            <img 
                src={gedung} 
                alt="Gedung Utama" 
                className="col-span-2 row-span-2 w-full h-full object-cover rounded-tl-xl rounded-bl-xl"
            />
            <img 
                src={hanggar} 
                alt="Hanggar" 
                className="w-full h-full object-cover rounded-tr-xl"
            />
            <img 
                src={tecno} 
                alt="Gedung tecno" 
                className="w-full h-full object-cover rounded-br-xl"
            />
          </div>

          <div className="bg-[#013B35] text-white px-12 py-6 flex justify-between items-center rounded-b-xl -mt-16 relative z-10">
            <div className="flex items-center space-x-4">
              <div className="bg-white p-2 rounded-full shadow-lg border-4 border-gray-100 -mt-10">
                <img 
                    src={POLIBATAM_LOGO} 
                    alt="Polibatam Logo" 
                    className="w-16 h-16 object-contain"
                />
              </div>
              <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          {kampus.name}
        </h1>
                <div className="flex items-center text-gray-300 mt-1">
                  <MapPin size={16} className="mr-2" />
                  <span className="text-sm">{ kampus.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header> 

      {/* Info Kampus & Jurusan Content */}
      <section className="mt-12 max-w-6xl mx-auto px-6 md:px-0 mb-20 flex flex-col items-start w-full">
       

        {/* Tombol Navigasi */}
        <div className="flex flex-wrap gap-4 mb-10 justify-start">
          <Link
            to={`/campus-detail/${kampus.id}`}
            className="px-6 py-2 border border-[#013B35] text-[#013B35] rounded-full font-semibold hover:bg-[#013B35] hover:text-white transition"
          >
            Deskripsi
          </Link>
          <Link
            to={`/campus/${kampus.id}/prestasi`}
            className="px-6 py-2 border border-[#013B35] text-[#013B35] rounded-full font-semibold hover:bg-[#013B35] hover:text-white transition"
          >
            Prestasi
          </Link>
          <Link
            to={`/campus/${kampus.id}/jurusan`}
            // Active state class applied
            className="px-6 py-2 border bg-[#013B35] text-white rounded-full font-semibold"
          >
            Jurusan
          </Link>
          <button className="px-6 py-2 border border-[#013B35] text-[#013B35] rounded-full font-semibold hover:bg-[#013B35] hover:text-white transition">
            Program
          </button>
        </div>

        {/* Card Jurusan (Accordion) */}
        <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 space-y-6 w-full">
          <h2 className="text-2xl font-bold text-[#013B35] text-center mb-6">
            Jurusan & Program Studi {kampus.name}
          </h2>
          <p className="text-gray-700 leading-relaxed text-center max-w-3xl mx-auto mb-8">
            Pilih jurusan di bawah untuk melihat program studi dan informasi detail.
          </p>
          <div className="space-y-5">
            {currentJurusanData.length > 0 ? (
              currentJurusanData.map((item) => (
                <div
                  key={item.Jurusan}
                  className="border rounded-2xl overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => toggleJurusan(item.Jurusan)}
                    className="w-full text-left bg-[#013B35] text-white font-semibold px-6 py-4 flex justify-between items-center hover:bg-[#015f53] transition"
                  >
                    <span>{item.Jurusan}</span>
                    <span>{openJurusan === item.Jurusan ? "−" : "+"}</span>
                  </button>
                  {openJurusan === item.Jurusan && (
                    <div className="p-6 bg-gray-50">{item.content}</div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                Data Jurusan belum tersedia untuk kampus ini.
              </p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CampusJurusanPage;