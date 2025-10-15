// src/lib/JurusanList.jsx
import informatika from "@/assets/informatika.png";
// import placeholder from "@/assets/placeholder.png";

export const jurusanList = [
  {
    id: 1,
    nama: "Teknik Informatika",
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
    nama: "Teknik Mesin",
    // heroImg: placeholder,
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
    id: 3,
    nama: "Elektronika",
    // heroImg: placeholder,
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
    id: 4,
    nama: "Akuntansi",
    // heroImg: placeholder,
    deskripsi:
      "Jurusan Akuntansi mempelajari prinsip akuntansi, audit, perpajakan, dan manajemen keuangan. Mahasiswa dibekali keterampilan analisis laporan keuangan.",
    prospekKerja: ["Accountant", "Auditor", "Financial Analyst"],
    kampusTerkait: [
      { nama: "Universitas Internasional Batam", gambar: "/kampus/uib.jpg" },
      { nama: "Institut Teknologi Batam", gambar: "/kampus/iteba.jpg" },
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
    id: 5,
    nama: "Hukum",
    // heroImg: placeholder,
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
    id: 6,
    nama: "Desain Komunikasi Visual (DKV)",
    // heroImg: placeholder,
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
    id: 7,
    nama: "Psikologi",
    // heroImg: placeholder,
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
    id: 8,
    nama: "Matematika",
    // heroImg: placeholder,
    deskripsi:
      "Jurusan Matematika mempelajari teori bilangan, statistika, aljabar, dan analisis numerik. Mahasiswa dibekali keterampilan pemodelan matematis untuk berbagai industri.",
    prospekKerja: ["Data Analyst", "Statistician", "Researcher"],
    kampusTerkait: [
      { nama: "Politeknik Negeri Batam", gambar: "/kampus/polibatam.jpg" },
    ],
    programTerkait: [
      {
        nama: "Workshop Statistik & Data",
        tanggal: "22 Oktober 2025",
        lokasi: "Polibatam - Lab Matematika",
      },
    ],
  },
  {
    id: 9,
    nama: "Kelautan",
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
    id: 10,
    nama: "Kedokteran",
    // heroImg: placeholder,
    deskripsi:
      "Jurusan Kedokteran mempelajari ilmu kedokteran dasar hingga klinis. Mahasiswa dibekali keterampilan diagnosis, perawatan, dan penelitian kesehatan.",
    prospekKerja: ["Doctor", "Medical Researcher", "Surgeon"],
    kampusTerkait: [
      { nama: "Universitas Internasional Batam", gambar: "/kampus/uib.jpg" },
      { nama: "Politeknik Negeri Batam", gambar: "/kampus/polibatam.jpg" },
    ],
    programTerkait: [
      {
        nama: "Workshop Dasar Kedokteran",
        tanggal: "21 Oktober 2025",
        lokasi: "UIB - Lab Kedokteran",
      },
    ],
  },
];
