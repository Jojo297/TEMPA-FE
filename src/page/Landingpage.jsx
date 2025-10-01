import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Icon yang tidak terpakai dihapus

export default function LandingPage() {
    // Definisi warna yang konsisten dari form login
    const DARK_GREEN = 'bg-[#10403D]';
    const LIGHT_BLUE_TEXT = 'text-[#5BC0EB]';
    const LIGHT_BLUE_BG = 'bg-[#5BC0EB]';
    const HOVER_GREEN = 'hover:bg-[#0c312e]';

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

    // Data simulasi untuk bagian "Kampus Unggulan"
    // SEMUA ICON DIGANTI DENGAN imageUrl
    const mockCourses = [
        { 
            // Menggunakan placeholder yang pasti terbaca
            imageUrl: "https://placehold.co/60x60/881337/ffffff?text=UIB", 
            title: "Universitas Internasional Batam", 
            subtitle: "Mitra Utama", // Subtitle ditambahkan kembali
            color: 'bg-red-800' 
        },
        { 
            // Menggunakan URL gambar untuk item kedua
            imageUrl: "https://placehold.co/60x60/38761D/ffffff?text=UGM", 
            title: "Universitas Gadjah Mada", 
            subtitle: "Mitra Universitas", 
            color: 'bg-green-700' 
        },
        { 
            // Menggunakan URL gambar untuk item ketiga
            imageUrl: "https://placehold.co/60x60/2986CC/ffffff?text=UNPAD", 
            title: "Universitas Padjadjaran", 
            subtitle: "Mitra Universitas", 
            color: 'bg-blue-600' 
        },
        { 
            // Menggunakan URL gambar untuk item keempat
            imageUrl: "https://placehold.co/60x60/990000/ffffff?text=ITB", 
            title: "Institut Teknologi Bandung", 
            subtitle: "Mitra Universitas", 
            color: 'bg-red-700' 
        },
    ];


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
                                e.target.src = `https://placehold.co/1200x300/5BC0EB/10403D?text=${image.alt.replace(/\s/g, '+')}`; // Fallback jika URL gagal
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
                    <div className="text-center py-16 bg-white rounded-lg">
                        
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


                    {/* 4. Kampus Unggulan Section (GRID STATIS DENGAN GAMBAR/LOGO) */}
                    <section className="pb-20 relative">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">
                            Kampus Unggulan
                        </h2>
                        
                        <p className="text-md text-gray-600 mb-8 max-w-4xl">
                            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. 
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {mockCourses.map((item, index) => (
                                <div 
                                    key={index} 
                                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100"
                                >
                                    {/* HEADER GAMBAR (Menggunakan imageUrl) */}
                                    <div className={`h-24 ${item.color} flex items-center justify-center p-3`}>
                                        <img 
                                            src={item.imageUrl} 
                                            alt={item.title} 
                                            // Styling untuk membuat logo terlihat jelas di tengah
                                            className="w-full h-full object-contain bg-white rounded-lg p-2" 
                                            onError={(e) => {
                                                e.target.onerror = null; 
                                                e.target.src = `https://placehold.co/60x60/cccccc/000000?text=LOGO`; // Fallback jika URL gagal
                                            }}
                                        />
                                    </div>
                                    
                                    <div className="p-4">
                                        <p className="text-xs font-semibold uppercase text-gray-500 mb-1">
                                            {item.subtitle}
                                        </p>
                                        <h3 className={`text-lg font-bold ${LIGHT_BLUE_TEXT} mb-3`}>
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Akses cepat untuk informasi {item.subtitle.toLowerCase()}.
                                        </p>
                                    </div>
                                </div>
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
}
