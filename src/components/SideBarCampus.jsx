import React, { useState } from "react";
import {
  FileEdit,
  LayoutGrid,
  Notebook,
  GraduationCap,
  ListChecks,
  Trophy,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/logo-text.png";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const Sidebarcampus = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    const token = localStorage.getItem("userJwt");

    if (!token) {
      navigate("/");
      toast.success("Anda Berhasil Keluar!");
    }

    localStorage.removeItem("userJwt");
    navigate("/");
    toast.success("Anda Berhasil Keluar!");
  };

  const menu = [
    {
      name: "DATA KAMPUS",
      icon: <FileEdit size={18} />,
      path: "/dashboard-campus/form-data",
    },
    {
      name: "BERANDA",
      icon: <LayoutGrid size={18} />,
      path: "/dashboard-campus/beranda",
    },
    {
      name: "DESKRIPSI",
      icon: <Notebook size={18} />,
      path: "/dashboard-campus/detailcampus",
    },
    {
      name: "JURUSAN",
      icon: <GraduationCap size={18} />,
      path: "/dashboard-campus/jurusan",
    },
    {
      name: "PRESTASI",
      icon: <Trophy size={18} />,
      path: "/dashboard-campus/prestasi",
    },
    {
      name: "PROGRAM",
      icon: <ListChecks size={18} />,
      path: "/dashboard-campus/program",
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
        } transition-transform duration-300 ease-in-out z-40`}>
        <ul className="flex flex-col mt-4 w-full flex-1">
          {menu.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-6 py-3 transition 
                  ${
                    location.pathname === item.path
                      ? "bg-white text-[#013B35] font-semibold"
                      : "text-white hover:bg-[#014840]"
                  }`}>
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}

          {/* LOGOUT */}
          <li>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Link className="flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all hover:bg-white/10 text-white/80">
                  <LogOut size={18} />
                  <span>KELUAR</span>
                </Link>
              </AlertDialogTrigger>

              <AlertDialogContent className="bg-primary text-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>Yakin ingin keluar?</AlertDialogTitle>
                  <AlertDialogDescription className="text-white">
                    Anda akan keluar dari sesi Anda saat ini. Anda dapat masuk
                    kembali kapan saja dengan alamat email Anda.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="flex justify-end">
                  <AlertDialogCancel className="bg-red-200 text-red-600 hover:bg-red-200 hover:text-red-600 transition hover:opacity-70">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleLogout}
                    className="bg-[#B4D0E7] text-primary hover:bg-[#B4D0E7] transition hover:opacity-70">
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </li>
        </ul>
      </div>

      {/* MAIN CONTENT + FOOTER */}
      <div className="flex flex-col pt-16 min-h-screen">
        <main
          className={`flex-1 transition-all duration-300 ${
            isOpen ? "ml-64" : "ml-0"
          } p-6`}>
          {children}
        </main>

        <div
          className={`${
            isOpen ? "ml-64" : "ml-0"
          } transition-all duration-300`}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Sidebarcampus;
