import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Import semua gambar jurusan
import informatikaImg from "@/assets/informatika.png";
// import mesinImg from "@/assets/mesin.png";
// import elektroImg from "@/assets/elektronika.png";
// import akuntansiImg from "@/assets/akuntansi.png";
// import hukumImg from "@/assets/hukum.png";
// import dkvImg from "@/assets/dkv.png";
// import psikologiImg from "@/assets/psikologi.png";
// import matematikaImg from "@/assets/matematika.png";
// import kelautanImg from "@/assets/kelautan.png";
// import kedokteranImg from "@/assets/kedokteran.png";

// Data jurusan (bisa juga diambil dari file JSON atau API nanti)
const jurusanData = {
  1: {
    name: "Informatika",
    img: informatikaImg,
    tentang: `Teknik Informatika mempelajari bagaimana menggunakan teknologi komputer
    secara optimal untuk mengolah data melalui proses logika. Mahasiswa akan
    mempelajari perancangan, pengembangan, pengujian, hingga evaluasi perangkat
    lunak dan sistem komputasi.`,
    prospek: `Lulusan dapat bekerja sebagai Software Engineer, Data Analyst, Web Developer,
    IT Consultant, atau Network Administrator di berbagai sektor industri.`,
    kampus: `ITEBA, Politeknik Negeri Batam, Universitas Indonesia, ITB, UGM.`,
    program: `Artificial Intelligence, Data Science, Software Engineering, Cyber Security.`,
  },
  2: {
    name: "Mesin",
    // img: mesinImg,
    tentang: `Teknik Mesin fokus pada perancangan, analisis, dan pembuatan sistem mekanik
    seperti mesin industri, kendaraan, dan peralatan manufaktur.`,
    prospek: `Peluang kerja mencakup Engineer, Maintenance Supervisor, dan Project Manager
    di sektor otomotif, energi, dan manufaktur.`,
    kampus: `Politeknik Negeri Batam, ITB, Universitas Gadjah Mada, Universitas Indonesia.`,
    program: `Teknologi Otomotif, Energi Terbarukan, dan Manufaktur Cerdas.`,
  },
  3: {
    name: "Elektronika",
    // img: elektroImg,
    tentang: `Teknik Elektronika mempelajari rancangan dan implementasi sistem elektronik
    seperti rangkaian, sensor, hingga mikrokontroler.`,
    prospek: `Bisa bekerja sebagai Embedded System Engineer, Instrumentation Engineer,
    atau Automation Specialist.`,
    kampus: `Polibatam, ITB, Universitas Diponegoro, Universitas Brawijaya.`,
    program: `Robotika, Internet of Things (IoT), dan Sistem Kendali.`,
  },
  4: {
    name: "Akuntansi",
    // img: akuntansiImg,
    tentang: `Jurusan Akuntansi mempelajari pengelolaan keuangan, laporan keuangan, audit,
    serta perpajakan perusahaan.`,
    prospek: `Lulusan berpeluang menjadi Akuntan, Auditor, Tax Consultant, dan Financial Analyst.`,
    kampus: `Universitas Indonesia, Universitas Airlangga, Universitas Gadjah Mada.`,
    program: `Audit, Perpajakan, Akuntansi Manajemen.`,
  },
  5: {
    name: "Hukum",
    // img: hukumImg,
    tentang: `Ilmu Hukum mempelajari peraturan, sistem peradilan, serta etika dalam menegakkan hukum.`,
    prospek: `Menjadi Pengacara, Jaksa, Hakim, atau Legal Consultant di instansi pemerintahan maupun swasta.`,
    kampus: `Universitas Indonesia, Universitas Airlangga, Universitas Padjadjaran.`,
    program: `Hukum Pidana, Hukum Perdata, Hukum Bisnis.`,
  },
  6: {
    name: "DKV",
    // img: dkvImg,
    tentang: `Desain Komunikasi Visual mengajarkan pembuatan karya visual untuk menyampaikan pesan melalui media digital dan cetak.`,
    prospek: `Lulusan bisa menjadi Graphic Designer, UI/UX Designer, Art Director, atau Illustrator.`,
    kampus: `Institut Seni Indonesia, ITB, Universitas Multimedia Nusantara.`,
    program: `Branding Design, Motion Graphic, UI/UX Design.`,
  },
  7: {
    name: "Psikologi",
    // img: psikologiImg,
    tentang: `Psikologi mempelajari perilaku, emosi, dan pola pikir manusia dalam berbagai konteks sosial dan individu.`,
    prospek: `Lulusan bisa berkarier sebagai Psikolog Industri, Konselor, HRD, atau Peneliti.`,
    kampus: `Universitas Indonesia, Universitas Gadjah Mada, Universitas Airlangga.`,
    program: `Psikologi Klinis, Psikologi Industri, Psikologi Pendidikan.`,
  },
  8: {
    name: "Matematika",
    // img: matematikaImg,
    tentang: `Jurusan Matematika berfokus pada logika, struktur, pola, dan analisis data dalam berbagai aplikasi.`,
    prospek: `Menjadi Data Scientist, Statistician, Research Analyst, atau Dosen.`,
    kampus: `ITB, UGM, Universitas Indonesia, Universitas Negeri Malang.`,
    program: `Statistika, Analisis Data, Matematika Terapan.`,
  },
  9: {
    name: "Kelautan",
    // img: kelautanImg,
    tentang: `Ilmu Kelautan membahas ekosistem laut, sumber daya pesisir, dan teknologi pengelolaan perairan.`,
    prospek: `Menjadi Peneliti Kelautan, Marine Engineer, atau ahli konservasi laut.`,
    kampus: `IPB, Universitas Diponegoro, Universitas Hasanuddin.`,
    program: `Oseanografi, Bioteknologi Laut, Konservasi Pesisir.`,
  },
  10: {
    name: "Kedokteran",
    // img: kedokteranImg,
    tentang: `Kedokteran mempelajari anatomi tubuh manusia, diagnosis penyakit, dan perawatan pasien.`,
    prospek: `Lulusan dapat menjadi Dokter Umum, Spesialis, atau Peneliti Kesehatan.`,
    kampus: `Universitas Indonesia, UGM, Universitas Airlangga.`,
    program: `Kedokteran Umum, Spesialis Anak, Spesialis Bedah.`,
  },
};

const DetailJurusan = () => {
  const { id } = useParams();
  const jurusan = jurusanData[id];

  if (!jurusan) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Data jurusan tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      {/* Header Image */}
      <div className="flex justify-center mt-10 px-4">
        <div className="relative w-full max-w-5xl rounded-3xl overflow-hidden shadow-xl">
          <img
            src={jurusan.img}
            alt={jurusan.name}
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-[#013B35]/90 py-4 px-8">
            <h1 className="text-white text-3xl md:text-4xl font-extrabold uppercase tracking-wide">
              {jurusan.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 container mx-auto px-6 md:px-16 py-12 text-[#013B35] max-w-5xl">
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3 border-b-2 border-[#00BFA6] inline-block pb-1">
            Tentang Jurusan
          </h2>
          <p className="text-justify text-gray-700 leading-relaxed mt-3">
            {jurusan.tentang}
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3 border-b-2 border-[#00BFA6] inline-block pb-1">
            Prospek Kerja
          </h2>
          <p className="text-justify text-gray-700 leading-relaxed mt-3">
            {jurusan.prospek}
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3 border-b-2 border-[#00BFA6] inline-block pb-1">
            Kampus Terkait
          </h2>
          <p className="text-gray-700 mt-3">{jurusan.kampus}</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3 border-b-2 border-[#00BFA6] inline-block pb-1">
            Program Terkait
          </h2>
          <p className="text-gray-700 mt-3">{jurusan.program}</p>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default DetailJurusan;
