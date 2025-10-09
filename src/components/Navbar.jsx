import React from "react";
import { Link } from "react-router-dom";
import logo2 from "@/assets/logo-text.png";

const Navbar = () => {
  return (
    <nav className="bg-[#013B35] text-white px-10 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Link to="/">
          <img
            src={logo2}
            alt="Logo TEMPA"
            className="h-8 w-auto object-contain"
          />
        </Link>
      </div>

      {/* Menu */}
      <ul className="flex items-center space-x-10 text-sm font-medium">
        <li>
          <Link to="/CampusPage" className="hover:text-[#00BFA6]">
            Kampus
          </Link>
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
  );
};

export default Navbar;
