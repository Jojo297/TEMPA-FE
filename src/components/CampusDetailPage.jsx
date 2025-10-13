import React from "react";
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

const kampusList = [
  {
    id: 1,
    name: "Politeknik Negeri Batam",
    image: polibatam,
    logo: logoPolibatam,
    location: "Batam, Riau Islands, Indonesia",
    desc: "Politeknik Negeri Batam (Polibatam) merupakan satu-satunya Perguruan Tinggi Negeri (PTN) Vokasi di kawasan perdagangan dan pelabuhan bebas Batam, Bintan, dan Karimun Provinsi Kepulauan Riau. Selain terletak di salah satu kawasan pusat pertumbuhan ekonomi nasional, Polibatam juga terletak di wilayah terdepan dan terluar wilayah Negara Kesatuan republik Indonesia yang berbatasan langsung dengan perairan internasional.olibatam merupakan kampus vokasi unggulan yang berfokus pada pendidikan terapan, riset, dan inovasi teknologi industri.",
    visi: "Visi dari Polibatam adalah menjadi politeknik generasi baru yang bermutu, adaptif, inovatif, dan bermitra erat dengan industri dan masyarakat untuk mendukung Indonesia Maju dan Sejahtera 2045.",
    misi: "Aktif dalam proses kreasi, penyebaran, dan penerapan sains serta teknologi melalui layanan pendidikan tinggi vokasi dan penelitian terapan yang bermutu, terbuka, relevan, dan berkolaborasi erat dengan masyarakat dan industri.",
  },
  {
    id: 2,
    name: "Institut Teknologi Batam (ITEBA)",
    image: iteba,
    logo: logoIteba,
    location: "Batam, Riau Islands, Indonesia",
    desc: "ITEBA berkomitmen untuk mencetak lulusan yang tidak hanya unggul dalam bidang akademik, tetapi juga siap beradaptasi dan berinovasi di dunia profesional yang terus berubah. Dengan kurikulum yang terus berkembang dan relevansi yang tinggi dengan kebutuhan industri, ITEBA bertujuan untuk menjadi salah satu perguruan tinggi terkemuka di Indonesia, serta mencetak generasi penerus yang mampu bersaing di kancah internasional.",
    visi: "Menjadi institusi pendidikan tinggi yang terkemuka dibidang sains, desain bisnis dan teknologi di Asia Pasifik dan menjadi rujukan pendidikan tinggi Indonesia tahun 2025",
    misi: [
      "Menyelenggarakan dan mengembangkan pendidikan dan pengajaran dibidang sains, desain, bisnis, dan teknologi yang menghasilkan lulusan unggul di bidangnya.",
      "Menyelenggarakan dan mengembangkan penelitian dibidang sains, desain, bisnis, dan teknologi berbasis kearifan lokal.",
      "Mengaplikasikan berbagai keahlian dan keilmuan melalui pengabdian kepada masyarakat untuk meningkatkan kesejahteraan masyarakat.",
      "Menjadi agen pembaharu dalam mendorong kemandirian pembangunan SDM bidang sains, desain, bisnis, dan teknologi.",
      "Berperan sebagai simpul utama jejaring pendidikan tinggi sains, desain, bisnis, dan teknologi di Indonesia.",
    ],
  },

  {
    id: 3,
    name: "Universitas Internasional Batam (UIB)",
    image: uib,
    logo: logoUib,
    location: "Batam, Riau Islands, Indonesia",
    desc: "Universitas Internasional Batam is a campus where global social leaders are formed and forged based on values and global perspective. With UIB, you will find a learning experience that combines in-depth knowledge which forms a character with integrity, and is supported by a conducive learning environment to develop your potential.",
    visi: "To become a university of international standards that produces graduates, scientific knowledge, technology, and art capable of responding to global dynamic changes.",
    misi: [
      "To continuously deliver comprehensive education that meets international quality standards.",
      "To advance analytical and innovative science, technology, and art through research.",
      "To provide community services that uphold human values.",
      "To implement transparent and accountable governance.",
    ],
  },
];

const CampusDetailPage = () => {
  const { id } = useParams();
  const kampus = kampusList.find((k) => k.id === parseInt(id));

  if (!kampus)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        <p className="text-xl font-semibold">Kampus tidak ditemukan</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAF8] font-sans flex flex-col">
      <Navbar />

      {/* Header Image */}
      <div className="relative w-full bg-white shadow-md">
        <img
          src={kampus.image}
          alt={kampus.name}
          className="w-full h-64 md:h-96 object-cover rounded-b-2xl"
        />
        {kampus.logo && (
          <div className="absolute -bottom-8 left-10 bg-white rounded-full p-4 shadow-lg">
            <img
              src={kampus.logo}
              alt={`${kampus.name} Logo`}
              className="h-16 w-16 object-contain"
            />
          </div>
        )}
      </div>

      {/* Info Kampus & Card */}
      <section className="mt-12 max-w-6xl mx-auto px-6 md:px-0 mb-20">
        {/* Nama & Lokasi */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#013B35] mb-2">
          {kampus.name}
        </h1>
        <p className="flex items-center text-gray-500 text-sm md:text-base mb-8">
          <MapPin size={16} className="mr-2 text-[#00BFA6]" />
          {kampus.location}
        </p>

        {/* Navigation Buttons */}
        <div className="flex flex-wrap gap-4 mb-10">
          <button className="px-6 py-2 bg-[#013B35] text-white font-semibold rounded-full shadow transition hover:bg-[#01614c]">
            Deskripsi
          </button>
          <Link
            to={`/campus/${kampus.id}/prestasi`}
            className="px-6 py-2 border border-[#013B35] text-[#013B35] rounded-full font-semibold hover:bg-[#013B35] hover:text-white transition">
            Prestasi
          </Link>
          
          <Link
            to={`/campus/${kampus.id}/jurusan`}
            className="px-6 py-2 border border-[#013B35] text-[#013B35] rounded-full font-semibold hover:bg-[#013B35] hover:text-white transition">
            Jurusan
          </Link>

          {/* <Link 
            to={`/campus/${kampus.id}/jurusan`}
            className="px-6 py-2 border border-[#013B35] text-[#013B35] rounded-full font-semibold hover:bg-[#013B35] hover:text-white transition">
            Jurusan
          </Link> */}
          <button className="px-6 py-2 border border-[#013B35] text-[#013B35] rounded-full font-semibold hover:bg-[#013B35] hover:text-white transition">
            Program
          </button>
        </div>

        {/* Deskripsi & Visi Misi */}
        <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 space-y-6">
          <h2 className="text-2xl font-bold text-[#013B35]">
            Tentang {kampus.name}
          </h2>
          <p className="text-gray-700 leading-relaxed">{kampus.desc}</p>

          <h3 className="text-2xl font-bold text-[#013B35]">Visi & Misi</h3>
          <p className="text-gray-700">
            <strong>Visi:</strong> {kampus.visi}
          </p>
          <p className="text-gray-700">
            <strong>Misi:</strong> {kampus.misi}
          </p>
        </div>
      </section>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default CampusDetailPage;
