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
    fill="currentColor">
    <path
      fillRule="evenodd"
      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 mr-1 inline"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 mr-1 inline"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 mr-1 inline"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 mr-1 inline"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const ProgramItem = ({ program, jurusan, kampus }) => {
  const shortCampusName = program.lokasi.split(" - ")[0].trim();
  const matchedCampus = kampus.find((k) => k.name.includes(shortCampusName));
  const displayedCampusName = matchedCampus
    ? matchedCampus.name
    : shortCampusName;

  return (
    <div className="flex bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      <div className="relative w-2/5 max-w-[300px] flex-shrink-0">
        <img
          src={program.gambar}
          alt={program.nama}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white p-2 text-center">
          <p className="text-2xl font-extrabold uppercase leading-tight">
            {program.nama}
          </p>
        </div>
      </div>

      <div className="bg-[#013B35] text-white flex flex-col justify-between p-5 flex-grow rounded-r-xl">
        <div>
          <p className="text-sm text-gray-200 leading-relaxed mb-2">
            {program.nama}
          </p>
          <div className="flex flex-wrap gap-x-4 text-sm text-gray-100 mb-2">
            <span>{displayedCampusName}</span>
            <span>{jurusan.nama}</span>
            <span>• Onsite</span>
          </div>
          <hr className="border-gray-500 mb-3" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 text-sm text-gray-200">
            <p>
              <CalendarIcon /> {program.tanggal}
            </p>
            <p>
              <ClockIcon /> {program.waktu}
            </p>
            <p>
              <UserIcon /> {program.peserta}
            </p>
            <p>
              <LocationIcon /> {program.lokasi}
            </p>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <button className="w-full bg-[#007F7F] text-white font-semibold py-2 rounded-md hover:bg-[#019E9E] transition">
            Ikut Program
          </button>
        </div>
      </div>
    </div>
  );
};

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
    <div className="bg-white min-h-screen pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
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
              className="px-4 py-2 border border-[#013B35] text-[#013B35] font-medium rounded-full text-sm hover:bg-[#013B35] hover:text-white transition">
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
                className="relative rounded-xl overflow-hidden shadow-lg group">
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
                className="flex flex-col lg:flex-row border bg-white relative rounded-2xl overflow-hidden transition duration-300 hover:bg-white hover:shadow-xl">
                {/* left side */}
                <div
                  className="lg:w-1/3 flex flex-col justify-end bg-cover bg-center p-6 text-white"
                  // Menggunakan background image dengan overlay warna untuk efek keren
                  style={{
                    backgroundImage: `linear-gradient(rgba(1, 59, 53, 0.4), rgba(1, 59, 53, 0.7)),  url(${item.program_image_url})`,
                    backgroundColor: "#013B35",
                    minHeight: "200px",
                  }}>
                  {/* Completion Status */}
                  {(() => {
                    // get badge status
                    const statusData = getBadgeClass(item.program_status);
                    return (
                      <div
                        className={`absolute top-4 z-10 px-3 py-1 rounded-full text-sm font-medium mt-2 sm:mt-0 ${statusData.bgColor} ${statusData.textColor}`}>
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
                      className="w-full py-3 bg-[#013B35] text-white rounded-xl font-bold hover:bg-[#015f53] transition-all duration-300">
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
