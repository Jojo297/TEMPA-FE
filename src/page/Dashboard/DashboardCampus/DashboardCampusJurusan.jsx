import React, { useState } from "react";
import { X, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import SidebarCampus from "@/components/SideBarCampus";

// Mock data kampus
const initialCampusData = {
  id: 1,
  name: "Nama Kampus",
  logo: "",
  images: [{ id: 1, url: "" }], // Banner
  email: "",
  location: "",
};

// Mock jurusan awal kosong
const initialJurusanList = [];

export default function Jurusan() {
  const [campusData] = useState(initialCampusData);
  const [jurusanList, setJurusanList] = useState(initialJurusanList);
  const [selectedJurusan, setSelectedJurusan] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleAddJurusan = (newJurusan) => {
    const jurusanWithId = { ...newJurusan, id: Date.now() };
    setJurusanList([...jurusanList, jurusanWithId]);
    setSelectedJurusan(jurusanWithId);
    setIsEditOpen(false);
  };

  const mainImage =
    campusData.images.length > 0 && campusData.images[0].url
      ? campusData.images[0].url
      : "https://placehold.co/1200x400?text=Banner+Kampus";

  return (
    <div className="min-h-screen bg-[#F8FAF8] font-sans pb-20">
      {/* ====================== HEADER BANNER ====================== */}
      <header className="bg-[#F8FAFB] mb-20">
        <div className="max-w-6xl mx-auto rounded-xl shadow-lg overflow-hidden relative">
          {/* Banner */}
          <div className="h-[400px] relative">
            <img
              src={mainImage}
              alt="Banner Kampus"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info Kampus */}
          <div className="bg-[#013B35] text-white px-12 py-6 flex items-center gap-6 rounded-b-xl -mt-16 relative z-10">
            <div className="bg-white p-3 rounded-full shadow-lg border-4 border-gray-100 -mt-10">
              <img
                src={campusData.logo || "https://placehold.co/200?text=Logo"}
                alt="Logo Kampus"
                className="w-20 h-20 object-contain"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white">
                {campusData.name}
              </h1>

              {/* lokasi + email jika ada */}
              <p className="text-sm text-gray-300">
                {campusData.location || ""}
              </p>
              <p className="text-sm text-gray-300">{campusData.email || ""}</p>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

/* POPUP */
function EditPopup({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999] p-4">
      <div className="bg-[#F7F9F7] w-full max-w-xl rounded-2xl p-8 relative shadow-xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-600 hover:text-black"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-8">{title}</h2>
        {children}
      </div>
    </div>
  );
}

/* FORM JURUSAN */
function EditJurusanForm({ onSave }) {
  const [form, setForm] = useState({ name: "", desc: "", logo: "" });

  const handleInput = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // upload logo
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm({ ...form, logo: reader.result });
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <InputField
        label="Nama Jurusan *"
        name="name"
        value={form.name}
        onChange={handleInput}
      />

      <TextAreaField
        label="Deskripsi Jurusan"
        name="desc"
        value={form.desc}
        onChange={handleInput}
        height="h-24"
      />

      {/* logo */}
      <div>
        <label className="block font-medium mb-2">Logo Jurusan</label>
        {form.logo && (
          <img
            src={form.logo}
            alt="Logo Preview"
            className="w-32 h-32 object-cover rounded-full mb-2 border"
          />
        )}

        <label className="cursor-pointer border border-[#8CBCAF] text-[#0A5C50] font-semibold px-6 py-2 rounded-full flex items-center gap-2">
          <Pencil size={16} /> Unggah Logo
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleLogoUpload}
          />
        </label>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => onSave(form)}
          className="bg-[#4BA8FF] text-white px-10 py-3 rounded-full font-semibold"
        >
          Simpan
        </button>
      </div>
    </div>
  );
}

/* INPUT FIELD */
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
