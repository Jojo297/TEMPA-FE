import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import logo2 from "@/assets/logo-text.png";

// ─── Mitra Navbar ────────────────────────────────────────────────────────────
export const MitraNavbar = ({ onDemoClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: "Fitur", href: "#fitur" },
    { name: "Cara Kerja", href: "#cara-kerja" },
    { name: "Testimoni", href: "#testimoni" },
  ];

  const handleNavClick = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="bg-[#013B35] text-white fixed top-0 z-50 shadow-lg w-full transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img
              src={logo2}
              alt="TEMPA"
              className="h-8 w-auto object-contain hover:opacity-90 transition-opacity"
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#96CCEC] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              onClick={() => navigate("/login-campus")}
              className="bg-[#96CCEC] text-[#013B35] px-6 py-2 rounded-full font-bold hover:bg-[#7ab8d9] transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
            >
              Masuk Sebagai Mitra
            </Button>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-200 hover:text-white hover:bg-[#015f56] focus:outline-none transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2 bg-[#013B35] border-t border-[#014d45] shadow-inner">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.href)}
              className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-[#014d45] transition-colors"
            >
              {link.name}
            </button>
          ))}
          <Link
            to="/"
            className="block px-3 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-[#014d45] rounded-md transition-colors"
          >
            Untuk Siswa →
          </Link>
          <div className="pt-4 mt-2 border-t border-[#014d45]">
            <Button
              onClick={() => {
                setIsOpen(false);
                onDemoClick();
              }}
              className="w-full bg-[#96CCEC] text-[#013B35] font-bold hover:bg-[#7ab8d9] py-3"
            >
              Jadwalkan Demo
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
