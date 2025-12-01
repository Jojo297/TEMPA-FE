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
import { Calendar, Home, Map, Search, Users } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ProgramDummy } from "@/lib/ProgramDummy";
import AddProgram from "@/components/AddProgram";

export default function DashboardCampusProgram() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

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

  // badge for visibility program
  const getBadgeVisibility = (visibility) => {
    switch (visibility) {
      case "public":
        return {
          text: "Public",
          bgColor: "bg-blue-500",
          textColor: "text-white",
          description: "Program ini dapat dilihat oleh seluruh pengguna",
        };
      case "private":
        return {
          text: "Private",
          bgColor: "bg-neutral-800 ",
          textColor: "text-white",
          description:
            "Program ini hanya dapat dilihat oleh anda dan para mentor",
        };
    }
  };

  // get location if type program onsite
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

  // if (ProgramDummy) {
  //   return <AddProgram />;
  // }

  return (
    <>
      {/* Konten utama */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto ">
          <div className="mb-2">
            {/* breadcum */}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild className="hover:text-primary">
                    <Link to="/dashboard-campus">Beranda</Link>
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
                Tarik perhatian calon mentee unggulan! Publikasikan dan kelola
                berbagai program kampus Anda di platform ini. Sediakan informasi
                lengkap yang relevan, serta tawarkan kesempatan istimewa seperti
                Trial Kuliah atau Kelas Singkat untuk menjaring partisipan
                terbaik dan meningkatkan citra institusi Anda.
              </p>
            </div>
          </div>

          {/* Seluruh Program Section */}
          <section>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
              <h2 className="text-xl font-bold mb-4 items-center">
                Seluruh Program
              </h2>
              {/* input search */}
              <div className="flex gap-2">
                <SelectTypeProgram />
                <SearchMajors />
                <div className="relative w-full md:w-60">
                  <Search
                    size={16}
                    className="absolute top-2.5 left-3 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Cari program..."
                    className="pl-8 pr-3 py-2 w-full border rounded-lg text-sm focus:outline-none focus:ring focus:ring-[#004D40]/40"
                  />
                </div>
              </div>
            </div>
            {/* Card Program */}
            <div className="flex flex-col gap-8">
              {/* Card Program */}
              {ProgramDummy.length <= 0 ? (
                <AddProgram />
              ) : (
                ProgramDummy.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col lg:flex-row border bg-white relative rounded-2xl overflow-hidden transition duration-300 hover:bg-white hover:shadow-xl"
                  >
                    {/* left side */}
                    <div
                      className="lg:w-1/3 flex flex-col justify-end bg-cover bg-center p-6 text-white"
                      style={{
                        backgroundImage: `linear-gradient(rgba(1, 59, 53, 0.4), rgba(1, 59, 53, 0.7)),  url(${item.image_url})`,
                        backgroundColor: "#013B35",
                        minHeight: "200px",
                      }}
                    >
                      {/* Container baru untuk badges, ditempatkan secara absolute di kiri atas */}
                      <div className="absolute top-4 left-4 z-10 flex gap-2">
                        {/* Completion Status */}
                        {(() => {
                          // get badge status
                          const statusData = getBadgeClass(item.program_status);
                          return (
                            <div
                              className={`px-3 py-1 rounded-full text-sm font-medium ${statusData.bgColor} ${statusData.textColor}`}
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
                            {item.type_sesi}
                          </div>
                        </div>

                        {/* description */}
                        <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                          {item.description}
                        </p>

                        {/* date and location */}
                        <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-gray-700 text-sm mb-6 border-t pt-4">
                          <div className="flex items-center">
                            <Calendar
                              size={16}
                              className="mr-2 text-[#013B35]"
                            />
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
                              Tempat: {getLocation(item.type_sesi, item)}
                            </span>
                          </div>
                        </div>

                        {/* Button */}
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              navigate(`/dashboard-campus/program/${item.id}`)
                            }
                            className="w-full py-3 bg-secondary text-white rounded-xl font-bold hover:bg-[#015f53] transition-all duration-300"
                          >
                            Lihat Detail Program
                          </button>
                          <button
                            onClick={() =>
                              navigate(`/dashboard-campus/program/${item.id}`)
                            }
                            className="w-full py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-[#015f53] transition-all duration-300"
                          >
                            Hapus Program
                          </button>
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
    </>
  );
}
