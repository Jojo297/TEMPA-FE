import { Link, useParams } from "react-router";
import { Home, MapPin, Globe } from "lucide-react";

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

export default function CampusDetailPage() {
    const { id } = useParams();
    // Gunakan data mockCourses yang didefinisikan di atas
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

    const DARK_GREEN = 'bg-[#10403D]';
const LIGHT_BLUE_TEXT = 'text-[#5BC0EB]';
const LIGHT_BLUE_BG = 'bg-[#5BC0EB]';
const HOVER_GREEN = 'hover:bg-[#0c312e]';

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            
            {/* Header / Navigasi Breadcrumb */}
            <header className="flex items-center p-4 bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
                <Link to="/" className={`text-sm font-semibold text-gray-700 hover:${LIGHT_BLUE_TEXT} transition duration-200 flex items-center`}>
                    <Home className="w-4 h-4 mr-1" /> Beranda
                </Link>
                <span className="mx-2 text-gray-400">/</span>
                {/* Menggunakan title karena campus.name tidak ada di mockCourses */}
                <span className="text-sm font-bold text-gray-900">{campus.title}</span> 
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                
                {/* Hero Section Kampus */}
                <div className={`p-8 md:p-12 rounded-xl shadow-xl text-white ${campus.color} mb-10`}>
                    <h1 className="text-4xl font-extrabold mb-2">{campus.title}</h1>
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
                        <div className="flex flex-wrap gap-2">
                            {campus.programs.map((program, index) => (
                                <span key={index} className={`px-3 py-1 text-sm font-medium rounded-full border border-current ${LIGHT_BLUE_TEXT} ${DARK_GREEN.replace('bg', 'bg-opacity-5')}`}>{program}</span>
                            ))}
                        </div>
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
