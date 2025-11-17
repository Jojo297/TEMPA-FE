import React, { useState } from "react";
import { X, Pencil } from "lucide-react";
import SidebarCampus from "@/components/SidebarCampus";

export default function Program() {
  const [program, setProgram] = useState({
    title: "KULIAH BERSERTIFIKAT 1 HARI",
    date: "10 Oktober 2025",
    banner: "",
    logo: "",
    mentorName: "Nama Mentor",
    mentorEmail: "mentor@example.com",
    description: "",
    jenisKegiatan: "",
    bukaPendaftaran: "",
    tanggalPelaksanaan: "",
    lokasi: "",
    waktuMulai: "",
    waktuSelesai: "",
    kuota: "",
    detailKegiatan: "",
  });

  const [editType, setEditType] = useState(null);

  const handleSave = (updated) => {
    setProgram(updated);
    setEditType(null);
  };

  return (
    <SidebarCampus>
      {/* ====================== HEADER BANNER ====================== */}
      <header className="bg-[#F8FAFB] mb-10">
        <div className="max-w-6xl mx-auto rounded-xl shadow-lg overflow-hidden relative">
          {/* Banner (Hanya Tampilan, Tidak Bisa Diedit) */}
          <div className="h-[400px] relative">
            <img
              src={
                program.banner ||
                "https://placehold.co/1200x400?text=Banner+Program"
              }
              alt="Banner Program"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info Program */}
          <div className="bg-[#013B35] text-white px-12 py-6 flex items-center gap-6 rounded-b-xl -mt-16 relative z-10">
            <div className="bg-white p-3 rounded-full shadow-lg border-4 border-gray-100 -mt-10">
              <img
                src={program.logo || "https://placehold.co/200?text=Logo"}
                alt="Logo Program"
                className="w-20 h-20 object-contain"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white">{program.title}</h1>
              <p className="text-sm text-gray-300 mt-1">{program.date}</p>
            </div>
          </div>
        </div>
      </header>

      {/* ====================== CARD PROGRAM ====================== */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="bg-white shadow-md rounded-xl p-6 border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#013B35]">
              Detail Program
            </h2>
            <button
              onClick={() => setEditType("program")}
              className="flex items-center gap-2 bg-[#013B35] text-white px-4 py-2 rounded-full text-sm"
            >
              <Pencil size={14} /> Edit Program
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Info label="Jenis Kegiatan" value={program.jenisKegiatan} />
            <Info label="Buka Pendaftaran" value={program.bukaPendaftaran} />
            <Info
              label="Tanggal Pelaksanaan"
              value={program.tanggalPelaksanaan}
            />
            <Info label="Lokasi" value={program.lokasi} />
            <Info label="Waktu Mulai" value={program.waktuMulai} />
            <Info label="Waktu Selesai" value={program.waktuSelesai} />
            <Info label="Kuota" value={program.kuota} />

            <div className="col-span-2">
              <p className="font-medium text-gray-600 mb-1">Detail Kegiatan</p>
              <p className="text-gray-800 whitespace-pre-line border p-3 rounded-xl">
                {program.detailKegiatan || "-"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ====================== CARD MENTOR ====================== */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="bg-white shadow-md rounded-xl p-6 border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#013B35]">
              Informasi Mentor
            </h2>
            <button
              onClick={() => setEditType("mentor")}
              className="flex items-center gap-2 bg-[#013B35] text-white px-4 py-2 rounded-full text-sm"
            >
              <Pencil size={14} /> Edit Mentor
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Info label="Nama Mentor" value={program.mentorName} />
            <Info label="Email Mentor" value={program.mentorEmail} />
          </div>
        </div>
      </div>

      {/* POPUP PROGRAM */}
      {editType === "program" && (
        <ProgramEditPopup
          initialData={program}
          onClose={() => setEditType(null)}
          onSave={handleSave}
        />
      )}

      {/* POPUP MENTOR */}
      {editType === "mentor" && (
        <MentorEditPopup
          initialData={program}
          onClose={() => setEditType(null)}
          onSave={handleSave}
        />
      )}
    </SidebarCampus>
  );
}

/* ========================== COMPONENT INFO ========================== */
function Info({ label, value }) {
  return (
    <div>
      <p className="font-medium text-gray-600">{label}</p>
      <p className="text-gray-900">{value || "-"}</p>
    </div>
  );
}

/* ========================== POPUP EDIT PROGRAM ========================== */

function ProgramEditPopup({ initialData, onClose, onSave }) {
  const [form, setForm] = useState(initialData);

  const handleInput = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999] p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl p-8 relative shadow-xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-600 hover:text-black"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Edit Detail Program</h2>

        <div className="grid grid-cols-2 gap-4">
          <Field
            label="Jenis Kegiatan"
            name="jenisKegiatan"
            value={form.jenisKegiatan}
            onChange={handleInput}
          />
          <Field
            label="Buka Pendaftaran"
            name="bukaPendaftaran"
            value={form.bukaPendaftaran}
            onChange={handleInput}
          />
          <Field
            label="Tanggal Pelaksanaan"
            name="tanggalPelaksanaan"
            value={form.tanggalPelaksanaan}
            onChange={handleInput}
          />
          <Field
            label="Lokasi"
            name="lokasi"
            value={form.lokasi}
            onChange={handleInput}
          />
          <Field
            label="Waktu Mulai"
            name="waktuMulai"
            value={form.waktuMulai}
            onChange={handleInput}
          />
          <Field
            label="Waktu Selesai"
            name="waktuSelesai"
            value={form.waktuSelesai}
            onChange={handleInput}
          />
          <Field
            label="Kuota"
            name="kuota"
            value={form.kuota}
            onChange={handleInput}
          />

          <div className="col-span-2">
            <label className="block font-medium mb-1">Detail Kegiatan</label>
            <textarea
              name="detailKegiatan"
              value={form.detailKegiatan}
              onChange={handleInput}
              className="w-full border rounded-xl p-3 h-32"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={() => onSave(form)}
            className="bg-[#013B35] text-white px-10 py-3 rounded-full font-semibold"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}

/* ========================== POPUP EDIT MENTOR ========================== */

function MentorEditPopup({ initialData, onClose, onSave }) {
  const [form, setForm] = useState(initialData);

  const handleInput = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999] p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl p-8 relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-600 hover:text-black"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Edit Informasi Mentor</h2>

        <div className="grid grid-cols-1 gap-4">
          <Field
            label="Nama Mentor"
            name="mentorName"
            value={form.mentorName}
            onChange={handleInput}
          />
          <Field
            label="Email Mentor"
            name="mentorEmail"
            value={form.mentorEmail}
            onChange={handleInput}
          />
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={() => onSave(form)}
            className="bg-[#013B35] text-white px-10 py-3 rounded-full font-semibold"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}

/* ========================== INPUT COMPONENT ========================== */

function Field({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-full p-3 px-5"
      />
    </div>
  );
}
