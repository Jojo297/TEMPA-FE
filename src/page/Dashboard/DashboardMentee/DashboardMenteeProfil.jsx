import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";

// Helper component for standard input fields
const InputGroup = ({ label, type, value, onChange }) => (
  <div>
    <label className="block mb-1 text-sm font-medium">{label}</label>
    <input
      type={type}
      // Tambahkan state dan handler jika diperlukan, untuk saat ini dibiarkan kosong
      value={value}
      onChange={onChange}
      className={`w-full p-3 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#96CCEC] focus:border-transparent transition ${
        // Fix for date input appearance
        type === "date" ? "appearance-none" : ""
      }`}
      placeholder={`Masukkan ${label.toLowerCase()}`}
    />
  </div>
);

export default function DashboardMenteeDetailProfil() {
  const [previewImage, setPreviewImage] = useState(null);

  // State untuk menyimpan nilai input form (Opsional, untuk demonstrasi)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dob: "",
    gender: "",
    phone: "",
    majorInterest1: "",
    majorInterest2: "",
  });

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) setPreviewImage(URL.createObjectURL(file));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for saving data here
    console.log("Form submitted!", formData);
  };

  return (
    <div className="min-h-screen bg-[#F7F9F6] p-4 md:p-12 font-sans">
      {/* --- HEADER BACK BUTTON + TITLE BOX (Centered Text) --- */}
      <div className="bg-[#003631] text-white rounded-xl p-6 relative w-full max-w-3xl mx-auto shadow-lg">
        {/* Back Button positioned on the left */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 cursor-pointer transition hover:opacity-75">
          <ChevronLeft size={26} />
        </div>

        {/* Centered Title and Subtitle */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Profil</h1>
          <p className="text-sm text-white/80 mt-1 max-w-md mx-auto">
            Kami membutuhkan beberapa informasi dasar. Silakan isi data diri
            Anda di bawah ini.
          </p>
        </div>
      </div>

      {/* --- MAIN CONTENT: PROFILE PHOTO (Left) and FORM (Right) --- */}
      {/* Container utama menggunakan grid atau flex untuk layout dua kolom pada desktop */}
      <div className="mt-8 w-full max-w-3xl mx-auto flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0 items-start">
        {/* 1. PROFILE PHOTO SECTION (Left Column - OUTSIDE the main card) */}
        {/* Bagian ini menggunakan lebar 1/3 di desktop dan di tengah pada mobile */}
        <div className="md:w-1/3 w-full flex flex-col items-center md:items-start md:sticky md:top-12">
          {/* Photo Circle Placeholder */}
          <div className="w-36 h-36 md:w-40 md:h-40 bg-gray-300 border-4 border-gray-400 rounded-full overflow-hidden mb-4 flex items-center justify-center shadow-lg">
            {previewImage ? (
              <img
                src={previewImage}
                className="w-full h-full object-cover"
                alt="Preview"
              />
            ) : (
              // Simple SVG User Icon as Placeholder (menggunakan warna abu-abu terang)
              <svg
                className="w-20 h-20 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"></path>
              </svg>
            )}
          </div>

          {/* Upload Button */}
          <label className="cursor-pointer">
            <div className="px-5 py-2 bg-[#96CCEC] hover:bg-[#7dbedd] text-[#003631] rounded-lg text-sm font-medium transition duration-200 shadow-md">
              Upload Foto Profil
            </div>
            <input
              type="file"
              className="hidden"
              onChange={handleUpload}
              accept="image/*"
            />
          </label>
        </div>

        {/* 2. MAIN FORM CARD (Right Column - Takes up remaining 2/3 space) */}
        <div className="bg-[#003631] rounded-xl p-8 md:w-2/3 w-full shadow-xl text-white">
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputGroup
              label="Nama Lengkap"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
            />
            <InputGroup
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <InputGroup
              label="Tanggal Lahir"
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
            />
            <InputGroup
              label="Jenis Kelamin"
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            />
            <InputGroup
              label="Nomor Handphone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />

            {/* MINAT JURUSAN (Side-by-side Selects) */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                Minat Jurusan
              </label>
              <div className="flex gap-3">
                {/* Select 1 */}
                <select
                  className="w-1/2 p-3 rounded-lg bg-white text-gray-800 border border-gray-300 focus:ring-[#96CCEC] focus:border-[#96CCEC] appearance-none cursor-pointer"
                  name="majorInterest1"
                  value={formData.majorInterest1}
                  onChange={handleInputChange}
                  // Custom arrow style for consistent look across browsers
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none'%3e%3cpath d='M7 7l3 3 3-3m0 6l-3 3-3-3' stroke='%234B5563' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 0.75rem center",
                    backgroundSize: "1.5em 1.5em",
                  }}>
                  <option value="" disabled>
                    Pilih 1
                  </option>
                  <option value="ilmu-komputer">Ilmu Komputer</option>
                  <option value="kedokteran">Kedokteran</option>
                  {/* Tambahkan opsi lain di sini */}
                </select>

                {/* Select 2 */}
                <select
                  className="w-1/2 p-3 rounded-lg bg-white text-gray-800 border border-gray-300 focus:ring-[#96CCEC] focus:border-[#96CCEC] appearance-none cursor-pointer"
                  name="majorInterest2"
                  value={formData.majorInterest2}
                  onChange={handleInputChange}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none'%3e%3cpath d='M7 7l3 3 3-3m0 6l-3 3-3-3' stroke='%234B5563' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 0.75rem center",
                    backgroundSize: "1.5em 1.5em",
                  }}>
                  <option value="" disabled>
                    Pilih 2
                  </option>
                  <option value="arsitektur">Arsitektur</option>
                  <option value="hukum">Hukum</option>
                  {/* Tambahkan opsi lain di sini */}
                </select>
              </div>
            </div>

            {/* BUTTON SIMPAN */}
            <button
              type="submit"
              className="w-full bg-[#96CCEC] text-[#003631] py-3 mt-6 rounded-lg font-bold hover:bg-[#7dbedd] transition shadow-lg transform hover:scale-[1.01] duration-150">
              Simpan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
