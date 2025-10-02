import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Icon yang tidak terpakai dihapus
import { MapPin } from 'lucide-react';

export default function LandingPage() {

const DARK_GREEN = 'bg-[#10403D]';
const LIGHT_BLUE_TEXT = 'text-[#5BC0EB]';
const LIGHT_BLUE_BG = 'bg-[#5BC0EB]';
const HOVER_GREEN = 'hover:bg-[#0c312e]';

// Data Kampus
const mockCourses = [
    { 
        id: 'uib', 
        imageUrl: "https://placehold.co/100x100/A00000/ffffff?text=UIB", 
        title: "Universitas Internasional Batam", 
        subtitle: "Kampus Terbaik Sumatera",
        color: 'bg-red-800',
        tagline: "Inovasi Global, Kontribusi Lokal",
        location: "Batam, Kepulauan Riau",
        established: 2000,
        description: "Universitas Internasional Batam (UIB) adalah salah satu institusi pendidikan tinggi swasta terkemuka di wilayah Sumatera, dengan fokus kuat pada teknologi, bisnis, dan hukum. UIB dikenal karena program studi yang relevan dengan industri global dan kemitraannya yang luas.",
        programs: ["Sistem Informasi", "Manajemen", "Hukum", "Arsitektur"],
    },
    { 
        id: 'ugm', 
        imageUrl: "https://placehold.co/100x100/228B22/ffffff?text=UGM", 
        title: "Universitas Gadjah Mada", 
        subtitle: "PTN Unggulan",
        color: 'bg-green-700',
        tagline: "Pusat Ilmu Pengetahuan Berbudaya",
        location: "Yogyakarta",
        established: 1949,
        description: "UGM adalah universitas negeri tertua di Indonesia. Reputasinya mencakup semua bidang keilmuan, dari ilmu sosial hingga kedokteran dan teknik.",
        programs: ["Kedokteran", "Teknik Sipil", "Ekonomi", "Fisipol"],
    },
    { 
        id: 'itb', 
        imageUrl: "https://placehold.co/100x100/00008B/ffffff?text=ITB", 
        title: "Institut Teknologi Bandung", 
        subtitle: "Teknologi & Sains",
        color: 'bg-blue-800',
        tagline: "Teknologi untuk Kemajuan Bangsa",
        location: "Bandung, Jawa Barat",
        established: 1920,
        description: "ITB adalah pusat keunggulan di bidang sains, teknik, dan seni rupa. Institusi ini berperan penting dalam pengembangan teknologi dan inovasi nasional.",
        programs: ["Teknik Elektro", "Desain Produk", "Matematika", "Fisika"],
    },
    { 
        id: 'ui', 
        imageUrl: "https://placehold.co/100x100/FFFF00/000000?text=UI", 
        title: "Universitas Indonesia", 
        subtitle: "Humaniora & Sosial",
        color: 'bg-yellow-400',
        tagline: "Harmoni Alam dan Ilmu",
        location: "Depok, Jawa Barat",
        established: 1950,
        description: "Universitas Indonesia (UI) adalah salah satu universitas riset terbaik di Asia. Dikenal dengan lingkungannya yang hijau dan fasilitas akademik yang komprehensif.",
        programs: ["Ilmu Komputer", "Akuntansi", "Psikologi", "Komunikasi"],
    },
];
  
      // Data Simulasi untuk Carousel Gambar di Hero Section
      const heroImages = [
          { url: "https://placehold.co/1200x300/10403D/ffffff?text=FOTO+KAMPUS+1", alt: "Gedung Kampus Utama" },
          { url: "https://placehold.co/1200x300/5BC0EB/10403D?text=FOTO+LABORATORIUM", alt: "Aktivitas Laboratorium" },
          { url: "https://placehold.co/1200x300/0c312e/ffffff?text=FOTO+PERPUSTAKAAN", alt: "Suasana Perpustakaan" },
      ];
      
      // State dan Logika Carousel Gambar Hero
      const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
      const nextImage = () => {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
      };
  
      const prevImage = () => {
          setCurrentImageIndex((prevIndex) => (prevIndex - 1 + heroImages.length) % heroImages.length);
      };
  
      // Component Carousel Gambar Hero
      const HeroImageCarousel = () => (
          <div className="relative w-full h-48 mb-8 rounded-xl overflow-hidden shadow-lg border border-gray-200">
              {/* Kontainer Slide */}
              <div 
                  className="flex h-full transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
              >
                  {heroImages.map((image, index) => (
                      <div key={index} className="w-full shrink-0">
                          <img 
                              src={image.url} 
                              alt={image.alt} 
                              className="w-full h-full object-cover" 
                              onError={(e) => {
                                  e.target.onerror = null; 
                                  e.target.src = `https://placehold.co/1200x300/5BC0EB/10403D?text=${image.alt.replace(/\s/g, '+')}`;
                              }}
                          />
                      </div>
                  ))}
              </div>
  
              {/* Tombol Navigasi Kiri */}
              <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full transition z-10"
              >
                  <ChevronLeft className="w-5 h-5" />
              </button>
  
              {/* Tombol Navigasi Kanan */}
              <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full transition z-10"
              >
                  <ChevronRight className="w-5 h-5" />
              </button>
  
              {/* Dot Indicators */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                  {heroImages.map((_, index) => (
                      <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors duration-300 ${index === currentImageIndex ? LIGHT_BLUE_BG : 'bg-white opacity-50'}`}
                          aria-label={`Go to image ${index + 1}`}
                      />
                  ))}
              </div>
          </div>
      );
      return (
        <div className="min-h-screen bg-gray-50 font-sans">
            
            {/* 1. Header Navigation (Gaya Minimalis) */}
            <header className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-white shadow-sm border-b border-gray-100">
                <div className="flex items-center space-x-6">
                    <div className={`text-xl font-extrabold ${LIGHT_BLUE_TEXT}`}>
                        TEMPA
                    </div>
                    <div className="hidden sm:flex items-center space-x-4 text-sm text-gray-600">
                        <Link to="#" className="hover:text-[#10403D]">Fitur</Link>
                        <Link to="#" className="hover:text-[#10403D]">Dukungan</Link>
                        <Link to="kampus-unggulan" className="hover:text-[#10403D]">Kampus</Link>
                    </div>
                </div>
                
                {/* Tombol Login/Register */}
                <div className="flex items-center space-x-3">
                    <Link 
                        to="/login-campus" 
                        className="text-sm font-semibold text-gray-700 hover:text-[#5BC0EB] transition duration-200 hidden sm:inline"
                    >
                        Masuk
                    </Link>
                    <Link 
                        to="/login-campus" 
                        className={`flex items-center px-4 py-2 text-sm font-semibold text-white rounded-lg ${DARK_GREEN} ${HOVER_GREEN} transition duration-300 shadow-md`}
                    >
                        Daftar Gratis
                    </Link>
                </div>
            </header>

            {/* 2. Main Content Wrapper */}
            <main className="pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* 3. Banner & Hero Section (DENGAN CAROUSEL GAMBAR) */}
                    <div className="text-center py-16 bg-white rounded-xl shadow-lg p-6">
                        
                        {/* Panggil Komponen Carousel Gambar Hero */}
                        <HeroImageCarousel />
                        
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                            Tempat Eksplorasi Masa depan dan Persiapan Arah
                        </h1>
                        <p className="text-lg text-gray-500 max-w-3xl mx-auto">
                            TEMPA merupakan platform rekomendasi kampus dan jurusan berbasis web yang dirancang untuk membantu siswa SMA/SMK/MA dalam menentukan arah pendidikan tinggi sesuai dengan minat, bakat, serta preferensi pribadi. Sistem ini menghadirkan solusi inovatif dengan menggabungkan fitur rekomendasi otomatis dan pengalaman belajar langsung melalui kuliah online maupun onsite. 
                        </p>
                    </div>
                    
                    {/* Horizontal Line Pemisah */}
                    <hr className="my-10 border-gray-200" />


                    {/* 4. Kampus Unggulan Section (GRID STATIS) */}
                    <section className="pb-20 relative">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Kampus Unggulan
                        </h2>
                        
                        <p className="text-md text-gray-600 mb-8 max-w-4xl">
                            Temukan universitas dan institusi pendidikan terbaik yang berkolaborasi dengan TEMPA.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {mockCourses.map((item, index) => (
                                <Link
                                    key={index} 
                                    to={`/kampus/${item.id}`} // LINK DINAMIS KE DETAIL KAMPUS
                                    className="bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition duration-300 overflow-hidden border border-gray-100 block group"
                                >
                                    {/* Header Warna Kursus */}
                                    <div className={`h-24 ${item.color} flex items-center justify-center`}>
                                        {/* Logo Kampus */}
                                        <img 
                                            src={item.imageUrl} 
                                            alt={`Logo ${item.title}`} 
                                            className="w-16 h-16 object-contain bg-white rounded-full p-2"
                                            onError={(e) => {
                                                e.target.onerror = null; 
                                                e.target.src = `https://placehold.co/64x64/${item.color.substring(3)}/ffffff?text=L`;
                                            }}
                                        />
                                    </div>
                                    
                                    <div className="p-4">
                                        <p className="text-xs font-semibold uppercase text-gray-500 mb-1">
                                            {item.subtitle}
                                        </p>
                                        <h3 className={`text-lg font-bold mb-3 group-hover:${LIGHT_BLUE_TEXT} transition duration-300`}>
                                            {item.title}
                                        </h3>
                                        <div className="flex items-center text-sm text-gray-500 mt-2">
                                            <MapPin className="w-4 h-4 mr-1" />
                                            <span>{item.location}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                    </section>
                </div>
            </main>
            
            {/* 5. Footer */}
            <footer className={`p-8 mt-12 ${DARK_GREEN} text-white text-center`}>
                <p className="text-sm">&copy; {new Date().getFullYear()} TEMPA. All rights reserved.</p>
            </footer>
        </div>
    );
};
  