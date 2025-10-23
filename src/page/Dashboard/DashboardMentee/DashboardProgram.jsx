import { Link } from "react-router-dom";
import SidebarWithNavbar from "@/components/SidebarWithNavbar";
import kuliah from "@/assets/kuliah.png";

export default function DashboardProgram() {
  const programs = [
    {
      id: 1,
      title: "Kuliah Bersertifikat 1 Hari",
      date: "10 Oktober 2025",
      time: "09.00 WIB - 12.00 WIB",
      location: "Gedung TA lt.2",
      capacity: "20 Orang",
      campus: "Politeknik Negeri Batam",
      category: "Informatika",
      type: "Onsite",
      img: kuliah,
    },
    {
      id: 2,
      title: "Workshop Karier Digital",
      date: "12 Oktober 2025",
      time: "13.00 WIB - 16.00 WIB",
      location: "Aula Utama Kampus",
      capacity: "30 Orang",
      campus: "Politeknik Negeri Batam",
      category: "Manajemen Informatika",
      type: "Onsite",
      img: kuliah,
    },
    {
      id: 3,
      title: "Belajar Desain UI/UX",
      date: "15 Oktober 2025",
      time: "09.00 WIB - 15.00 WIB",
      location: "Online via Zoom",
      capacity: "50 Orang",
      campus: "Politeknik Negeri Batam",
      category: "Desain",
      type: "Online",
      img: kuliah,
    },
  ];

  return (
    <SidebarWithNavbar>
      <main className="px-10 pt-4 pb-6 flex-1">
        <div className="flex min-h-screen bg-gray-50">
          {/* Sidebar */}

          {/* Konten utama */}
          <div className="flex-1 flex flex-col">
            <main className="flex-1 overflow-y-auto ">
              {/* Header Section */}
              <div className="bg-[#0E3B3D] text-white rounded-xl p-10 mb-10 text-center shadow-md mt-6">
                <h1 className="text-2xl font-semibold">Program</h1>
                <p className="text-gray-200 mt-2 max-w-2xl mx-auto">
                  Program ini dirancang untuk mengembangkan potensi peserta
                  melalui berbagai kegiatan inovatif, kolaboratif, dan
                  berorientasi pada hasil nyata.
                </p>
              </div>

              {/* Rekomendasi Section */}
              <section className="mb-12">
                <h2 className="text-xl font-bold mb-4">Rekomendasi</h2>
                <div className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col md:flex-row">
                  <div className="md:w-1/3 relative">
                    <img
                      src={programs[0].img}
                      alt="Program"
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <h3 className="text-white text-xl font-bold text-center leading-tight">
                        KULIAH <br /> BERSERTIFIKAT <br /> 1 HARI
                      </h3>
                    </div>
                  </div>
                  <div className="md:w-2/3 p-6 bg-[#0E3B3D] text-white flex flex-col justify-between">
                    <p className="text-sm mb-4">Bootcamp Analisis Sistem</p>
                    <div className="flex flex-wrap text-sm mb-4 border-t border-gray-500 pt-4">
                      <p className="mr-4">
                        {programs[0].campus} | {programs[0].category} |{" "}
                        {programs[0].type}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-6 text-sm mb-4">
                      <p>📅 {programs[0].date}</p>
                      <p>🕒 {programs[0].time}</p>
                      <p>👥 {programs[0].capacity}</p>
                      <p>📍 {programs[0].location}</p>
                    </div>
                    <Link
                      to={`/dashboard-mentee/program/${programs[0].id}`}
                      className="mt-6 bg-[#B4D0E7] text-[#0E3B3D] py-2 px-48 rounded-md font-semibold hover:bg-[#A3C5E0] transition inline-block text-center">
                      Lihat Detail
                    </Link>
                  </div>
                </div>
              </section>

              {/* Seluruh Program Section */}
              <section>
                <h2 className="text-xl font-bold mb-4">Seluruh Program</h2>
                <div className="flex flex-col gap-8">
                  {programs.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col md:flex-row">
                      <div className="md:w-1/3 relative">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <h3 className="text-white text-xl font-bold text-center leading-tight">
                            {item.title.toUpperCase()}
                          </h3>
                        </div>
                      </div>
                      <div className="md:w-2/3 p-6 bg-[#0E3B3D] text-white flex flex-col justify-between">
                        <p className="text-sm mb-4">
                          Pelatihan Desain 3D SolidWorks
                        </p>
                        <div className="flex flex-wrap text-sm mb-4 border-t border-gray-500 pt-4">
                          <p className="mr-4">
                            {item.campus} | {item.category} | {item.type}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-6 text-sm mb-4">
                          <p>📅 {item.date}</p>
                          <p>🕒 {item.time}</p>
                          <p>👥 {item.capacity}</p>
                          <p>📍 {item.location}</p>
                        </div>
                        <Link
                          to={`/dashboard-mentee/program/${item.id}`}
                          className="mt-6 bg-[#B4D0E7] text-[#0E3B3D] py-2 px-48 rounded-md font-semibold hover:bg-[#A3C5E0] transition inline-block text-center">
                          Lihat Detail
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </main>

            {/* Footer */}
          </div>
        </div>
      </main>
    </SidebarWithNavbar>
  );
}
