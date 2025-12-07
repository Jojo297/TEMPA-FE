import React from "react";
import { Link, useParams } from "react-router-dom";
import { kampusList } from "@/lib/kampusList";
import { CampusHeaderProfile } from "./campusHeaderProfile";
import { NavbarLandingPage } from "./NavbarLandingPage";

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
      {/* Navbar */}
      <NavbarLandingPage />

      {/* Header Campus */}
      <div className="mt-4">
        <CampusHeaderProfile kampus={kampus} />
      </div>

      {/* Info Kampus */}
      <section className="mt-12 max-w-6xl mx-auto px-6 md:px-0 mb-20 flex flex-col items-start">
        {/* Tombol Navigasi */}
        <div className="flex flex-wrap gap-4 mb-10 justify-start">
          <Link
            to={`/campus-detail/${kampus.id}`}
            className="px-6 py-2 border bg-[#013B35] text-white rounded-full font-semibold">
            Deskripsi
          </Link>
          {/* <Link
            to={`/campus/${kampus.id}/prestasi`}
            className="px-6 py-2 border border-[#013B35] text-[#013B35] rounded-full font-semibold hover:bg-[#013B35] hover:text-white transition"
          >
            Prestasi
          </Link> */}
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
