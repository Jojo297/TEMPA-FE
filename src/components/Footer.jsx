import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo2 from "../assets/logo2.png"; // pastikan path logo sesuai dengan struktur project kamu

const Footer = () => {
  return (
    <footer className="bg-[#013B36] text-white py-12 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo dan Deskripsi */}
        <div>
          <div className="p-4">
            <img
              src={logo2}
              alt="Logo TEMPA"
              className="h-12 w-auto object-contain"
            />
          </div>

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
  );
};

export default Footer;
