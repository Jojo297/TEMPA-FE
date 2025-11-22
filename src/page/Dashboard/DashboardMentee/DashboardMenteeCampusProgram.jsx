import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MapPin, Calendar, Users, Clock, Map, Home } from "lucide-react";

import SidebarWithNavbar from "@/components/SidebarMentee";
import Footer from "@/components/Footer";
import { kampusList } from "@/lib/kampusList";
import kuliah from "@/assets/kuliah.png";
import { CampusHeaderProfile } from "@/components/campusHeaderProfile";

// --- Data Program per Kampus ---
const programData = {
  1: [
    {
      Program: "KULIAH BERSERTIFIKAT 1 HARI",
      Kampus: "Politeknik Negeri Batam",
      Jurusan: "Teknik Informatika",
      Tipe: "Onsite",
      Deskripsi:
        "Di program Informatika Polibatam, mahasiswa belajar coding menggunakan Python untuk memahami logika pemrograman, analisis data, dan pengembangan aplikasi dasar.",
      Tanggal: "10 Oktober 2025",
      Waktu: "09.00 WIB - 12.00 WIB",
      Peserta: "20 Orang",
      Tempat: "Gedung TA II.12",
      Image: kuliah,
    },
  ],
  2: [
    {
      Program: "KULIAH BERSERTIFIKAT 1 HARI",
      Kampus: "Institut Teknologi Batam (ITEBA)",
      Jurusan: "Teknik Informatika",
      Tipe: "Onsite",
      Deskripsi:
        "Mahasiswa mempelajari dasar pemrograman, pengembangan web menggunakan PHP, serta konsep basis data dan teknologi jaringan untuk membangun solusi digital yang efisien.",
      Tanggal: "10 Oktober 2025",
      Waktu: "09.00 WIB - 12.00 WIB",
      Peserta: "20 Orang",
      Tempat: "Gedung A ITEBA",
      Image: kuliah,
    },
    {
      Program: "KULIAH BERSERTIFIKAT 1 HARI",
      Kampus: "Institut Teknologi Batam (ITEBA)",
      Jurusan: "Manajemen",
      Tipe: "Onsite",
      Deskripsi:
        "Mahasiswa mempelajari perencanaan bisnis, pengelolaan sumber daya, serta strategi pemasaran dan keuangan untuk mencetak manajer yang adaptif dan berdaya saing tinggi.",
      Tanggal: "10 Oktober 2025",
      Waktu: "09.00 WIB - 12.00 WIB",
      Peserta: "20 Orang",
      Tempat: "Gedung B ITEBA",
      Image: kuliah,
    },
  ],
  3: [
    {
      Program: "KULIAH BERSERTIFIKAT 1 HARI",
      Kampus: "Universitas Internasional Batam (UIB)",
      Jurusan: "Pendidikan Bahasa Inggris",
      Tipe: "Onsite",
      Deskripsi:
        "Mahasiswa mempelajari keterampilan berbahasa Inggris, metode pengajaran, linguistik, serta penerapan teknologi dalam pembelajaran untuk menjadi pendidik yang profesional.",
      Tanggal: "10 Oktober 2025",
      Waktu: "09.00 WIB - 12.00 WIB",
      Peserta: "20 Orang",
      Tempat: "Gedung Utama UIB",
      Image: kuliah,
    },
    {
      Program: "KULIAH BERSERTIFIKAT 1 HARI",
      Kampus: "Universitas Internasional Batam (UIB)",
      Jurusan: "Manajemen",
      Tipe: "Onsite",
      Deskripsi:
        "Mahasiswa mempelajari analisis bisnis, kepemimpinan, inovasi, serta strategi pengambilan keputusan berbasis data untuk mencetak calon pemimpin yang siap bersaing di tingkat global.",
      Tanggal: "10 Oktober 2025",
      Waktu: "09.00 WIB - 12.00 WIB",
      Peserta: "20 Orang",
      Tempat: "Gedung Utama UIB",
      Image: kuliah,
    },
  ],
};

export default function DashboardCampusProgram({ kampus }) {
  const navigate = useNavigate();
  const programs = kampus.program_program_id_campusTocampus;
  // console.log(programs);

  // badge for status program
  const getBadgeClass = (status) => {
    switch (status) {
      case "open":
        return {
          text: "Buka",
          bgColor: "bg-green-200",
          textColor: "text-green-800",
        };
      case "closed":
        return {
          text: "Tutup",
          bgColor: "bg-red-100",
          textColor: "text-red-800",
        };
    }
  };

  // get location if program online
  const getLocation = (status, item) => {
    switch (status) {
      case "online":
        return "Zoom/Gmeet";
      case "onsite":
        return item.sesi_description;
      default: // 🏆 Tambahkan ini
        return "Tempat belum ditentukan";
    }
  };

  if (!kampus) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        <p className="text-xl font-semibold">Kampus tidak ditemukan</p>
      </div>
    );
  }

  return (
    <>
      {/* List Program */}
      <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 space-y-8 w-full">
        <h2 className="text-2xl font-bold text-[#013B35] text-center mb-6">
          Program yang Ditawarkan {kampus.name}
        </h2>
        <p className="text-gray-700 leading-relaxed text-center max-w-3xl mx-auto mb-8">
          Melalui TEMPA, {kampus.name} membuka ruang bagi siswa untuk menjalani
          minat, mengenal dunia kampus, dan mempersiapkan arah masa depan
          melalui berbagai program pembelajaran dan pengalaman langsung.
        </p>

        <div className="space-y-6">
          {programs.length > 0 ? (
            programs.map((item, index) => (
              <div
                key={item.id}
                className="flex flex-col lg:flex-row border bg-white relative rounded-2xl overflow-hidden transition duration-300 hover:bg-white hover:shadow-xl"
              >
                {/* left side */}
                <div
                  className="lg:w-1/3 flex flex-col justify-end bg-cover bg-center p-6 text-white"
                  // Menggunakan background image dengan overlay warna untuk efek keren
                  style={{
                    backgroundImage: `linear-gradient(rgba(1, 59, 53, 0.4), rgba(1, 59, 53, 0.7)),  url(${item.image_url})`,
                    backgroundColor: "#013B35",
                    minHeight: "200px",
                  }}
                >
                  {/* Completion Status */}
                  {(() => {
                    // get badge status
                    const statusData = getBadgeClass(item.program_status);
                    return (
                      <div
                        className={`absolute top-4 z-10 px-3 py-1 rounded-full text-sm font-medium mt-2 sm:mt-0 ${statusData.bgColor} ${statusData.textColor}`}
                      >
                        {statusData.text}
                      </div>
                    );
                  })()}
                  <h3 className="text-3xl font-extrabold leading-tight drop-shadow-lg">
                    {item.program_name}
                  </h3>
                </div>

                {/* right side */}
                <div className="lg:w-2/3 p-6 flex flex-col justify-between">
                  <div>
                    {/* Main info: Kampus, Jurusan */}
                    <div className="flex flex-wrap items-center space-x-4 mb-4">
                      <div className="flex items-center text-[#013B35] font-semibold text-lg">
                        <span>{item.program_name}</span>
                      </div>
                      <div className="px-3 py-1 bg-green-100 text-[#013B35] rounded-full text-sm font-medium mt-2 sm:mt-0">
                        {
                          item.campus_program_id_majorTocampus.standard_major
                            .major_name
                        }
                      </div>
                      <div className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mt-2 sm:mt-0">
                        {item.type_sesi}
                      </div>
                    </div>

                    {/* description */}
                    <p className="text-gray-600 mb-4 text-sm">
                      {item.description}
                    </p>

                    {/* date and location */}
                    <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-gray-700 text-sm mb-6 border-t pt-4">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2 text-[#013B35]" />
                        <span>
                          {new Date(item.start_date).toLocaleDateString(
                            "id-ID",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Home size={16} className="mr-2 text-[#013B35]" />
                        <span>{kampus.campus_name}</span>
                      </div>
                      <div className="flex items-center">
                        <Users size={16} className="mr-2 text-[#013B35]" />
                        <span>{item.capacity} Orang</span>
                      </div>
                      <div className="flex items-center">
                        <Map size={16} className="mr-2 text-[#013B35]" />
                        <span>Tempat: {getLocation(item.type_sesi, item)}</span>
                      </div>
                    </div>

                    {/* Button */}
                    <button
                      onClick={() =>
                        navigate(`/dashboard-mentee/program/${item.id}`)
                      }
                      className="w-full py-3 bg-[#013B35] text-white rounded-xl font-bold hover:bg-[#015f53] transition-all duration-300"
                    >
                      Lihat Detail Program
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              Data Program belum tersedia untuk kampus ini.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
