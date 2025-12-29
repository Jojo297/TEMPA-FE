import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LoginMentee from "@/page/loginMentee";
import logo_text from "@/assets/logo-text.png";
import logo2 from "@/assets/logo-text.png";

export const NavbarLandingPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: "Kampus", id: "kampus" },
    { name: "Jurusan", id: "jurusan" },
    { name: "Kerja Sama", id: "kerjasama" },
  ];

  const handleScroll = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-[#013B35] text-white fixed top-0 z-50 shadow-lg w-full transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
              <Link to="/" className="flex items-center gap-2">
                <img
                  src={logo2}
                  alt="Logo TEMPA"
                  className="h-8 w-auto object-contain hover:opacity-90 transition-opacity"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleScroll(link.id)}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 group ${"text-gray-300 hover:text-white"}`}
                  >
                    {link.name}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#96CCEC] transform origin-left transition-transform duration-300 ${"scale-x-0 group-hover:scale-x-100"}`}
                    ></span>
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Login Button */}
            <div className="hidden md:block">
              <Button
                onClick={() => setIsDialogOpen(true)}
                className="bg-[#96CCEC] text-[#013B35] px-6 py-2 rounded-full font-bold hover:bg-[#7ab8d9] transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              >
                Masuk
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                type="button"
                className="bg-[#014d45] inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-[#015f56] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#013B35] focus:ring-white transition-colors"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
          id="mobile-menu"
        >
          <div className="px-4 pt-2 pb-6 space-y-2 bg-[#013B35] border-t border-[#014d45] shadow-inner">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleScroll(link.id)}
                className={`block px-3 py-3 rounded-md text-base font-medium transition-colors ${"text-gray-300 hover:text-white hover:bg-[#014d45] w-full text-left"}`}
              >
                {link.name}
              </button>
            ))}
            <div className="pt-4 mt-2 border-t border-[#014d45]">
              <Button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsDialogOpen(true);
                }}
                className="w-full bg-[#96CCEC] text-[#013B35] font-bold hover:bg-[#7ab8d9] py-3"
              >
                Masuk
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Login Dialog (Global) */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-[#013B35]">
          <DialogHeader className="mb-4 ">
            <DialogTitle className=" text-white ">
              <div className="flex justify-center items-center ">
                <div className="text-3xl">Masuk </div>
                <img src={logo_text} alt="" className="w-28" srcset="" />
              </div>
              <div className="px-16">
                <div className="w-full  h-1 bg-[#96CCEC] mt-3 mb-2"></div>
              </div>
            </DialogTitle>
          </DialogHeader>
          {/* button login google */}
          <LoginMentee />
        </DialogContent>
      </Dialog>
    </>
  );
};
