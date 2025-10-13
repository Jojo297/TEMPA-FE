import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from "lucide-react";

// Import Pages dan Components
import LoginAdmin from "./page/loginAdmin";
import LoginCampus from "./page/loginCampus";
import LandingPage from "./page/Landingpage";
import LoginMentee from "./page/loginMentee";
import CampusPage from "./page/campuspage";
import JurusanPage from "./page/JurusanPage";
import CampusDetailPage from "./components/CampusDetailPage";
import CampusPrestasiPage from "./components/CampusPrestasiPage";
import DetailJurusan from "@/components/DetailJurusan";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function App() {
  const DARK_GREEN = "bg-[#10403D]";
  const HOVER_GREEN = "hover:bg-[#0c312e]";

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
        {/* Rute Utama */}
        <Route path="/" element={<LandingPage />} />

        {/* Login/Admin */}
        <Route path="/login-campus" element={<LoginCampus />} />
        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="/login-mentee" element={<LoginMentee />} />

        {/* Halaman Kampus */}
        <Route path="/CampusPage" element={<CampusPage />} />
        <Route path="/JurusanPage" element={<JurusanPage />} />
        <Route path="/campus-detail/:id" element={<CampusDetailPage />} />

        <Route path="/campus/:id/prestasi" element={<CampusPrestasiPage />} />
        <Route path="/campus/:id" element={<CampusDetailPage />} />
        <Route path="/campus/:id/prestasi" element={<CampusPrestasiPage />} />
        <Route path="/jurusan/:id" element={<DetailJurusan />} />
      </Routes>
    </Router>
  );
}
