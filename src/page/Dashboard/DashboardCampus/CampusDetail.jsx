import React, { useState } from "react";
import { X, Plus, Pencil } from "lucide-react";
import { NavbarLandingPage } from "./NavbarLandingPage";

export default function CampusDetail() {
  const [campusData, setCampusData] = useState({
    name: "Nama Kampus",
    website: "",
    address: "",
    desc: "Deskripsi kampus belum ditambahkan.",
    visi: "Visi belum ditambahkan.",
    misi: "Misi belum ditambahkan.",
    logo: null,
    images: [],
  });

  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAF8] font-sans flex flex-col">
      <NavbarLandingPage />

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mt-6 px-6">
        <div className="bg-[#013B35] text-white rounded-2xl p-8 relative">
          {/* IMAGE GRID */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            {campusData.images.length === 0 ? (
              [...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-full h-28 bg-white/20 rounded-xl flex items-center justify-center"
                >
                  <span className="opacity-60">Gambar</span>
                </div>
              ))
            ) : (
              campusData.images.map((img) => (
                <img
                  key={img.id}
                  src={img.url}
                  className="w-full h-28 rounded-xl object-cover bg-white/20"
                />
              ))
            )}
          </div>

          {/* LOGO */}
          <div className="w-28 h-28 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center text-[#013B35] text-xl font-bold">
            {campusData.logo ? <img src={campusData.logo} className="w-full h-full rounded-full object-cover" /> : "Logo"}
          </div>

          {/* NAME + EDIT */}
          <div className="mt-4 flex items-center gap-3">
            <h1 className="text-3xl font-bold">{campusData.name}</h1>
            <button
              onClick={() => setIsEditOpen(true)}
              className="p-2 bg-white text-[#013B35] rounded-full hover:bg-gray-200"
            >
              <Pencil size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <section className="mt-12 max-w-6xl mx-auto px-6 mb-20">
        <div className="bg-white rounded-2xl shadow-md p-8 space-y-6">
          <h2 className="text-2xl font-bold text-[#013B35]">
            Tentang {campusData.name}
          </h2>
          <p className="text-gray-700 leading-relaxed">{campusData.desc}</p>

          <h3 className="text-2xl font-bold text-[#013B35]">Visi & Misi</h3>
          <p className="text-gray-700">
            <strong>Visi:</strong> {campusData.visi}
          </p>
          <p className="text-gray-700">
            <strong>Misi:</strong> {campusData.misi}
          </p>
        </div>
      </section>

      {/* ============================== */}
      {/*          POPUP EDIT           */}
      {/* ============================== */}

      {isEditOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999]">
          <div className="bg-[#F7F9F7] w-full max-w-4xl rounded-2xl p-10 relative shadow-xl h-[85vh] overflow-y-auto">
            <button
              onClick={() => setIsEditOpen(false)}
              className="absolute top-6 right-6 text-gray-600 hover:text-black"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-8">Tambahkan Informasi</h2>

            {/* FORM */}
            <EditCampusForm
              initialData={campusData}
              onSave={(updated) => {
                setCampusData(updated);
                setIsEditOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

/* ======================================================
   FORM COMPONENT
====================================================== */

function EditCampusForm({ initialData, onSave }) {
  const [form, setForm] = useState(initialData);

  const handleAddImage = () => {
    const newImg = { id: Date.now(), url: "" }; // placeholder
    setForm({ ...form, images: [...form.images, newImg] });
  };

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">

      {/* Nama Kampus */}
      <InputField
        label="Nama Kampus *"
        name="name"
        value={form.name}
        onChange={handleInput}
      />

      {/* Website */}
      <InputField
        label="Link Website Kampus *"
        name="website"
        value={form.website}
        onChange={handleInput}
      />

      {/* Alamat */}
      <InputField
        label="Alamat *"
        name="address"
        value={form.address}
        onChange={handleInput}
      />

      {/* Logo */}
      <div>
        <label className="block font-medium mb-2">Logo *</label>
        <button className="border border-[#8CBCAF] px-6 py-2 rounded-full flex items-center gap-2">
          <Plus size={16} /> Tambahkan Gambar
        </button>
      </div>

      {/* Foto Kampus */}
      <div>
        <label className="block font-medium mb-2">Foto Kampus *</label>

        <div className="flex flex-wrap gap-3">
          {form.images.map((img) => (
            <div
              key={img.id}
              className="w-40 h-24 bg-white border border-[#8CBCAF] rounded-xl flex items-center justify-center text-gray-400"
            >
              Gambar
            </div>
          ))}

          <button
            onClick={handleAddImage}
            className="w-40 h-24 border border-[#8CBCAF] rounded-full flex items-center justify-center gap-2 text-[#0A5C50]"
          >
            <Plus size={18} />
            Tambahkan Gambar
          </button>
        </div>
      </div>

      {/* Deskripsi */}
      <div>
        <label className="block font-medium">Deskripsi</label>
        <textarea
          name="desc"
          value={form.desc}
          onChange={handleInput}
          className="w-full border border-[#8CBCAF] rounded-xl p-4 mt-1 h-28"
        />
      </div>

      {/* Visi */}
      <div>
        <label className="block font-medium">Visi</label>
        <textarea
          name="visi"
          value={form.visi}
          onChange={handleInput}
          className="w-full border border-[#8CBCAF] rounded-xl p-4 mt-1 h-20"
        />
      </div>

      {/* Misi */}
      <div>
        <label className="block font-medium">Misi</label>
        <textarea
          name="misi"
          value={form.misi}
          onChange={handleInput}
          className="w-full border border-[#8CBCAF] rounded-xl p-4 mt-1 h-20"
        />
      </div>

      {/* Save Button */}
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

/* ======================================================
   Reusable Input
====================================================== */

function InputField({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-[#8CBCAF] rounded-full p-3 px-5"
      />
    </div>
  );
}
