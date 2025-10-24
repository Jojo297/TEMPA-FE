import React from "react";
import Footer from "@/components/Footer";
import { Search } from "lucide-react";
import { NavbarLandingPage } from "./NavbarLandingPage";

const PanduanPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <NavbarLandingPage />

      {/* Header Section */}
      <div className="w-full bg-[#E7F3F1] text-center py-10">
        <h1 className="text-3xl font-semibold text-[#013B35] mb-3">PANDUAN</h1>
        <p className="text-gray-600">
          Temukan berbagai panduan untuk mendukung eksplorasimu
        </p>

        {/* Search Bar */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center bg-white border border-gray-300 rounded-full overflow-hidden w-[350px] sm:w-[450px]">
            <input
              type="text"
              placeholder="Pilih kategori Panduan"
              className="flex-grow px-4 py-2 text-sm outline-none"
            />
            <button className="bg-[#013B35] text-white px-5 py-2 flex items-center gap-2 hover:bg-[#025E54] transition">
              <Search size={18} />
              <span className="text-sm">Cari</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-grow container mx-auto px-6 py-12">
        {/* Panduan Siswa */}
        <h2 className="text-xl font-semibold text-[#013B35] mb-6">
          Panduan Siswa
        </h2>

        {/* Mengikuti Program */}
        <div className="border-2 border-[#013B35] rounded-lg mb-10">
          <div className="bg-[#013B35] text-white px-4 py-3 rounded-t-md font-medium">
            Mengikuti Program
          </div>
          <div className="p-5 text-gray-700 leading-relaxed text-justify">
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </li>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </li>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </li>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </li>
            </ol>
          </div>
        </div>

        {/* Tes Minat dan Bakat */}
        <div className="border-2 border-[#013B35] rounded-lg mb-10">
          <div className="bg-[#013B35] text-white px-4 py-3 rounded-t-md font-medium">
            Tes Minat dan Bakat
          </div>
          <div className="p-5 text-gray-700 leading-relaxed">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>

        {/* Tes Jurusan */}
        <div className="border-2 border-[#013B35] rounded-lg mb-10">
          <div className="bg-[#013B35] text-white px-4 py-3 rounded-t-md font-medium">
            Tes Jurusan
          </div>
          <div className="p-5 text-gray-700 leading-relaxed">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PanduanPage;
