import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import notfound from "../assets/robot-error.png"; // 🖼️ pastikan kamu punya file ini

const PanduanPage = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAccordionClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const guideSections = [
    {
      title: "Mengikuti Program",
      content: (
        <>
          <p className="mb-4 text-[#222] text-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <ol className="list-decimal ml-6 mt-3 text-[#222] text-sm space-y-1">
            <li>Lorem ipsum dolor sit amet...</li>
            <li>Lorem ipsum dolor sit amet...</li>
            <li>Lorem ipsum dolor sit amet...</li>
            <li>Lorem ipsum dolor sit amet...</li>
          </ol>
        </>
      ),
    },
    {
      title: "Tes Minat dan Bakat",
      content: (
        <p className="text-[#222] text-sm leading-relaxed">
          Panduan lengkap untuk melakukan Tes Minat dan Bakat akan dimuat
          segera.
        </p>
      ),
    },
    {
      title: "Tes Jurusan",
      content: (
        <p className="text-[#222] text-sm leading-relaxed">
          Informasi mengenai Tes Jurusan dan langkah-langkahnya dapat ditemukan
          di sini.
        </p>
      ),
    },
  ];

  // 🔍 Filter realtime berdasarkan input
  const displayedGuides = guideSections.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const AccordionItem = ({ title, children, isOpen, onClick }) => (
    <div className="mb-5 border border-[#013B35] rounded-sm">
      <button
        onClick={onClick}
        className="w-full text-left bg-[#013B35] text-white px-5 py-3 text-[15px] font-semibold hover:bg-[#015047] transition">
        {title}
      </button>
      <div
        className={`bg-white transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[1000px] p-5" : "max-h-0 p-0"
        }`}>
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* ===== Header ===== */}
      <section className="text-center py-12">
        <h1 className="text-3xl font-bold text-black">PANDUAN</h1>
        <p className="text-gray-700 mt-2 text-sm">
          Temukan berbagai panduan untuk mendukung eksplorasimu
        </p>
      </section>

      {/* ===== Kotak Pencarian ===== */}
      <div className="flex justify-center items-center mb-10">
        <div className="bg-[#013B35] w-[80%] md:w-[80%] rounded-lg flex flex-col sm:flex-row items-center px-4 py-3 space-y-3 sm:space-y-0 sm:space-x-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // realtime
            placeholder="Cari Kategori Panduan..."
            className="flex-1 bg-white text-gray-700 text-sm px-4 py-2 rounded-md outline-none border-none placeholder-gray-500"
          />
          <button
            onClick={() => setSearchTerm(searchTerm.trim())}
            className="bg-[#96CCEC] text-black font-semibold px-6 py-2 rounded-md hover:opacity-90 transition">
            Cari
          </button>
        </div>
      </div>

      {/* ===== Konten Panduan ===== */}
      <main className="w-[90%] mx-auto pb-16">
        <h2 className="text-xl font-semibold mb-5 text-black">Panduan Siswa</h2>

        {displayedGuides.length > 0 ? (
          displayedGuides.map((item, index) => (
            <AccordionItem
              key={index}
              title={item.title}
              isOpen={openIndex === index}
              onClick={() => handleAccordionClick(index)}>
              {item.content}
            </AccordionItem>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center mt-10">
            <img
              src={notfound}
              alt="Tidak ditemukan"
              className="w-48 h-48 object-contain mb-5 opacity-90"
            />
            <p className="text-center text-gray-500 text-sm">
              Tidak ada panduan yang cocok dengan pencarianmu.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default PanduanPage;
