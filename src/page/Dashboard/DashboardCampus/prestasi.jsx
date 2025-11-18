import SidebarCampus from "@/components/SidebarCampus";
import { Pencil, X, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import robotsad from "@/assets/robot-sad.png";
import { useState } from "react";

export default function Prestasi() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deskripsi, setDeskripsi] = useState("");

  // ================= FIX ERROR =================
  const [mainImage, setMainImage] = useState(null);

  const campusData = {
    name: "Politeknik Negeri Batam",
    logo: "",
  };
  // =============================================

  return (
    <SidebarCampus>
      <div className="min-h-screen bg-[#F8FAF8] font-sans pb-20">
        {/* HEADER */}
        <div className="max-w-6xl mx-auto mt-6 px-6 w-full">
          <div className="bg-[#013B35] text-white rounded-2xl p-8 relative">
            {/* FOTO UTAMA */}
            <div className="mb-6 h-72 w-full">
              {mainImage && mainImage.url ? (
                <img
                  src={mainImage.url}
                  alt="Foto Utama Kampus"
                  className="w-full h-full object-cover rounded-xl bg-white/20"
                />
              ) : (
                <div className="w-full h-full bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="opacity-60 text-xl font-semibold">
                    Foto Utama Kampus Belum Diunggah
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* LOGO + NAMA */}
          <div className="bg-white rounded-2xl shadow-lg p-8 -mt-16 relative z-10">
            <div className="w-28 h-28 bg-white rounded-full border-4 border-white shadow-xl -mt-40 mb-4 flex items-center justify-center text-[#013B35] text-xl font-bold">
              {campusData.logo ? (
                <img
                  src={campusData.logo}
                  className="w-full h-full rounded-full object-cover"
                  alt="logo"
                />
              ) : (
                "Logo"
              )}
            </div>

            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-[#013B35]">
                {campusData.name}
              </h1>

              {/* <button className="p-2 bg-[#4BA8FF] text-white rounded-full hover:bg-blue-600 transition-colors">
                <Pencil size={18} />
              </button> */}
            </div>

            {/* TAB */}
            {/* <div className="flex flex-wrap gap-4 mt-6 mb-2 font-medium">
              <Link
                to="../detailcampus"
                className="px-6 py-2 border border-[#013B35] text-[#013B35] rounded-full font-semibold hover:bg-[#013B35] hover:text-white transition">
                Deskripsi
              </Link>

              <Link
                to="../jurusan"
                className="px-6 py-2 border border-[#013B35] text-[#013B35] rounded-full font-semibold hover:bg-[#013B35] hover:text-white transition">
                Jurusan
              </Link>

              <button className="px-6 py-2 bg-[#013B35] text-white rounded-full font-semibold">
                Prestasi
              </button>

              <Link
                to="../program"
                className="px-6 py-2 border border-[#013B35] text-[#013B35] rounded-full font-semibold hover:bg-[#013B35] hover:text-white transition">
                Program
              </Link>
            </div> */}
          </div>
        </div>

        {/* ===================== ISI PRESTASI ===================== */}
        <div className="max-w-6xl mx-auto px-6 mt-10">
          <div className="bg-white shadow-md rounded-xl p-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#013B35]">
                Prestasi {campusData.name}
              </h2>
              <Pencil
                size={18}
                className="text-[#013B35] cursor-pointer"
                onClick={() => setShowEditModal(true)}
              />
            </div>

            <p className="mt-4 text-gray-600 text-sm leading-relaxed max-w-3xl">
              {deskripsi ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in tincidunt lacus, a pharetra mauris."}
            </p>

            <div className="flex justify-end mt-4">
              <button
                className="px-6 py-2 bg-[#4BA8FF] text-white rounded-full font-medium shadow hover:bg-blue-600 transition"
                onClick={() => setShowAddModal(true)}>
                Tambah Prestasi
              </button>
            </div>

            <div className="flex flex-col items-center mt-10 mb-6">
              <img src={robotsad} className="w-40 h-40 object-contain" />
              <p className="text-gray-500 mt-3">
                Belum ada prestasi yang tersedia
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== MODAL EDIT DESKRIPSI ===================== */}
      {showEditModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/40 flex justify-center items-center z-50">
          <div className="bg-[#F8FAF8] w-[700px] rounded-xl shadow-xl p-6 relative border border-gray-200">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
              onClick={() => setShowEditModal(false)}>
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold text-[#013B35] mb-6">
              Tambahkan Deskripsi Prestasi Kampus
            </h2>

            <textarea
              className="mt-2 w-full h-40 border border-[#013B35] rounded-xl p-4 outline-none bg-white"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
            />

            <div className="flex justify-end mt-6">
              <button
                className="px-6 py-2 bg-[#4BA8FF] text-white rounded-full shadow hover:bg-blue-600 transition"
                onClick={() => setShowEditModal(false)}>
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== MODAL TAMBAH PRESTASI ===================== */}
      {showAddModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/40 flex justify-center items-center z-50">
          <div className="bg-[#F8FAF8] w-[900px] rounded-xl shadow-xl p-8 relative border border-gray-200">
            <button
              className="absolute top-5 right-5 text-gray-600 hover:text-black"
              onClick={() => setShowAddModal(false)}>
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold text-[#013B35] mb-8">
              Tambahkan Prestasi
            </h2>

            <label className="text-sm font-medium mb-2 block">Judul *</label>
            <input
              type="text"
              className="w-full border border-[#013B35] rounded-xl p-3 mb-5 bg-white outline-none"
              placeholder="Masukkan judul prestasi"
            />

            <label className="text-sm font-medium mb-2 block">
              Deskripsi *
            </label>
            <textarea
              className="w-full h-40 border border-[#013B35] rounded-xl p-4 bg-white outline-none"
              placeholder="Masukkan deskripsi prestasi"
            />

            <label className="text-sm font-medium mt-6 block mb-2">
              Dokumentasi *
            </label>
            <button className="flex items-center gap-2 border border-[#013B35] px-4 py-2 rounded-full text-[#013B35] hover:bg-gray-100 transition">
              <Plus size={18} /> Tambahkan Gambar
            </button>

            <div className="flex justify-end mt-10">
              <button className="px-8 py-2 bg-[#4BA8FF] text-white rounded-full shadow hover:bg-blue-600 transition">
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </SidebarCampus>
  );
}
