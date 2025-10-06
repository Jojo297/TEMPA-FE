import React, { useState } from "react";
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

const LandingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const kampusList = [
    {
      id: 1,
      name: "Politeknik Negeri Batam",
      image: "/polibatam.jpg",
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
      name: "Politeknik Negeri Batam",
      image: "/polibatam.jpg",
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
      id: 3,
      name: "Politeknik Negeri Batam",
      image: "/polibatam.jpg",
      location: "Kota Batam",
      jurusan: [
        "Teknik Mesin",
        "Teknik Informatika",
        "Manajemen Bisnis",
        "Teknik Elektro",
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

  return (
    <div className="min-h-screen bg-[#F8FAF8] font-sans">
      {/* Navbar */}
      <nav className="bg-[#013B35] text-white px-10 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img
            src="/logo.png"
            alt="Logo TEMPA"
            className="h-8 w-auto object-contain"
          />
        </div>

        <ul className="flex items-center space-x-10 text-sm font-medium">
          <li>
            <a href="#kampus" className="hover:text-[#00BFA6]">
              Kampus
            </a>
          </li>
          <li>
            <a href="#jurusan" className="hover:text-[#00BFA6]">
              Jurusan
            </a>
          </li>
          <li>
            <a href="#program" className="hover:text-[#00BFA6]">
              Program
            </a>
          </li>
          <li>
            <a href="#masuk" className="hover:text-[#00BFA6]">
              Masuk
            </a>
          </li>
          <li>
            <a
              href="#daftar"
              className="bg-[#96CCEC] text-[#013B35] px-4 py-1.5 rounded-full font-semibold hover:bg-[#00a790] transition">
              Daftar
            </a>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="flex justify-between items-center px-20 py-24">
        <div className="w-[620px] h-[600px] bg-[#013B35] rounded-t-[180px] rounded-b-none"></div>

        <div className="max-w-md">
          <h1 className="text-5xl font-extrabold leading-snug text-[#0A0A0A]">
            EKSPLORASI
            <br />
            MASA DEPANMU
            <br />
            BERSAMA TEMPA
          </h1>
          <p className="text-sm text-gray-700 mt-4 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </section>

      {/* Partner Kampus */}
      <section className="bg-[#013B35] text-white py-16 px-10 text-center">
        <h2 className="text-2xl font-bold mb-2 text-left">Partner Kampus</h2>
        <div className="w-24 h-[2px] bg-white mb-4 text-left"></div>
        <p className="text-gray-300 mb-10 text-left">
          Dari ruang kelas hingga dunia kerja, TEMPA bermitra dengan kampus
          untuk membentuk masa depan.
        </p>

        <div className="flex items-center justify-center space-x-6 overflow-hidden">
          {kampusList.map((kampus, index) => (
            <div
              key={kampus.id}
              className={`transition-all duration-500 ${
                index === currentIndex
                  ? "opacity-100 scale-100"
                  : "opacity-50 scale-95"
              }`}>
              <div className="bg-white text-black rounded-2xl overflow-hidden w-[250px] shadow-lg">
                <img
                  src={kampus.image}
                  alt={kampus.name}
                  className="h-[180px] w-full object-cover"
                />
                <div className="p-4 text-left">
                  <h3 className="font-semibold text-base mb-1">
                    {kampus.name}
                  </h3>
                  <div className="flex items-center space-x-1 mb-2 text-[#FFD700]">
                    {[...Array(kampus.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="#FFD700" stroke="none" />
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {kampus.jurusan.map((jrs, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 text-gray-800 px-2 py-[2px] text-xs rounded-full">
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

        <div className="flex justify-center items-center mt-8 space-x-6">
          <button
            onClick={prevSlide}
            className="bg-white/20 hover:bg-white/40 rounded-full p-2 transition">
            <ChevronLeft size={20} />
          </button>

          <div className="flex space-x-2">
            {kampusList.map((_, i) => (
              <span
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i === currentIndex ? "bg-white" : "bg-white/40"
                }`}></span>
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="bg-white/20 hover:bg-white/40 rounded-full p-2 transition">
            <ChevronRight size={20} />
          </button>
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
              { nama: "Informatika", icon: <Cpu size={36} /> },
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
                className="bg-[#013B35] text-white w-36 h-36 rounded-xl flex flex-col items-center justify-center gap-3 shadow-lg hover:scale-105 transition-transform duration-300">
                <div className="text-[#9BD6C3]">{item.icon}</div>
                <span className="text-sm font-medium">{item.nama}</span>
              </div>
            ))}
          </div>

          <button className="mt-10 text-sm font-semibold border-b-2 border-black hover:text-[#013B35] hover:border-[#013B35] transition">
            Lihat Selengkapnya
          </button>
        </div>
      </section>

      {/* Bertumbuh Bersama TEMPA */}
      <section className="bg-[#F8FCF9] py-20 px-20 text-center">
        <h2 className="text-4xl font-extrabold text-[#013B35] mb-6">
          Bertumbuh Bersama TEMPA
        </h2>
        <p className="text-base text-gray-700 max-w-3xl mx-auto mb-14 leading-relaxed">
          TEMPA telah dipercaya oleh ribuan pengguna, bermitra dengan berbagai
          kampus, menghadirkan mentor berpengalaman, dan menyelenggarakan
          program inovatif untuk mendukung masa depan bersama.
        </p>

        <div className="flex justify-center items-center gap-14">
          <div className="flex flex-col items-center">
            <h3 className="text-3xl font-bold text-[#013B35]">1000+</h3>
            <p className="text-lg text-gray-700 mt-2">Mentee</p>
          </div>

          <div className="w-[2px] h-12 bg-[#013B35]"></div>

          <div className="flex flex-col items-center">
            <h3 className="text-3xl font-bold text-[#013B35]">1000+</h3>
            <p className="text-lg text-gray-700 mt-2">Mentor</p>
          </div>

          <div className="w-[2px] h-12 bg-[#013B35]"></div>

          <div className="flex flex-col items-center">
            <h3 className="text-3xl font-bold text-[#013B35]">1000+</h3>
            <p className="text-lg text-gray-700 mt-2">Kampus</p>
          </div>

          <div className="w-[2px] h-12 bg-[#013B35]"></div>

          <div className="flex flex-col items-center">
            <h3 className="text-3xl font-bold text-[#013B35]">1000+</h3>
            <p className="text-lg text-gray-700 mt-2">Program</p>
          </div>
        </div>
      </section>

      {/* Bangun Masa Depan Bersama */}
      <section className="flex justify-between items-center px-10 py-24 bg-[#013B35] text-white relative overflow-hidden">
        <div className="max-w-lg z-10">
          <h1 className="text-4xl font-extrabold leading-snug mb-4">
            BANGUN MASA DEPAN BERSAMA
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
            <Link to="/LoginCampus">
              <button className="bg-[#B9E6FF] text-[#013B35] font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-[#9edcff] transition">
                Gabung Kampus
              </button>
            </Link>
            <button className="bg-white text-[#013B35] font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition">
              Gabung Perusahaan
            </button>
          </div>
        </div>

        <div className="absolute right-0 top-0 h-full w-[55%] bg-white rounded-l-[50%]"></div>
      </section>

      {/* Footer */}
      <footer className="bg-[#013B36] text-white py-12 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo dan Deskripsi */}
          <div>
            <img
              src="/logo.png"
              alt="Logo TEMPA"
              className="h-12 w-auto object-contain"
            />

            <p className="text-gray-300 text-sm mt-3 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            {/* Icon Sosial Media */}
            <div className="flex space-x-4 mt-5 text-xl">
              <FaFacebookF className="hover:text-[#75B4C6] cursor-pointer" />
              <FaInstagram className="hover:text-[#75B4C6] cursor-pointer" />
              <FaYoutube className="hover:text-[#75B4C6] cursor-pointer" />
              <FaXTwitter className="hover:text-[#75B4C6] cursor-pointer" />
            </div>
          </div>

          {/* Top 4 Kampus */}
          <div>
            <h2 className="font-semibold mb-4 text-lg">TOP 4 KAMPUS</h2>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Politeknik Negeri Batam</li>
              <li>Politeknik Negeri Batam</li>
              <li>Politeknik Negeri Batam</li>
              <li>Politeknik Negeri Batam</li>
            </ul>
          </div>

          {/* Top 4 Perusahaan */}
          <div>
            <h2 className="font-semibold mb-4 text-lg">TOP 4 PERUSAHAAN</h2>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Suit Nusapersada</li>
              <li>Suit Nusapersada</li>
              <li>Suit Nusapersada</li>
              <li>Suit Nusapersada</li>
            </ul>
          </div>

          {/* Bantuan */}
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

        {/* Garis Bawah */}
        <div className="border-t border-gray-600 mt-10 pt-5 text-center text-sm text-gray-400">
          © 2025 TEMPA. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
