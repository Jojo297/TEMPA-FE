import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { jurusanList } from "@/lib/JurusanList";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Calendar, Home, Map, Users } from "lucide-react";
import useGetDetailMajor from "@/hooks/hooksMentee/useGetDetailMajor";
import MajorDetailSkeleton from "@/components/MajorDetailSkeleton";
import NotFounPages from "@/components/NotFoundPages";

const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

export default function DashboardJurusanDetail() {
  const { slug } = useParams();
  const token = localStorage.getItem("userJwt");
  const { detailMajor, isLoading, error, fetchDetailMajor } =
    useGetDetailMajor();
  const navigate = useNavigate();
  const jurusan = jurusanList.find((j) => j.slug === slug);
  console.log(jurusan);

  // get location if status program online
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

  // store result fetch to displayMajor
  const displayDetailMajor = detailMajor ?? {};

  // get campus
  const getCampus = displayDetailMajor.major ?? [];

  // get program
  const getProgram = getCampus.flatMap(
    (majorEntry) => majorEntry.program_program_id_majorTocampus || []
  );
  // console.log(getProgram);

  // fetch detail major
  useEffect(() => {
    if (token) {
      fetchDetailMajor(token, slug);
    }
  }, [token, fetchDetailMajor]);

  if (!displayDetailMajor) {
    return <NotFounPages message="Jurusan Tidak Ditemukan" />;
  }

  // handle loading
  if (isLoading) {
    return <MajorDetailSkeleton />;
  }

  return (
    <div className="min-h-screen pb-16">
      {/* breadcum */}
      <Breadcrumb className="mb-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="hover:text-primary">
              <Link to="/dashboard-mentee">Beranda</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="hover:text-primary">
              <Link to="/dashboard-mentee/jurusan">Jurusan</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="text-primary">
            <BreadcrumbPage className="text-primary">
              {displayDetailMajor.major_name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* header */}
      <div className="max-w-7xl mx-auto ">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <div className="relative w-full h-[320px]">
            <img
              src={
                jurusan?.heroImg ||
                "https://via.placeholder.com/1200x320?text=HERO+JURUSAN"
              }
              alt={displayDetailMajor.major_name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-[#013B35] py-4 px-6">
            <h1 className="text-2xl font-extrabold text-white uppercase tracking-wider">
              {displayDetailMajor.major_name}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-10">
        <h2 className="text-2xl font-semibold text-[#013B35] mb-3">
          Tentang Jurusan
        </h2>
        <p className="text-gray-700 leading-relaxed text-justify">
          {displayDetailMajor.description ||
            "Deskripsi jurusan belum tersedia."}
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-12">
        <h2 className="text-2xl font-semibold text-[#013B35] mb-4">
          Prospek Kerja
        </h2>
        <div className="flex flex-wrap gap-2">
          {displayDetailMajor.prospek_kerja?.map((item, i) => (
            <span
              key={i}
              className="px-4 py-2 border border-[#013B35] text-[#013B35] font-medium rounded-full text-sm hover:bg-[#013B35] hover:text-white transition"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-12">
        <h2 className="text-2xl font-semibold text-[#013B35] mb-4">
          Kampus Terkait
        </h2>
        {getCampus.length <= 0 ? (
          <div className="flex flex-row text-gray-700 text-justify">
            {/* Solusi Baris Sebaris */}
            Saat ini belum ada kampus yang memiliki jurusan&nbsp;
            {displayDetailMajor.major_name}
          </div>
        ) : (
          // Jika getCampus.length > 0:
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {getCampus.map((kampus, index) => (
              <Link
                key={index}
                to={`/dashboard-mentee/kampus/${kampus.campus?.id}`}
                className="relative rounded-xl overflow-hidden shadow-lg group"
              >
                {/* banner */}
                <img
                  src={kampus.campus?.banner_url}
                  alt={kampus.campus?.campus_name}
                  className="w-full h-64 object-cover"
                />

                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-3 group-hover:bg-[#013B35]/70 transition-all duration-300 max-h-16 overflow-hidden group-hover:max-h-32 group-hover:p-4">
                  <div className="flex justify-between items-start">
                    {/* campus name */}
                    <h3 className="text-lg font-semibold text-white line-clamp-1 group-hover:line-clamp-none transition-all duration-300">
                      {kampus.campus?.campus_name}
                    </h3>

                    <div className="p-1 rounded-full bg-white text-[#013B35] flex-shrink-0 ml-2 mt-1">
                      <ChevronRightIcon />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-12">
        <h2 className="text-2xl font-semibold text-[#013B35] mb-4">
          Program Terkait
        </h2>
        {/* Card Program */}
        <div className="flex flex-col gap-8">
          {getProgram.length <= 0 ? (
            <div className="flex flex-row text-gray-700 text-justify">
              {" "}
              Saat ini belum ada program yang dengan jurusan{" "}
              {displayDetailMajor.major_name}
            </div>
          ) : (
            getProgram.map((item) => (
              <div
                key={item.id}
                className="flex flex-col lg:flex-row border bg-white relative rounded-2xl overflow-hidden transition duration-300 hover:bg-white hover:shadow-xl"
              >
                {/* left side */}
                <div
                  className="lg:w-1/3 flex flex-col justify-end bg-cover bg-center p-6 text-white"
                  // Menggunakan background image dengan overlay warna untuk efek keren
                  style={{
                    backgroundImage: `linear-gradient(rgba(1, 59, 53, 0.4), rgba(1, 59, 53, 0.7)),  url(${item.program_image_url})`,
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
                        <span>
                          {item.campus_program_id_campusTocampus?.campus_name}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Users size={16} className="mr-2 text-[#013B35]" />
                        <span>{item.capacity}</span>
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
          )}
        </div>
      </div>
    </div>
  );
}
