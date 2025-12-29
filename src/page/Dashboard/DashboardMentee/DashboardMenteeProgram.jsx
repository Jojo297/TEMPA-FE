import { Link, useNavigate } from "react-router-dom";
import { Calendar, Home, Map, Search, Users } from "lucide-react";
import { useEffect, useState } from "react";
import useGetAllProgram from "@/hooks/hooksMentee/useGetAllProgram";
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
import NotFounPages from "@/components/NotFoundPages";

import { SelectTypeProgram } from "@/components/SelectTypeProgram";
import { SearchMajors } from "@/components/SearchMajors";
import useGetAllMajors from "@/hooks/hooksMentee/useGetAllMajors";
import { useFilterStore } from "@/hooks/hooksMentee/useFilterProgramMajor";
import { useFilterProgramType } from "@/hooks/hooksMentee/useFilterProgramType";

export default function DashboardMenteeProgram() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("userJwt");
  //ambil ini sini
  const { programs, isLoading, error, fetchPrograms } = useGetAllProgram();

  // store all program
  const displayAllProgram = programs ?? [];
  console.log(displayAllProgram);

  // get selected major from SelectTypeProgram
  const selectedMajor = useFilterStore((state) => state.selectedMajor);

  // get selected major from SearchMajors
  const selectedType = useFilterProgramType((state) => state.selectedType);

  // filtering selected major from SelectTypeProgram
  const programsAfterMajorFilter = displayAllProgram.filter((program) => {
    if (!selectedMajor || selectedMajor === "") {
      return true;
    }
    return program.major_name === selectedMajor;
  });

  // filter program by sesi type
  const programsAfterTypeFilter = programsAfterMajorFilter.filter((program) => {
    // Jika selectedType kosong, lewati filter ini
    if (!selectedType || selectedType === "") {
      return true;
    }
    // Jika ada type yang dipilih, hanya kembalikan program yang cocok
    return program.type_sesi === selectedType;
  });

  // search program by name
  const filteredPrograms = programsAfterTypeFilter.filter((item) =>
    item.program_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // badge for status program
  const getBadgeClass = (start_date, end_date) => {
    const today = new Date();
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    if (endDate.getTime() < today.getTime()) {
      return {
        text: "Tutup",
        bgColor: "bg-red-100",
        textColor: "text-red-800",
      };
    } else if (startDate.getTime() > today.getTime()) {
      return {
        text: "Segera Buka",
        bgColor: "bg-blue-100",
        textColor: "text-blue-800",
      };
    } else {
      return {
        text: "Buka",
        bgColor: "bg-green-200",
        textColor: "text-green-800",
      };
    }
  };

  // get location if type program onsite
  const getLocation = (status, item) => {
    switch (status) {
      case "online":
        return "Zoom/Gmeet";
      case "onsite":
        return item.onsiteLocationName;
      default:
        return "Tempat belum ditentukan";
    }
  };

  const getCapacity = (num) => {
    if (num <= 0) {
      return "Sudah Penuh";
    } else if (num > 0) {
      return num + " Orang";
    }
  };

  // get all programs and majors
  useEffect(() => {
    if (token) {
      fetchPrograms(token);
    }
  }, [token, fetchPrograms]);

  if (isLoading) {
    return <DashboardProgramSkeleton />;
  }

  // handle not found
  if (!displayAllProgram) {
    return <NotFounPages message={"Program tidak ditemukan"} />;
  }

  // handling error
  if (error) {
    return (
      <p className="justify-center text-center" style={{ color: "red" }}>
        ❌ Error: {error}
      </p>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}

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
              <h1 className="text-xl md:text-2xl font-bold mb-2">Program</h1>
              <p className="text-xs md:text-sm max-w-2xl mx-auto">
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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <h2 className="text-lg md:text-xl font-bold">Seluruh Program</h2>
              {/* input search */}
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <div className="w-full sm:w-auto">
                  <SelectTypeProgram />
                </div>
                <div className="w-full sm:w-auto">
                  <SearchMajors className={"w-full"} />
                </div>
                <div className="relative w-full sm:w-60">
                  <Search
                    size={16}
                    className="absolute top-2.5 left-3 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Cari program..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 pr-3 py-2 w-full border rounded-lg text-sm focus:outline-none focus:ring focus:ring-[#004D40]/40"
                  />
                </div>
              </div>
            </div>
            {/* Card Program */}
            <div className="flex flex-col gap-8">
              {/* Card Program */}
              {filteredPrograms.length <= 0 ? (
                <NotFounPages message={"Program tidak ditemukan"} />
              ) : (
                filteredPrograms.map((item) => (
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
                        const statusData = getBadgeClass(
                          item.start_regis_date,
                          item.end_regis_date
                        );
                        return (
                          <div
                            className={`absolute top-4 z-10 px-3 py-1 rounded-full text-xs sm:text-sm font-medium mt-2 sm:mt-0 ${statusData.bgColor} ${statusData.textColor}`}
                          >
                            {statusData.text}
                          </div>
                        );
                      })()}
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-tight drop-shadow-lg">
                        {item.program_name}
                      </h3>
                    </div>

                    {/* right side */}
                    <div className="lg:w-2/3 p-6 flex flex-col justify-between">
                      <div>
                        {/* Main info: Kampus, Jurusan */}
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                          <div className="flex items-center text-[#013B35] font-semibold text-base md:text-lg">
                            <span>{item.program_name}</span>
                          </div>
                          <div className="px-3 py-1 bg-green-100 text-[#013B35] rounded-full text-xs sm:text-sm font-medium mt-2 sm:mt-0">
                            {item.major_name}
                          </div>
                          <div className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm font-medium mt-2 sm:mt-0">
                            {item.type_sesi}
                          </div>
                        </div>

                        {/* description */}
                        <p className="text-gray-600 mb-4 text-xs sm:text-sm line-clamp-2">
                          {item.description}
                        </p>

                        {/* date and location */}
                        <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-gray-700 text-xs sm:text-sm mb-6 border-t pt-4">
                          <div className="flex items-center">
                            <Calendar
                              size={16}
                              className="mr-2 text-[#013B35]"
                            />
                            <span>
                              {new Date(
                                item.start_program_date
                              ).toLocaleDateString("id-ID", {
                                day: "numeric",
                              })}
                              {" - "}
                              {new Date(
                                item.end_program_date
                              ).toLocaleDateString("id-ID", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Home size={16} className="mr-2 text-[#013B35]" />
                            <span>{item.campus_name}</span>
                          </div>
                          <div className="flex items-center">
                            <Users size={16} className="mr-2 text-[#013B35]" />
                            <span>{getCapacity(item.capacity)} </span>
                          </div>
                          <div className="flex items-center">
                            <Map size={16} className="mr-2 text-[#013B35]" />
                            <span>
                              Tempat: {getLocation(item.type_sesi, item)}
                            </span>
                          </div>
                        </div>

                        {/* Button */}
                        <button
                          onClick={() =>
                            navigate(`/dashboard-mentee/program/${item.id}`)
                          }
                          className="w-full py-3 bg-[#013B35] text-white rounded-xl font-bold hover:bg-[#015f53] transition-all duration-300 text-sm sm:text-base"
                        >
                          Lihat Detail Program
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
