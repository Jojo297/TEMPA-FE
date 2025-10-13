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

import polibatamImage from "../assets/polibatam.jpeg";
import itebaImage from "../assets/iteba.jpg";
import uibImage from "../assets/uib.jpeg";
import tiLogo from "../assets/if.jpg";
import elektroLogo from "../assets/ELEKTRO.png";
import tmLogo from "../assets/TM.jpg";
import gedung from "../assets/Gedung.jpg";
import hanggar from "../assets/Hanggar.jpeg";
import tecno from "../assets/Techno.jpg";
import POLIBATAM_LOGO from "../assets/logo-polibatam.png";

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

export default function CampusProgram() {
  const { id } = useParams();
  const kampus = kampusList.find((k) => k.id === parseInt(id));
  return (
    <>
      <div className="flex justify-center h-screen items-center">
        <h1>Program</h1>
      </div>
    </>
  );
}
