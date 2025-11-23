import { useState } from "react";
import { X, Plus, Pencil, MapPin } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

// Mock images kosong
const mockImages = [{ id: 1, url: "" }];

const initialCampusData = {
  id: 0,
  name: "",
  website: "",
  email: "",
  address: "",
  desc: "",
  visi: "",
  misi: "",
  logo: "",
  images: mockImages, // banner utama
};

// Mock jurusan awal kosong
const initialJurusanList = [];

export default function DetailCampus() {
  const [campusData, setCampusData] = useState(initialCampusData);
  const [jurusanList, setJurusanList] = useState(initialJurusanList);
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

  const [selectedJurusan, setSelectedJurusan] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleAddJurusan = (newJurusan) => {
    const jurusanWithId = { ...newJurusan, id: Date.now() };
    setJurusanList([...jurusanList, jurusanWithId]);
    setSelectedJurusan(jurusanWithId);
    setIsEditOpen(false);
  };

  const mainImage = campusData.images[0]?.url || "";

  return (
    <>
      {/* ====================== HEADER BANNER ====================== */}
      <header className="bg-[#F8FAFB]">
        <div className="max-w-6xl mx-auto rounded-xl shadow-lg overflow-hidden relative">
          {/* Banner Kampus */}
          <div className="h-[400px] relative">
            <img
              src={
                mainImage || "https://placehold.co/1200x400?text=Banner+Kampus"
              }
              alt="Banner Kampus"
              className="w-full h-full object-cover"
            />

            {/* EDIT BUTTON */}
            <button
              onClick={() => setIsInfoEditOpen(true)}
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
                <span className="text-sm">
                  {campusData.address || "Alamat belum diisi"}
                </span>
              </div>

              <p className="text-sm mt-1">
                {campusData.email || "Email belum diisi"}
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="mt-7 max-w-7xl bg-[#F8FAFB] mx-auto mb-20 flex flex-col items-start">
        <Tabs defaultValue="deskripsi" className="w-full">
          {/* Navigation button */}
          <TabsList className="flex flex-wrap gap-4 mb-5 justify-start h-auto bg-transparent">
            {/* description */}
            <TabsTrigger
              value="deskripsi"
              className="px-6 py-2 border border-[#013B35] bg-white text-[#013B35] rounded-full font-semibold 
                               hover:bg-[#013B35] hover:text-white transition 
                               data-[state=active]:bg-[#013B35] data-[state=active]:text-white"
            >
              Deskripsi
            </TabsTrigger>

            {/* peserta */}
            <TabsTrigger
              value="jurusan"
              className="px-6 py-2 border border-[#013B35] bg-white text-[#013B35] rounded-full font-semibold 
                               hover:bg-[#013B35] hover:text-white transition 
                               data-[state=active]:bg-[#013B35] data-[state=active]:text-white"
            >
              Jurusan
            </TabsTrigger>

            {/* mentor */}
            <TabsTrigger
              value="prestasi"
              className="px-6 py-2 border border-[#013B35] bg-white text-[#013B35] rounded-full font-semibold 
                               hover:bg-[#013B35] hover:text-white transition 
                               data-[state=active]:bg-[#013B35] data-[state=active]:text-white"
            >
              Prestasi
            </TabsTrigger>
          </TabsList>

          {/* content Tabs */}
          <TabsContent value="deskripsi">
            {/* ====================== DESKRIPSI ====================== */}
            <section className="bg-white rounded-2xl shadow-md p-8 md:p-10 space-y-6 w-full mt-5">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-[#013B35]">
                  Deskripsi Kampus
                </h2>

                <button
                  onClick={() => setIsDescEditOpen(true)}
                  className="flex items-center gap-2 bg-[#013B35] text-white px-4 py-2 rounded-full"
                >
                  <Pencil size={16} /> Edit
                </button>
              </div>

              <p className="text-gray-700 mt-4 leading-relaxed">
                {campusData.desc || "Belum ada deskripsi."}
              </p>

              <div className="mt-6">
                <h3 className="font-semibold text-lg">Visi</h3>
                <p className="text-gray-700 mt-2">
                  {campusData.visi || "Belum diisi."}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold text-lg">Misi</h3>
                <p className="text-gray-700 mt-2 whitespace-pre-line">
                  {campusData.misi || "Belum diisi."}
                </p>
              </div>
            </section>

            {/* ====================== POPUP EDIT DESKRIPSI ====================== */}
            {isDescEditOpen && (
              <EditPopup
                title="Edit Deskripsi Kampus"
                onClose={handleCloseEdit}
              >
                <EditCampusVisiMisiForm
                  initialData={campusData}
                  onSave={(data) => handleSave(data, "desc")}
                />
              </EditPopup>
            )}
          </TabsContent>

          <TabsContent value="jurusan">
            {/* ====================== KONTEN: JURUSAN ====================== */}
            <section className="mt-6 mx-auto  mb-20 w-full">
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

                {/* Bubble list */}
                <div className="flex flex-wrap gap-3">
                  {jurusanList.length === 0 && (
                    <span className="text-gray-500">
                      Belum ada jurusan yang ditambahkan.
                    </span>
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
                    <h3 className="text-xl font-bold text-[#013B35]">
                      {selectedJurusan.name}
                    </h3>
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
          </TabsContent>

          <TabsContent value="prestasi">
            {/* ====================== KONTEN: JURUSAN ====================== */}
            <section className="mt-6 mx-auto  mb-20 w-full">
              <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-[#013B35]">
                    Prestasi
                  </h2>
                  <button
                    onClick={() => setIsEditOpen(true)}
                    className="px-6 py-2 bg-[#4BA8FF] text-white rounded-full flex items-center gap-2 hover:bg-blue-600 transition-colors"
                  >
                    <Pencil size={18} /> Tambahkan Prestasi
                  </button>
                </div>

                {/* Bubble list */}
                <div className="flex flex-wrap gap-3">
                  {jurusanList.length === 0 && (
                    <span className="text-gray-500">
                      Belum ada prestasi yang ditambahkan.
                    </span>
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
                    <h3 className="text-xl font-bold text-[#013B35]">
                      {selectedJurusan.name}
                    </h3>
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
          </TabsContent>
        </Tabs>
      </section>

      {/* ====================== POPUP EDIT INFO ====================== */}
      {isInfoEditOpen && (
        <EditPopup title="Edit Informasi Kampus" onClose={handleCloseEdit}>
          <EditCampusInfoForm
            initialData={campusData}
            onSave={(data) => handleSave(data, "info")}
          />
        </EditPopup>
      )}
    </>
  );
}

/* ======================================================
                    POPUP COMPONENTS
====================================================== */

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

/* ==================== FORM EDIT INFO ==================== */

function EditCampusInfoForm({ initialData, onSave }) {
  const [form, setForm] = useState({
    ...initialData,
    images: initialData.images.slice(0, 1),
  });

  const handleInput = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleBannerUpload = () => {
    setForm({
      ...form,
      images: [{ id: Date.now(), url: "" }],
    });
  };

  const handleLogoUpload = () => {
    setForm({ ...form, logo: "uploaded-logo-url" });
  };

  return (
    <div className="space-y-6">
      <InputField
        label="Nama Kampus"
        name="name"
        value={form.name}
        onChange={handleInput}
      />
      <InputField
        label="Website"
        name="website"
        value={form.website}
        onChange={handleInput}
      />
      <InputField
        label="Email"
        name="email"
        value={form.email}
        onChange={handleInput}
      />
      <InputField
        label="Alamat"
        name="address"
        value={form.address}
        onChange={handleInput}
      />

      {/* Upload Logo */}
      <div>
        <label className="block font-medium mb-2">Logo Kampus</label>
        <button
          onClick={handleLogoUpload}
          className="border border-[#8CBCAF] text-[#0A5C50] font-semibold px-6 py-2 rounded-full flex items-center gap-2"
        >
          <Plus size={16} /> Upload Logo
        </button>
      </div>

      {/* Upload Banner */}
      <div>
        <label className="block font-medium mb-2">Banner / Foto Kampus</label>
        <button
          onClick={handleBannerUpload}
          className="border border-[#8CBCAF] text-[#0A5C50] font-semibold px-6 py-2 rounded-full flex items-center gap-2"
        >
          <Plus size={16} /> Upload Banner
        </button>
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

/* ==================== FORM TEXTAREA ==================== */

function EditCampusVisiMisiForm({ initialData, onSave }) {
  const [form, setForm] = useState(initialData);
  const handleInput = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="space-y-6">
      <TextAreaField
        label="Deskripsi"
        name="desc"
        height="h-32"
        value={form.desc}
        onChange={handleInput}
      />
      <TextAreaField
        label="Visi"
        name="visi"
        height="h-24"
        value={form.visi}
        onChange={handleInput}
      />
      <TextAreaField
        label="Misi"
        name="misi"
        height="h-24"
        value={form.misi}
        onChange={handleInput}
      />

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

/* ====================== INPUT FIELDS ====================== */

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
