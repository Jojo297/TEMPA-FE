import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAnimation, useInView, motion } from "framer-motion";

import {
  ChevronLeft,
  ChevronRight,
  Star,
  Cpu,
  Cog,
  Activity,
  DollarSign,
  Scale,
  PenTool,
  Users,
  Calculator,
  Waves,
  Cross,
  Calendar,
  Home,
  Map,
} from "lucide-react";

import LoginMentee from "@/page/loginMentee";
import logo_text from "@/assets/logo-text.png";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";
import logo2 from "@/assets/logo-text.png";
import img2 from "@/assets/img2.png";
import img1 from "@/assets/img1.png";
import { Card, CardContent } from "@/components/ui/card";
import peta from "../assets/Peta.png";
import { NavbarLandingPage } from "@/components/NavbarLandingPage";
import { kampusList } from "@/lib/kampusList";
import { Helmet } from "react-helmet-async";

// dummy data
const filteredPrograms = [
  {
    id: "p1",
    program_name: "Trial Kuliah: Dasar Pemrograman Web",
    major_name: "Teknik Informatika",
    campus_name: "Politeknik Negeri Batam",
    type_sesi: "Online",
    capacity: 50,
    image_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    description:
      "Rasakan pengalaman menjadi mahasiswa IT Polibatam. Pelajari dasar HTML, CSS, dan JavaScript dalam kelas simulasi selama 3 hari.",
    start_regis_date: "2026-05-01",
    end_regis_date: "2026-05-20",
    start_program_date: "2026-06-01",
    end_program_date: "2026-06-03",
  },
  {
    id: "p2",
    program_name: "Trial Kuliah: Pengantar Manajemen Bisnis",
    major_name: "Manajemen Bisnis",
    campus_name: "Universitas Indobaru Nasional",
    type_sesi: "Onsite",
    capacity: 30,
    image_url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    description:
      "Ikuti sesi tatap muka langsung di kampus UIN. Bedah strategi pemasaran modern dan manajemen operasional perusahaan.",
    start_regis_date: "2026-05-01",
    end_regis_date: "2026-05-18",
    start_program_date: "2026-05-25",
    end_program_date: "2026-05-25",
  },
  {
    id: "p3",
    program_name: "Trial Kuliah: Jaringan Komputer & Cyber Security",
    major_name: "Teknik Multimedia & Jaringan",
    campus_name: "Politeknik Negeri Batam",
    type_sesi: "Online",
    capacity: 40,
    image_url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
    description:
      "Simulasi praktikum jaringan di laboratorium canggih Polibatam. Terbuka untuk umum yang ingin merasakan kurikulum vokasi.",
    start_regis_date: "2026-05-10",
    end_regis_date: "2026-06-10",
    start_program_date: "2026-06-15",
    end_program_date: "2026-06-17",
  },
];

const LandingPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Animation refs and controls
  const kampusRef = useRef(null);
  const TrialKuliahRef = useRef(null);
  const jurusanRef = useRef(null);
  const bertumbuhRef = useRef(null);
  const kerjasamaRef = useRef(null);
  const footerRef = useRef(null);

  const isKampusInView = useInView(kampusRef, { once: true, amount: 0.2 });
  const isTrialKampusInView = useInView(kampusRef, { once: true, amount: 0.2 });
  const isJurusanInView = useInView(jurusanRef, { once: true, amount: 0.2 });
  const isBertumbuhInView = useInView(bertumbuhRef, {
    once: true,
    amount: 0.2,
  });
  const isKerjasamaInView = useInView(kerjasamaRef, {
    once: true,
    amount: 0.2,
  });
  const isFooterInView = useInView(footerRef, { once: true, amount: 0.2 });

  const kampusControls = useAnimation();
  const jurusanControls = useAnimation();
  const trialKuliahControls = useAnimation();
  const bertumbuhControls = useAnimation();
  const kerjasamaControls = useAnimation();
  const footerControls = useAnimation();

  useEffect(() => {
    if (isKampusInView) kampusControls.start("visible");
  }, [isKampusInView, kampusControls]);
  useEffect(() => {
    if (isTrialKampusInView) trialKuliahControls.start("visible");
  }, [isTrialKampusInView, trialKuliahControls]);
  useEffect(() => {
    if (isJurusanInView) jurusanControls.start("visible");
  }, [isJurusanInView, jurusanControls]);
  useEffect(() => {
    if (isBertumbuhInView) bertumbuhControls.start("visible");
  }, [isBertumbuhInView, bertumbuhControls]);
  useEffect(() => {
    if (isKerjasamaInView) kerjasamaControls.start("visible");
  }, [isKerjasamaInView, kerjasamaControls]);
  useEffect(() => {
    if (isFooterInView) footerControls.start("visible");
  }, [isFooterInView, footerControls]);

  const duplicatedList = Array(8).fill(kampusList).flat();

  const stats = [
    { angka: 1000, label: "Mentee" },
    { angka: 1000, label: "Mentor" },
    { angka: 1000, label: "Kampus" },
    { angka: 1000, label: "Program" },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const duration = 2000; // durasi animasi (2 detik)
    const startTime = performance.now();

    const animate = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const updatedCounts = stats.map((s) => Math.floor(s.angka * progress));
      setCounts(updatedCounts);

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  // get location if type program onsite
  const getLocation = (status, item) => {
    switch (status) {
      case "Online":
        return "Zoom/Gmeet";
      case "onsite":
        return item.onsiteLocationName;
      default:
        return "Tempat belum ditentukan";
    }
  };

  const getCapacity = (num) => {
    if (num <= 0) {
      return "Sudah Penuh";
    } else if (num > 0) {
      return num + " Orang";
    }
  };
  const getSession = (type) => {
    switch (type) {
      case "Online":
        return "text-blue-600 bg-blue-100";
      case "Onsite":
        return "text-gray-600 bg-gray-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] font-sans pt-20">
      {/* Navbar */}
      <NavbarLandingPage
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />

      {/* header */}
      <section className="relative lg:mt-12 w-full min-h-[500px] lg:h-[80vh] bg-[#F5FAFA] overflow-hidden flex items-center">
        {/* Background Map - Aksen visual di belakang */}
        <div
          className="absolute inset-0 z-0 opacity-30 lg:opacity-60 max-w-full"
          style={{
            backgroundImage: `url(${peta})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />

        <div className="container mx-auto px-6 md:px-12 lg:px-20 z-10">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">
            {/* Kolom Gambar (Kiri di Desktop, Hilang di Mobile) */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -100 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className=" lg:flex lg:w-1/2 lg:pt-20 justify-start"
            >
              <div className="relative hidden lg:flex lg:w-[480px] lg:h-[580px] xl:w-[520px] xl:h-[620px] p-4">
                {" "}
                <img
                  src={img2}
                  alt="Eksplorasi Masa Depan"
                  className="w-full h-full object-cover object-top rounded-t-full transition-transform duration-700"
                />
              </div>
            </motion.div>

            {/* Kolom Teks (Kanan di Desktop, Full Width di Mobile) */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 75 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full lg:w-1/2 text-center lg:text-left py-10 lg:py-0"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-[#0A0A0A] tracking-tight">
                EKSPLORASI <br className="hidden lg:block" />
                <span className="text-[#013B35]">MASA DEPANMU</span>{" "}
                <br className="hidden lg:block" />
                BERSAMA TEMPA
              </h1>

              <p className="mt-6 text-base md:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                TEMPA adalah platform edukasi digital untuk coba kuliah sebelum
                mendaftar ke perguruan tinggi. Ikuti berbagai pilihan trial
                kuliah gratis untuk temukan jurusan yang pas buat masa depanmu.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => setIsDialogOpen(true)}
                  className="px-10 py-4 bg-[#013B35] text-white rounded-full font-bold hover:bg-[#084d46] transition-all shadow-lg shadow-emerald-900/20 active:scale-95"
                >
                  Mulai Sekarang
                </button>
                <button className="px-10 py-4 border-2 border-[#013B35] text-[#013B35] rounded-full font-bold hover:bg-[#013B35] hover:text-white transition-all active:scale-95">
                  Pelajari Lebih Lanjut
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* kampus section */}
      <section
        ref={kampusRef}
        animate={kampusControls}
        id="kampus"
        className="w-full bg-[#013B35] text-white py-16"
      >
        <div className="px-10">
          <h2 className="text-2xl font-bold mb-2 text-left">Partner Kampus</h2>
          <div className="w-24 h-[2px] bg-white mb-4"></div>
          <p className="text-gray-300 mb-10 text-left">
            Dari ruang kelas hingga dunia kerja, TEMPA hadir sebagai jembatan
            antara mahasiswa dan kampus untuk menyiapkan generasi siap masa
            depan.
          </p>
        </div>
        <div className="w-full overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#013B35] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#013B35] to-transparent z-10 pointer-events-none" />

          <div
            className="flex gap-6 animate-scroll-train"
            style={{
              width: "max-content",
            }}
          >
            {duplicatedList.map((item, index) => (
              <Card
                key={`${item.id}-${index}`}
                className="flex-shrink-0 w-64 h-44 border-2 border-gray-700 bg-white hover:border-gray-500 transition-colors duration-300"
              >
                <CardContent className="flex items-center justify-center h-full p-6">
                  <img
                    src={item.logo || "/placeholder.svg"}
                    alt={item.name}
                    className="max-w-full max-h-full object-contain "
                  />
                </CardContent>
              </Card>
            ))}
          </div>
          <div
            className="flex gap-6 mt-4 animate-scroll-train-reverse"
            style={{
              width: "max-content",
            }}
          >
            {duplicatedList.map((item, index) => (
              <Card
                key={`${item.id}-${index}`}
                className="flex-shrink-0 w-64 h-44 border-2 border-gray-700 bg-white hover:border-gray-500 transition-colors duration-300"
              >
                <CardContent className="flex items-center justify-center h-full p-6">
                  <img
                    src={item.logo || "/placeholder.svg"}
                    alt={item.name}
                    className="max-w-full max-h-full object-contain "
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trial kuliah section */}
      <section className="bg-[#F9FBFB] py-20" id="trial-kuliah">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* LEFT SIDE: Header & Call to Action (Sticky) */}
            <div className="lg:w-1/3">
              <div className="lg:sticky lg:top-32">
                <div className="inline-block px-4 py-1.5 mb-4 bg-emerald-100 text-[#013B35] rounded-full text-xs font-bold uppercase tracking-widest">
                  Program Unggulan
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                  Trial <span className="text-[#013B35]">Kuliah</span>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  Rasakan pengalaman belajar langsung di kampus impianmu. Ikuti
                  kelas singkat dan temukan potensi tersembunyimu sebelum
                  menentukan langkah besar ke dunia perkuliahan.
                </p>

                <div className="hidden lg:block">
                  <button
                    onClick={() => setIsDialogOpen(true)}
                    className="group inline-flex items-center gap-3 text-sm font-bold text-[#013B35] transition-all"
                  >
                    LIHAT SEMUA PROGRAM
                    <span className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#013B35] group-hover:bg-[#013B35] group-hover:text-white transition-all">
                      <ChevronRight size={16} />
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Program List */}
            <div className="lg:w-2/3">
              <div className="flex flex-col gap-8">
                {filteredPrograms.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col lg:flex-row border bg-white relative rounded-2xl overflow-hidden transition duration-300 hover:bg-white hover:shadow-xl"
                  >
                    {/* left side */}
                    <div
                      className="lg:w-1/3 flex flex-col justify-end bg-cover bg-center p-6 text-white"
                      // Menggunakan background image dengan overlay warna untuk efek keren
                      style={{
                        backgroundImage: `linear-gradient(rgba(1, 59, 53, 0.4), rgba(1, 59, 53, 0.7)),  url(${item.image_url})`,
                        backgroundColor: "#013B35",
                        minHeight: "200px",
                      }}
                    >
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-tight drop-shadow-lg">
                        {item.program_name}
                      </h3>
                    </div>

                    {/* right side */}
                    <div className="lg:w-2/3 p-6 flex flex-col justify-between">
                      <div>
                        {/* Main info: Kampus, Jurusan */}
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                          <div className="flex items-center text-[#013B35] font-semibold text-base md:text-lg">
                            <span>{item.program_name}</span>
                          </div>
                          <div className="px-3 py-1 bg-green-100 text-[#013B35] rounded-full text-xs sm:text-sm font-medium mt-2 sm:mt-0">
                            {item.major_name}
                          </div>
                          <div
                            className={`px-3 py-1 ${getSession(item.type_sesi)} rounded-full text-xs sm:text-sm font-medium mt-2 sm:mt-0`}
                          >
                            {item.type_sesi}
                          </div>
                        </div>

                        {/* description */}
                        <div className="text-gray-600 mb-4 text-xs sm:text-sm line-clamp-2 break-words">
                          <div
                            className="whitespace-pre-wrap [&_p]:mb-4 [&_a]:text-blue-600 [&_a]:underline"
                            dangerouslySetInnerHTML={{
                              __html: item.description,
                            }}
                          />
                        </div>

                        {/* date and location */}
                        <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-gray-700 text-xs sm:text-sm mb-6 border-t pt-4">
                          <div className="flex items-center">
                            <Calendar
                              size={16}
                              className="mr-2 text-[#013B35]"
                            />
                            <span>
                              {new Date(
                                item.start_program_date,
                              ).toLocaleDateString("id-ID", {
                                day: "numeric",
                              })}
                              {" - "}
                              {new Date(
                                item.end_program_date,
                              ).toLocaleDateString("id-ID", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Home size={16} className="mr-2 text-[#013B35]" />
                            <span>{item.campus_name}</span>
                          </div>
                          <div className="flex items-center">
                            <Users size={16} className="mr-2 text-[#013B35]" />
                            <span>{getCapacity(item.capacity)} </span>
                          </div>
                          <div className="flex items-center">
                            <Map size={16} className="mr-2 text-[#013B35]" />
                            <span>
                              Tempat: {getLocation(item.type_sesi, item)}
                            </span>
                          </div>
                        </div>

                        {/* Button */}
                        <button
                          onClick={() => setIsDialogOpen(true)}
                          className="w-full py-3 bg-[#013B35] text-white rounded-xl font-bold hover:bg-[#015f53] transition-all duration-300 text-sm sm:text-base"
                        >
                          Lihat Detail Program
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Only: Link See More */}
              <div className="mt-10 text-center lg:hidden">
                <button
                  onClick={() => setIsDialogOpen(true)}
                  className="text-[#013B35] font-bold border-b-2 border-[#013B35] pb-1"
                >
                  Lihat Semua Program
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jurusan section */}
      <section
        ref={jurusanRef}
        className="bg-white py-16 text-center"
        id="jurusan"
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-2 text-gray-900">
            Jurusan Populer
          </h2>
          <div className="w-24 h-1 bg-[#013B35] mx-auto mb-4"></div>
          <p className="text-gray-600 mb-10">
            Jelajahi jurusan-jurusan populer pilihan mahasiswa dan temukan
            bidang terbaik untuk masa depanmu bersama TEMPA.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 justify-items-center">
            {[
              {
                nama: "Informatika",
                slug: "informatika",
                icon: <Cpu size={36} />,
              },
              { nama: "Mesin", icon: <Cog size={36} /> },
              { nama: "Elektronika", icon: <Activity size={36} /> },
              { nama: "Akuntansi", icon: <DollarSign size={36} /> },
              { nama: "Hukum", icon: <Scale size={36} /> },
              { nama: "DKV", icon: <PenTool size={36} /> },
              { nama: "Psikologi", icon: <Users size={36} /> },
              { nama: "Matematika", icon: <Calculator size={36} /> },
              { nama: "Kelautan", icon: <Waves size={36} /> },
              { nama: "Kedokteran", icon: <Cross size={36} /> },
            ].map((item, index) => (
              <div
                key={index}
                className="group bg-white w-full border border-gray-100 rounded-xl flex flex-col items-center justify-center p-5 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-3.5 bg-primary/5 rounded-full text-primary mb-3 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </div>
                <p className="text-sm font-bold text-gray-700 text-center group-hover:text-primary transition-colors duration-300 line-clamp-2">
                  {item.nama}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsDialogOpen(true)}
            className="mt-10 inline-block text-sm font-semibold border-b-2 border-black hover:text-[#013B35] hover:border-[#013B35] transition"
          >
            Lihat Selengkapnya
          </button>
        </div>
      </section>
      <section
        ref={bertumbuhRef}
        className="bg-[#F8FCF9] py-20 px-6 lg:px-20 text-center"
      >
        <h2 className="text-4xl font-extrabold text-[#013B35] mb-6">
          Bertumbuh Bersama TEMPA
        </h2>
        <p className="text-base text-gray-700 max-w-3xl mx-auto mb-14 leading-relaxed">
          TEMPA telah dipercaya ribuan pengguna dan berkolaborasi dengan
          berbagai kampus, menghadirkan mentor berpengalaman serta
          program-program inovatif yang dirancang untuk membentuk masa depan
          yang lebih cerah bersama.
        </p>

        {/*  */}
        <motion.div
          className="grid grid-cols-2 gap-8 lg:flex lg:justify-center lg:items-center lg:gap-14"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {stats.map((item, i) => (
            <React.Fragment key={i}>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="flex flex-col  items-center"
              >
                <h3 className="text-3xl font-bold text-[#013B35]">
                  {counts[i]}+
                </h3>
                <p className="text-lg text-gray-700 mt-2">{item.label}</p>
              </motion.div>
              {i !== stats.length - 1 && (
                <motion.div
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                  }}
                  className="hidden lg:block w-[2px] h-12 bg-[#013B35]"
                ></motion.div>
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </section>
      {/* kerja sana section */}
      <section
        ref={kerjasamaRef}
        id="kerjasama"
        className="relative flex flex-col lg:flex-row items-center px-6 md:px-12 lg:px-20 py-16 lg:py-24 bg-[#013B35] text-white overflow-hidden"
      >
        <div className="relative z-10 w-full lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
          <h1 className="text-3xl md:text-4xl font-extrabold leading-snug mb-4">
            BANGUN MASA DEPAN BERSAMA TEMPA
          </h1>
          <p className="text-sm md:text-base text-gray-100 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
            Bersama, kita wujudkan ekosistem pendidikan yang adaptif, inovatif,
            dan berdampak nyata bagi masa depan.
          </p>

          <ul className="space-y-3 mb-8 text-gray-100 text-sm md:text-base text-left max-w-lg mx-auto lg:mx-0">
            <li className="flex items-start gap-2">
              <span className="text-[#7EE2D1]">•</span>
              Kolaborasi dalam pengembangan program akademik dan karier.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#7EE2D1]">•</span>
              Sinergi dalam pengembangan program akademik dan karier.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#7EE2D1]">•</span>
              Kontribusi langsung pada peningkatan kualitas pendidikan nasional.
            </li>
          </ul>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link to="/login-campus" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-[#B9E6FF] text-[#013B35] font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-[#9edcff] transition transform hover:-translate-y-1">
                Gabung Kampus
              </button>
            </Link>
            <button
              disabled={true}
              className="w-full sm:w-auto bg-white/90 cursor-not-allowed opacity-70 text-[#013B35] font-semibold px-6 py-3 rounded-lg shadow-md"
            >
              Gabung Perusahaan
            </button>
          </div>
        </div>

        <div
          variants={{
            hidden: { opacity: 0, x: 100 },
            visible: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.8, ease: "easeOut" },
            },
          }}
          className="hidden lg:block absolute right-0 top-0 h-full w-[45%] bg-white rounded-l-full overflow-hidden"
        >
          <img
            src={img1}
            alt="Kolaborasi"
            className="w-full h-full object-cover"
          />
        </div>
      </section>
      {/* Footer */}
      <div className="bg-[#013B36] text-white py-12 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="p-4">
              <img
                src={logo2}
                alt="Logo TEMPA"
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-gray-300 text-sm mt-3 leading-relaxed">
              TEMPA adalah platform pengembangan diri dan edukasi digital yang
              membantu kamu menemukan potensi, belajar dengan cara baru, dan
              mempersiapkan masa depan dengan lebih percaya diri.
            </p>
            <div className="flex space-x-4 mt-5 text-xl">
              <FaFacebookF className="hover:text-[#75B4C6] cursor-pointer" />
              <a
                href="https://www.instagram.com/tempa.explore?igsh=cWJ4c29iZnlndHQy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="hover:text-[#75B4C6] cursor-pointer" />
              </a>
              <FaYoutube className="hover:text-[#75B4C6] cursor-pointer" />

              <FaXTwitter className="hover:text-[#75B4C6] cursor-pointer" />
            </div>
          </div>

          <div>
            <h2 className="font-semibold mb-4 text-lg">TOP KAMPUS</h2>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Politeknik Negeri Batam</li>
              <li>Institut Teknologi Batam (ITEBA)</li>
              <li>Universitas Internasional Batam (UIB)</li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-4 text-lg">TOP 4 PERUSAHAAN</h2>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>COMING SOON</li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-4 text-lg">BANTUAN</h2>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Tentang Kami</li>
              <li>FAQs</li>
              <li>Help Center</li>
              <li>Terms and Condition</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-10 pt-5 text-center text-sm text-gray-400">
          © 2025 TEMPA. All rights reserved. Icons by Icons8
        </div>
      </div>

      {/* Login Dialog (Global) */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-[#013B35]">
          <DialogHeader className="mb-4 ">
            <DialogTitle className=" text-white ">
              <div className="flex justify-center items-center ">
                <div className="text-3xl">Masuk </div>
                <img src={logo_text} alt="" className="w-28" srcset="" />
              </div>
              <div className="px-16">
                <div className="w-full  h-1 bg-[#96CCEC] mt-3 mb-2"></div>
              </div>
            </DialogTitle>
          </DialogHeader>
          {/* button login google */}
          <LoginMentee />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LandingPage;
