import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  BarChart2,
  Brain,
  BookOpen,
  Eye,
  LineChart,
  Shield,
  ArrowRight,
  CheckCircle2,
  CheckCheck,
  AlertTriangle,
  Building2,
  GraduationCap,
  Zap,
  Star,
  Quote,
  Calendar,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { kampusList } from "@/lib/kampusList";
import { HeroAnalyticsMockup } from "@/components/HeroAnalyticsMockup";
import { Helmet } from "react-helmet-async";
import { MitraNavbar } from "@/components/MitraNavbar";
import { FooterLandingPage } from "@/components/FooterLandingPage";

// ─── Shared animation variants ──────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const fadeUpChild = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// ─── Custom hook: scroll-triggered reveal ───────────────────────────────────
function useSectionReveal(amount = 0.15) {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true, amount });

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  return { ref, controls };
}

// ─── Main Page Component ─────────────────────────────────────────────────────
export default function MitraLandingPage() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const duplicatedList = Array(8).fill(kampusList).flat();
  const navigate = useNavigate();

  // Section reveal hooks
  const statsSection = useSectionReveal();
  const problemSection = useSectionReveal();
  const featuresSection = useSectionReveal();
  const howItWorksSection = useSectionReveal();
  const testimonialSection = useSectionReveal();
  const ctaSection = useSectionReveal();
  const footerSection = useSectionReveal();

  // ── Data ──────────────────────────────────────────────────────────────────
  const statsData = [
    { angka: "50+", label: "Mitra Kampus Aktif" },
    { angka: "10.000+", label: "Siswa Terdaftar" },
    { angka: "95%", label: "Tingkat Kepuasan Mitra" },
    { angka: "3x", label: "Peningkatan Jangkauan" },
  ];

  const features = [
    {
      icon: <BarChart2 size={30} />,
      title: "Dashboard Analitik Real-Time",
      description:
        "Pantau jumlah peminat, jurusan terpopuler, dan tren minat calon mahasiswa secara langsung dari satu dasbor terpadu.",
      highlight: true,
    },
    {
      icon: <Brain size={30} />,
      title: "Rekomendasi AI untuk Siswa",
      description:
        "Sistem AI kami mencocokkan profil dan minat siswa dengan program studi di kampus Anda, meningkatkan kualitas calon mahasiswa.",
    },
    {
      icon: <BookOpen size={30} />,
      title: "Kelola Program Trial Kuliah",
      description:
        "Buat, publikasikan, dan kelola program trial kuliah langsung dari dashboard mitra. Mudah, cepat, dan terstruktur.",
      highlight: true,
    },
    {
      icon: <Eye size={30} />,
      title: "Visibilitas Kampus Lebih Luas",
      description:
        "Profil kampus Anda tampil di hadapan ribuan siswa SMA/SMK aktif yang sedang mencari perguruan tinggi yang tepat.",
    },
    {
      icon: <LineChart size={30} />,
      title: "Laporan & Insight Akurat",
      description:
        "Dapatkan laporan mendalam tentang peminat, tingkat konversi, dan performa program untuk mendukung keputusan strategis.",
      highlight: true,
    },
    {
      icon: <Shield size={30} />,
      title: "Keamanan & Privasi Data",
      description:
        "Data kampus dan mahasiswa dilindungi dengan enkripsi dan standar keamanan tinggi sesuai regulasi yang berlaku.",
    },
  ];

  const problems = [
    "Sulit menjangkau calon mahasiswa yang benar-benar relevan dengan program studi Anda.",
    "Tidak ada data akurat tentang minat dan preferensi siswa sebelum penerimaan resmi.",
    "Proses promosi kampus yang mahal namun hasilnya sulit diukur secara konkret.",
    "Tingginya angka mahasiswa keluar atau pindah jurusan karena salah pilih saat mendaftar.",
  ];

  const solutions = [
    "Terhubung langsung dengan ribuan siswa aktif yang sedang mempertimbangkan jurusan mereka.",
    "Dashboard analitik real-time menampilkan data minat calon mahasiswa secara akurat dan terperinci.",
    "Platform terukur dengan laporan performa kampus yang transparan, detail, dan dapat diekspor.",
    "AI kami membantu siswa memilih jurusan yang tepat — meningkatkan retensi mahasiswa Anda.",
  ];

  const steps = [
    {
      number: "01",
      title: "Daftar & Verifikasi",
      description:
        "Daftarkan kampus Anda dan lengkapi proses verifikasi singkat. Tim kami akan mendampingi di setiap langkahnya.",
      icon: <Building2 size={26} />,
    },
    {
      number: "02",
      title: "Buat Program Trial Kuliah",
      description:
        "Publikasikan program trial kuliah dalam hitungan menit. Tentukan jadwal, kuota, dan detail jurusan dengan mudah.",
      icon: <BookOpen size={26} />,
    },
    {
      number: "03",
      title: "Pantau & Tumbuh",
      description:
        "Terima pendaftar dari siswa yang relevan dan pantau semua data minat melalui dashboard analitik yang lengkap.",
      icon: <BarChart2 size={26} />,
    },
  ];

  const testimonials = [
    {
      quote:
        "TEMPA membantu kami menjangkau lebih banyak calon mahasiswa yang benar-benar tertarik dengan program teknik kami. Data analitiknya sangat berguna untuk perencanaan penerimaan.",
      name: "Dr. Ridwan Kusuma",
      role: "Wakil Rektor Bidang Akademik",
      campus: "Universitas Teknologi Nasional",
      rating: 5,
    },
    {
      quote:
        "Sebelum TEMPA, kami menghabiskan banyak biaya untuk pameran pendidikan dengan hasil sulit terukur. Kini dengan dashboard TEMPA, kami bisa melihat minat calon mahasiswa secara real-time.",
      name: "Prof. Sari Handayani",
      role: "Kepala Bagian Kemahasiswaan",
      campus: "Institut Bisnis dan Teknologi",
      rating: 5,
    },
    {
      quote:
        "Fitur AI Recommendation TEMPA luar biasa. Siswa yang mendaftar sudah terfilter sesuai minat dan potensinya. Kualitas calon mahasiswa kami meningkat secara signifikan.",
      name: "Ir. Budi Santoso, M.T.",
      role: "Direktur Admisi",
      campus: "Politeknik Maju Indonesia",
      rating: 5,
    },
  ];

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F8FAF8] font-sans">
      <Helmet>
        <title>Mitra Kampus | TEMPA</title>
        <meta
          name="description"
          content="Bergabunglah sebagai Mitra Kampus TEMPA. Jangkau calon mahasiswa yang tepat, kelola program trial kuliah, dan dapatkan analitik real-time."
        />
      </Helmet>

      {/* ══ NAVBAR ══════════════════════════════════════════════════════════ */}
      <MitraNavbar onDemoClick={() => setIsDemoOpen(true)} />

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section className="relative pt-20 min-h-screen bg-[#F5FAFA] flex items-center overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#013B35]/[0.04] rounded-full translate-x-1/3 -translate-y-1/4" />
          <div className="absolute bottom-10 left-0 w-[380px] h-[380px] bg-[#96CCEC]/[0.12] rounded-full -translate-x-1/3 translate-y-1/4" />
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-20 lg:py-28 z-10 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
            {/* Left: headline */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 60 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.85, ease: "easeOut" },
                },
              }}
              className="w-full lg:w-1/2 text-center lg:text-left"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-emerald-100 text-[#013B35] rounded-full text-xs font-bold uppercase tracking-widest">
                <Star size={11} className="fill-[#013B35]" />
                Platform Resmi untuk Mitra Kampus
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.1] text-[#0A0A0A] tracking-tight mb-6">
                JADIKAN KAMPUS ANDA{" "}
                <span className="text-[#013B35]">TUJUAN PERTAMA</span> CALON
                MAHASISWA
              </h1>

              <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10">
                TEMPA menghubungkan kampus Anda dengan ribuan siswa yang tepat
                sasaran. Dapatkan data minat real-time, efisiensi administrasi,
                dan tingkatkan kualitas penerimaan dengan teknologi AI.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => navigate("/login-campus")}
                  className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#013B35] text-white rounded-full font-bold hover:bg-[#084d46] transition-all shadow-lg shadow-emerald-900/20 active:scale-95"
                >
                  Daftar Sebagai Mitra
                  <ArrowRight size={17} />
                </button>
                <button
                  onClick={() => {
                    const el = document.querySelector("#fitur");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-10 py-4 border-2 border-[#013B35] text-[#013B35] rounded-full font-bold hover:bg-[#013B35] hover:text-white transition-all active:scale-95"
                >
                  Pelajari Lebih Lanjut
                </button>
              </div>

              {/* Trust signals */}
              <div className="mt-10 flex flex-wrap gap-5 justify-center lg:justify-start text-sm text-gray-500">
                {["Tanpa Kontrak Panjang", "Dukungan Penuh Tim Kami"].map(
                  (t) => (
                    <div key={t} className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-[#013B35]" />
                      {t}
                    </div>
                  ),
                )}
              </div>
            </motion.div>

            {/* Right: Analytics mockup (mirip ParticipantAnalytics) */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
              className="w-full lg:w-1/2"
            >
              <HeroAnalyticsMockup />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ STATS BAR ═══════════════════════════════════════════════════════ */}
      <section
        ref={statsSection.ref}
        className="w-full bg-[#013B35] text-white py-14"
      >
        <motion.div
          animate={statsSection.controls}
          initial="hidden"
          variants={staggerContainer}
          className="max-w-5xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/20"
        >
          {statsData.map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUpChild}
              className="text-center px-6"
            >
              <h3 className="text-3xl md:text-4xl font-extrabold text-white">
                {s.angka}
              </h3>
              <p className="text-[#96CCEC] text-sm mt-2 font-medium">
                {s.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ══ CAMPUS LOGOS (scrolling marquee) ════════════════════════════════ */}
      <section className="w-full bg-[#013B35] pb-14">
        <p className="text-center text-gray-400 text-xs font-semibold uppercase tracking-widest mb-6 px-4">
          Dipercaya oleh kampus-kampus terbaik
        </p>
        <div className="w-full overflow-hidden relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-[#013B35] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-[#013B35] to-transparent z-10 pointer-events-none" />

          <div
            className="flex gap-5 animate-scroll-train"
            style={{ width: "max-content" }}
          >
            {duplicatedList.map((item, index) => (
              <Card
                key={`${item.id}-${index}`}
                className="flex-shrink-0 w-56 h-36 border border-gray-700 bg-white hover:border-gray-400 transition-colors duration-300"
              >
                <CardContent className="flex items-center justify-center h-full p-5">
                  <img
                    src={item.logo || "/placeholder.svg"}
                    alt={item.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </CardContent>
              </Card>
            ))}
          </div>

          <div
            className="flex gap-5 mt-4 animate-scroll-train-reverse"
            style={{
              width: "max-content",
            }}
          >
            {duplicatedList.map((item, index) => (
              <Card
                key={`${item.id}-${index}`}
                className="flex-shrink-0 w-56 h-36 border-2 border-gray-700 bg-white hover:border-gray-500 transition-colors duration-300"
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

      {/* ══ PROBLEM / SOLUTION ══════════════════════════════════════════════ */}
      <section
        ref={problemSection.ref}
        className="py-20 lg:py-28 bg-white"
        id="masalah-solusi"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          {/* Section header */}
          <motion.div
            animate={problemSection.controls}
            initial="hidden"
            variants={fadeUp}
            className="text-center mb-14"
          >
            <div className="inline-block px-4 py-1.5 mb-4 bg-emerald-100 text-[#013B35] rounded-full text-xs font-bold uppercase tracking-widest">
              Kenali Tantangannya
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A0A0A] mb-4 leading-tight">
              Tantangan Nyata yang Dihadapi <br className="hidden md:block" />
              <span className="text-[#013B35]">Universitas Saat Ini</span>
            </h2>
            <div className="w-24 h-1 bg-[#013B35] mx-auto mb-5" />
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Kami memahami bahwa proses menjaring calon mahasiswa yang tepat
              adalah salah satu tantangan terbesar perguruan tinggi. Itulah
              mengapa TEMPA hadir.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {/* Problems column */}
            <motion.div
              animate={problemSection.controls}
              initial="hidden"
              variants={staggerContainer}
              className="bg-red-50/60 border border-red-100 rounded-3xl p-8"
            >
              <div className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertTriangle size={18} className="text-red-500" />
                </div>
                <h3 className="text-base font-bold text-gray-800">
                  Tantangan yang Ada
                </h3>
              </div>
              <div className="space-y-4">
                {problems.map((p, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUpChild}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1.5 flex-shrink-0 w-4 h-4 bg-red-200 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{p}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Solutions column */}
            <motion.div
              animate={problemSection.controls}
              initial="hidden"
              variants={staggerContainer}
              className="bg-emerald-50/70 border border-emerald-100 rounded-3xl p-8"
            >
              <div className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 bg-[#013B35] rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCheck size={18} className="text-white" />
                </div>
                <h3 className="text-base font-bold text-gray-800">
                  Solusi dengan TEMPA
                </h3>
              </div>
              <div className="space-y-4">
                {solutions.map((s, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUpChild}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1.5 flex-shrink-0 w-4 h-4 bg-[#013B35] rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed font-medium">
                      {s}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-emerald-200">
                <button
                  onClick={() => navigate("/login-campus")}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#013B35] hover:gap-3 transition-all duration-200"
                >
                  Daftar Sekarang
                  <ArrowRight size={15} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ FEATURES ════════════════════════════════════════════════════════ */}
      <section
        ref={featuresSection.ref}
        id="fitur"
        className="py-20 lg:py-28 bg-[#F9FBFB]"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            animate={featuresSection.controls}
            initial="hidden"
            variants={fadeUp}
            className="text-center mb-14"
          >
            <div className="inline-block px-4 py-1.5 mb-4 bg-emerald-100 text-[#013B35] rounded-full text-xs font-bold uppercase tracking-widest">
              Fitur Platform
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A0A0A] mb-4 leading-tight">
              Semua yang Kampus Anda Butuhkan,{" "}
              <span className="text-[#013B35]">Dalam Satu Platform</span>
            </h2>
            <div className="w-24 h-1 bg-[#013B35] mx-auto mb-5" />
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Dari analitik real-time hingga rekomendasi AI, TEMPA hadir dengan
              ekosistem lengkap untuk mendukung strategi penerimaan mahasiswa
              Anda.
            </p>
          </motion.div>

          <motion.div
            animate={featuresSection.controls}
            initial="hidden"
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((f, i) => (
              <motion.div key={i} variants={fadeUpChild}>
                <Card
                  className={`h-full border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group cursor-default ${
                    f.highlight
                      ? "bg-[#013B35] border-[#013B35]"
                      : "bg-white border-gray-100 hover:border-[#013B35]/20"
                  }`}
                >
                  <CardContent className="p-7">
                    <div
                      className={`w-13 h-13 w-[52px] h-[52px] rounded-2xl flex items-center justify-center mb-5 transition-colors duration-300 ${
                        f.highlight
                          ? "bg-white/10 text-white"
                          : "bg-[#013B35]/5 text-[#013B35] group-hover:bg-[#013B35] group-hover:text-white"
                      }`}
                    >
                      {f.icon}
                    </div>
                    <h3
                      className={`text-[1.05rem] font-bold mb-3 leading-snug ${
                        f.highlight ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {f.title}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed ${
                        f.highlight ? "text-white/70" : "text-gray-500"
                      }`}
                    >
                      {f.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ════════════════════════════════════════════════════ */}
      <section
        ref={howItWorksSection.ref}
        id="cara-kerja"
        className="py-20 lg:py-28 bg-white"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            animate={howItWorksSection.controls}
            initial="hidden"
            variants={fadeUp}
            className="text-center mb-14"
          >
            <div className="inline-block px-4 py-1.5 mb-4 bg-emerald-100 text-[#013B35] rounded-full text-xs font-bold uppercase tracking-widest">
              Cara Kerja
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A0A0A] mb-4 leading-tight">
              Mulai Bergabung dalam{" "}
              <span className="text-[#013B35]">3 Langkah Mudah</span>
            </h2>
            <div className="w-24 h-1 bg-[#013B35] mx-auto mb-5" />
            <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">
              Proses onboarding kami dirancang sederhana. Anda bisa aktif dan
              mulai menjangkau calon mahasiswa dalam waktu singkat.
            </p>
          </motion.div>

          <motion.div
            animate={howItWorksSection.controls}
            initial="hidden"
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative"
          >
            {/* Connector line (desktop only) */}
            <div className="absolute hidden md:block top-8 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-gradient-to-r from-transparent via-[#013B35]/30 to-transparent" />

            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUpChild}
                className="relative flex flex-col items-center text-center"
              >
                {/* Step number label */}
                <span className="text-[10px] font-black text-[#96CCEC] tracking-widest uppercase mb-1.5">
                  {step.number}
                </span>

                {/* Icon circle */}
                <div className="w-16 h-16 mb-6 bg-[#013B35] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-900/20 relative z-10">
                  {step.icon}
                </div>

                <h3 className="text-xl font-bold text-[#0A0A0A] mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA below steps */}
          <motion.div
            animate={howItWorksSection.controls}
            initial="hidden"
            variants={fadeUp}
            className="text-center mt-14"
          >
            <button
              onClick={() => navigate("/login-campus")}
              className="inline-flex items-center gap-2 px-10 py-4 bg-[#013B35] text-white rounded-full font-bold hover:bg-[#084d46] transition-all shadow-lg shadow-emerald-900/20 active:scale-95"
            >
              Mulai Sekarang
              <ArrowRight size={17} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ════════════════════════════════════════════════════ */}
      <section
        ref={testimonialSection.ref}
        id="testimoni"
        className="py-20 lg:py-28 bg-[#013B35] text-white"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            animate={testimonialSection.controls}
            initial="hidden"
            variants={fadeUp}
            className="text-center mb-14"
          >
            <div className="inline-block px-4 py-1.5 mb-4 bg-white/10 text-white rounded-full text-xs font-bold uppercase tracking-widest">
              Testimoni Mitra
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              Yang Mereka Katakan Tentang{" "}
              <span className="text-[#96CCEC]">TEMPA</span>
            </h2>
            <div className="w-24 h-1 bg-[#96CCEC] mx-auto mb-5" />
            <p className="text-gray-300 max-w-xl mx-auto leading-relaxed text-sm">
              Bergabunglah bersama puluhan institusi yang telah merasakan
              perbedaan nyata bersama TEMPA.
            </p>
          </motion.div>

          <motion.div
            animate={testimonialSection.controls}
            initial="hidden"
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUpChild}>
                <Card className="h-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                  <CardContent className="p-7 flex flex-col h-full">
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star
                          key={j}
                          size={13}
                          className="fill-[#96CCEC] text-[#96CCEC]"
                        />
                      ))}
                    </div>

                    <Quote
                      size={22}
                      className="text-[#96CCEC]/40 mb-3 flex-shrink-0"
                    />

                    <p className="text-gray-200 text-sm leading-relaxed flex-1 italic">
                      "{t.quote}"
                    </p>

                    <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#96CCEC]/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <GraduationCap size={17} className="text-[#96CCEC]" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm leading-tight">
                          {t.name}
                        </p>
                        <p className="text-[#96CCEC] text-xs mt-0.5">
                          {t.role}
                        </p>
                        <p className="text-gray-400 text-xs">{t.campus}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ CTA SECTION ═════════════════════════════════════════════════════ */}
      <section
        ref={ctaSection.ref}
        className="py-20 lg:py-28 bg-[#F8FCF9] text-center"
      >
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            animate={ctaSection.controls}
            initial="hidden"
            variants={fadeUp}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-emerald-100 text-[#013B35] rounded-full text-xs font-bold uppercase tracking-widest">
              <Zap size={11} />
              Mulai Sekarang
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#013B35] mb-6 leading-tight">
              Siap Membawa Kampus Anda ke Level Berikutnya?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Bergabunglah dengan 50+ kampus terbaik yang telah memanfaatkan
              TEMPA untuk menjangkau calon mahasiswa yang tepat. Mulai dengan
              demo gratis bersama tim kami.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/login-campus")}
                className="inline-flex items-center justify-center gap-2 px-12 py-4 bg-[#013B35] text-white rounded-full font-bold text-lg hover:bg-[#084d46] transition-all shadow-lg shadow-emerald-900/20 active:scale-95"
              >
                Daftar Sebagai Mitra
                <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════════════════════ */}
      <FooterLandingPage />

      {/* ══ DEMO MODAL ══════════════════════════════════════════════════════ */}
      {isDemoOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsDemoOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-7">
              <div className="w-16 h-16 bg-[#013B35] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar size={28} className="text-white" />
              </div>
              <h2 className="text-2xl font-extrabold text-[#013B35]">
                Jadwalkan Demo
              </h2>
              <p className="text-gray-400 text-sm mt-2">
                Tim kami akan menghubungi Anda dalam 1×24 jam untuk menjadwalkan
                sesi demo gratis.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { placeholder: "Nama Lengkap", type: "text" },
                { placeholder: "Email Institusi", type: "email" },
                { placeholder: "Nama Kampus / Institusi", type: "text" },
                { placeholder: "Nomor WhatsApp", type: "tel" },
              ].map((field) => (
                <input
                  key={field.placeholder}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#013B35] focus:ring-1 focus:ring-[#013B35]/20 transition-colors"
                />
              ))}
            </div>

            <button className="w-full mt-6 py-4 bg-[#013B35] text-white rounded-xl font-bold hover:bg-[#084d46] transition-all active:scale-95 shadow-md shadow-emerald-900/20">
              Kirim Permintaan Demo
            </button>
            <button
              onClick={() => setIsDemoOpen(false)}
              className="w-full mt-3 py-3 text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              Batalkan
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
