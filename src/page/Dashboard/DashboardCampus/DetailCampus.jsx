import React, { useState } from "react";
import { X, Plus, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import SidebarCampus from "@/components/SidebarCampus";

// Mock images kosong
const mockImages = [{ id: 1, url: "" }];

const initialCampusData = {
  id: 1,
  name: "",
  website: "",
  address: "",
  desc: "",
  visi: "",
  misi: "",
  logo: "",
  images: mockImages,
};

export default function DetailCampus() {
  const [campusData, setCampusData] = useState(initialCampusData);
  const [isInfoEditOpen, setIsInfoEditOpen] = useState(false);
  const [isDescEditOpen, setIsDescEditOpen] = useState(false);

  const handleSave = (updatedData, type) => {
    if (type === "info") {
      updatedData.images = updatedData.images.slice(0, 1);
      setIsInfoEditOpen(false);
    }
    if (type === "desc") {
      setIsDescEditOpen(false);
    }
    setCampusData(updatedData);
  };

  const handleCloseEdit = () => {
    setIsInfoEditOpen(false);
    setIsDescEditOpen(false);
  };

  const mainImage = campusData.images.length > 0 ? campusData.images[0] : null;

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
                {campusData.name || "Nama Kampus"}
              </h1>

              <button
                onClick={() => setIsInfoEditOpen(true)}
                className="p-2 bg-[#4BA8FF] text-white rounded-full hover:bg-blue-600 transition-colors">
                <Pencil size={18} />
              </button>
            </div>

            {/* TAB */}
            {/* <div className="flex flex-wrap gap-4 mt-6 mb-2 font-medium">
              <Link
                to=""
                className="px-6 py-2 border bg-[#013B35] text-white rounded-full font-semibold">
                Deskripsi
              </Link>

              <Link
                to="/dashboard-campus/jurusan"
                className="px-6 py-2 border border-[#013B35] text-[#013B35] rounded-full font-semibold hover:bg-[#013B35] hover:text-white transition">
                Jurusan
              </Link>

              <Link
                to="/dashboard-campus/prestasi"
                className="px-6 py-2 border border-[#013B35] text-[#013B35] rounded-full font-semibold hover:bg-[#013B35] hover:text-white transition">
                Prestasi
              </Link>

              <Link
                to=""
                className="px-6 py-2 border border-[#013B35] text-[#013B35] rounded-full font-semibold hover:bg-[#013B35] hover:text-white transition">
                Program
              </Link>
            </div> */}
          </div>
        </div>

        {/* CONTENT */}
        <section className="mt-6 max-w-6xl mx-auto px-6 mb-20 w-full">
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
            {/* Tentang */}
            <div className="relative">
              <h2 className="text-2xl font-bold text-[#013B35] mb-4">
                Tentang {campusData.name || "Kampus"}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {campusData.desc || "Deskripsi kampus belum ditambahkan."}
              </p>

              <button
                onClick={() => setIsDescEditOpen(true)}
                className="absolute top-0 right-0 p-2 bg-gray-100 text-[#013B35] rounded-full hover:bg-gray-200">
                <Pencil size={18} />
              </button>
            </div>

            <hr className="border-gray-200" />

            {/* Visi Misi */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#013B35]">Visi & Misi</h3>
              <p className="text-gray-700">
                <strong className="text-[#013B35]">Visi:</strong>{" "}
                {campusData.visi || "-"}
              </p>
              <p className="text-gray-700">
                <strong className="text-[#013B35]">Misi:</strong>{" "}
                {campusData.misi || "-"}
              </p>
            </div>
          </div>
        </section>

        {/* POPUP INFO */}
        {isInfoEditOpen && (
          <EditPopup title="Tambahkan Informasi" onClose={handleCloseEdit}>
            <EditCampusInfoForm
              initialData={campusData}
              onSave={(updated) => handleSave(updated, "info")}
            />
          </EditPopup>
        )}

        {/* POPUP DESKRIPSI */}
        {isDescEditOpen && (
          <EditPopup title="Tambahkan Deskripsi" onClose={handleCloseEdit}>
            <EditCampusVisiMisiForm
              initialData={campusData}
              onSave={(updated) => handleSave(updated, "desc")}
            />
          </EditPopup>
        )}
      </div>
    </SidebarCampus>
  );
}

/* ==========================
   POPUP
========================== */
function EditPopup({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999] p-4">
      <div className="bg-[#F7F9F7] w-full max-w-xl rounded-2xl p-8 relative shadow-xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-600 hover:text-black">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-8">{title}</h2>
        {children}
      </div>
    </div>
  );
}

/* ==========================
   FORM INFO
========================== */
function EditCampusInfoForm({ initialData, onSave }) {
  const [form, setForm] = useState({
    ...initialData,
    images: initialData.images.slice(0, 1),
  });

  const handleInput = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddOrReplaceImage = () => {
    setForm({ ...form, images: [{ id: Date.now(), url: "" }] });
  };

  const handleRemoveImage = () => {
    setForm({ ...form, images: [] });
  };

  const hasImage = form.images.length > 0;

  return (
    <div className="space-y-6">
      <InputField
        label="Nama Kampus *"
        name="name"
        value={form.name}
        onChange={handleInput}
      />
      <InputField
        label="Link Website *"
        name="website"
        value={form.website}
        onChange={handleInput}
      />
      <InputField
        label="Alamat *"
        name="address"
        value={form.address}
        onChange={handleInput}
      />

      {/* LOGO */}
      <div>
        <label className="block font-medium mb-2">Logo *</label>
        <button className="border border-[#8CBCAF] text-[#0A5C50] font-semibold px-6 py-2 rounded-full flex items-center gap-2">
          <Plus size={16} /> Tambahkan Logo
        </button>
      </div>

      {/* FOTO UTAMA */}
      <div>
        <label className="block font-medium mb-2">Foto Kampus Utama *</label>

        <div className="flex gap-3 items-center">
          {hasImage && (
            <div className="w-40 h-24 bg-white border border-[#8CBCAF] rounded-xl flex items-center justify-center text-gray-800 relative">
              <span className="text-sm">Gambar Utama</span>
              <button
                onClick={handleRemoveImage}
                className="absolute top-[-8px] right-[-8px] bg-red-500 text-white rounded-full p-1 shadow-md">
                <X size={12} />
              </button>
            </div>
          )}

          <button
            onClick={handleAddOrReplaceImage}
            className={`h-24 border border-[#8CBCAF] rounded-xl flex items-center justify-center gap-2 text-[#0A5C50] font-medium ${
              hasImage ? "px-4" : "w-40"
            }`}>
            {hasImage ? (
              <>
                <Pencil size={18} /> Ganti Gambar
              </>
            ) : (
              <>
                <Plus size={18} /> Tambahkan Gambar
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => onSave(form)}
          className="bg-[#4BA8FF] text-white px-10 py-3 rounded-full font-semibold">
          Simpan
        </button>
      </div>
    </div>
  );
}

/* ==========================
   FORM DESKRIPSI
========================== */
function EditCampusVisiMisiForm({ initialData, onSave }) {
  const [form, setForm] = useState(initialData);

  const handleInput = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="space-y-6">
      <TextAreaField
        label="Deskripsi"
        name="desc"
        value={form.desc}
        onChange={handleInput}
        height="h-32"
      />
      <TextAreaField
        label="Visi"
        name="visi"
        value={form.visi}
        onChange={handleInput}
        height="h-24"
      />
      <TextAreaField
        label="Misi"
        name="misi"
        value={form.misi}
        onChange={handleInput}
        height="h-24"
      />

      <div className="flex justify-end">
        <button
          onClick={() => onSave(form)}
          className="bg-[#4BA8FF] text-white px-10 py-3 rounded-full font-semibold">
          Simpan
        </button>
      </div>
    </div>
  );
}

/* ==========================
   INPUT FIELDS
========================== */
function InputField({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-[#8CBCAF] rounded-full p-3 px-5 bg-white text-gray-800 focus:ring-2 focus:ring-[#4BA8FF]"
      />
    </div>
  );
}

function TextAreaField({ label, name, value, onChange, height }) {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full border border-[#8CBCAF] rounded-xl p-4 bg-white text-gray-800 resize-none focus:ring-2 focus:ring-[#4BA8FF] ${height}`}
      />
    </div>
  );
}
