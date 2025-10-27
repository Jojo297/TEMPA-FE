import React from "react";
import { useParams, Link } from "react-router-dom";
import { jurusanList } from "@/lib/JurusanList";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { kampusList } from "@/lib/kampusList";

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

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 mr-1 inline"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
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
    strokeWidth={2}
  >
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
    strokeWidth={2}
  >
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
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const ProgramItem = ({ program, jurusan, kampus }) => {
  // 1. Ekstraksi nama kampus singkat dari program.lokasi
  // Contoh: "Polibatam - Tower A" -> "Polibatam"
  const shortCampusName = program.lokasi.split(" - ")[0].trim();

  // 2. Mencari data kampus lengkap di array 'kampus' yang dikirimkan (kampusDitemukan)
  const matchedCampus = kampus.find((k) => {
    // Karena kampusList menggunakan properti 'name', kita cocokkan dengan itu.
    return k.name.includes(shortCampusName);
  });

  // 3. Tentukan nama yang akan ditampilkan
  // Jika matchedCampus ditemukan, gunakan nama lengkapnya (k.name).
  // Jika tidak ditemukan, gunakan nama singkat dari lokasi.
  const displayedCampusName = matchedCampus
    ? matchedCampus.name
    : shortCampusName;

  return (
    <div className="flex bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      {/* Gambar kiri + overlay teks */}
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

      {/* Kolom kanan */}
      <div className="bg-[#013B35] text-white flex flex-col justify-between p-5 flex-grow rounded-r-xl">
        <div>
          {/* Deskripsi */}
          <p className="text-sm text-gray-200 leading-relaxed mb-2">
            {program.nama}
          </p>

          {/* Baris kampus, jurusan, mode */}
          <div className="flex flex-wrap gap-x-4 text-sm text-gray-100 mb-2">
            <span>{displayedCampusName}</span>
            <span>{jurusan.nama}</span>
            <span>• Onsite</span>
          </div>

          {/* Garis pembatas */}
          <hr className="border-gray-500 mb-3" />

          {/* Baris detail waktu, peserta, tempat */}
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

        {/* Tombol bawah */}
        <div className="mt-4 flex justify-center">
          <button className="w-full bg-[#007F7F] text-white font-semibold py-2 rounded-md hover:bg-[#019E9E] transition">
            Ikut Program
          </button>
        </div>
      </div>
    </div>
  );
};

export default function DetailJurusan() {
  const { slug } = useParams();

  const jurusan = jurusanList.find((j) => j.slug === slug);

  let kampusDitemukan = [];

  if (slug) {
    kampusDitemukan = kampusList.filter((kampus) => {
      if (Array.isArray(kampus.jurusan)) {
        return kampus.jurusan.some((j) => j.slug === slug);
      }
      return false;
    });
  }

  let programTerkaitJurusan = [];
  if (jurusan && Array.isArray(jurusan.programTerkait)) {
    programTerkaitJurusan = jurusan.programTerkait;
  }

  if (!jurusan) {
    // Memberi tahu pengguna jika slug tidak cocok dengan item di jurusanList
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center">
        <h1 className="text-3xl font-bold mb-2 text-red-500">
          Jurusan '{slug}' tidak ditemukan.
        </h1>
        <Link
          to="/JurusanPage"
          className="mt-4 text-white bg-[#013B35] px-4 py-2 rounded-lg hover:bg-[#025c54]"
        >
          Kembali ke daftar jurusan
        </Link>
      </div>
    );
  }

  // --- JSX Output ---
  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen pb-16">
        {/* === HEADER GAMBAR DALAM CARD === */}
        <div className="max-w-6xl mx-auto px-4 pt-10">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
            <div className="relative w-full h-[320px]">
              <img
                // Menggunakan data jurusan
                src={
                  jurusan.heroImg || // Asumsi jurusanList memiliki properti heroImg
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

        {/* === TENTANG JURUSAN === */}
        <div className="max-w-6xl mx-auto px-6 mt-10">
          <h2 className="text-2xl font-semibold text-[#013B35] mb-3">
            Tentang Jurusan
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify">
            {/* Menggunakan data jurusan */}
            {jurusan.deskripsi ||
              "Deskripsi default: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
          </p>
        </div>

        {/* === PROSPEK KERJA === */}
        <div className="max-w-6xl mx-auto px-6 mt-12">
          <h2 className="text-2xl font-semibold text-[#013B35] mb-4">
            Prospek Kerja
          </h2>
          <div className="flex flex-wrap gap-2">
            {
              // Menggunakan data jurusan
              (
                jurusan.prospekKerja || [
                  "Programmer",
                  "Software Developer",
                  "System Analyst",
                  "Data Scientist",
                  "UI/UX Designer",
                  "Network Engineer",
                  "IT Consultant",
                ]
              ).map((item, i) => (
                <span
                  key={i}
                  className="px-4 py-2 border border-[#013B35] text-[#013B35] font-medium rounded-full text-sm hover:bg-[#013B35] hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  {item}
                </span>
              ))
            }
          </div>
        </div>

        {/* === KAMPUS TERKAIT === */}
        <div className="max-w-6xl mx-auto px-6 mt-12">
          <h2 className="text-2xl font-semibold text-[#013B35] mb-4">
            Kampus Terkait
          </h2>
          <div className="relative">
            {/* Cek apakah ada kampus yang ditemukan */}
            {kampusDitemukan.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {kampusDitemukan.map((kampus, index) => (
                  <Link
                    key={index}
                    to={`/kampus/${kampus.id}`} // Link ke halaman detail kampus
                    className="relative rounded-xl overflow-hidden shadow-lg transform hover:scale-[1.01] transition-transform duration-300 group"
                  >
                    <img
                      // Asumsi: properti gambar di kampusList adalah 'image' (sesuai data Anda)
                      src={kampus.image}
                      alt={kampus.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-3 flex justify-between items-center group-hover:bg-[#013B35]/70 transition-colors">
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
            ) : (
              <p className="text-gray-600 italic">
                Saat ini, belum ada kampus yang terdaftar menawarkan Jurusan **
                {jurusan.name}**.
              </p>
            )}

            {/* Tombol navigasi slider (hanya tampil jika kampusDitemukan.length > 0) */}
            {kampusDitemukan.length > 3 && (
              <div className="mt-6 flex justify-center items-center space-x-4">
                <button className="text-gray-400 hover:text-[#013B35] transition-colors">
                  <ChevronRightIcon className="transform rotate-180 h-7 w-7" />
                </button>
                <div className="flex space-x-2">
                  <span className="h-2 w-2 bg-[#013B35] rounded-full"></span>
                  <span className="h-2 w-2 bg-gray-300 rounded-full"></span>
                  <span className="h-2 w-2 bg-gray-300 rounded-full"></span>
                </div>
                <button className="text-gray-400 hover:text-[#013B35] transition-colors">
                  <ChevronRightIcon className="h-7 w-7" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* === PROGRAM TERKAIT === */}
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
      <Footer />
    </>
  );
}
