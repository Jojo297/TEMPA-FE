import React, { useState } from "react";
import { X, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import SidebarCampus from "@/components/SidebarCampus";

// Mock data kampus
const initialCampusData = {
  id: 1,
  name: "Nama Kampus",
  logo: "",
  images: [{ id: 1, url: "" }],
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

  const mainImage = campusData.images.length > 0 ? campusData.images[0] : null;

  return (
    <SidebarCampus>
      <div className="min-h-screen bg-[#F8FAF8] font-sans pb-20">
        {/* HEADER */}
        <div className="max-w-6xl mx-auto mt-6 px-6 w-full">
          <div className="bg-[#013B35] text-white rounded-2xl p-8 relative">
            <div className="mb-6 h-72 w-full">
              {mainImage && mainImage.url ? (
                <img
                  src={mainImage.url}
                  alt="Foto Kampus"
                  className="w-full h-full object-cover rounded-xl bg-white/20"
                />
              ) : (
                <div className="w-full h-full bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="opacity-60 text-xl font-semibold">
                    Foto Kampus Belum Diunggah
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* LOGO + NAMA KAMPUS */}
          <div className="bg-white rounded-2xl shadow-lg p-8 -mt-16 relative z-10">
            <div className="w-28 h-28 bg-white rounded-full border-4 border-white shadow-xl -mt-40 mb-4 flex items-center justify-center text-[#013B35] text-xl font-bold">
              {campusData.logo ? (
                <img
                  src={campusData.logo}
                  className="w-full h-full rounded-full object-cover"
                  alt="Logo Kampus"
                />
              ) : (
                "Logo"
              )}
            </div>

            <h1 className="text-3xl font-bold text-[#013B35]">{campusData.name}</h1>

            {/* navigasi  */}
            <div className="flex flex-wrap gap-4 mt-6 mb-6 font-medium">
              <Link
                to=""
                className="px-6 py-2 border bg-[#013B35] text-white rounded-full font-semibold"
              >
                Deskripsi
              </Link>
              <Link
                to=""
                className="px-6 py-2 border border-[#013B35] text-[#013B35] rounded-full font-semibold hover:bg-[#013B35] hover:text-white transition"
              >
                Prestasi
              </Link>
              <Link
                to=""
                className="px-6 py-2 border border-[#013B35] text-[#013B35] rounded-full font-semibold hover:bg-[#013B35] hover:text-white transition"
              >
                Jurusan
              </Link>
              <Link
                to=""
                className="px-6 py-2 border border-[#013B35] text-[#013B35] rounded-full font-semibold hover:bg-[#013B35] hover:text-white transition"
              >
                Program
              </Link>
            </div>
          </div>
        </div>

        {/* kontent: Tambah Jurusan */}
        <section className="mt-6 max-w-6xl mx-auto px-6 mb-20 w-full">
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#013B35]">Jurusan</h2>
              <button
                onClick={() => setIsEditOpen(true)}
                className="px-6 py-2 bg-[#4BA8FF] text-white rounded-full flex items-center gap-2 hover:bg-blue-600 transition-colors"
              >
                <Pencil size={18} /> Tambah Jurusan
              </button>
            </div>

            {/* Bubble list jurusan */}
            <div className="flex flex-wrap gap-3">
              {jurusanList.length === 0 && (
                <span className="text-gray-500">Belum ada jurusan yang ditambahkan.</span>
              )}
              {jurusanList.map((j) => (
                <button
                  key={j.id}
                  onClick={() => setSelectedJurusan(j)}
                  className={`px-4 py-2 rounded-full border ${
                    selectedJurusan?.id === j.id
                      ? "bg-[#013B35] text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {j.name}
                </button>
              ))}
            </div>

            {/* Detail jurusan */}
            {selectedJurusan && (
              <div className="mt-6 space-y-4">
                <h3 className="text-xl font-bold text-[#013B35]">{selectedJurusan.name}</h3>
                {selectedJurusan.logo && (
                  <img
                    src={selectedJurusan.logo}
                    alt="Logo Jurusan"
                    className="w-32 h-32 object-cover rounded-full border"
                  />
                )}
                <p className="text-gray-700">{selectedJurusan.desc}</p>
              </div>
            )}
          </div>
        </section>

        {/*tambah jurusan popup */}
        {isEditOpen && (
          <EditPopup title="Tambah Jurusan" onClose={() => setIsEditOpen(false)}>
            <EditJurusanForm onSave={handleAddJurusan} />
          </EditPopup>
        )}
      </div>
    </SidebarCampus>
  );
}

/*popup*/
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

/*FORM JURUSAN DENGAN UPLOAD LOGO*/
function EditJurusanForm({ onSave }) {
  const [form, setForm] = useState({ name: "", desc: "", logo: "" });

  const handleInput = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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
      <InputField label="Nama Jurusan *" name="name" value={form.name} onChange={handleInput} />
      <TextAreaField label="Deskripsi Jurusan" name="desc" value={form.desc} onChange={handleInput} height="h-24" />

      {/* Logo Jurusan */}
      <div>
        <label className="block font-medium mb-2">Logo Jurusan</label>
        {form.logo && (
          <img src={form.logo} alt="Logo Preview" className="w-32 h-32 object-cover rounded-full mb-2 border" />
        )}
        <label className="cursor-pointer border border-[#8CBCAF] text-[#0A5C50] font-semibold px-6 py-2 rounded-full flex items-center gap-2">
          <Pencil size={16} /> Unggah Logo
          <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
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
