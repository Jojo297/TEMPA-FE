import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { kampusList } from "@/lib/kampusList";
import { jurusanList } from "@/lib/JurusanList"; // ✅ jurusan dipanggil dari file baru

const CampusJurusanPage = () => {
  const { id } = useParams();
  const campusId = parseInt(id);
  const kampus = kampusList.find((k) => k.id === campusId);

  const currentJurusanData = jurusanList[campusId] || [];
  const initialJurusan = currentJurusanData[0]?.Jurusan || null;
  const [openJurusan, setOpenJurusan] = useState(initialJurusan);

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

      {/* Header Kampus */}
      <header className="px-10 pt-10 pb-0 bg-white">
        <div className="max-w-7xl mx-auto rounded-xl shadow-lg overflow-hidden">
          <div className="h-[400px]">
            <img
              src={kampus.image}
              alt={`Gedung ${kampus.name}`}
              className="w-full h-full object-cover"
            />
          </div>

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

      {/* Jurusan Section */}
      <section className="mt-12 max-w-6xl mx-auto px-6 md:px-0 mb-20 flex flex-col items-start w-full">
        {/* Tombol Navigasi */}
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
            to={`/campus/${kampus.id}/jurusan`}
            className="px-6 py-2 border bg-[#013B35] text-white rounded-full font-semibold">
            Jurusan
          </Link>
          <Link
            to={`/campus/${kampus.id}/program`}
            className="px-6 py-2 border border-[#013B35] text-[#013B35] rounded-full font-semibold hover:bg-[#013B35] hover:text-white transition">
            Program
          </Link>
        </div>

        {/* Accordion Jurusan */}
        <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 space-y-6 w-full">
          <h2 className="text-2xl font-bold text-[#013B35] text-center mb-6">
            Jurusan & Program Studi {kampus.name}
          </h2>
          <p className="text-gray-700 leading-relaxed text-center max-w-3xl mx-auto mb-8">
            Pilih jurusan di bawah untuk melihat program studi dan informasi
            detail.
          </p>

          <div className="space-y-5">
            {currentJurusanData.length > 0 ? (
              currentJurusanData.map((item) => (
                <div
                  key={item.Jurusan}
                  className="border rounded-2xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => toggleJurusan(item.Jurusan)}
                    className="w-full text-left bg-[#013B35] text-white font-semibold px-6 py-4 flex justify-between items-center hover:bg-[#015f53] transition">
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
