import informatika from "@/assets/informatika.png";
import mesin from "@/assets/mesin.jpg";
import elektronika from "@/assets/elektronika.jpg";
import akutansi from "@/assets/akutansi.jpg";
import hukum from "@/assets/hukum.jpg";
import sisteminformasi from "@/assets/sistem-informasi.jpg";
import teknikindustri from "@/assets/teknik-industri.jpg";
import manajemen from "@/assets/manajemen.jpg";
import tekniksipil from "@/assets/teknik-sipil.jpg";
import dokter from "@/assets/dokter.jpg";
import pariwisata from "@/assets/pariwisata.jpg";
import dkv from "@/assets/dkv.jpg";
import lpi from "@/assets/lpi.jpg";
import matematika from "@/assets/matematika.jpg";
import bahasainggris from "@/assets/bahasa-inggris.jpg";
import kuliah from "../assets/kuliah.png";

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
      { nama: "Institut Teknologi Batam (ITEBA)", gambar: "/kampus/iteba.jpg" },
      { nama: "Universitas Internasional Batam", gambar: "/kampus/uib.jpg" },
    ],
    programTerkait: [
      {
        nama: "Workshop Coding Dasar",
        tanggal: "15 Oktober 2025",
        lokasi: "Polibatam - Gedung Utama",
        gambar: kuliah,
      },
      {
        nama: "Bootcamp AI & Machine Learning",
        tanggal: "22 Oktober 2025",
        lokasi: "ITEBA - Aula Utama",
        gambar: kuliah,
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
      { nama: "Institut Teknologi Batam (ITEBA)", gambar: "/kampus/iteba.jpg" },
    ],
    programTerkait: [
      {
        nama: "Bootcamp Analisis Sistem",
        tanggal: "25 Oktober 2025",
        lokasi: "ITEBA - Lab Komputer",
        gambar: kuliah,
      },
    ],
  },
  {
    id: 3,
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
      { nama: "Institut Teknologi Batam (ITEBA)", gambar: "/kampus/iteba.jpg" },
    ],
    programTerkait: [
      {
        nama: "Pelatihan Desain 3D SolidWorks",
        tanggal: "18 Oktober 2025",
        lokasi: "Polibatam - Lab Mesin",
        gambar: kuliah,
      },
    ],
  },
  {
    id: 4,
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
      { nama: "Institut Teknologi Batam (ITEBA)", gambar: "/kampus/iteba.jpg" },
      { nama: "Politeknik Negeri Batam", gambar: "/kampus/polibatam.jpg" },
    ],
    programTerkait: [
      {
        nama: "Pelatihan Lean Manufacturing",
        tanggal: "30 Oktober 2025",
        lokasi: "ITEBA - Workshop Teknik",
        gambar: kuliah,
      },
    ],
  },
  {
    id: 5,
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
      { nama: "Institut Teknologi Batam (ITEBA)", gambar: "/kampus/iteba.jpg" },
    ],
    programTerkait: [
      {
        nama: "Workshop IoT Dasar",
        tanggal: "25 Oktober 2025",
        lokasi: "ITEBA - Lab Elektronika",
        gambar: kuliah,
      },
    ],
  },
  {
    id: 6,
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
        gambar: kuliah,
      },
    ],
  },
  {
    id: 7,
    nama: "Manajemen Bisnis",
    slug: "manajemen",
    heroImg: manajemen,
    deskripsi:
      "Jurusan Manajemen mempelajari strategi pengelolaan organisasi, keuangan, sumber daya manusia, dan pemasaran untuk meningkatkan efisiensi bisnis.",
    prospekKerja: ["Manager", "HR Specialist", "Business Development Officer"],
    kampusTerkait: [
      { nama: "Universitas Internasional Batam", gambar: "/kampus/uib.jpg" },
      { nama: "Institut Teknologi Batam (ITEBA)", gambar: "/kampus/iteba.jpg" },
      { nama: "Politeknik Negeri Batam", gambar: "/kampus/polibatam.jpg" },
    ],
    programTerkait: [
      {
        nama: "Seminar Kepemimpinan Bisnis",
        tanggal: "27 Oktober 2025",
        lokasi: "UIB - Gedung Ekonomi",
        gambar: kuliah,
      },
    ],
  },
  {
    id: 8,
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
      { nama: "Institut Teknologi Batam (ITEBA)", gambar: "/kampus/iteba.jpg" },
      { nama: "Universitas Internasional Batam", gambar: "/kampus/uib.jpg" },
    ],
    programTerkait: [
      {
        nama: "Workshop Desain Poster Kreatif",
        tanggal: "20 Oktober 2025",
        lokasi: "ITEBA - Studio Desain",
        gambar: kuliah,
      },
    ],
  },
  {
    id: 9,
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
        gambar: kuliah,
      },
    ],
  },
  {
    id: 10,
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
        gambar: kuliah,
      },
    ],
  },
  {
    id: 11,
    nama: "Pendidikan Bahasa Inggris",
    heroImg: bahasainggris,
    slug: "pendidikan-bahasa-inggris",
    deskripsi:
      "Jurusan Pendidikan Bahasa Inggris berfokus pada penguasaan bahasa Inggris serta metodologi pengajaran. Mahasiswa dilatih untuk menjadi pendidik profesional yang mampu mengajar dengan efektif serta memahami budaya dan linguistik bahasa Inggris.",
    prospekKerja: [
      "Guru Bahasa Inggris",
      "Penerjemah",
      "Content Writer",
      "Konsultan Bahasa",
    ],
    kampusTerkait: [
      {
        nama: "Universitas Internasional Batam (UIB)",
        gambar: "/kampus/uib.jpg",
      },
    ],
    programTerkait: [
      {
        nama: "Workshop Statistik & Data",
        tanggal: "22 Oktober 2025",
        lokasi: "UIB - Kelas",
      },
    ],
  },
  {
    id: 12,
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
        gambar: kuliah,
      },
    ],
  },
  {
    id: 13,
    nama: "Pariwisata",
    slug: "pariwisata",
    heroImg: pariwisata,
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
        gambar: kuliah,
      },
    ],
  },
  {
    id: 14,
    nama: "Matematika",
    slug: "matematika",
    heroImg: matematika,
    deskripsi:
      "Jurusan Matematika mempelajari teori bilangan, statistika, aljabar, dan analisis numerik. Mahasiswa dibekali kemampuan berpikir logis dan analitis untuk berbagai bidang riset dan teknologi.",
    prospekKerja: ["Data Analyst", "Actuary", "Researcher"],
    kampusTerkait: [
      { nama: "Institut Teknologi Batam (ITEBA)", gambar: "/kampus/iteba.jpg" },
    ],
    programTerkait: [
      {
        nama: "Workshop Analisis Data Statistik",
        tanggal: "28 Oktober 2025",
        lokasi: "ITEBA - Lab Matematika",
        gambar: kuliah,
      },
    ],
  },
  {
    id: 15,
    nama: "Logistik Perdagangan Internasional",
    slug: "logistik-perdagangan",
    heroImg: lpi,
    deskripsi:
      "Jurusan ini mempelajari manajemen rantai pasok, ekspor-impor, dan sistem logistik global yang mendukung perdagangan internasional.",
    prospekKerja: [
      "Logistics Manager",
      "Export-Import Specialist",
      "Supply Chain Analyst",
    ],
    kampusTerkait: [
      { nama: "Politeknik Negeri Batam", gambar: "/kampus/polibatam.jpg" },
      { nama: "Institut Teknologi Batam (ITEBA)", gambar: "/kampus/iteba.jpg" },
    ],
    programTerkait: [
      {
        nama: "Seminar Logistik Global",
        tanggal: "7 November 2025",
        lokasi: "Polibatam - Tower A",
        gambar: kuliah,
      },
    ],
  },
];
