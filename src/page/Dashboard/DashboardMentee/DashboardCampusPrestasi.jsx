import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import SidebarWithNavbar from "@/components/SidebarWithNavbar";
import polibatamPrestasi from "@/assets/polibatam-prestasi.png";
import { kampusList } from "@/lib/kampusList";
import { CampusHeaderProfile } from "@/components/campusHeaderProfile";

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

  const prestasiData = {
    1: [
      {
        year: "2025",
        content: (
          <>
            <img
              src={polibatamPrestasi}
              alt="Prestasi Polibatam 2025"
              className="w-full h-[400px] object-cover rounded-xl mb-4"
            />
            <p className="text-gray-700 leading-relaxed">
              Via dari Polibatam sukses meraih{" "}
              <b>Juara Umum 1 UKM FIGHT Polibatam</b> pada ajang{" "}
              <b>POMNAS XIX Jawa Tengah 2025</b>, kategori{" "}
              <i>Kyorugi Putra U-58</i>. Selain itu, tim Robotika Polibatam juga
              meraih penghargaan <i>Best Innovation Award</i> di ajang{" "}
              <b>Kontes Robot Indonesia (KRI) 2025</b>.
            </p>
          </>
        ),
      },
      {
        year: "2024",
        content: (
          <p className="text-gray-700 leading-relaxed">
            Polibatam berhasil meraih{" "}
            <b>Juara 1 Lomba Inovasi Teknologi Nasional</b> melalui proyek{" "}
            <i>Smart Energy Hub</i> yang menggabungkan energi surya dan sistem
            IoT untuk efisiensi kampus hijau.
          </p>
        ),
      },
      {
        year: "2023",
        content: (
          <p className="text-gray-700 leading-relaxed">
            Tim mahasiswa Polibatam memenangkan <b>Hackathon Batam Tech 2023</b>{" "}
            dengan solusi berbasis AI untuk efisiensi logistik pelabuhan,
            sekaligus mendapat <i>Best UI/UX Design Award</i>.
          </p>
        ),
      },
      {
        year: "2022",
        content: (
          <p className="text-gray-700 leading-relaxed">
            Polibatam menjadi finalis <b>GEMASTIK XV</b> kategori{" "}
            <i>Pengembangan Aplikasi</i>, serta meraih penghargaan{" "}
            <i>Best Presentation</i> di ajang tersebut.
          </p>
        ),
      },
      {
        year: "2021",
        content: (
          <p className="text-gray-700 leading-relaxed">
            Tim robotika Polibatam meraih <b>Juara 2 Nasional</b> dalam
            Kompetisi Robot Sepak Bola Indonesia serta menyabet{" "}
            <i>Most Innovative Design Award</i>.
          </p>
        ),
      },
    ],

    2: [
      {
        year: "2025",
        content: (
          <p className="text-gray-700 leading-relaxed">
            Mahasiswa ITEBA memenangkan{" "}
            <b>Lomba Desain Produk Inovatif se-Sumatera</b> dengan karya{" "}
            <i>ECO-FAN</i>, kipas angin portabel berbasis energi surya ramah
            lingkungan.
          </p>
        ),
      },
      {
        year: "2024",
        content: (
          <p className="text-gray-700 leading-relaxed">
            Tim ITEBA meraih <b>Juara 1 Kompetisi UI/UX Nasional 2024</b> dengan
            desain aplikasi edukasi <i>EduSpark</i> yang membantu pelajar
            memahami konsep STEM.
          </p>
        ),
      },
      {
        year: "2023",
        content: (
          <p className="text-gray-700 leading-relaxed">
            Dosen dan mahasiswa ITEBA mempresentasikan hasil riset energi
            terbarukan di <b>Konferensi Internasional GreenTech 2023</b>, dan
            masuk daftar 10 besar paper terbaik.
          </p>
        ),
      },
      {
        year: "2022",
        content: (
          <p className="text-gray-700 leading-relaxed">
            Mahasiswa ITEBA berhasil memenangkan{" "}
            <b>Lomba Inovasi Kota Batam 2022</b> dengan ide <i>Smart Bin</i> —
            tempat sampah pintar berbasis sensor.
          </p>
        ),
      },
      {
        year: "2021",
        content: (
          <p className="text-gray-700 leading-relaxed">
            Tim ITEBA sukses menjadi <b>Finalis ASEAN Design Challenge 2021</b>{" "}
            dengan konsep <i>Eco Housing</i> yang berfokus pada arsitektur
            hijau.
          </p>
        ),
      },
    ],

    3: [
      {
        year: "2025",
        content: (
          <p className="text-gray-700 leading-relaxed">
            Mahasiswa UIB meraih <b>Best Paper Award</b> dalam konferensi{" "}
            <b>ASEAN Youth Research 2025</b> dengan topik{" "}
            <i>Hukum Bisnis Internasional dan Keberlanjutan Ekonomi ASEAN</i>.
          </p>
        ),
      },
      {
        year: "2024",
        content: (
          <p className="text-gray-700 leading-relaxed">
            Tim debat UIB memenangkan{" "}
            <b>Kompetisi Debat Nasional Jakarta 2024</b> serta menyabet gelar{" "}
            <i>The Best Speaker</i> atas nama Clara Nathania.
          </p>
        ),
      },
      {
        year: "2023",
        content: (
          <p className="text-gray-700 leading-relaxed">
            Mahasiswa UIB memenangkan <b>Startup Challenge Batam 2023</b> dengan
            ide bisnis <i>LogiSmart</i>, solusi digital logistik untuk UMKM
            lokal.
          </p>
        ),
      },
      {
        year: "2022",
        content: (
          <p className="text-gray-700 leading-relaxed">
            Tim basket putri UIB berhasil mempertahankan gelar juara di{" "}
            <b>Turnamen Regional Kepri Cup 2022</b>, mencatat kemenangan tanpa
            kekalahan.
          </p>
        ),
      },
      {
        year: "2021",
        content: (
          <p className="text-gray-700 leading-relaxed">
            UIB meraih <b>Penghargaan LLDIKTI X</b> sebagai perguruan tinggi
            swasta dengan <i>Tata Kelola Terbaik</i> di bidang penelitian dan
            pengabdian masyarakat.
          </p>
        ),
      },
    ],
  };

  return (
    <>
      {/* Card Prestasi */}
      <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 space-y-6 w-full">
        <h2 className="text-2xl font-bold text-[#013B35] text-center mb-6">
          Prestasi {kampus.name}
        </h2>
        <p className="text-gray-700 leading-relaxed text-center max-w-3xl mx-auto mb-8">
          {kampus.id === 1
            ? "Polibatam terus menorehkan prestasi nasional dan internasional, membuktikan kualitas unggul dalam bidang teknologi dan inovasi."
            : kampus.id === 2
            ? "ITEBA berkomitmen melahirkan inovator muda yang mampu menciptakan karya unggul dan berdaya saing tinggi di tingkat nasional maupun global."
            : "UIB konsisten meraih prestasi di bidang akademik, penelitian, dan pengembangan mahasiswa yang berorientasi global."}
        </p>

        <div className="space-y-5">
          {prestasiData[kampus.id]?.map(({ year, content }) => (
            <div
              key={year}
              className="border rounded-2xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggleYear(year)}
                className="w-full text-left bg-[#013B35] text-white font-semibold px-6 py-4 flex justify-between items-center hover:bg-[#015f53] transition"
              >
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
    </>
  );
};

export default CampusPrestasiPage;
