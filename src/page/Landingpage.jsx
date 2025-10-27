import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
import polibatam from "../assets/polibatam.jpeg";
import iteba from "../assets/iteba.jpg";
import uib from "../assets/uib.jpeg";
import peta from "../assets/Peta.png";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import LoginMentee from "./loginMentee";
import logo_text from "@/assets/logo-text.png";
// import { kampusList } from "@/lib/kampusList";

const LandingPage = () => {
  const data_client_id = import.meta.env.VITE_DATA_CLIENT_ID;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const kampusList = [
    {
      id: 1,
      name: "Politeknik Negeri Batam",
      image: polibatam,
      location: "Kota Batam",
      jurusan: [
        "Teknik Mesin",
        "Teknik Informatika",
        "Manajemen Bisnis",
        "Teknik Elektro",
      ],
      rating: 5,
    },
    {
      id: 2,
      name: "Institut Teknologi Batam",
      image: iteba,
      location: "Kota Batam",
      jurusan: [
        "Manajemen",
        "Akuntansi",
        "Teknik Industri",
        "Teknik Informatika",
        "Sistem Informasi",
        "Teknik Perkapalan",
        "K3",
        "Kesehatan Lingkungan",
      ],
      rating: 5,
    },
    {
      id: 3,
      name: "Universitas Internasional Batam",
      image: uib,
      location: "Kota Batam",
      jurusan: [
        "Akuntansi",
        "Ilmu Hukum",
        "Manajemen",
        "Pariwisata",
        "Pendidikan Bahasa Inggris",
        "Teknologi Informasi",
        "Sistem Informasi",
        "Arsitektur",
      ],
      rating: 5,
    },
  ];

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? kampusList.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === kampusList.length - 1 ? 0 : prev + 1));
  };

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
    <div className="min-h-screen bg-[#F8FAF8] font-sans">
      {/* Navbar */}
      <nav className="bg-[#013B35] text-white px-10 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="./page/LandingPage">
            <img
              src={logo2}
              alt="Logo TEMPA"
              className="h-8 w-auto object-contain"
            />
          </Link>
        </div>

        <ul className="flex items-center space-x-10 text-sm font-medium">
          <li>
            <a href="CampusPage" className="hover:text-[#00BFA6]">
              Kampus
            </a>
          </li>
          <li>
            <Link to="/JurusanPage" className="hover:text-[#00BFA6]">
              Jurusan
            </Link>
          </li>
          <li>
            <a href="/Panduan" className="hover:text-[#00BFA6]">
              Panduan
            </a>
          </li>
          <li>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <form>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => setIsDialogOpen(true)}
                    className="bg-[#96CCEC] text-[#013B35] px-4 py-1.5 rounded-full font-semibold hover:bg-[#00a790] transition"
                  >
                    Masuk
                  </Button>
                </DialogTrigger>
                {isDialogOpen && (
                  <DialogContent className="sm:max-w-[425px] bg-[#013B35]">
                    <DialogHeader className="mb-4 ">
                      <DialogTitle className=" text-white ">
                        <div className="flex justify-center items-center ">
                          <div className="text-3xl">Masuk </div>
                          <img
                            src={logo_text}
                            alt=""
                            className="w-28"
                            srcset=""
                          />
                        </div>
                        <div className="px-16">
                          <div className="w-full  h-1 bg-[#96CCEC] mt-3 mb-2"></div>
                        </div>
                      </DialogTitle>
                    </DialogHeader>
                    {/* button login google */}
                    <LoginMentee />
                  </DialogContent>
                )}
              </form>
            </Dialog>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section
        className="relative flex justify-between items-center mt-10 px-20 py-24 h-[600px] bg-[#F5FAFA] overflow-hidden"
        style={{
          backgroundImage: `url(${peta})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center right",
          backgroundSize: "contain",
        }}
      >
        {/* Gambar kiri */}
        <div className="w-[620px] h-[600px] bg-[#013B35] rounded-t-[180px] rounded-b-none flex justify-center items-center overflow-hidden">
          <img
            src={img2}
            alt="Gambar"
            className="w-[615px] h-[612px] object-cover"
          />
        </div>

        {/* Teks kanan */}
        <div className="max-w-md z-10">
          <h1 className="text-5xl font-extrabold leading-snug text-[#0A0A0A]">
            EKSPLORASI
            <br />
            MASA DEPANMU
            <br />
            BERSAMA TEMPA
          </h1>
          <p className="text-sm text-gray-700 mt-4 leading-relaxed">
            TEMPA adalah platform pengembangan diri dan edukasi digital yang
            membantu kamu menemukan potensi, belajar dengan cara baru, dan
            mempersiapkan masa depan dengan lebih percaya diri.
          </p>
        </div>
      </section>

      {/* Partner Kampus */}
      <section className="bg-[#013B35] text-white py-16 px-10 text-center">
        <h2 className="text-2xl font-bold mb-2 text-left">Partner Kampus</h2>
        <div className="w-24 h-[2px] bg-white mb-4 text-left"></div>
        <p className="text-gray-300 mb-10 text-left">
          Dari ruang kelas hingga dunia kerja, TEMPA hadir sebagai jembatan
          antara mahasiswa dan kampus untuk menyiapkan generasi siap masa depan.
        </p>

        <div className="relative flex items-center justify-center w-full">
          <button
            onClick={prevSlide}
            className="absolute left-0 bg-white/20 hover:bg-white/40 rounded-full p-2 transition z-10"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="overflow-hidden w-[80%] max-w-5xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {kampusList.map((kampus) => (
                <div key={kampus.id} className="min-w-full flex justify-center">
                  <div className="bg-white text-black rounded-3xl overflow-hidden w-[1000px] shadow-lg">
                    <img
                      src={kampus.image}
                      alt={kampus.name}
                      className="h-[300px] w-full object-cover"
                    />
                    <div className="p-4 text-left">
                      <h3 className="font-semibold text-base mb-1">
                        {kampus.name}
                      </h3>
                      <div className="flex items-center space-x-1 mb-2 text-[#FFD700]">
                        {[...Array(kampus.rating)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            fill="#FFD700"
                            stroke="none"
                          />
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {kampus.jurusan.slice(0, 4).map((jrs, i) => (
                          <span
                            key={i}
                            className="bg-gray-100 text-gray-800 px-2 py-[2px] text-xs rounded-full"
                          >
                            {jrs}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500">{kampus.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={nextSlide}
            className="absolute right-0 bg-white/20 hover:bg-white/40 rounded-full p-2 transition z-10"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="flex justify-center items-center mt-8 space-x-2">
          {kampusList.map((_, i) => (
            <span
              key={i}
              className={`w-3 h-3 rounded-full transition-all ${
                i === currentIndex ? "bg-white scale-110" : "bg-white/40"
              }`}
            ></span>
          ))}
        </div>
      </section>

      {/* Jurusan Populer */}
      <section className="bg-white py-16 text-center" id="jurusan">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-2 text-gray-900">
            Jurusan Populer
          </h2>
          <div className="w-24 h-1 bg-[#013B35] mx-auto mb-4"></div>
          <p className="text-gray-600 mb-10">
            Jelajahi jurusan-jurusan populer pilihan mahasiswa dan temukan
            bidang terbaik untuk masa depanmu bersama TEMPA.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-items-center">
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
                className="bg-[#013B35] text-white w-36 h-36 rounded-xl flex flex-col items-center justify-center gap-3 shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <div className="text-[#9BD6C3]">{item.icon}</div>
                <span className="text-sm font-medium">{item.nama}</span>
              </div>
            ))}
          </div>

          <Link
            to="/JurusanPage"
            className="mt-10 inline-block text-sm font-semibold border-b-2 border-black hover:text-[#013B35] hover:border-[#013B35] transition"
          >
            Lihat Selengkapnya
          </Link>
        </div>
      </section>

      {/* Bertumbuh Bersama TEMPA */}
      <section className="bg-[#F8FCF9] py-20 px-20 text-center">
        <h2 className="text-4xl font-extrabold text-[#013B35] mb-6">
          Bertumbuh Bersama TEMPA
        </h2>
        <p className="text-base text-gray-700 max-w-3xl mx-auto mb-14 leading-relaxed">
          TEMPA telah dipercaya ribuan pengguna dan berkolaborasi dengan
          berbagai kampus, menghadirkan mentor berpengalaman serta
          program-program inovatif yang dirancang untuk membentuk masa depan
          yang lebih cerah bersama.
        </p>

        <div className="flex justify-center items-center gap-14">
          {stats.map((item, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center">
                <h3 className="text-3xl font-bold text-[#013B35]">
                  {counts[i]}+
                </h3>
                <p className="text-lg text-gray-700 mt-2">{item.label}</p>
              </div>
              {i !== stats.length - 1 && (
                <div className="w-[2px] h-12 bg-[#013B35]"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Bangun Masa Depan Bersama */}
      <section className="flex justify-between items-center px-10 py-24 bg-[#013B35] text-white relative overflow-hidden">
        <div className="max-w-lg z-10">
          <h1 className="text-4xl font-extrabold leading-snug mb-4">
            BANGUN MASA DEPAN BERSAMA TEMPA
          </h1>
          <p className="text-base text-gray-100 mb-6 leading-relaxed">
            Bersama, kita wujudkan ekosistem pendidikan yang adaptif, inovatif,
            dan berdampak nyata bagi masa depan.
          </p>

          <ul className="space-y-2 mb-8 text-gray-100">
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

          <div className="flex gap-4">
            <Link to="/login-campus">
              <button className="bg-[#B9E6FF] text-[#013B35] font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-[#9edcff] transition">
                Gabung Kampus
              </button>
            </Link>
            <button className="bg-white text-[#013B35] font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition">
              Gabung Perusahaan
            </button>
          </div>
        </div>

        <div className="absolute right-0 top-0 h-full w-[55%] bg-white rounded-l-[50%] overflow-hidden flex justify-center items-center">
          <img
            src={img1}
            alt="Gambar di area putih"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#013B36] text-white py-12 px-8">
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
      </footer>
    </div>
  );
};

export default LandingPage;
