import React, { useState } from "react";
import { FiEdit2, FiX } from "react-icons/fi";
import logo from "@/assets/logo-text.png";
import roboterror from "@/assets/robot-error.png";
import polibatam from "@/assets/logo-polibatam.png";

export default function Jurusan() {
  const [showModal, setShowModal] = useState(false);
  const [showAddJurusan, setShowAddJurusan] = useState(false);

  const [programs, setPrograms] = useState([""]);

  return (
    <div className="min-h-screen bg-[#F5F7F8] flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-[#003F3C] py-4 px-10 text-white flex items-center justify-between shadow-md">
        <img src={logo} alt="TEMPA Logo" className="w-32 object-contain" />

        <div className="flex gap-8 text-lg">
          <button className="hover:opacity-80">Kampus</button>
          <button className="hover:opacity-80">Jurusan</button>
          <button className="hover:opacity-80">Panduan</button>
        </div>

        <button className="bg-white text-[#003F3C] px-5 py-2 rounded-xl font-semibold shadow hover:bg-gray-200">
          Masuk
        </button>
      </nav>

      {/* Header Images */}
      <div className="w-full max-w-6xl mx-auto mt-10">
        <div className="grid grid-cols-5 gap-3 mb-8">
          <img
            src="https://via.placeholder.com/600x300"
            alt="main header"
            className="col-span-3 h-60 object-cover rounded-xl"
          />
          <img
            src="https://via.placeholder.com/200"
            className="h-28 object-cover rounded-xl"
          />
          <img
            src="https://via.placeholder.com/200"
            className="h-28 object-cover rounded-xl"
          />
          <img
            src="https://via.placeholder.com/200"
            className="h-28 object-cover rounded-xl"
          />
          <img
            src="https://via.placeholder.com/200"
            className="h-28 object-cover rounded-xl"
          />
        </div>

        {/* Campus Info Box */}
        <div className="bg-[#003F3C] text-white p-8 rounded-xl relative shadow-xl">
          <img
            src={polibatam}
            alt="polibatam"
            className="w-24 h-24 rounded-full object-cover border-2 border-white absolute -top-10 left-10"
          />

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-extrabold mt-8">
                Politeknik Negeri Batam
              </h1>
              <p className="text-sm mt-2 opacity-80">
                Batam, Riau Islands, Indonesia
              </p>
            </div>

            <button className="p-2 rounded-lg hover:bg-white/10 transition">
              <FiEdit2 size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full max-w-6xl mx-auto mt-10 flex gap-4">
        {["Deskripsi", "Jurusan", "Prestasi", "Program"].map((tab) => (
          <button
            key={tab}
            className={`px-5 py-2 rounded-full border shadow bg-white font-semibold hover:bg-gray-100 ${
              tab === "Jurusan" ? "bg-[#003F3C] text-white" : ""
            }`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Content Box */}
      <div className="w-full max-w-6xl mx-auto mt-8 bg-white shadow-lg rounded-xl p-8">
        <div className="flex items-start justify-between">
          <h2 className="text-2xl font-bold mb-4">
            Jurusan Politeknik Negeri Batam
          </h2>

          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition"
            onClick={() => setShowModal(true)}>
            <FiEdit2 size={20} />
          </button>
        </div>

        <p className="text-gray-600 leading-relaxed mb-10 max-w-4xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
          laboriosam ut dolorem at dolorum molestias alias.
        </p>

        {/* Tambah Jurusan */}
        <button
          className="bg-[#003F3C] text-white px-6 py-2 rounded-xl text-sm font-medium shadow hover:bg-[#96CCEC]"
          onClick={() => setShowAddJurusan(true)}>
          Tambah Jurusan
        </button>

        {/* Empty State Robot */}
        <div className="mt-16 flex flex-col items-center justify-center">
          <img
            src={roboterror}
            alt="robot error"
            className="w-32 object-contain"
          />
          <p className="text-gray-500 mt-4 text-lg">
            Belum ada Jurusan yang tersedia
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-[#003F3C] text-white mt-20 py-10 text-center">
        <h2 className="text-3xl font-bold mb-3">TEMPA</h2>
        <p className="opacity-60 text-xs mt-6">
          © 2025 TIEMPA. All rights reserved.
        </p>
      </footer>

      {/* ======================= MODAL DESKRIPSI ======================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999]">
          <div className="bg-[#F9FFF9] w-[60%] rounded-xl shadow-lg border relative">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h3 className="text-lg font-bold">
                Tambahkan Deskripsi Jurusan Kampus
              </h3>
              <button
                className="p-2 hover:bg-gray-200 rounded-full"
                onClick={() => setShowModal(false)}>
                <FiX size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <label className="text-sm font-medium">Deskripsi</label>
              <textarea
                className="w-full h-40 border rounded-lg p-3 mt-1 focus:ring-2 focus:ring-[#003F3C] outline-none"
                placeholder="Masukkan deskripsi jurusan..."></textarea>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t">
              <button
                className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                onClick={() => setShowModal(false)}>
                Batal
              </button>
              <button className="px-5 py-2 rounded-lg bg-[#003F3C] text-white hover:bg-[#08514d]">
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================= MODAL TAMBAH JURUSAN ======================= */}
      {showAddJurusan && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999]">
          <div className="bg-[#F9FFF9] w-[70%] rounded-xl shadow-lg border relative p-6">
            {/* Header */}
            <div className="flex justify-between items-center pb-4 border-b">
              <h3 className="text-xl font-bold">Tambahkan Jurusan</h3>
              <button
                className="p-2 hover:bg-gray-200 rounded-full"
                onClick={() => setShowAddJurusan(false)}>
                <FiX size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="mt-6 grid grid-cols-2 gap-6">
              {/* Kiri */}
              <div className="flex flex-col gap-4">
                {/* Judul */}
                <div>
                  <label className="text-sm font-medium">Judul*</label>
                  <input
                    type="text"
                    className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#003F3C] outline-none"
                    placeholder="Masukkan judul jurusan"
                  />
                </div>

                {/* Deskripsi Singkat */}
                <div>
                  <label className="text-sm font-medium">
                    Deskripsi Singkat*
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#003F3C] outline-none"
                    placeholder="Masukkan deskripsi singkat"
                  />
                </div>

                {/* Program Studi */}
                {programs.map((prog, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-full">
                      <label className="text-sm font-medium">
                        Program Studi*
                      </label>
                      <input
                        type="text"
                        value={prog}
                        onChange={(e) => {
                          const updated = [...programs];
                          updated[index] = e.target.value;
                          setPrograms(updated);
                        }}
                        className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#003F3C] outline-none"
                        placeholder="Masukkan program studi"
                      />
                    </div>

                    {index === 0 && (
                      <button
                        className="mt-6 px-3 py-2 rounded-lg border hover:bg-gray-100"
                        onClick={() => setPrograms([...programs, ""])}>
                        +
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Kanan */}
              <div>
                <label className="text-sm font-medium">Logo Jurusan*</label>
                <div className="mt-2">
                  <button className="px-4 py-2 border rounded-lg bg-white hover:bg-gray-100 flex items-center gap-2">
                    + Tambahkan Gambar
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 pt-6 border-t mt-8">
              <button
                className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                onClick={() => setShowAddJurusan(false)}>
                Batal
              </button>
              <button className="px-6 py-2 rounded-lg bg-[#003F3C] text-white hover:bg-[#08514d]">
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
