import { Link } from "react-router-dom";
import { Menu, Bell } from "lucide-react"; // Import ikon yang diperlukan
// Asumsi path logo ini masih diperlukan
import logo2 from "@/assets/logo-text.png"; 

export default function NavbarCampus() {
  return (
    <nav className="bg-[#013B35] text-white px-6 py-4 flex items-center justify-between shadow-md">
      
      {/* KIRI: Ikon Menu & Logo */}
      <div className="flex items-center space-x-4">
        
        {/* Ikon Menu Hamburger */}
        <button className="text-white p-1 hover:text-gray-300">
          {/* Mengganti ikon kotak/garis dengan Menu dari lucide-react */}
          <Menu size={24} /> 
        </button>

        {/* LOGO TEMPA */}
        <Link to="/" className="flex items-center">
          {/*
           * Catatan: Jika logo yang diupload adalah logo teks, 
           * pastikan logo tersebut menggunakan warna yang sesuai (putih/biru muda).
           * Saya menggunakan komponen img seperti sebelumnya.
           */}
          <img
            src={logo2}
            alt="Logo TEMPA"
            // Sesuaikan ukuran agar tidak terlalu besar, seperti di gambar
            className="h-6 w-auto object-contain" 
          />
        </Link>
      </div>

      {/* KANAN: Ikon Notifikasi (Lingkaran) */}
      <div className="flex items-center">
        <button className="relative p-1 hover:text-gray-300">
          <Bell size={24} />
          {/* Indikator Notifikasi (Lingkaran Hitam Kecil seperti di gambar) */}
          <span className="absolute top-1 right-1 w-2 h-2 bg-black rounded-full border-2 border-[#013B35]"></span>
        </button>
      </div>

      {/* MENU NAVIGASI (Kampus, Jurusan, Panduan) dihapus sesuai gambar */}
      
    </nav>
  );
}