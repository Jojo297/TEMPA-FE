import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Briefcase, ListCheck } from "lucide-react";
import SidebarWithNavbar from "@/components/SidebarWithNavbar";
import { kampusList } from "@/lib/kampusList";
import { jurusanList } from "@/lib/JurusanList";
import { CampusHeaderProfile } from "@/components/campusHeaderProfile";

const DashboardCampusJurusan = () => {
  const { id } = useParams();
  const campusId = parseInt(id);
  const kampus = kampusList.find((k) => k.id === campusId);

  // Filter jurusan berdasarkan kampus aktif
  const filteredJurusanDetails = useMemo(() => {
    if (!kampus) return [];
    const activeCampusName = kampus.name.toLowerCase();

    return jurusanList.filter((jurusan) =>
      jurusan.kampusTerkait.some(
        (kampusTerkait) => kampusTerkait.nama.toLowerCase() === activeCampusName
      )
    );
  }, [kampus]);

  const initialJurusan = filteredJurusanDetails[0]?.nama || null;
  const [openJurusan, setOpenJurusan] = useState(initialJurusan);

  const toggleJurusan = (jurusanName) => {
    setOpenJurusan(openJurusan === jurusanName ? null : jurusanName);
  };

  if (!kampus) {
    return (
      <SidebarWithNavbar>
        <div className="min-h-screen flex items-center justify-center text-red-500">
          <p className="text-xl font-semibold">Kampus tidak ditemukan</p>
        </div>
      </SidebarWithNavbar>
    );
  }

  return (
    <>
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
          {filteredJurusanDetails.length > 0 ? (
            filteredJurusanDetails.map((item) => (
              <div
                key={item.slug}
                className="border rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleJurusan(item.nama)}
                  className="w-full text-left bg-[#013B35] text-white font-semibold px-6 py-4 flex justify-between items-center hover:bg-[#015f53] transition"
                >
                  <span>{item.nama}</span>
                  <span>{openJurusan === item.nama ? "−" : "+"}</span>
                </button>

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
              Maaf, data Jurusan untuk kampus <strong>{kampus.name}</strong>{" "}
              belum tersedia.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardCampusJurusan;
