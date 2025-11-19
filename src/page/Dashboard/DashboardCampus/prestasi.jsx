import SidebarCampus from "@/components/SidebarCampus";
import { Pencil, X, Plus, MapPin } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import robotsad from "@/assets/robot-sad.png";

export default function Prestasi() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Banner
  const [mainImage, setMainImage] = useState("");

  // Deskripsi
  const [deskripsi, setDeskripsi] = useState("");

  // ✅ DATA KAMPUS
  const [campusData, setCampusData] = useState({
    logo: "",
    name: "Nama Kampus",
    address: "Alamat kampus belum diisi",
    email: "Email belum diisi",
  });

  // Modal Edit Info Kampus
  const [isInfoEditOpen, setIsInfoEditOpen] = useState(false);

  // Temp data untuk edit
  const [tempInfo, setTempInfo] = useState({
    logo: "",
    banner: "",
    name: "",
    address: "",
    email: "",
  });

  // Saat membuka modal, isi temp dengan data awal
  const openEditInfo = () => {
    setTempInfo({
      logo: campusData.logo,
      banner: mainImage,
      name: campusData.name,
      address: campusData.address,
      email: campusData.email,
    });
    setIsInfoEditOpen(true);
  };

  // Simpan perubahan info kampus
  const saveInfo = () => {
    setCampusData({
      logo: tempInfo.logo,
      name: tempInfo.name,
      address: tempInfo.address,
      email: tempInfo.email,
    });
    setMainImage(tempInfo.banner);
    setIsInfoEditOpen(false);
  };

  return (
    <SidebarCampus>
      {/* ====================== HEADER BANNER ====================== */}
      <header className="bg-[#F8FAFB]">
        <div className="max-w-6xl mx-auto rounded-xl shadow-lg overflow-hidden relative">

          {/* Banner Kampus */}
          <div className="h-[400px] relative">
            <img
              src={
                mainImage ||
                "https://placehold.co/1200x400?text=Banner+Kampus"
              }
              alt="Banner Kampus"
              className="w-full h-full object-cover"
            />

            {/* EDIT BUTTON */}
            <button
              onClick={openEditInfo}
              className="absolute top-4 right-4 bg-white text-[#013B35] px-4 py-2 rounded-full shadow-md flex items-center gap-2"
            >
              <Pencil size={16} /> Edit Info
            </button>
          </div>

          {/* ====================== INFO KAMPUS ====================== */}
          <div className="bg-[#013B35] text-white px-12 py-6 flex items-center gap-6 rounded-b-xl -mt-16 relative z-10">

            {/* LOGO */}
            <div className="bg-white p-3 rounded-full shadow-lg border-4 border-gray-100 -mt-10">
              <img
                src={campusData.logo || "https://placehold.co/200?text=Logo"}
                alt="Logo Kampus"
                className="w-20 h-20 object-contain"
              />
            </div>

            {/* TEXT INFO */}
            <div>
              <h1 className="text-3xl font-bold text-white">
                {campusData.name}
              </h1>

              <div className="flex items-center text-gray-300 mt-1">
                <MapPin size={16} className="mr-2" />
                <span className="text-sm">{campusData.address}</span>
              </div>

              <p className="text-sm mt-1">{campusData.email}</p>
            </div>
          </div>
        </div>
      </header>

      {/* ====================== ISI PRESTASI ====================== */}
      <div className="max-w-6xl mx-auto px-6 mt-10">
        <div className="bg-white shadow-md rounded-xl p-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-[#013B35]">
              Prestasi Politeknik Negeri Batam
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
              onClick={() => setShowAddModal(true)}
            >
              Tambah Prestasi
            </button>
          </div>

          {/* Kosong */}
          <div className="flex flex-col items-center mt-10 mb-6">
            <img src={robotsad} className="w-40 h-40 object-contain" />
            <p className="text-gray-500 mt-3">
              Belum ada prestasi yang tersedia
            </p>
          </div>
        </div>
      </div>

      {/* ===================== MODAL EDIT DESKRIPSI ===================== */}
      {showEditModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/40 flex justify-center items-center z-50">
          <div className="bg-[#F8FAF8] w-[700px] rounded-xl shadow-xl p-6 relative border border-gray-200">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
              onClick={() => setShowEditModal(false)}
            >
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
                onClick={() => setShowEditModal(false)}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL EDIT INFO KAMPUS ================= */}
      {isInfoEditOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-[600px] rounded-xl shadow-xl p-6 relative border">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
              onClick={() => setIsInfoEditOpen(false)}
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold text-[#013B35] mb-4">
              Edit Informasi Kampus
            </h2>

            {/* Nama */}
            <label className="text-sm font-medium">Nama Kampus</label>
            <input
              className="w-full p-2 border rounded-xl mt-1 mb-4"
              value={tempInfo.name}
              onChange={(e) =>
                setTempInfo({ ...tempInfo, name: e.target.value })
              }
            />

            {/* Alamat */}
            <label className="text-sm font-medium">Alamat</label>
            <input
              className="w-full p-2 border rounded-xl mt-1 mb-4"
              value={tempInfo.address}
              onChange={(e) =>
                setTempInfo({ ...tempInfo, address: e.target.value })
              }
            />

            {/* Email */}
            <label className="text-sm font-medium">Email</label>
            <input
              className="w-full p-2 border rounded-xl mt-1 mb-4"
              value={tempInfo.email}
              onChange={(e) =>
                setTempInfo({ ...tempInfo, email: e.target.value })
              }
            />

            {/* Logo */}
            <label className="text-sm font-medium">Logo Kampus</label>
            <input
              className="w-full p-2 border rounded-xl mt-1 mb-4"
              placeholder="Link URL Logo"
              value={tempInfo.logo}
              onChange={(e) =>
                setTempInfo({ ...tempInfo, logo: e.target.value })
              }
            />

            {/* Banner */}
            <label className="text-sm font-medium">Banner Kampus</label>
            <input
              className="w-full p-2 border rounded-xl mt-1 mb-4"
              placeholder="Link URL Banner"
              value={tempInfo.banner}
              onChange={(e) =>
                setTempInfo({ ...tempInfo, banner: e.target.value })
              }
            />

            <div className="flex justify-end">
              <button
                className="px-6 py-2 bg-[#4BA8FF] text-white rounded-full"
                onClick={saveInfo}
              >
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
              onClick={() => setShowAddModal(false)}
            >
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

            <label className="text-sm font-medium mb-2 block">Deskripsi *</label>
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
