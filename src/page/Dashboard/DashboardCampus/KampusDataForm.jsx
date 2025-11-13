import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo-text.png";

export default function KampusDataForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    namaKampus: "",
    emailKampus: "",
    alamatKampus: "",
    deskripsiKampus: "",
    visiMisi: "",
    website: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data kampus dikirim:", formData);
    navigate("/dashboard-campus/kampus-verifikasi");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-[#013D3A] py-4 px-10 flex items-center shadow-md">
        <img src={logo} alt="Logo TIEMPA" className="h-10 object-contain" />
      </header>

      {/* Hero Section */}
      <section className="bg-[#013D3A] w-[85%] md:w-[70%] mx-auto text-center text-white mt-8 py-6 rounded-md">
        <h2 className="text-2xl font-semibold">Bergabung Sebagai Mitra</h2>
        <p className="text-gray-300 text-sm mt-1">
          Kami membutuhkan beberapa informasi. Silakan isi data kampus di bawah
          ini.
        </p>
      </section>

      {/* Form */}
      <main className="flex-grow flex justify-center mt-10">
        <form
          onSubmit={handleSubmit}
          className="bg-[#013D3A] text-white w-[85%] md:w-[65%] rounded-lg p-8 shadow-lg">
          <div className="grid grid-cols-1 gap-5">
            <div>
              <label className="block text-sm mb-1">Nama Kampus</label>
              <input
                type="text"
                name="namaKampus"
                value={formData.namaKampus}
                onChange={handleChange}
                placeholder="Masukkan nama kampus"
                className="w-full px-4 py-2 text-black rounded-md outline-none"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Email Kampus</label>
              <input
                type="email"
                name="emailKampus"
                value={formData.emailKampus}
                onChange={handleChange}
                placeholder="Masukkan email kampus"
                className="w-full px-4 py-2 text-black rounded-md outline-none"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Alamat Kampus</label>
              <input
                type="text"
                name="alamatKampus"
                value={formData.alamatKampus}
                onChange={handleChange}
                placeholder="Masukkan alamat kampus"
                className="w-full px-4 py-2 text-black rounded-md outline-none"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Deskripsi Kampus</label>
              <textarea
                name="deskripsiKampus"
                value={formData.deskripsiKampus}
                onChange={handleChange}
                placeholder="Tuliskan deskripsi singkat kampus"
                rows={3}
                className="w-full px-4 py-2 text-black rounded-md outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Visi & Misi</label>
              <textarea
                name="visiMisi"
                value={formData.visiMisi}
                onChange={handleChange}
                placeholder="Tuliskan visi dan misi kampus"
                rows={3}
                className="w-full px-4 py-2 text-black rounded-md outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Website Kampus</label>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="Masukkan link website kampus"
                className="w-full px-4 py-2 text-black rounded-md outline-none"
              />
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-[#5CC6BA] text-[#013D3A] font-semibold px-12 py-2 rounded-md hover:bg-[#4bb2a8] transition-all">
              Kirim
            </button>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="bg-[#013D3A] text-white text-center py-8 mt-10">
        <h1 className="text-xl font-bold">
          <span className="text-[#5CC6BA]">T</span>EMPA
        </h1>
        <p className="text-sm text-gray-300 mt-1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <div className="flex justify-center gap-5 mt-3 text-lg">
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-twitter"></i>
        </div>
        <p className="text-xs text-gray-400 mt-4">
          © 2025 TIEMPA. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
