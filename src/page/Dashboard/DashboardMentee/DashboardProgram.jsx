import { Link, useNavigate } from "react-router-dom";
import { Calendar, Home, Map, Search, Users } from "lucide-react";
import { useEffect } from "react";
import useGetAllProgram from "@/hooks/useGetAllProgram";
import DashboardProgramSkeleton from "@/components/DashboardProgramSkeleton";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function DashboardProgram() {
  const navigate = useNavigate();
  const token = localStorage.getItem("userJwt");
  const { programs, isLoading, error, fetchPrograms } = useGetAllProgram();

  // store all program
  const displayAllProgram = programs ?? [];
  console.log(displayAllProgram);

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

  const getLocation = (sesi) => {
    if (!sesi) {
      return "";
    }

    switch (sesi.type_sesi) {
      case "online":
        return "Online";
      case "onsite":
        return sesi.description || "Lokasi Offline";
    }
  };

  // get all program
  useEffect(() => {
    if (token) {
      fetchPrograms(token);
    }
  }, [token, fetchPrograms]);

  if (isLoading) {
    return <DashboardProgramSkeleton />;
  }

  if (!displayAllProgram) {
    // Tangani jika data tidak ditemukan (misalnya status 404 dari backend)
    return <p>Program tidak ditemukan.</p>;
  }

  return (
    <div className="flex min-h-screen ">
      {/* Konten utama */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto ">
          <div className="mb-2">
            {/* breadcum */}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild className="hover:text-primary">
                    <Link to="/dashboard-mentee">Beranda</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem className="text-primary">
                  <BreadcrumbPage className="text-primary">
                    Program
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {/* Header Section */}
          <div className=" mb-8 text-center">
            <div className="bg-primary text-white rounded-xl p-6 shadow">
              <h1 className="text-2xl font-bold mb-2">Program</h1>
              <p className="text-sm max-w-2xl mx-auto">
                Jelajahi berbagai kampus terbaik dan temukan informasi seputar
                program, jurusan, serta prestasi mereka di sini. Dapatkan
                kesempatan untuk mengikuti Trial Kuliah atau kelas singkat
                sebelum Anda membuat keputusan besar!
              </p>
            </div>
          </div>

          {/* Rekomendasi Section */}

          {/* Seluruh Program Section */}
          <section>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
              <h2 className="text-xl font-bold mb-4 items-center">
                Seluruh Program
              </h2>
              <div className="relative w-full md:w-60">
                <Search
                  size={16}
                  className="absolute top-2.5 left-3 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Cari program..."
                  value=""
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-2 w-full border rounded-lg text-sm focus:outline-none focus:ring focus:ring-[#004D40]/40"
                />
              </div>
            </div>
            {/* Card Program */}
            <div className="flex flex-col gap-8">
              {/* Card Program */}
              {displayAllProgram.map((item) => (
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
                          {item.major_name}
                        </div>
                        <div className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mt-2 sm:mt-0">
                          {item.sesi_program.map((sesi) => sesi.type_sesi)}
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
                          <span>{item.campus_name}</span>
                        </div>
                        <div className="flex items-center">
                          <Users size={16} className="mr-2 text-[#013B35]" />
                          <span>{item.capacity} Orang</span>
                        </div>
                        <div className="flex items-center">
                          <Map size={16} className="mr-2 text-[#013B35]" />
                          <span>
                            Tempat:{" "}
                            {item.sesi_program.map((sesi) => getLocation(sesi))}
                          </span>
                        </div>
                      </div>

                      {/* Button */}
                      <button
                        onClick={() =>
                          navigate(
                            `/dashboard-mentee/program/${item.id_campus}`
                          )
                        }
                        className="w-full py-3 bg-[#013B35] text-white rounded-xl font-bold hover:bg-[#015f53] transition-all duration-300"
                      >
                        Lihat Detail Program
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
