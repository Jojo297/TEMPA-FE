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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/logo-text.png";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";

const SidebarCampusVerivication = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const token = localStorage.getItem("userJwt");
  const decode = jwtDecode(token);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
      name: "BERANDA",
      icon: <LayoutGrid size={18} />,
      path: "/campus-verification/welcome",
      disable: false,
    },
    {
      name: "DESKRIPSI",
      icon: <Notebook size={18} />,
      path: "",
      disable: true,
    },
    {
      name: "PROGRAM",
      icon: <ListChecks size={18} />,
      path: "",
      disable: true,
    },

    { separator: true },
    {
      name: "BERLANGGANAN",
      icon: <CreditCard size={18} />,
      path: "",
      disable: true,
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
                <DropdownMenuItem>
                  {/* <IconUserCircle /> */}
                  <User />
                  Profile
                </DropdownMenuItem>

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
      <div
        className={`fixed top-16 left-0 h-full bg-[#013B36] text-white w-64 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40`}
      >
        <ul className="flex flex-col mt-4 w-full flex-1">
          {menu.map((item, index) =>
            item.separator ? (
              <hr
                key={`sep-${index}`}
                className="my-3 mx-auto w-[70%] border-t border-white/50"
              />
            ) : (
              <li key={index}>
                {/* check if menu is disabele */}
                {item.disable ? (
                  <div
                    className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all 
            text-white/40 cursor-not-allowed`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                ) : (
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
                )}
              </li>
            )
          )}

          {/* Alert Logout */}
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                  Batal
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleLogout}
                  className="bg-[#B4D0E7] text-primary hover:bg-[#B4D0E7] transition hover:opacity-70"
                >
                  Iya, Saya Yakin
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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

        <div
          className={`${isOpen ? "ml-64" : "ml-0"} transition-all duration-300`}
        >
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default SidebarCampusVerivication;
