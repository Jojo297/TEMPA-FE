
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from "lucide-react";

// Import Pages dan Components

import LoginAdmin from "./page/loginAdmin";
import LoginCampus from "./page/loginCampus";
import LandingPage from "./page/Landingpage";
import LoginMentee from "./page/loginMentee";
import MajorDetailPage from "./page/detailjurusan";

export default function App() {
  // DEFINISI VARIABEL WARNA (DIPERLUKAN UNTUK PlaceholderPage)
  const DARK_GREEN = "bg-[#10403D]";
  const HOVER_GREEN = "hover:bg-[#0c312e]";

  // Definisi placeholder untuk Login/Admin
  const PlaceholderPage = ({ title }) => (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-700">
      <div className="text-center p-8 bg-white shadow-xl rounded-xl">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-gray-500">
          Halaman ini masih dalam tahap pengembangan.
        </p>
        <Link
          to="/"
          className={`mt-6 inline-block px-4 py-2 text-white rounded-lg font-semibold ${DARK_GREEN} ${HOVER_GREEN} transition duration-200`}>
          <Home className="w-4 h-4 mr-2 inline-block" /> Kembali ke Beranda
        </Link>
      </div>
    </div>
  );


  return (
    <Router>
      <Routes>
        {/* 1. Rute Utama (Landing Page) */}
        <Route path="/" element={<LandingPage />} />

        {/* 4. Rute Login/Admin (Placeholder) */}
        <Route
          path="/login-campus"
          element={<LoginCampus title="Halaman Login Kampus" />}
        />
        <Route
          path="/login-admin"
          element={<LoginAdmin title="Halaman Login Admin" />}
        />
        <Route
          path="/login-mentee"
          element={<LoginMentee title="Halaman Login Mentee" />}
        />
        {/* 5. Rute Detail Jurusan */}
        <Route path="/detail-jurusan" element={<MajorDetailPage />} />
      </Routes>
    </Router>
  );
}
