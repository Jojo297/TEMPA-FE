import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import { Users, Zap, Search, ChevronLeft, ChevronRight, Home, MapPin, Globe } from 'lucide-react';

// ===============================================
// 1. DATA SIMULASI (Digunakan oleh LandingPage & CampusDetailPage)
// ===============================================

// Definisi warna yang konsisten
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

// ===============================================
// 2. KOMPONEN CAMPUS DETAIL PAGE
// ===============================================

const CampusDetailPage = () => {
    const { id } = useParams();
    const campus = mockCourses.find(c => c.id === id);

    // Jika ID kampus tidak ditemukan
    if (!campus) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Kampus Tidak Ditemukan</h1>
                <p className="text-lg text-gray-600 mb-8">ID kampus "{id}" tidak valid atau belum terdaftar.</p>
                <Link 
                    to="/" 
                    className={`px-6 py-2 text-white rounded-lg font-semibold shadow-md ${DARK_GREEN} ${HOVER_GREEN}`}
                >
                    Kembali ke Beranda
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            
            {/* Header / Navigasi Breadcrumb */}
            <header className="flex items-center p-4 bg-white shadow-sm border-b border-gray-100">
                <Link to="/" className={`text-sm font-semibold text-gray-700 hover:${LIGHT_BLUE_TEXT} transition duration-200 flex items-center`}>
                    <Home className="w-4 h-4 mr-1" /> Beranda
                </Link>
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-sm font-bold text-gray-900">{campus.name}</span>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                
                {/* Hero Section Kampus */}
                <div className={`p-8 md:p-12 rounded-xl shadow-xl text-white ${campus.color} mb-10`}>
                    <h1 className="text-4xl font-extrabold mb-2">{campus.name}</h1>
                    <p className="text-xl font-light opacity-90">{campus.tagline}</p>
                    <div className="mt-4 flex items-center space-x-6 text-sm">
                        <span className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> {campus.location}</span>
                        <span className="flex items-center"><Globe className="w-4 h-4 mr-2" /> Didirikan: {campus.established}</span>
                    </div>
                </div>

                {/* Detail Konten */}
                <div className="grid md:grid-cols-3 gap-8">
                    
                    {/* Kolom Kiri: Deskripsi & Program Studi */}
                    <div className="md:col-span-2">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Tentang Kampus</h2>
                        <p className="text-gray-700 leading-relaxed mb-6">{campus.description}</p>

                        <h3 className="text-xl font-bold text-gray-900 mb-3">Program Studi Unggulan</h3>
                        <ul className="space-y-2 list-disc list-inside text-gray-700">
                            {campus.programs.map((program, index) => (
                                <li key={index} className={`font-medium ${LIGHT_BLUE_TEXT}`}>{program}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Kolom Kanan: Call to Action */}
                    <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-lg h-fit border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Ingin Tahu Lebih Lanjut?</h3>
                        <p className="text-gray-600 mb-6">Dapatkan brosur lengkap atau ajukan pertanyaan langsung kepada tim penerimaan kampus ini.</p>
                        <button className={`w-full py-3 text-white rounded-lg font-bold shadow-md ${DARK_GREEN} ${HOVER_GREEN} transition duration-200`}>
                            Hubungi Tim Penerimaan
                        </button>
                        <Link 
                            to="/" 
                            className={`mt-4 w-full py-3 block text-center rounded-lg font-semibold transition duration-200 border border-gray-300 text-gray-700 hover:bg-gray-100`}
                        >
                            Lihat Semua Kampus
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};


// ===============================================
// 3. KOMPONEN LANDING PAGE
// ===============================================

const LandingPage = () => {
    
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
                        <Link to="kampus-unggulan" className="hover:text-[#10403D]">Dukungan</Link>
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


                    {/* 4. Fitur Utama / Courses Section (GRID STATIS) */}
                    <section className="pb-20 relative">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">
                            Kampus Unggulan
                        </h2>
                        
                        <p className="text-md text-gray-600 mb-8 max-w-4xl">
                            Temukan universitas dan institusi pendidikan terbaik yang berkolaborasi dengan TEMPA.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {mockCourses.map((item, index) => (
                                <Link
                                    key={index} 
                                    to={`/kampus/${item.id}`} // LINK YANG SEHARUSNYA BISA DIKLIK
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
                                        <h3 className={`text-lg font-bold ${LIGHT_BLUE_TEXT} mb-3 group-hover:underline`}>
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Jelajahi program studi dan fasilitas {item.title}.
                                        </p>
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

// ===============================================
// 4. KOMPONEN UTAMA (APP)
// ===============================================

export default function App() {
    // Definisi placeholder untuk Login/Admin jika komponen aslinya tidak ada
    const PlaceholderPage = ({ title }) => (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-700">
            <h1 className="text-2xl font-bold">{title}</h1>
        </div>
    );

    return (
        // Wrapper Router memastikan semua Link berfungsi
        <Router>
            <Routes>
                {/* 1. Rute Utama (Landing Page) */}
                <Route path="/" element={<LandingPage />} />
                
                {/* 2. Rute Halaman Detail Kampus (Dinamis berdasarkan ID) */}
                <Route path="/kampus/:id" element={<CampusDetailPage />} /> 

                {/* 3. Rute Login/Admin (Placeholder) */}
                <Route path="/login-campus" element={<PlaceholderPage title="Halaman Login Kampus" />} />
                <Route path="/login-admin" element={<PlaceholderPage title="Halaman Login Admin" />} />
            </Routes>
        </Router>
    );
}
