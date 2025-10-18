import React from "react";
import {
  LayoutGrid,
  GraduationCap,
  Building2,
  Share2,
  FileQuestion,
  BookOpen,
  Star,
  LogOut,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo-text.png";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "BERANDA", icon: <LayoutGrid size={18} />, path: "/" },
    { name: "PROGRAM", icon: <GraduationCap size={18} />, path: "/program" },
    { name: "KAMPUS", icon: <Building2 size={18} />, path: "/kampus" },
    { name: "JURUSAN", icon: <Share2 size={18} />, path: "/jurusan" },
    { separator: true },
    {
      name: "TES JURUSAN",
      icon: <FileQuestion size={18} />,
      path: "/tes-jurusan",
    },
    { name: "MATERI", icon: <BookOpen size={18} />, path: "/materi" },
    { name: "PENILAIAN", icon: <Star size={18} />, path: "/penilaian" },
    { name: "KELUAR", icon: <LogOut size={18} />, path: "/logout" },
  ];

  return (
    <div className="bg-[#003C3C] text-white w-64 h-screen flex flex-col fixed">
      <div className="flex items-center justify-center px-6 py-4 h-16 border-b border-white/10">
        <img
          src={logo}
          alt="Logo TEMPA"
          className="w-32 object-contain" // ubah ukuran sesuai kebutuhan
        />
      </div>

      {/* Menu */}
      <ul className="flex flex-col mt-4 w-full flex-1">
        {menuItems.map((item, index) =>
          item.separator ? (
            <hr
              key={`sep-${index}`}
              className="my-3 mx-auto w-[70%] border-t border-white/50"
            />
          ) : (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all ${
                  location.pathname === item.path
                    ? "bg-white text-[#003C3C] border-r-4 border-[#32A852] font-semibold"
                    : "hover:bg-white/10 text-white/80"
                }`}>
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
