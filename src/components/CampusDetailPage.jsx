import React from "react";
import { Link, useParams } from "react-router-dom";
import { MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import iteba from "../assets/itebaGedung.jpg";
import uib from "../assets/uibGedung.jpg";
import logoPolibatam from "../assets/logo-polibatam.png";
import logoIteba from "../assets/logo-iteba.png";
import logoUib from "../assets/logo-uib.png";
import polibatam from "../assets/Gedung.jpg";
import POLIBATAM_LOGO from "../assets/logo-polibatam.png";
import { kampusList } from "@/lib/kampusList";

const CampusDetailPage = () => {
  const { id } = useParams();
  const kampus = kampusList.find((k) => k.id === parseInt(id));

  if (!kampus)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        <p className="text-xl font-semibold">Kampus tidak ditemukan</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAF8] font-sans flex flex-col">
      <Navbar />

      {/* Header Image */}
      <header className="px-10 pt-10 pb-0 bg-white">
        <div className="max-w-7xl mx-auto rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 grid-rows-1 gap-3 h-[400px]">
            <img
              src={kampus.image}
              alt="Gedung Utama"
              className="col-span-2 row-span-2 w-full h-full object-cover rounded-tl-xl rounded-bl-xl"
            />
          </div>

          <div className="bg-[#013B35] text-white px-12 py-6 flex justify-between items-center rounded-b-xl -mt-16 relative z-10">
            <div className="flex items-center space-x-4">
              <div className="bg-white p-3 rounded-full shadow-lg border-4 border-gray-100 -mt-10">
                <img
                  src={kampus.logo}
                  alt="Polibatam Logo"
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

      {/* Info Kampus */}
      <section className="mt-12 max-w-6xl mx-auto px-6 md:px-0 mb-20 flex flex-col items-start">
        {/* Tombol Navigasi */}
        <div className="flex flex-wrap gap-4 mb-10 justify-start">
          <Link
            to={`/campus-detail/${kampus.id}`}
            className="px-6 py-2 border bg-[#013B35] text-white rounded-full font-semibold">
            Deskripsi
          </Link>
          <Link
            to={`/campus/${kampus.id}/prestasi`}
            className="px-6 py-2 border border-[#013B35] text-[#013B35] rounded-full font-semibold hover:bg-[#013B35] hover:text-white transition">
            Prestasi
          </Link>
          <Link
            to={`/campus/${kampus.id}/jurusan`}
            // Active state class applied
            className="px-6 py-2 border border-[#013B35] text-[#013B35] rounded-full font-semibold hover:bg-[#013B35] hover:text-white transition">
            Jurusan
          </Link>
          <Link
            to={`/campus/${kampus.id}/program`}
            // Active state class applied
            className="px-6 py-2 border border-[#013B35] text-[#013B35] rounded-full font-semibold hover:bg-[#013B35] hover:text-white transition">
            Program
          </Link>
          {/* <button className="px-6 py-2 border border-[#013B35] text-[#013B35] rounded-full font-semibold hover:bg-[#013B35] hover:text-white transition">
            Program
          </button> */}
        </div>
        {/* Deskripsi & Visi Misi */}
        <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 space-y-6">
          <h2 className="text-2xl font-bold text-[#013B35]">
            Tentang {kampus.name}
          </h2>
          <p className="text-gray-700 leading-relaxed">{kampus.desc}</p>

          <h3 className="text-2xl font-bold text-[#013B35]">Visi & Misi</h3>
          <p className="text-gray-700">
            <strong>Visi:</strong> {kampus.visi}
          </p>
          <p className="text-gray-700">
            <strong>Misi:</strong> {kampus.misi}
          </p>
        </div>
      </section>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default CampusDetailPage;
