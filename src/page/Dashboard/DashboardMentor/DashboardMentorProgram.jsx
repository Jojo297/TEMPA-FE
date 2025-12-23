import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SearchMajors } from "@/components/SearchMajors";
import { SelectTypeProgram } from "@/components/SelectTypeProgram";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Calendar,
  Home,
  Map,
  Search,
  Users,
  Loader2,
  CirclePlus,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

import AddProgram from "@/components/AddProgram";
import DeleteProgram from "@/components/DeleteProgram";
import DashboardCampusProgramSkeleton from "@/components/DashboardCampusProgramSkeleton";
import useGetAllProgram from "@/hooks/hooksMentor/useGetAllProgram";
import MentorDeleteProgram from "@/components/MentorDeleteProgram";
import { jwtDecode } from "jwt-decode";
import { set } from "zod";
import NotFounPages from "@/components/NotFoundPages";

export default function DashboardMentorProgram() {
  const navigate = useNavigate();
  const token = localStorage.getItem("userJwt");
  const decode = jwtDecode(token);
  const typeMentor = decode.mentorType;
  // console.log(typeMentor);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMajor, setFilterMajor] = useState(null);
  const [filterType, setFilterType] = useState(null);
  const superMentor = decode.mentorType === "super_mentor";

  // Hooks Program
  const { allPrograms, isLoadingPrograms, errorPrograms, getAllPrograms } =
    useGetAllProgram();

  useEffect(() => {
    if (!token) return;

    getAllPrograms(token);
  }, [token]);

  // Data program
  const programs = allPrograms || [];
  // console.log(programs);

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
        text: "Buka",
        bgColor: "bg-green-200",
        textColor: "text-green-800",
      };
    } else {
      return {
        text: "Sedang Berjalan",
        bgColor: "bg-blue-100",
        textColor: "text-blue-800",
      };
    }
  };

  // Badge visibility
  const getBadgeVisibility = (visibility) => {
    const v = visibility ? visibility.toLowerCase() : "unknown";
    switch (v) {
      case "public":
        return {
          text: "Public",
          bgColor: "bg-blue-500",
          textColor: "text-white",
        };
      case "private":
        return {
          text: "Private",
          bgColor: "bg-neutral-800",
          textColor: "text-white",
        };
      default:
        return {
          text: "Unknown",
          bgColor: "bg-gray-500",
          textColor: "text-white",
        };
    }
  };

  // Get location
  const getLocation = (type_sesi, item) => {
    const lowerType = type_sesi ? type_sesi.toLowerCase() : "unknown";
    switch (lowerType) {
      case "online":
        return "Zoom/Gmeet";
      case "onsite":
        return item.onsiteLocationName;
      default:
        return "Tempat belum ditentukan";
    }
  };

  // Filtering
  const filteredPrograms = programs.filter((item) => {
    const programNameMatch = item.program_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const majorMatch = filterMajor
      ? item.major_name?.toLowerCase() === filterMajor.toLowerCase()
      : true;

    const typeMatch = filterType
      ? item.type_sesi?.toLowerCase() === filterType.toLowerCase()
      : true;

    return programNameMatch && majorMatch && typeMatch;
  });

  // console.log(filteredPrograms);

  // format date
  const formatDate = (start_data) => {
    return new Date(start_data).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  };

  if (isLoadingPrograms) {
    return <DashboardCampusProgramSkeleton />;
  }

  // RENDER
  return (
    <div className="flex-1 flex flex-col">
      <main className="flex-1 overflow-y-auto">
        {/* Breadcrumb */}
        <div className="mb-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild className="hover:text-primary">
                  <Link to="/dashboard-mentor/beranda">Beranda</Link>
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

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="bg-primary text-white rounded-xl p-6 shadow">
            <h1 className="text-2xl font-bold mb-2">Program</h1>
            <p className="text-sm max-w-2xl mx-auto">
              Daftar program aktif yang berada di bawah bimbingan Anda. Melalui
              halaman ini, Anda dapat memantau progres peserta, mengelola
              program, serta memberikan umpan balik strategis untuk memastikan
              keberhasilan setiap sesi pembelajaran.
            </p>
          </div>
        </div>

        {/* Filters */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
            <h2 className="text-xl font-bold mb-4">
              Seluruh Program ({programs.length})
            </h2>

            <div className="flex gap-2">
              <SelectTypeProgram />
              <SearchMajors className="w-36" />
              <div className="relative">
                <Search
                  size={16}
                  className="absolute top-2.5 left-3 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Cari program..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-2 w-36 border rounded-lg text-sm focus:outline-none focus:ring focus:ring-[#004D40]/40"
                />
              </div>
              {superMentor && (
                <Button
                  className=""
                  onClick={() => navigate("/dashboard-mentor/add-program")}
                >
                  <CirclePlus /> Tambah Program
                </Button>
              )}
            </div>
          </div>

          {/* LIST PROGRAM */}
          <div className="flex flex-col gap-8">
            {filteredPrograms.length === 0 ? (
              superMentor ? (
                <AddProgram />
              ) : (
                <NotFounPages
                  message={"Anda belum ditambahkan untuk mengatur program"}
                />
              )
            ) : (
              filteredPrograms.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col lg:flex-row border bg-white relative rounded-2xl overflow-hidden hover:shadow-xl transition "
                >
                  {/* LEFT IMAGE */}
                  <div
                    className="lg:w-1/3 flex flex-col justify-end bg-cover bg-center p-6 text-white"
                    style={{
                      backgroundImage: `linear-gradient(rgba(1,59,53,0.4), rgba(1,59,53,0.7)), url(${item.image_url})`,
                      minHeight: "200px",
                    }}
                  >
                    {/* Container baru untuk badges, ditempatkan secara absolute di kiri atas */}
                    <div className="absolute top-4 left-4 z-10 flex gap-2">
                      {/* Completion Status */}
                      {(() => {
                        // get badge status
                        const statusData = getBadgeClass(
                          item.start_date,
                          item.end_date
                        );
                        return (
                          <div
                            className={` top-4 z-10 px-3 py-1 rounded-full text-sm font-medium mt-2 sm:mt-0 ${statusData.bgColor} ${statusData.textColor}`}
                          >
                            {statusData.text}
                          </div>
                        );
                      })()}

                      {/* visibility */}
                      {(() => {
                        const getVisibility = getBadgeVisibility(
                          item.visibility
                        );
                        return (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div
                                className={`px-3 py-1 rounded-full text-sm font-medium ${getVisibility.bgColor} ${getVisibility.textColor}`}
                              >
                                {getVisibility.text}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent className="bg-white text-black border-black">
                              <p>{getVisibility.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        );
                      })()}
                    </div>

                    <h3 className="text-3xl font-extrabold drop-shadow-lg relative z-20">
                      {item.program_name}
                    </h3>
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="lg:w-2/3 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center space-x-4 mb-4">
                        <div className="flex items-center text-[#013B35] font-semibold text-lg">
                          <span>{item.program_name}</span>
                        </div>
                        <div className="px-3 py-1 bg-green-100 text-[#013B35] rounded-full text-sm font-medium">
                          {item.major_name || "Tidak Ada Jurusan"}
                        </div>
                        <div className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                          {item.sesi_program}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                        {item.description}
                      </p>

                      <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-gray-700 text-sm mb-6 border-t pt-4">
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-2 text-[#013B35]" />
                          <span>
                            {new Date(item.start_date).toLocaleDateString(
                              "id-ID",
                              {
                                day: "numeric",
                              }
                            )}
                            {" - "}
                            {new Date(item.end_date).toLocaleDateString(
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
                          <span>Kampus Anda</span>
                        </div>

                        <div className="flex items-center">
                          <Users size={16} className="mr-2 text-[#013B35]" />
                          <span>{item.capacity} Orang</span>
                        </div>

                        <div className="flex items-center">
                          <Map size={16} className="mr-2 text-[#013B35]" />
                          <span>
                            Tempat: {getLocation(item.sesi_program, item)}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {/* detail button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/dashboard-mentor/program/${item.id}`);
                          }}
                          className="w-full py-3 bg-secondary text-white rounded-xl font-bold hover:bg-secondary hover:opacity-60 transition"
                        >
                          Lihat Detail Program
                        </button>

                        {/* delete button */}
                        {typeMentor !== "default" && (
                          <MentorDeleteProgram
                            idProgram={item.id}
                            programName={item.program_name}
                            token={token}
                            refetch={() => getAllPrograms(token)}
                            className="w-full py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-500 hover:opacity-60 transition"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
