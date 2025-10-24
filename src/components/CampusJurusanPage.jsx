import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Briefcase, ListCheck, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { kampusList } from "@/lib/kampusList";
import { jurusanList } from "@/lib/JurusanList";
import { CampusHeaderProfile } from "./campusHeaderProfile";
import { NavbarLandingPage } from "./NavbarLandingPage";

const CampusJurusanPage = () => {
  const { id } = useParams();
  const campusId = parseInt(id);
  const kampus = kampusList.find((k) => k.id === campusId);
  // console.table(kampus.name);

  const filteredJurusanDetails = useMemo(() => {
    // Ambil nama kampus aktif dan normalkan (lowercase)
    const activeCampusName = kampus.name.toLowerCase();

    return jurusanList.filter((jurusan) =>
      jurusan.kampusTerkait.some(
        (kampusTerkait) => kampusTerkait.nama.toLowerCase() === activeCampusName
      )
    );
  }, [kampus]); // Dependencies hanya kampus

  // console.log(filteredJurusanDetails);

  // 2. INISIALISASI STATE
  const initialJurusan = filteredJurusanDetails[0]?.nama || null;

  // console.log(initialJurusan);
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
      {/* Navbar */}
      <NavbarLandingPage />

      {/* Header Kampus */}
      <div className="mt-4">
        <CampusHeaderProfile kampus={kampus} />
      </div>

      {/* Jurusan Section */}
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
            className="px-6 py-2 border bg-[#013B35] text-white rounded-full font-semibold"
          >
            Jurusan
          </Link>
          <Link
            to={`/campus/${kampus.id}/program`}
            className="px-6 py-2 border border-[#013B35] text-[#013B35] rounded-full font-semibold hover:bg-[#013B35] hover:text-white transition"
          >
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
            {/* MENGGUNAKAN filteredJurusanDetails */}
            {filteredJurusanDetails.length > 0 ? (
              filteredJurusanDetails.map((item) => (
                <div
                  key={item.slug} // Menggunakan slug sebagai key unik
                  className="border rounded-2xl overflow-hidden shadow-sm"
                >
                  <button
                    // MENGGUNAKAN item.nama
                    onClick={() => toggleJurusan(item.nama)}
                    className="w-full text-left bg-[#013B35] text-white font-semibold px-6 py-4 flex justify-between items-center hover:bg-[#015f53] transition"
                  >
                    <span>{item.nama}</span> {/* MENGGUNAKAN item.nama */}
                    <span>{openJurusan === item.nama ? "−" : "+"}</span>
                  </button>

                  {/* Konten Detail Jurusan dari jurusanList */}
                  {openJurusan === item.nama && (
                    <div className="p-6 bg-gray-50">
                      <h3 className="text-xl font-bold text-[#013B35] mb-3">
                        Deskripsi
                      </h3>
                      <p className="text-gray-800 mb-6 leading-relaxed">
                        {item.deskripsi}
                      </p>

                      <h3 className="text-xl font-bold text-[#013B35] mb-3 flex items-center">
                        <Briefcase size={20} className="mr-2" />
                        Prospek Kerja
                      </h3>
                      <ul className="space-y-2 list-disc ml-5 text-gray-700">
                        {item.prospekKerja.map((prospek, index) => (
                          <li key={index} className="flex items-start">
                            <ListCheck
                              size={16}
                              className="text-[#013B35] mr-2 flex-shrink-0 mt-1"
                            />
                            {prospek}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-10">
                Maaf, data Jurusan yang terkait di **`jurusanList`** untuk
                kampus **{kampus.name}** belum tersedia.
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
