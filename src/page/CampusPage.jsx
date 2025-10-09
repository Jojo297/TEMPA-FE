import React from "react";
import { Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import polibatam from "../assets/polibatam.jpeg";
import iteba from "../assets/iteba.jpg";
import uib from "../assets/uib.jpeg";

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
  return (
    <div className="min-h-screen bg-[#F8FAF8] font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Header */}
      <section className="bg-[#013B35] text-white py-20 text-center">
        <h1 className="text-4xl font-extrabold mb-3">
          Daftar Kampus Mitra TEMPA
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Jelajahi kampus-kampus pilihan yang telah bekerja sama dengan TEMPA
          untuk menghadirkan pengalaman pendidikan terbaik bagimu.
        </p>
      </section>

      {/* Cards Section */}
      <section className="py-16 px-8 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {kampusList.map((kampus) => (
            <div
              key={kampus.id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300 border border-gray-100">
              <img
                src={kampus.image}
                alt={kampus.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-[#013B35] mb-2">
                  {kampus.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-3 text-[#FFD700]">
                  {[...Array(kampus.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#FFD700" stroke="none" />
                  ))}
                </div>

                {/* Lokasi */}
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <MapPin size={16} className="mr-2 text-[#00BFA6]" />
                  {kampus.location}
                </div>

                {/* Deskripsi */}
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {kampus.desc}
                </p>

                {/* Jurusan */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {kampus.jurusan.map((jrs, i) => (
                    <span
                      key={i}
                      className="bg-[#E9F7F4] text-[#013B35] text-xs px-3 py-1 rounded-full font-medium">
                      {jrs}
                    </span>
                  ))}
                </div>

                {/* Lihat Detail */}
                <Link
                  to={`/campus-detail/${kampus.id}`}
                  className="bg-[#013B35] text-white w-full py-2 rounded-lg font-semibold hover:bg-[#025D52] transition text-center block">
                  Lihat Detail
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CampusPage;
