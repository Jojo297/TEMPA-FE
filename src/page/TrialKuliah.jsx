import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import LoginMentee from "@/page/loginMentee";
import logo_text from "@/assets/logo-text.png";
import logo2 from "@/assets/logo-text.png";
import {
  Calendar,
  Home,
  Users,
  Map,
  Search,
  Filter,
  ChevronRight,
} from "lucide-react";

const filteredPrograms = [
  {
    id: "p1",
    program_name: "Web Development Bootcamp",
    major_name: "Informatika",
    campus_name: "Politeknik Negeri Batam",
    type_sesi: "Online",
    capacity: 50,
    image_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    description:
      "Belajar fundamental React JS dan Node JS dalam sesi trial intensif selama 3 hari.",
    start_regis_date: "2026-05-01",
    end_regis_date: "2026-05-20",
    start_program_date: "2026-06-01",
    end_program_date: "2026-06-03",
  },
  {
    id: "p2",
    program_name: "Creative Design Workshop",
    major_name: "DKV",
    campus_name: "Universitas Internasional Batam",
    type_sesi: "Offline",
    capacity: 20,
    image_url: "https://images.unsplash.com/photo-1558655146-d09347e92766",
    description:
      "Eksplorasi dunia desain grafis dan UI/UX langsung dari ahlinya di studio kampus.",
    start_regis_date: "2026-04-15",
    end_regis_date: "2026-05-15",
    start_program_date: "2026-05-25",
    end_program_date: "2026-05-25",
  },
  {
    id: "p3",
    program_name: "Business Strategy 101",
    major_name: "Akuntansi",
    campus_name: "ITEBA",
    type_sesi: "Hybrid",
    capacity: 100,
    image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    description:
      "Pahami cara menganalisis laporan keuangan perusahaan startup dengan metode terkini.",
    start_regis_date: "2026-05-10",
    end_regis_date: "2026-06-10",
    start_program_date: "2026-06-15",
    end_program_date: "2026-06-17",
  },
];

export default function TrialKuliah() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  // badge for status program
  const getBadgeClass = (start_date, end_date) => {
    const today = new Date();
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    if (endDate.getTime() < today.getTime()) {
      return {
        text: "Tutup",
        bgColor: "bg-red-100",
        textColor: "text-red-800",
      };
    } else if (startDate.getTime() > today.getTime()) {
      return {
        text: "Segera Buka",
        bgColor: "bg-blue-100",
        textColor: "text-blue-800",
      };
    } else {
      return {
        text: "Buka",
        bgColor: "bg-green-200",
        textColor: "text-green-800",
      };
    }
  };

  // get location if type program onsite
  const getLocation = (status, item) => {
    switch (status) {
      case "online":
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
  return (
    <main className="min-h-screen bg-[#FDFDFD]">
      <Helmet>
        <title>
          Katalog Trial Kuliah | TEMPA - Eksplorasi Jurusan Impianmu
        </title>
        <meta
          name="description"
          content="Temukan berbagai pilihan program trial kuliah dari kampus ternama. Coba simulasi kuliah sebelum menentukan jurusan masa depanmu."
        />
        <meta
          property="og:title"
          content="Katalog Program Trial Kuliah - TEMPA"
        />
        <meta
          property="og:description"
          content="Coba simulasi kuliah secara gratis atau berbayar di berbagai jurusan populer."
        />
        <link rel="canonical" href="https://tempa.ac.id/trial-kuliah" />
      </Helmet>

      {/* Hero / Header Section */}
      <header className="bg-[#013B35] pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-4 text-emerald-300 text-sm font-bold uppercase tracking-widest"
          >
            <Link to="/">
              <span>Eksplorasi Masa Depan</span>
            </Link>
            <ChevronRight size={16} />
            <span className="text-white">Katalog Program</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Pilih <span className="text-emerald-400">Trial Kuliah</span> Kamu
          </h1>
          <p className="text-emerald-50/80 max-w-2xl mx-auto text-lg">
            Temukan berbagai pilihan program trial kuliah dari kampus ternama.
            Coba simulasi kuliah sebelum menentukan jurusan masa depanmu.
          </p>
        </div>
      </header>

      {/* Filter & Search Bar - UX Touch */}
      <section className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Cari jurusan atau kampus..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#013B35]/20 focus:border-[#013B35] transition-all"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#013B35] text-white rounded-lg text-sm font-semibold">
              <Filter size={16} /> Filter
            </button>
            {["Semua", "Informatika", "DKV", "Bisnis", "Hukum"].map((cat) => (
              <button
                key={cat}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Catalog Content */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          className="flex flex-col gap-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
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
                {/* Completion Status */}
                {(() => {
                  // get badge status
                  const statusData = getBadgeClass(
                    item.start_regis_date,
                    item.end_regis_date,
                  );
                  return (
                    <div
                      className={`absolute top-4 z-10 px-3 py-1 rounded-full text-xs sm:text-sm font-medium mt-2 sm:mt-0 ${statusData.bgColor} ${statusData.textColor}`}
                    >
                      {statusData.text}
                    </div>
                  );
                })()}
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
                    <div className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm font-medium mt-2 sm:mt-0">
                      {item.type_sesi}
                    </div>
                  </div>

                  {/* description */}
                  <p className="text-gray-600 mb-4 text-xs sm:text-sm line-clamp-2 break-words">
                    <div
                      className="whitespace-pre-wrap [&_p]:mb-4 [&_a]:text-blue-600 [&_a]:underline"
                      dangerouslySetInnerHTML={{
                        __html: item.description,
                      }}
                    />
                  </p>

                  {/* date and location */}
                  <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-gray-700 text-xs sm:text-sm mb-6 border-t pt-4">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2 text-[#013B35]" />
                      <span>
                        {new Date(item.start_program_date).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                          },
                        )}
                        {" - "}
                        {new Date(item.end_program_date).toLocaleDateString(
                          "id-ID",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
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
                      <span>Tempat: {getLocation(item.type_sesi, item)}</span>
                    </div>
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => setIsDialogOpen(true)}
                    className="w-full py-3 bg-[#013B35] text-white rounded-xl font-bold hover:bg-[#015f53] transition-all duration-300 text-sm sm:text-base"
                  >
                    Lihat Detail dan Daftar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Empty State / Pagination Placeholder */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm">
            Menampilkan {filteredPrograms.length} Program Tersedia
          </p>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="bg-emerald-50 py-20 px-6 text-center">
        <h2 className="text-3xl font-bold text-[#013B35] mb-4">
          Tidak Menemukan Jurusan yang Kamu Cari?
        </h2>
        <p className="text-gray-600 mb-8">
          Bantu kami menambahkan program baru dengan memberikan saran jurusan.
        </p>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="px-8 py-3 border-2 border-[#013B35] text-[#013B35] rounded-full font-bold hover:bg-[#013B35] hover:text-white transition-all"
        >
          Beri Saran Jurusan
        </button>
      </section>

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
    </main>
  );
}
