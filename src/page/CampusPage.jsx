import React, { useState } from "react";
import { Star, MapPin, Search } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import polibatam from "../assets/polibatam.jpeg";
import iteba from "../assets/iteba.jpg";
import uib from "../assets/uib.jpeg";
import notfound from "../assets/robot-error.png";
import { NavbarLandingPage } from "@/components/NavbarLandingPage";

const kampusList = [
  {
    id: 1,
    name: "Politeknik Negeri Batam",
    image: polibatam,
    location: "Kota Batam, Kepulauan Riau",
    desc: "Polibatam merupakan kampus vokasi unggulan yang berfokus pada pendidikan terapan, riset, dan inovasi teknologi industri.",
    jurusan: [
      "Teknik Informatika",
      "Teknik Mesin",
      "Manajemen Bisnis",
      "Teknik Elektro",
    ],
    rating: 5,
  },
  {
    id: 2,
    name: "Institut Teknologi Batam (ITEBA)",
    image: iteba,
    location: "Kota Batam, Kepulauan Riau",
    desc: "ITEBA menghadirkan pendidikan berbasis teknologi dan kewirausahaan dengan semangat membangun inovator masa depan.",
    jurusan: [
      "Manajemen",
      "Teknik Informatika",
      "Teknik Industri",
      "K3 & Kesehatan Lingkungan",
    ],
    rating: 5,
  },
  {
    id: 3,
    name: "Universitas Internasional Batam (UIB)",
    image: uib,
    location: "Kota Batam, Kepulauan Riau",
    desc: "UIB menawarkan lingkungan belajar internasional dengan beragam jurusan unggulan dan kerja sama global.",
    jurusan: [
      "Teknologi Informasi",
      "Manajemen",
      "Arsitektur",
      "Pendidikan Bahasa Inggris",
    ],
    rating: 5,
  },
];

const CampusPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter kampus berdasarkan nama atau jurusan
  const filteredKampus = kampusList.filter(
    (kampus) =>
      kampus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kampus.jurusan.some((j) =>
        j.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="min-h-screen bg-[#F8FAF8] font-sans">
      {/* Navbar */}
      <NavbarLandingPage />

      {/* Header */}
      <section className="bg-[#013B35] text-white py-20 text-center">
        <h1 className="text-4xl font-extrabold mb-3">
          TEMUKAN KAMPUS IMPIANMU
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Eksplorasi berbagai kampus yang sesuai dengan minat dan bakatmu
        </p>
      </section>

      {/* Search Bar */}
      <div className="flex justify-center mt-10 px-6">
        <div className="relative w-full max-w-lg">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Cari kampus atau jurusan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#00BFA6] focus:border-[#00BFA6]"
          />
        </div>
      </div>

      {/* Cards Section */}
      <section className="py-16 px-8 md:px-20">
        {filteredKampus.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {filteredKampus.map((kampus) => (
              <Link to={`/campus-detail/${kampus.id}`} key={kampus.id}>
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300 border border-gray-100 flex flex-col h-full">
                  <img
                    src={kampus.image}
                    alt={kampus.name}
                    className="w-full h-56 object-cover flex-shrink-0"
                  />

                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-xl font-semibold text-[#013B35] mb-2">
                      {kampus.name}
                    </h2>

                    {/* Rating */}
                    <div className="flex items-center space-x-1 mb-3 text-[#FFD700]">
                      {/* ... Rating map ... */}
                    </div>

                    {/* Lokasi */}
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      {/* ... MapPin ... */}
                      {kampus.location}
                    </div>

                    {/* Deskripsi */}
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow">
                      {kampus.desc}
                    </p>

                    {/* Jurusan: Tambahkan MAX-H dan SCROLL di sini */}
                    <div className="flex flex-wrap gap-2 mb-0 max-h-24 overflow-y-auto pr-2 flex-shrink-0">
                      {kampus.jurusan.map((jrs, i) => (
                        <span
                          key={i}
                          className="bg-[#E9F7F4] text-[#013B35] text-xs px-3 py-1 rounded-full font-medium shrink-0"
                        >
                          {jrs}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-10">
            <img
              src={notfound}
              alt="Tidak ditemukan"
              className="w-48 h-48 object-contain mb-5 opacity-90"
            />
            <p className="text-center text-gray-500 mt-10">
              Kampus tidak ditemukan
            </p>
          </div>
        )}
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CampusPage;
