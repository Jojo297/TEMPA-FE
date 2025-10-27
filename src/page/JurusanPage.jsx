import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Cpu,
  CircuitBoard,
  Cog,
  Calculator,
  Briefcase,
  Palette,
  Building,
  Scale,
  Globe,
  Cross,
  Waves,
  Plus,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import notfound from "../assets/robot-error.png";
import { NavbarLandingPage } from "@/components/NavbarLandingPage";

const jurusanList = [
  {
    id: 1,
    name: "Teknik Informatika",
    slug: "informatika",
    icon: <Cpu size={40} />,
  },
  {
    id: 2,
    name: "Sistem Informasi",
    slug: "sistem-informasi",
    icon: <CircuitBoard size={40} />,
  },
  {
    id: 3,
    name: "Teknik Mesin",
    slug: "mesin",
    icon: <Cog size={40} />,
  },
  {
    id: 4,
    name: "Teknik Industri",
    slug: "teknik-industri",
    icon: <Cog size={40} />,
  },
  {
    id: 5,
    name: "Elektronika",
    slug: "elektronika",
    icon: <CircuitBoard size={40} />,
  },
  {
    id: 6,
    name: "Akuntansi",
    slug: "akuntansi",
    icon: <Calculator size={40} />,
  },
  {
    id: 7,
    name: "Manajemen Bisnis",
    slug: "manajemen",
    icon: <Briefcase size={40} />,
  },
  {
    id: 8,
    name: "Desain Komunikasi Visual (DKV)",
    slug: "dkv",
    icon: <Palette size={40} />,
  },
  {
    id: 9,
    name: "Teknik Sipil",
    slug: "teknik-sipil",
    icon: <Building size={40} />,
  },
  {
    id: 10,
    name: "Hukum",
    slug: "hukum",
    icon: <Scale size={40} />,
  },
  {
    id: 11,
    name: "Pendidikan Bahasa Inggris",
    slug: "pendidikan-bahasa-inggris",
    icon: <Globe size={40} />,
  },
  {
    id: 12,
    name: "Kedokteran",
    slug: "kedokteran",
    icon: <Cross size={40} />,
  },
  {
    id: 13,
    name: "Pariwisata",
    slug: "pariwisata",
    icon: <Waves size={40} />,
  },
  {
    id: 14,
    name: "Matematika",
    slug: "matematika",
    icon: <Calculator size={40} />,
  },
  {
    id: 15,
    name: "Logistik Perdagangan Internasional",
    slug: "logistik-perdagangan",
    icon: <Building size={40} />,
  },
];

const JurusanPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredJurusan = jurusanList.filter((j) =>
    j.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAF8] font-sans">
      {/* Navbar */}
      <NavbarLandingPage />

      {/* Header */}
      <section className="text-center py-16">
        <h1 className="text-3xl font-extrabold text-[#013B35] mb-2">
          TEMUKAN JURUSAN IMPIANMU
        </h1>
        <p className="text-gray-600">
          Eksplorasi berbagai jurusan untuk menemukan minat dan bakatmu
        </p>
      </section>

      {/* Search Bar */}
      <div className="flex justify-center mb-12 px-6">
        <div className="bg-[#013B35] w-full max-w-3xl rounded-full flex items-center px-4 py-2">
          <Search className="text-white mr-2" size={20} />
          <input
            type="text"
            placeholder="Nama Jurusan"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent outline-none text-white placeholder-gray-300 px-2"
          />
          <button className="bg-[#025D52] text-white font-semibold px-6 py-1 rounded-full hover:bg-[#037E70] transition">
            Cari
          </button>
        </div>
      </div>

      {/* Grid Jurusan */}
      <section className="px-10 pb-20">
        {filteredJurusan.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
            {filteredJurusan.map((j) => (
              <Link
                to={`/jurusan/${j.slug}`}
                key={j.id}
                className="bg-[#013B35] text-white rounded-2xl w-32 h-32 flex flex-col justify-center items-center hover:scale-105 transition-transform duration-300"
              >
                <div className="mb-2 text-[#9EE6D7]">{j.icon}</div>
                <p className="text-sm font-semibold text-[#A8E8DA] text-center">
                  {j.name}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-10">
            <img
              src={notfound}
              alt="Tidak ditemukan"
              className="w-48 h-48 object-contain mb-2 opacity-90"
            />
            <p className="text-center text-gray-500 mt-10">
              Jurusan tidak ditemukan
            </p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default JurusanPage;
