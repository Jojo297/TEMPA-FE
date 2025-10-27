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
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/logo-text.png";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const SidebarWithNavbar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    const token = localStorage.getItem("userJwt");

    // logout if user Don't have have token
    if (!token) {
      navigate("/");
      toast.success("Anda Berhasil Keluar!");
    }

    localStorage.removeItem("userJwt");
    navigate("/");
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
          <li>
            {/* logout */}

            <AlertDialog>
              <AlertDialogTrigger asChild>
                {/* <Button variant="outline">Show Dialog</Button> */}
                <Link
                  className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all hover:bg-white/10 text-white/80`}
                >
                  <LogOut size={18} />
                  <span>KELUAR</span>
                </Link>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-primary text-secondary">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-center">
                    Apakah Anda Yakin Ingin Keluar?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex justify-center">
                  <AlertDialogCancel className="bg-red-200 text-red-600 hover:bg-red-200 hover:text-red-600 transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
                    Cancel
                  </AlertDialogCancel>
                  <Button
                    onClick={handleLogout}
                    className="bg-secondary text-primary hover:bg-secondary hover:text-primary transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                  >
                    Iya, Saya Yakin
                  </Button>
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
