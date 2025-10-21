import React from "react";
import { useParams, Link } from "react-router-dom";
import { jurusanList } from "@/lib/JurusanList";
import { kampusList } from "@/lib/kampusList";
import SidebarWithNavbar from "@/components/SidebarWithNavbar";

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
  const jurusan = jurusanList.find((j) => j.slug === slug);

  if (!jurusan) {
    return (
      <SidebarWithNavbar>
        <div className="min-h-screen flex flex-col justify-center items-center text-center">
          <h1 className="text-3xl font-bold mb-2 text-red-500">
            Jurusan '{slug}' tidak ditemukan.
          </h1>
          <Link
            to="/dashboard-mentee/jurusan"
            className="mt-4 text-white bg-[#013B35] px-4 py-2 rounded-lg hover:bg-[#025c54]">
            Kembali ke daftar jurusan
          </Link>
        </div>
      </SidebarWithNavbar>
    );
  }

  const kampusDitemukan = kampusList.filter((kampus) =>
    kampus.jurusan?.some((j) => j.slug === slug)
  );

  const programTerkaitJurusan = jurusan.programTerkait || [];

  return (
    <SidebarWithNavbar>
      <div className="bg-white min-h-screen pb-16">
        <div className="max-w-6xl mx-auto px-4 pt-10">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
            <div className="relative w-full h-[320px]">
              <img
                src={
                  jurusan.heroImg ||
                  "https://via.placeholder.com/1200x320?text=HERO+JURUSAN"
                }
                alt={jurusan.nama}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-[#013B35] py-4 px-6">
              <h1 className="text-2xl font-extrabold text-white uppercase tracking-wider">
                {jurusan.nama}
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 mt-10">
          <h2 className="text-2xl font-semibold text-[#013B35] mb-3">
            Tentang Jurusan
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify">
            {jurusan.deskripsi || "Deskripsi jurusan belum tersedia."}
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-6 mt-12">
          <h2 className="text-2xl font-semibold text-[#013B35] mb-4">
            Prospek Kerja
          </h2>
          <div className="flex flex-wrap gap-2">
            {(
              jurusan.prospekKerja || [
                "Programmer",
                "UI/UX Designer",
                "System Analyst",
              ]
            ).map((item, i) => (
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {kampusDitemukan.map((kampus, index) => (
              <Link
                key={index}
                to={`/dashboard-mentee/kampus/${kampus.id}`}
                className="relative rounded-xl overflow-hidden shadow-lg group">
                <img
                  src={kampus.image}
                  alt={kampus.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-3 flex justify-between items-center group-hover:bg-[#013B35]/70 transition">
                  <h3 className="text-lg font-semibold text-white">
                    {kampus.name}
                  </h3>
                  <div className="p-1 rounded-full bg-white text-[#013B35]">
                    <ChevronRightIcon />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 mt-12">
          <h2 className="text-2xl font-semibold text-[#013B35] mb-4">
            Program Terkait
          </h2>
          <div className="space-y-6">
            {programTerkaitJurusan.map((program, index) => (
              <ProgramItem
                key={index}
                program={program}
                jurusan={jurusan}
                kampus={kampusDitemukan}
              />
            ))}
          </div>
        </div>
      </div>
    </SidebarWithNavbar>
  );
}
