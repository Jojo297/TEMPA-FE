// src/lib/JurusanList.jsx
import informatika from "@/assets/informatika.png";
import mesin from "@/assets/mesin.jpg";
import elektronika from "@/assets/elektronika.jpg";
import akutansi from "@/assets/akutansi.jpg";
import hukum from "@/assets/hukum.jpg";
import sisteminformasi from "@/assets/sistem-informasi.jpg";
import teknikkomputer from "@/assets/teknik-komputer.jpg";
import teknikindustri from "@/assets/teknik-industri.jpg";
import manajemen from "@/assets/manajemen.jpg";
import bisnisdigital from "@/assets/bisnis-digital.jpg";
import dkv from "@/assets/dkv.jpg";
import tekniksipil from "@/assets/teknik-sipil.jpg";
import arsitektur from "@/assets/arsitektur.jpg";
import psikologi from "@/assets/psikologi.jpg";
import matematika from "@/assets/matematika.jpg";
import dokter from "@/assets/dokter.jpg";

export const jurusanList = [
  {
    id: 1,
    nama: "Teknik Informatika",
    slug: "informatika",
    heroImg: informatika,
    deskripsi:
      "Jurusan Teknik Informatika mempelajari pengembangan perangkat lunak, sistem informasi, kecerdasan buatan, serta pemrograman berbasis data. Mahasiswa dibekali keterampilan untuk menciptakan solusi teknologi inovatif yang dibutuhkan di era digital.",
    prospekKerja: [
      "Web Developer",
      "Mobile App Developer",
      "AI Engineer",
      "Data Scientist",
    ],
    kampusTerkait: [
      { nama: "Politeknik Negeri Batam", gambar: "/kampus/polibatam.jpg" },
      { nama: "Institut Teknologi Batam", gambar: "/kampus/iteba.jpg" },
      { nama: "Universitas Internasional Batam", gambar: "/kampus/uib.jpg" },
    ],
    programTerkait: [
      {
        nama: "Workshop Coding Dasar",
        tanggal: "15 Oktober 2025",
        lokasi: "Polibatam - Gedung Teknik",
      },
      {
        nama: "Bootcamp AI & Machine Learning",
        tanggal: "22 Oktober 2025",
        lokasi: "ITEBA - Aula Utama",
      },
    ],
  },
  {
    id: 2,
    nama: "Sistem Informasi",
    slug: "sistem-informasi",
    heroImg: sisteminformasi,
    deskripsi:
      "Jurusan Sistem Informasi menggabungkan ilmu komputer dan manajemen untuk menciptakan solusi teknologi yang mendukung pengambilan keputusan bisnis.",
    prospekKerja: ["Business Analyst", "System Analyst", "IT Consultant"],
    kampusTerkait: [
      { nama: "Universitas Internasional Batam", gambar: "/kampus/uib.jpg" },
      { nama: "Institut Teknologi Batam", gambar: "/kampus/iteba.jpg" },
    ],
    programTerkait: [
      {
        nama: "Bootcamp Analisis Sistem",
        tanggal: "25 Oktober 2025",
        lokasi: "ITEBA - Lab Komputer",
      },
    ],
  },
  {
    id: 3,
    nama: "Teknik Komputer",
    slug: "teknik-komputer",
    heroImg: teknikkomputer,
    deskripsi:
      "Jurusan Teknik Komputer menggabungkan hardware dan software untuk menciptakan sistem cerdas dan efisien.",
    prospekKerja: [
      "Hardware Engineer",
      "Embedded System Developer",
      "IoT Engineer",
    ],
    kampusTerkait: [
      { nama: "Institut Teknologi Batam", gambar: "/kampus/iteba.jpg" },
      { nama: "Politeknik Negeri Batam", gambar: "/kampus/polibatam.jpg" },
    ],
    programTerkait: [
      {
        nama: "Workshop Internet of Things (IoT)",
        tanggal: "3 November 2025",
        lokasi: "Polibatam - Lab Komputer",
      },
    ],
  },
  {
    id: 4,
    nama: "Teknik Mesin",
    slug: "mesin",
    heroImg: mesin,
    deskripsi:
      "Teknik Mesin berfokus pada desain, manufaktur, dan pemeliharaan mesin. Mahasiswa belajar tentang termodinamika, mekanika fluida, serta sistem energi untuk mendukung berbagai industri modern.",
    prospekKerja: [
      "Mechanical Engineer",
      "Quality Control Engineer",
      "Design Engineer",
    ],
    kampusTerkait: [
      { nama: "Politeknik Negeri Batam", gambar: "/kampus/polibatam.jpg" },
      { nama: "Universitas Internasional Batam", gambar: "/kampus/uib.jpg" },
      { nama: "Institut Teknologi Batam", gambar: "/kampus/iteba.jpg" },
    ],
    programTerkait: [
      {
        nama: "Pelatihan Desain 3D SolidWorks",
        tanggal: "18 Oktober 2025",
        lokasi: "Polibatam - Lab Mesin",
      },
    ],
  },
  {
    id: 5,
    nama: "Teknik Industri",
    slug: "teknik-industri",
    heroImg: teknikindustri,
    deskripsi:
      "Jurusan Teknik Industri mempelajari efisiensi sistem produksi, manajemen operasi, dan optimisasi proses manufaktur.",
    prospekKerja: [
      "Industrial Engineer",
      "Production Planner",
      "Operation Analyst",
    ],
    kampusTerkait: [
      { nama: "Institut Teknologi Batam", gambar: "/kampus/iteba.jpg" },
      { nama: "Politeknik Negeri Batam", gambar: "/kampus/polibatam.jpg" },
    ],
    programTerkait: [
      {
        nama: "Pelatihan Lean Manufacturing",
        tanggal: "30 Oktober 2025",
        lokasi: "ITEBA - Workshop Teknik",
      },
    ],
  },
  {
    id: 6,
    nama: "Elektronika",
    slug: "elektronika",
    heroImg: elektronika,
    deskripsi:
      "Jurusan Elektronika mempelajari rangkaian, sistem digital, dan teknologi komunikasi. Mahasiswa dibekali kemampuan untuk merancang dan memelihara perangkat elektronik modern.",
    prospekKerja: [
      "Electronic Engineer",
      "Telecommunication Engineer",
      "IoT Developer",
    ],
    kampusTerkait: [
      { nama: "Politeknik Negeri Batam", gambar: "/kampus/polibatam.jpg" },
      { nama: "Institut Teknologi Batam", gambar: "/kampus/iteba.jpg" },
    ],
    programTerkait: [
      {
        nama: "Workshop IoT Dasar",
        tanggal: "25 Oktober 2025",
        lokasi: "Polibatam - Lab Elektronika",
      },
    ],
  },
  {
    id: 7,
    nama: "Akuntansi",
    slug: "akuntansi",
    heroImg: akutansi,
    deskripsi:
      "Jurusan Akuntansi mempelajari prinsip akuntansi, audit, perpajakan, dan manajemen keuangan. Mahasiswa dibekali keterampilan analisis laporan keuangan.",
    prospekKerja: ["Accountant", "Auditor", "Financial Analyst"],
    kampusTerkait: [
      { nama: "Universitas Internasional Batam", gambar: "/kampus/uib.jpg" },
      { nama: "Politeknik Negeri Batam", gambar: "/kampus/polibatam.jpg" },
    ],
    programTerkait: [
      {
        nama: "Workshop Laporan Keuangan",
        tanggal: "12 Oktober 2025",
        lokasi: "UIB - Gedung Ekonomi",
      },
    ],
  },
  {
    id: 8,
    nama: "Manajemen",
    slug: "manajemen",
    heroImg: manajemen,
    deskripsi:
      "Jurusan Manajemen mempelajari strategi pengelolaan organisasi, keuangan, sumber daya manusia, dan pemasaran untuk meningkatkan efisiensi bisnis.",
    prospekKerja: ["Manager", "HR Specialist", "Business Development Officer"],
    kampusTerkait: [
      { nama: "Universitas Internasional Batam", gambar: "/kampus/uib.jpg" },
      { nama: "Institut Teknologi Batam", gambar: "/kampus/iteba.jpg" },
      { nama: "Politeknik Negeri Batam", gambar: "/kampus/polibatam.jpg" },
    ],
    programTerkait: [
      {
        nama: "Seminar Kepemimpinan Bisnis",
        tanggal: "27 Oktober 2025",
        lokasi: "UIB - Gedung Ekonomi",
      },
    ],
  },
  {
    id: 9,
    nama: "Bisnis Digital",
    slug: "bisnis-digital",
    heroImg: bisnisdigital,
    deskripsi:
      "Jurusan Bisnis Digital mempelajari penerapan teknologi digital dalam strategi bisnis, termasuk e-commerce, digital marketing, dan inovasi startup.",
    prospekKerja: [
      "Digital Marketer",
      "E-Commerce Specialist",
      "Startup Founder",
    ],
    kampusTerkait: [
      { nama: "Institut Teknologi Batam", gambar: "/kampus/iteba.jpg" },
      { nama: "Universitas Internasional Batam", gambar: "/kampus/uib.jpg" },
    ],
    programTerkait: [
      {
        nama: "Workshop Digital Branding",
        tanggal: "29 Oktober 2025",
        lokasi: "ITEBA - Aula Inovasi",
      },
    ],
  },
  {
    id: 10,
    nama: "Desain Komunikasi Visual (DKV)",
    slug: "dkv",
    heroImg: dkv,
    deskripsi:
      "Jurusan DKV mengajarkan kreativitas dan teknologi untuk menyampaikan pesan melalui visual. Mahasiswa mempelajari desain grafis, animasi, branding, dan multimedia.",
    prospekKerja: [
      "Graphic Designer",
      "UI/UX Designer",
      "Animator",
      "Brand Strategist",
    ],
    kampusTerkait: [
      { nama: "Institut Teknologi Batam", gambar: "/kampus/iteba.jpg" },
      { nama: "Universitas Internasional Batam", gambar: "/kampus/uib.jpg" },
    ],
    programTerkait: [
      {
        nama: "Workshop Desain Poster Kreatif",
        tanggal: "20 Oktober 2025",
        lokasi: "ITEBA - Studio Desain",
      },
    ],
  },
  {
    id: 11,
    nama: "Teknik Sipil",
    slug: "teknik-sipil",
    heroImg: tekniksipil,
    deskripsi:
      "Jurusan Teknik Sipil berfokus pada perancangan, pembangunan, dan pemeliharaan infrastruktur seperti gedung, jembatan, dan jalan.",
    prospekKerja: ["Civil Engineer", "Construction Manager", "Project Planner"],
    kampusTerkait: [
      { nama: "Universitas Internasional Batam", gambar: "/kampus/uib.jpg" },
    ],
    programTerkait: [
      {
        nama: "Pelatihan Desain Struktur Bangunan",
        tanggal: "1 November 2025",
        lokasi: "UIB - Lab Sipil",
      },
    ],
  },
  {
    id: 12,
    nama: "Arsitektur",
    slug: "arsitektur",
    heroImg: arsitektur,
    deskripsi:
      "Jurusan Arsitektur mempelajari seni dan sains dalam perancangan bangunan yang fungsional, estetis, dan berkelanjutan.",
    prospekKerja: ["Architect", "Urban Planner", "Interior Designer"],
    kampusTerkait: [
      { nama: "Universitas Internasional Batam", gambar: "/kampus/uib.jpg" },
    ],
    programTerkait: [
      {
        nama: "Pameran Desain Arsitektur Modern",
        tanggal: "5 November 2025",
        lokasi: "UIB - Aula Seni",
      },
    ],
  },
  {
    id: 13,
    nama: "Hukum",
    slug: "hukum",
    heroImg: hukum,
    deskripsi:
      "Jurusan Hukum mempelajari sistem hukum, peraturan perundang-undangan, serta etika profesional. Mahasiswa dibekali kemampuan advokasi dan riset hukum.",
    prospekKerja: ["Lawyer", "Legal Consultant", "Judge"],
    kampusTerkait: [
      { nama: "Universitas Internasional Batam", gambar: "/kampus/uib.jpg" },
    ],
    programTerkait: [
      {
        nama: "Seminar Hukum Nasional",
        tanggal: "20 Oktober 2025",
        lokasi: "UIB - Aula Utama",
      },
    ],
  },
  {
    id: 14,
    nama: "Psikologi",
    slug: "psikologi",
    heroImg: psikologi,
    deskripsi:
      "Jurusan Psikologi mempelajari perilaku manusia, proses kognitif, dan aspek sosial-emosional. Mahasiswa dibekali keterampilan konseling dan penelitian psikologis.",
    prospekKerja: ["Psychologist", "Counselor", "HR Specialist"],
    kampusTerkait: [
      { nama: "Universitas Internasional Batam", gambar: "/kampus/uib.jpg" },
    ],
    programTerkait: [
      {
        nama: "Seminar Psikologi Klinis",
        tanggal: "18 Oktober 2025",
        lokasi: "UIB - Aula Psikologi",
      },
    ],
  },
  {
    id: 15,
    nama: "Matematika",
    slug: "matematika",
    heroImg: matematika,
    deskripsi:
      "Jurusan Matematika mempelajari teori bilangan, statistika, aljabar, dan analisis numerik. Mahasiswa dibekali keterampilan pemodelan matematis untuk berbagai industri.",
    prospekKerja: ["Data Analyst", "Statistician", "Researcher"],
    kampusTerkait: [
      { nama: "Institut Teknologi Batam", gambar: "/kampus/iteba.jpg" },
    ],
    programTerkait: [
      {
        nama: "Workshop Statistik & Data",
        tanggal: "22 Oktober 2025",
        lokasi: "ITEBA - Lab Matematika",
      },
    ],
  },
  {
    id: 16,
    nama: "Kelautan",
    slug: "kelautan",
    // heroImg: placeholder,
    deskripsi:
      "Jurusan Kelautan mempelajari ekosistem laut, sumber daya kelautan, dan konservasi. Mahasiswa dibekali kemampuan riset dan pengelolaan sumber daya laut.",
    prospekKerja: ["Marine Biologist", "Oceanographer", "Fisheries Manager"],
    kampusTerkait: [
      { nama: "Universitas Internasional Batam", gambar: "/kampus/uib.jpg" },
    ],
    programTerkait: [
      {
        nama: "Workshop Konservasi Laut",
        tanggal: "19 Oktober 2025",
        lokasi: "UIB - Lab Kelautan",
      },
    ],
  },
  {
    id: 17,
    nama: "Kedokteran",
    slug: "kedokteran",
    heroImg: dokter,
    deskripsi:
      "Jurusan Kedokteran mempelajari ilmu kedokteran dasar hingga klinis. Mahasiswa dibekali keterampilan diagnosis, perawatan, dan penelitian kesehatan.",
    prospekKerja: ["Doctor", "Medical Researcher", "Surgeon"],
    kampusTerkait: [
      { nama: "Universitas Internasional Batam", gambar: "/kampus/uib.jpg" },
    ],
    programTerkait: [
      {
        nama: "Workshop Dasar Kedokteran",
        tanggal: "21 Oktober 2025",
        lokasi: "UIB - Lab Kedokteran",
      },
    ],
  },
  {
    id: 18,
    nama: "Pariwisata",
    slug: "pariwisata",
    // heroImg: placeholder,
    deskripsi:
      "Jurusan Pariwisata mempelajari pengelolaan destinasi, perhotelan, dan strategi promosi wisata untuk mengembangkan industri pariwisata berkelanjutan.",
    prospekKerja: ["Tourism Consultant", "Hotel Manager", "Event Planner"],
    kampusTerkait: [
      { nama: "Universitas Internasional Batam", gambar: "/kampus/uib.jpg" },
    ],
    programTerkait: [
      {
        nama: "Seminar Wisata Berkelanjutan",
        tanggal: "12 November 2025",
        lokasi: "UIB - Gedung Pariwisata",
      },
    ],
  },
  {
    id: 19,
    nama: "Manajemen Rekayasa",
    slug: "manajemen-rekayasa",
    // heroImg: placeholder,
    deskripsi:
      "Jurusan ini menggabungkan prinsip teknik dan manajemen untuk merancang, mengelola, dan meningkatkan sistem kompleks di industri.",
    prospekKerja: ["Project Manager", "Operations Engineer", "Systems Analyst"],
    kampusTerkait: [
      { nama: "Institut Teknologi Batam", gambar: "/kampus/iteba.jpg" },
    ],
    programTerkait: [
      {
        nama: "Workshop Manajemen Produksi",
        tanggal: "10 November 2025",
        lokasi: "ITEBA - Aula Rekayasa",
      },
    ],
  },
  {
    id: 20,
    nama: "Logistik Perdagangan Internasional",
    slug: "logistik-perdagangan",
    // heroImg: placeholder,
    deskripsi:
      "Jurusan ini mempelajari manajemen rantai pasok, ekspor-impor, dan sistem logistik global yang mendukung perdagangan internasional.",
    prospekKerja: [
      "Logistics Manager",
      "Export-Import Specialist",
      "Supply Chain Analyst",
    ],
    kampusTerkait: [
      { nama: "Politeknik Negeri Batam", gambar: "/kampus/polibatam.jpg" },
      { nama: "Institut Teknologi Batam", gambar: "/kampus/iteba.jpg" },
    ],
    programTerkait: [
      {
        nama: "Seminar Logistik Global",
        tanggal: "7 November 2025",
        lokasi: "Polibatam - Gedung Niaga",
      },
    ],
  },
];
