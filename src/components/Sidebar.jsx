import React from "react";
import {
  Home,
  GraduationCap,
  Building,
  BookOpen,
  FileQuestion,
  ClipboardList,
  LogOut,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Beranda", icon: <Home size={18} />, path: "/" },
    { name: "Program", icon: <GraduationCap size={18} />, path: "/program" },
    { name: "Kampus", icon: <Building size={18} />, path: "/kampus" },
    { name: "Jurusan", icon: <BookOpen size={18} />, path: "/jurusan" },
    {
      name: "Tes Jurusan",
      icon: <FileQuestion size={18} />,
      path: "/tes-jurusan",
    },
    { name: "Materi", icon: <ClipboardList size={18} />, path: "/materi" },
    {
      name: "Penilaian",
      icon: <ClipboardList size={18} />,
      path: "/penilaian",
    },
    { name: "Keluar", icon: <LogOut size={18} />, path: "/logout" },
  ];

  return (
    <div className="bg-[#003C3C] text-white w-64 h-screen p-5 flex flex-col">
      <h1 className="text-2xl font-bold mb-8">TEMPA</h1>
      <ul className="space-y-4">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className={`flex items-center gap-3 p-2 rounded-md hover:bg-[#025858] transition ${
                location.pathname === item.path ? "bg-[#025858]" : ""
              }`}>
              {item.icon}
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
