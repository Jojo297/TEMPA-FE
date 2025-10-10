import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import polibatam from "../assets/polibatam.jpeg";
import iteba from "../assets/iteba.jpg";
import uib from "../assets/uib.jpeg";
import logoPolibatam from "../assets/logo-polibatam.png";
import logoIteba from "../assets/logo-iteba.png";
import logoUib from "../assets/logo-uib.png";
import polibatamPrestasi from "../assets/polibatam-prestasi.png";

const kampusList = [
  {
    id: 1,
    name: "Politeknik Negeri Batam",
    image: polibatam,
    logo: logoPolibatam,
    location: "Batam, Riau Islands, Indonesia",
  },
  {
    id: 2,
    name: "Institut Teknologi Batam (ITEBA)",
    image: iteba,
    logo: logoIteba,
    location: "Batam, Riau Islands, Indonesia",
  },
  {
    id: 3,
    name: "Universitas Internasional Batam (UIB)",
    image: uib,
    logo: logoUib,
    location: "Batam, Riau Islands, Indonesia",
  },
];

const CampusPrestasiPage = () => {
  const { id } = useParams();
  const kampus = kampusList.find((k) => k.id === parseInt(id));
  const [openYear, setOpenYear] = useState("2025");

  const toggleYear = (year) => {
    setOpenYear(openYear === year ? null : year);
  };

  if (!kampus)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        <p className="text-xl font-semibold">Kampus tidak ditemukan</p>
      </div>
    );

  // === DATA PRESTASI PER KAMPUS ===
  const prestasiData = {
    1: [
      {
        year: "2025",
        content: (
          <>
            <img
              src={polibatamPrestasi}
              alt="Prestasi 2025"
              className="w-full h-[400px] object-cover rounded-xl mb-4"
            />
            <p className="text-gray-700 leading-relaxed">
              Via dari Polibatam sukses meraih podium peringkat satu Juara Umum
              1 UKM FIGHT Polibatam pada ajang **POMNAS XIX Jawa Tengah**,
              kategori **Kyorugi Putra U-58** tahun 2025.
            </p>
          </>
        ),
      },
      {
        year: "2024",
        content: (
          <p className="text-gray-700 leading-relaxed">
            Polibatam berhasil menjuarai lomba Inovasi Teknologi Tingkat
            Nasional dengan proyek berbasis energi terbarukan.
          </p>
        ),
      },
      {
        year: "2023",
        content: (
          <p className="text-gray-700 leading-relaxed">
            Mahasiswa Polibatam memenangkan Hackathon Batam Tech 2023 dengan
            solusi berbasis AI untuk efisiensi industri maritim.
          </p>
        ),
      },
      {
        year: "2022",
        content: (
          <p className="text-gray-700 leading-relaxed">
            Tim Polibatam meraih penghargaan di ajang GEMASTIK XV kategori
            Pengembangan Aplikasi.
          </p>
        ),
      },
      {
        year: "2021",
        content: (
          <p className="text-gray-700 leading-relaxed">
            Polibatam menorehkan prestasi dalam bidang robotika dan desain
            inovatif di tingkat nasional.
          </p>
        ),
      },
    ],

    2: [
      {
        year: "2025",
        content: (
          <p className="text-gray-700 leading-relaxed">
            Mahasiswa ITEBA berhasil meraih juara 1 Lomba Desain Produk Inovatif
            se-Sumatera di tahun 2025 dengan karya berbasis teknologi ramah
            lingkungan.
          </p>
        ),
      },
      {
        year: "2024",
        content: (
          <p className="text-gray-700 leading-relaxed">
            Tim ITEBA memenangkan kompetisi UI/UX Nasional dengan desain
            aplikasi edukasi interaktif.
          </p>
        ),
      },
      {
        year: "2023",
        content: (
          <p className="text-gray-700 leading-relaxed">
            Dosen dan mahasiswa ITEBA meneliti teknologi energi terbarukan yang
            dipresentasikan di konferensi internasional.
          </p>
        ),
      },
    ],

    3: [
      {
        year: "2025",
        content: (
          <p className="text-gray-700 leading-relaxed">
            Mahasiswa UIB meraih penghargaan **Best Paper** dalam Konferensi
            **ASEAN Youth Research 2025** dengan riset di bidang hukum bisnis
            internasional.
          </p>
        ),
      },
      {
        year: "2024",
        content: (
          <p className="text-gray-700 leading-relaxed">
            Tim debat UIB menjadi juara umum dalam lomba debat tingkat nasional
            di Jakarta dan menyabet predikat **"The Best Speaker"**.
          </p>
        ),
      },
      {
        year: "2023",
        content: (
          <p className="text-gray-700 leading-relaxed">
            Mahasiswa UIB berhasil menjuarai lomba **Startup Challenge Batam**
            dengan ide bisnis berbasis digital ekonomi kreatif, fokus pada
            solusi logistik.
          </p>
        ),
      },
      {
        year: "2022",
        content: (
          <p className="text-gray-700 leading-relaxed">
            Tim basket putri UIB memenangkan turnamen tingkat regional,
            mengukuhkan dominasi di cabang olahraga tersebut.
          </p>
        ),
      },
      {
        year: "2021",
        content: (
          <p className="text-gray-700 leading-relaxed">
            UIB meraih penghargaan dari LLDIKTI X sebagai perguruan tinggi
            swasta dengan tata kelola terbaik di bidang penelitian dan
            pengabdian.
          </p>
        ),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] font-sans flex flex-col">
      <Navbar />

      {/* Header Kampus */}
      <div className="relative w-full bg-white shadow-md min-h-[384px] flex justify-start items-end">
        <img
          src={kampus.image}
          alt={kampus.name}
          className="absolute inset-0 w-full h-64 md:h-96 object-cover rounded-b-2xl"
        />
        {kampus.logo && (
          <div className="relative z-10 mb-[-2rem] ml-10 bg-white rounded-full p-4 shadow-lg">
            <img
              src={kampus.logo}
              alt={`${kampus.name} Logo`}
              className="h-16 w-16 object-contain"
            />
          </div>
        )}
      </div>

      {/* Info Kampus */}
      <section className="mt-12 max-w-6xl mx-auto px-6 md:px-0 mb-20 flex flex-col items-start">
        <h1 className="text-3xl md:text-4xl font-bold text-[#013B35] mb-2">
          {kampus.name}
        </h1>
        <p className="flex items-center text-gray-500 text-sm md:text-base mb-8">
          <MapPin size={16} className="mr-2 text-[#00BFA6]" />
          {kampus.location}
        </p>

        {/* Tombol Navigasi */}
        <div className="flex flex-wrap gap-4 mb-10 justify-start">
          <Link
            to={`/campus-detail/${kampus.id}`}
            className="px-6 py-2 border border-[#013B35] text-[#013B35] rounded-full font-semibold hover:bg-[#013B35] hover:text-white transition">
            Deskripsi
          </Link>
          <button className="px-6 py-2 bg-[#013B35] text-white font-semibold rounded-full shadow transition hover:bg-[#01614c]">
            Prestasi
          </button>
          <button className="px-6 py-2 border border-[#013B35] text-[#013B35] rounded-full font-semibold hover:bg-[#013B35] hover:text-white transition">
            Jurusan
          </button>
          <button className="px-6 py-2 border border-[#013B35] text-[#013B35] rounded-full font-semibold hover:bg-[#013B35] hover:text-white transition">
            Program
          </button>
        </div>

        {/* Card Prestasi */}
        <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 space-y-6 w-full">
          {" "}
          {/* Added w-full for better alignment */}
          <h2 className="text-2xl font-bold text-[#013B35] text-center mb-6">
            Prestasi {kampus.name}
          </h2>
          <p className="text-gray-700 leading-relaxed text-center max-w-3xl mx-auto mb-8">
            {kampus.id === 1
              ? "Polibatam terus mewujudkan lulusan yang mampu menorehkan bakti unggul yang siap bersaing di kancah nasional dan internasional melalui prestasi akademik dan non-akademik."
              : kampus.id === 2
              ? "ITEBA terus mendorong mahasiswa untuk berinovasi dalam teknologi, desain, dan penelitian guna berkontribusi pada kemajuan industri dan pendidikan di Indonesia."
              : "UIB berkomitmen mencetak lulusan berprestasi melalui kegiatan akademik, penelitian, dan kompetisi berskala nasional maupun internasional."}
          </p>
          <div className="space-y-5">
            {/* Added a check to ensure prestasiData[kampus.id] exists before mapping */}
            {prestasiData[kampus.id] &&
              prestasiData[kampus.id].map(({ year, content }) => (
                <div
                  key={year}
                  className="border rounded-2xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => toggleYear(year)}
                    className="w-full text-left bg-[#013B35] text-white font-semibold px-6 py-4 flex justify-between items-center hover:bg-[#015f53] transition">
                    <span>Tahun {year}</span>
                    <span>{openYear === year ? "−" : "+"}</span>
                  </button>
                  {openYear === year && (
                    <div className="p-6 bg-gray-50">{content}</div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CampusPrestasiPage;
