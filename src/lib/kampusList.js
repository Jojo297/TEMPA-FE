import iteba from "../assets/itebaGedung.jpg";
import uib from "../assets/uibGedung.jpg";
import logoPolibatam from "../assets/logo-polibatam.png";
import logoIteba from "../assets/logo-iteba.png";
import logoUib from "../assets/logo-uib.png";
import polibatam from "../assets/Gedung.jpg";

export const kampusList = [
  {
    id: 1,
    name: "Politeknik Negeri Batam",
    image: polibatam,
    logo: logoPolibatam,
    location: "Batam, Riau Islands, Indonesia",
    desc: "Politeknik Negeri Batam (Polibatam) merupakan satu-satunya Perguruan Tinggi Negeri (PTN) Vokasi di kawasan perdagangan dan pelabuhan bebas Batam, Bintan, dan Karimun Provinsi Kepulauan Riau. Polibatam adalah kampus vokasi unggulan yang berfokus pada pendidikan terapan, riset, dan inovasi teknologi industri.",
    visi: "Menjadi politeknik generasi baru yang bermutu, adaptif, inovatif, dan bermitra erat dengan industri serta masyarakat untuk mendukung Indonesia Maju dan Sejahtera 2045.",
    misi: "Aktif dalam proses kreasi, penyebaran, dan penerapan sains serta teknologi melalui layanan pendidikan tinggi vokasi dan penelitian terapan yang bermutu, terbuka, relevan, dan berkolaborasi erat dengan masyarakat dan industri.",
    jurusan: [
      { name: "Teknik Informatika", slug: "informatika" },
      { name: "Manajemen Bisnis", slug: "manajemen" },
      { name: "Teknik Mesin", slug: "mesin" },
      { name: "Teknik Elektronika", slug: "elektronika" },
      { name: "Akuntansi", slug: "akuntansi" },
      { name: "Administrasi Bisnis", slug: "administrasi-bisnis" },
      { name: "Sistem Informasi", slug: "sistem-informasi" },
      {
        name: "Logistik Perdagangan internasional",
        slug: "logistik-perdagangan",
      },
    ],
  },
  {
    id: 2,
    name: "Institut Teknologi Batam (ITEBA)",
    image: iteba,
    logo: logoIteba,
    location: "Batam, Riau Islands, Indonesia",
    desc: "ITEBA berkomitmen untuk mencetak lulusan yang tidak hanya unggul dalam bidang akademik, tetapi juga siap beradaptasi dan berinovasi di dunia profesional yang terus berubah. Dengan kurikulum yang relevan dengan kebutuhan industri, ITEBA bertujuan menjadi perguruan tinggi terkemuka di Indonesia dan Asia Pasifik.",
    visi: "Menjadi institusi pendidikan tinggi terkemuka di bidang sains, desain, bisnis, dan teknologi di Asia Pasifik serta menjadi rujukan pendidikan tinggi Indonesia tahun 2025.",
    misi: [
      "Menyelenggarakan pendidikan unggul di bidang sains, desain, bisnis, dan teknologi.",
      "Mengembangkan penelitian berbasis kearifan lokal.",
      "Mengaplikasikan keilmuan melalui pengabdian kepada masyarakat.",
      "Menjadi agen pembaharu pembangunan SDM di bidang sains, desain, bisnis, dan teknologi.",
      "Menjadi simpul utama jejaring pendidikan tinggi di bidang sains dan teknologi.",
    ],
    jurusan: [
      { name: "Teknik Informatika", slug: "informatika" },
      { name: "Manajemen Bisnis", slug: "manajemen" },
      { name: "Teknik Mesin", slug: "mesin" },
      { name: "Teknik Elektronika", slug: "elektronika" },
      { name: "Desain Komunikasi Visual (DKV)", slug: "dkv" },
      { name: "Teknik Industri", slug: "teknik-industri" },
      { name: "Teknik Sipil", slug: "teknik-sipil" },
      { name: "Akuntansi", slug: "akuntansi" },
      { name: "Sistem Informasi", slug: "sistem-informasi" },
    ],
  },
  {
    id: 3,
    name: "Universitas Internasional Batam (UIB)",
    image: uib,
    logo: logoUib,
    location: "Batam, Riau Islands, Indonesia",
    desc: "Universitas Internasional Batam (UIB) adalah kampus tempat pemimpin sosial global ditempa berdasarkan nilai dan perspektif internasional. UIB menghadirkan pengalaman belajar yang menggabungkan ilmu pengetahuan mendalam dengan karakter berintegritas.",
    visi: "Menjadi universitas berstandar internasional yang menghasilkan lulusan, ilmu pengetahuan, teknologi, dan seni yang mampu merespons dinamika global.",
    misi: [
      "Menyelenggarakan pendidikan berkualitas internasional.",
      "Mengembangkan ilmu pengetahuan, teknologi, dan seni yang inovatif.",
      "Memberikan layanan masyarakat yang menjunjung tinggi nilai kemanusiaan.",
      "Menerapkan tata kelola yang transparan dan akuntabel.",
    ],
    jurusan: [
      { name: "Teknik Informatika", slug: "informatika" },
      { name: "Manajemen Bisnis", slug: "manajemen" },
      { name: "Hukum", slug: "hukum" },
      { name: "Akuntansi", slug: "akuntansi" },
      { name: "Manajemen", slug: "manajemen" },
      { name: "Desain Komunikasi Visual (DKV)", slug: "dkv" },
      { name: "Pariwisata", slug: "pariwisata" },
      { name: "Sistem Informasi", slug: "sistem-informasi" },
      { name: "Pendidikan Bahasa Inggris", slug: "pendidikan-bahasa-inggris" },
      { name: "Kedokteran", slug: "kedokteran" },
      { name: "Sistem Informasi", slug: "sistem-informasi" },
      {
        name: "Logistik Perdagangan internasional",
        slug: "logistik-perdagangan",
      },
    ],
  },
];
