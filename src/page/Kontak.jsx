import React from "react";

import Footer from "@/components/Footer";
import { NavbarLandingPage } from "@/components/NavbarLandingPage";
import { MdEmail, MdPhone, MdLocationPin } from "react-icons/md";

const Kontak = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form terkirim!");
  };

  return (
    <>
      <NavbarLandingPage />

      <div className="w-full bg-white px-6 md:px-20 py-14 md:py-20 flex flex-col md:flex-row gap-14">
        {/* KIRI */}
        <div className="md:w-1/3 w-full">
          <h1 className="text-[32px] md:text-[36px] font-bold uppercase tracking-wide text-black mb-3">
            Hubungi Kami
          </h1>
          <p className="text-gray-600 text-sm mb-10 max-w-xs leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <MdEmail className="text-green-700 text-2xl" />
              <span className="text-black text-base">TEMPA@gmail.com</span>
            </div>

            <div className="flex items-center gap-4">
              <MdPhone className="text-green-700 text-2xl" />
              <span className="text-black text-base">+(62) 812 3456 7890</span>
            </div>

            <div className="flex items-center gap-4">
              <MdLocationPin className="text-green-700 text-2xl" />
              <span className="text-black text-base">BATAM</span>
            </div>
          </div>
        </div>

        {/* KANAN FORM */}
        <div className="md:w-2/3 w-full">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* NAMA */}
            <div>
              <label className="block text-sm font-medium text-black">
                Nama*
              </label>
              <input
                type="text"
                required
                placeholder="Masukkan Nama Lengkap Anda"
                className="w-full mt-1 p-3 border border-black rounded-md focus:ring-green-700 focus:border-green-700"
              />
            </div>

            {/* EMAIL & HP */}
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="w-full sm:w-1/2">
                <label className="block text-sm font-medium text-black">
                  Email*
                </label>
                <input
                  type="email"
                  required
                  placeholder="email@example.com"
                  className="w-full mt-1 p-3 border border-black rounded-md focus:ring-green-700 focus:border-green-700"
                />
              </div>

              <div className="w-full sm:w-1/2">
                <label className="block text-sm font-medium text-black">
                  No HP*
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+62"
                  className="w-full mt-1 p-3 border border-black rounded-md focus:ring-green-700 focus:border-green-700"
                />
              </div>
            </div>

            {/* ORGANISASI */}
            <div>
              <label className="block text-sm font-medium text-black">
                Nama Organisasi*
              </label>
              <input
                type="text"
                required
                placeholder="Nama Perusahaan/Institusi"
                className="w-full mt-1 p-3 border border-black rounded-md focus:ring-green-700 focus:border-green-700"
              />
            </div>

            {/* JABATAN */}
            <div>
              <label className="block text-sm font-medium text-black">
                Jabatan*
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: CEO, Manajer, Staf"
                className="w-full mt-1 p-3 border border-black rounded-md focus:ring-green-700 focus:border-green-700"
              />
            </div>

            {/* SEKTOR */}
            <div>
              <label className="block text-sm font-medium text-black">
                Sektor*
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Teknologi, Pendidikan, Kesehatan"
                className="w-full mt-1 p-3 border border-black rounded-md focus:ring-green-700 focus:border-green-700"
              />
            </div>

            {/* SUMBER */}
            <div>
              <label className="block text-sm font-medium text-black">
                Bagaimana anda menemukan kami?
              </label>
              <input
                type="text"
                placeholder="Contoh: Pencarian Google, Media Sosial, Referensi"
                className="w-full mt-1 p-3 border border-black rounded-md focus:ring-green-700 focus:border-green-700"
              />
            </div>

            {/* BANTUAN */}
            <div>
              <label className="block text-sm font-medium text-black">
                Apa yang bisa kami bantu?*
              </label>
              <textarea
                rows="5"
                required
                placeholder="Jelaskan kebutuhan Anda secara detail"
                className="w-full mt-1 p-3 border border-black rounded-md focus:ring-green-700 focus:border-green-700"></textarea>
            </div>

            <button
              type="submit"
              className="w-[200px] mx-auto block bg-[#A4D0F5] hover:bg-[#8fc6f5] text-black text-sm font-semibold py-3 rounded-md transition-all duration-300">
              Kirim
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Kontak;
