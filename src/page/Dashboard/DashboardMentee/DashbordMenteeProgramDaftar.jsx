import React from "react";
import SidebarWithNavbar from "@/components/SidebarWithNavbar";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardMenteeProgramDaftar = () => {
  const navigate = useNavigate();

  return (
    <SidebarWithNavbar>
      <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
        <main className="flex-1  overflow-y-auto ">
          {/* Header */}
          <div className="bg-[#0E3B3D] text-white rounded-xl p-10 mb-10 text-center shadow-md relative">
            <button
              onClick={() => navigate()}
              className="absolute left-6 top-6 text-white hover:text-gray-300 transition">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-semibold">Daftar Program</h1>
            <p className="text-gray-200 mt-2 max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          {/* Form Pendaftaran */}
          <div className="bg-[#0E3B3D] text-white rounded-xl p-8  mx-auto  shadow-lg">
            <form className="space-y-6">
              {/* Nama Lengkap */}
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  className="w-full p-3 rounded-md bg-transparent border border-[#B4D0E7] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B4D0E7]"
                />
              </div>

              {/* Jenis Kelamin */}
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Jenis Kelamin
                </label>
                <input
                  type="text"
                  placeholder="Masukkan jenis kelamin"
                  className="w-full p-3 rounded-md bg-transparent border border-[#B4D0E7] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B4D0E7]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 text-sm font-medium">Email</label>
                <input
                  type="email"
                  placeholder="Masukkan email aktif"
                  className="w-full p-3 rounded-md bg-transparent border border-[#B4D0E7] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B4D0E7]"
                />
              </div>

              {/* Nomor Handphone */}
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Nomor Handphone
                </label>
                <input
                  type="tel"
                  placeholder="Masukkan nomor handphone"
                  className="w-full p-3 rounded-md bg-transparent border border-[#B4D0E7] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B4D0E7]"
                />
              </div>

              {/* Alamat */}
              <div>
                <label className="block mb-2 text-sm font-medium">Alamat</label>
                <input
                  type="text"
                  placeholder="Masukkan alamat lengkap"
                  className="w-full p-3 rounded-md bg-transparent border border-[#B4D0E7] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B4D0E7]"
                />
              </div>

              {/* Tombol Daftar */}
              <button
                type="submit"
                className="w-full bg-[#B4D0E7] text-[#0E3B3D] py-3 rounded-md font-semibold hover:bg-[#A3C5E0] transition">
                Daftar
              </button>
            </form>
          </div>
        </main>
      </div>
    </SidebarWithNavbar>
  );
};

export default DashboardMenteeProgramDaftar;
