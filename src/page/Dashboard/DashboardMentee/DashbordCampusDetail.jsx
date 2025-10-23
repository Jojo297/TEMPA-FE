import React from "react";
import { Link, useParams } from "react-router-dom";
import { kampusList } from "@/lib/kampusList";
import { CampusHeaderProfile } from "@/components/campusHeaderProfile";
import SidebarWithNavbar from "@/components/SidebarWithNavbar";
import { MapPin } from "lucide-react";

const DashboardCampusDetail = () => {
  const { id } = useParams();
  const kampus = kampusList.find((k) => k.id === parseInt(id));

  if (!kampus)
    return (
      <SidebarWithNavbar>
        <div className="min-h-screen flex items-center justify-center text-red-500">
          <p className="text-xl font-semibold">Kampus tidak ditemukan</p>
        </div>
      </SidebarWithNavbar>
    );

  return (
    <>
      {/* Header Kampus */}
      {/* <CampusHeaderProfile kampus={kampus} /> */}
      <header className="bg-[#F8FAFB]">
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

      {/* Info Kampus */}
      <section className="mt-12 max-w-6xl bg-[#F8FAFB] mx-auto mb-20  flex flex-col items-start">
        {/* Tombol Navigasi */}
        <div className="flex flex-wrap gap-4 mb-10 justify-start">
          <Link
            to={`/dashboard-mentee/kampus/${kampus.id}`}
            className="px-6 py-2 border bg-[#013B35] text-white rounded-full font-semibold"
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
            className="px-6 py-2 border border-[#013B35] text-[#013B35] rounded-full font-semibold hover:bg-[#013B35] hover:text-white transition"
          >
            Program
          </Link>
        </div>

        {/* Deskripsi & Visi Misi */}
        <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 space-y-6 w-full">
          <h2 className="text-2xl font-bold text-[#013B35]">
            Tentang {kampus.name}
          </h2>
          <p className="text-gray-700 leading-relaxed">{kampus.desc}</p>

          <h3 className="text-2xl font-bold text-[#013B35]">Visi & Misi</h3>
          <p className="text-gray-700">
            <strong>Visi:</strong> {kampus.visi}
          </p>
          <div className="text-gray-700">
            <strong>Misi:</strong>{" "}
            {Array.isArray(kampus.misi) ? (
              <ul className="list-disc list-inside mt-1">
                {kampus.misi.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>{kampus.misi}</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardCampusDetail;
