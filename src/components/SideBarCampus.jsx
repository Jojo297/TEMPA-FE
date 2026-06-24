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
  CreditCardIcon,
  CreditCard,
  User,
  BellIcon,
  LogOutIcon,
  University,
  ChartAreaIcon,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { motion } from "framer-motion";
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
import { jwtDecode } from "jwt-decode";

const Sidebarcampus = ({ children }) => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);
  const navigate = useNavigate();
  const location = useLocation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const token = localStorage.getItem("userJwt");
  const decode = jwtDecode(token);
  // console.log(decode);

  const handleLogout = () => {
    if (!token) {
      navigate("/");
      toast.success("Anda Berhasil Keluar!");
    }

    localStorage.removeItem("userJwt");
    navigate("/");
    toast.success("Anda Berhasil Keluar!");
  };

  const menu = [
    { label: "NAVIGASI UTAMA" },
    {
      name: "BERANDA",
      icon: <LayoutGrid size={18} />,
      path: "/dashboard-campus/beranda",
    },
    {
      name: "MENTOR",
      icon: <Users size={18} />,
      path: "/dashboard-campus/mentor",
    },
    {
      name: "ANALITIK",
      icon: <ChartAreaIcon size={18} />,
      path: "/dashboard-campus/analytics",
    },
    // {
    //   name: "DATA KAMPUS",
    //   icon: <FileEdit size={18} />,
    //   path: "/dashboard-campus/form-data",
    // },
    {
      name: "DESKRIPSI",
      icon: <University size={18} />,
      path: "/dashboard-campus/detailcampus",
    },
    // {
    //   name: "JURUSAN",
    //   icon: <GraduationCap size={18} />,
    //   path: "/dashboard-campus/jurusan",
    // },
    // {
    //   name: "PRESTASI",
    //   icon: <Trophy size={18} />,
    //   path: "/dashboard-campus/prestasi",
    // },
    {
      name: "PROGRAM",
      icon: <ListChecks size={18} />,
      path: "/dashboard-campus/program",
    },

    { label: "Layanan" },
    {
      name: "BERLANGGANAN",
      icon: <CreditCard size={18} />,
      path: "/dashboard-campus/berlangganan", // <-- Ini adalah perubahannya
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
          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="w-8 h-8 bg-white/20 hover:cursor-pointer rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold">
                  {decode.username?.substring(0, 2).toUpperCase()}
                </span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold">
                      {decode.username?.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {decode.username}
                    </span>
                    <span className="text-muted-foreground truncate text-xs">
                      {decode.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {/* <DropdownMenuItem
                  onClick={() => navigate("/dashboard-mentee/profil")}
                >
                  {/* <IconUserCircle /> 
                  <User />
                  Akun
                </DropdownMenuItem> */}

                <DropdownMenuItem>
                  {/* <IconNotification /> */}
                  <BellIcon />
                  Notifikasi
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                {/* <IconLogout /> */}
                <LogOutIcon />
                Keluar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* SIDEBAR */}
      <aside
        className={`fixed top-6 left-0 h-full bg-[#013B36] w-64 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40 flex flex-col shadow-2xl`}
      >
        <div className="flex-1 overflow-y-auto py-8 px-4 scrollbar-hide">
          <ul className="space-y-1">
            {menu.map((item, index) => {
              // Render Label Kategori
              if (item.label) {
                return (
                  <li key={`label-${index}`} className="mt-8 mb-3 px-4">
                    <span className="text-[10px] font-bold text-emerald-100/40 uppercase tracking-[2px]">
                      {item.label}
                    </span>
                  </li>
                );
              }

              const isActive = location.pathname === item.path;

              return (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`group relative flex items-center gap-3 px-4 py-3 text-sm transition-all duration-300 rounded-xl ${
                      isActive
                        ? "bg-white text-[#013B36] shadow-lg shadow-black/10"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {/* Active Indicator bar kecil */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 w-1 h-6 bg-secondary rounded-r-full"
                      />
                    )}

                    <span
                      className={`flex-shrink-0 transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`}
                    >
                      {item.icon}
                    </span>

                    <span
                      className={`tracking-wide ${isActive ? "font-bold" : "font-medium"}`}
                    >
                      {item.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      {/* Dialog Logout Tetap Sama */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {/* ... Content Dialog kamu tetap sama ... */}
        <AlertDialogContent className="bg-white text-slate-900 border-none">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#013B36] font-bold">
              Yakin ingin keluar?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500">
              Anda akan keluar dari sesi Anda saat ini. Anda dapat masuk kembali
              kapan saja.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-none bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-xl">
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              className="bg-red-500 text-white hover:bg-red-600 rounded-xl transition shadow-lg shadow-red-200"
            >
              Iya, Keluar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* MAIN CONTENT */}
      <div className="flex flex-col pt-16 min-h-screen">
        <main
          className={`flex-1 transition-all duration-300 p-2 lg:p-6 ${
            isOpen ? "md:ml-64" : ""
          }`}
        >
          {children}
        </main>

        {/* FOOTER */}
        <div
          className={`transition-all duration-300 ${isOpen ? "md:ml-64" : ""}`}
        >
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Sidebarcampus;
