import React, { useState } from "react";
import {
  LayoutGrid,
  GraduationCap,
  Building2,
  Share2,
  FileQuestion,
  BookOpen,
  Star,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo-text.png";
import Footer from "@/components/Footer";

const SidebarWithNavbar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("userJwt");
  };

  const menuItems = [
    {
      name: "BERANDA",
      icon: <LayoutGrid size={18} />,
      path: "/dashboard-mentee",
    },
    {
      name: "PROGRAM",
      icon: <GraduationCap size={18} />,
      path: "/dashboard-mentee/program",
    },
    {
      name: "KAMPUS",
      icon: <Building2 size={18} />,
      path: "/dashboard-mentee/kampus",
    },
    {
      name: "JURUSAN",
      icon: <Share2 size={18} />,
      path: "/dashboard-mentee/jurusan",
    },

    { separator: true },
    {
      name: "TES JURUSAN",
      icon: <FileQuestion size={18} />,
      path: "/dashboard-mentee/test-jurusan",
    },
    { name: "MATERI", icon: <BookOpen size={18} />, path: "/materi" },
    {
      name: "PENILAIAN",
      icon: <Star size={18} />,
      path: "/dashboard-mentee/Penilaian",
    },
    {
      name: "KELUAR",
      icon: <LogOut size={18} />,
      action: handleLogout,
      path: "/",
    },
  ];

  return (
    <div className="flex flex-col h-screen">
      {/* NAVBAR */}
      <div className="flex items-center justify-between bg-[#013B36] text-white h-16 px-6 fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <img src={logo} alt="Logo TEMPA" className="h-6 object-contain" />
        </div>

        {/* Profil / Avatar */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold">P</span>
          </div>
        </div>
      </div>

      {/* SIDEBAR */}
      <div
        className={`fixed top-16 left-0 h-full bg-[#013B36] text-white w-64 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40`}
      >
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
                  onClick={item.action}
                  className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all ${
                    location.pathname === item.path
                      ? "bg-white text-[#003C3C] border-r-4 border-[#32A852] font-semibold"
                      : "hover:bg-white/10 text-white/80"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            )
          )}
        </ul>
      </div>

      {/* MAIN CONTENT + FOOTER */}
      <div className="flex flex-col pt-16 min-h-screen bg-[#F8FAFB]">
        <main
          className={`flex-1 transition-all duration-300 ${
            isOpen ? "ml-64" : "ml-0"
          } p-6`}
        >
          {children}
        </main>

        {/* ✅ Ganti footer lama dengan komponen Footer */}
        <div
          className={`${isOpen ? "ml-64" : "ml-0"} transition-all duration-300`}
        >
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default SidebarWithNavbar;
