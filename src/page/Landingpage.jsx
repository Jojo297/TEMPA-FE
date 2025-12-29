import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation, useInView } from "framer-motion";

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
} from "lucide-react";
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

const LandingPage = () => {
  const data_client_id = import.meta.env.VITE_DATA_CLIENT_ID;
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? kampusList.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === kampusList.length - 1 ? 0 : prev + 1));
  };
  // Animation refs and controls
  const kampusRef = useRef(null);
  const jurusanRef = useRef(null);
  const bertumbuhRef = useRef(null);
  const kerjasamaRef = useRef(null);
  const footerRef = useRef(null);

  const isKampusInView = useInView(kampusRef, { once: true, amount: 0.2 });
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
  const bertumbuhControls = useAnimation();
  const kerjasamaControls = useAnimation();
  const footerControls = useAnimation();

  useEffect(() => {
    if (isKampusInView) kampusControls.start("visible");
  }, [isKampusInView, kampusControls]);
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

  // 🎯 Autoplay carousel tiap 2 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === kampusList.length - 1 ? 0 : prev + 1
      );
    }, 2000);
    return () => clearInterval(interval);
  }, [kampusList.length]);

  // 🎯 Animasi angka menghitung
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

  return (
    <div className="min-h-screen bg-[#F8FAF8] font-sans overflow-x-hidden pt-20">
      {/* Navbar */}
      <NavbarLandingPage />

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
              <div className="relative lg:w-[480px] lg:h-[580px] xl:w-[520px] xl:h-[620px] bg-[#013B35] rounded-t-full overflow-hidden shadow-2xl transition-transform duration-700 hover:scale-[1.01]">
                <img
                  src={img2}
                  alt="Eksplorasi Masa Depan"
                  className="w-full h-full object-cover transform scale-105 hover:scale-110 transition-transform duration-700"
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
                TEMPA adalah platform pengembangan diri dan edukasi digital yang
                membantu kamu menemukan potensi, belajar dengan cara baru, dan
                mempersiapkan masa depan dengan lebih percaya diri.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="px-10 py-4 bg-[#013B35] text-white rounded-full font-bold hover:bg-[#084d46] transition-all shadow-lg shadow-emerald-900/20 active:scale-95">
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
      <motion.section
        ref={kampusRef}
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={kampusControls}
        transition={{ duration: 0.5, delay: 0.1 }}
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
      </motion.section>

      {/* Jurusan section */}
      <motion.section
        ref={jurusanRef}
        initial="hidden"
        animate={jurusanControls}
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.5, delay: 0.1 }}
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

          <motion.div
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-items-center"
          >
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
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 },
                }}
                className="bg-[#013B35] text-white w-36 h-36 rounded-xl flex flex-col items-center justify-center gap-3 shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <div className="text-[#9BD6C3]">{item.icon}</div>
                <span className="text-sm font-medium">{item.nama}</span>
              </motion.div>
            ))}
          </motion.div>

          <Link
            to="/JurusanPage"
            className="mt-10 inline-block text-sm font-semibold border-b-2 border-black hover:text-[#013B35] hover:border-[#013B35] transition"
          >
            Lihat Selengkapnya
          </Link>
        </div>
      </motion.section>

      <motion.section
        ref={bertumbuhRef}
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={bertumbuhControls}
        transition={{ duration: 0.5, delay: 0.1 }}
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
      </motion.section>

      {/* kerja sana section */}
      <motion.section
        ref={kerjasamaRef}
        initial="hidden"
        animate={kerjasamaControls}
        id="kerjasama"
        className="relative flex flex-col lg:flex-row items-center px-6 md:px-12 lg:px-20 py-16 lg:py-24 bg-[#013B35] text-white overflow-hidden"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.8, ease: "easeOut" },
            },
          }}
          className="relative z-10 w-full lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0"
        >
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
        </motion.div>

        <motion.div
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
        </motion.div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        ref={footerRef}
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={footerControls}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-[#013B36] text-white py-12 px-8"
      >
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
              <FaInstagram className="hover:text-[#75B4C6] cursor-pointer" />
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
      </motion.footer>
    </div>
  );
};

export default LandingPage;
