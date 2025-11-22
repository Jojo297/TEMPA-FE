import React, { useState } from "react";
import { X, Pencil, Calendar } from "lucide-react";
import { ProgramDummy } from "@/lib/ProgramDummy";
import { Link, useParams } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardCampusDetailProgram() {
  // get id program from url
  const { id } = useParams();
  const idProgram = parseInt(id);

  const program = ProgramDummy.find((item) => item.id == idProgram);
  console.log(program);

  const [editType, setEditType] = useState(null);

  const handleSave = (updated) => {
    setProgram(updated);
    setEditType(null);
  };

  return (
    <>
      {/* breadcum */}
      <Breadcrumb className="mb-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="hover:text-primary">
              <Link to="/dashboard-campus">Beranda</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="hover:text-primary">
              <Link to="/dashboard-campus/program">Program</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="text-primary">
            <BreadcrumbPage className="text-primary">
              {program.program_name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* ====================== HEADER BANNER ====================== */}
      <div className="relative rounded-xl overflow-hidden shadow-md mb-10">
        <div className="relative">
          <img src="" alt="Program" className="w-full h-72 object-cover" />
          {/* EDIT BUTTON */}
          <button
            onClick=""
            className="absolute top-4 right-4 bg-white text-[#013B35] px-4 py-2 rounded-full shadow-md flex items-center gap-2"
          >
            <Pencil size={16} /> Edit Info
          </button>
        </div>
        {/* Overlay konten di bawah gambar */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#0E3B3D]/90 text-white p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">
              {program.program_name}
            </h1>
            {/* start date */}
            <div className="flex items-center gap-2 text-gray-300 text-sm mt-2">
              <Calendar size={16} />
              <span>
                {new Date(program.start_date).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

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
              value="peserta"
              className="px-6 py-2 border border-[#013B35] bg-white text-[#013B35] rounded-full font-semibold 
                               hover:bg-[#013B35] hover:text-white transition 
                               data-[state=active]:bg-[#013B35] data-[state=active]:text-white"
            >
              Peserta
            </TabsTrigger>

            {/* mentor */}
            <TabsTrigger
              value="mentor"
              className="px-6 py-2 border border-[#013B35] bg-white text-[#013B35] rounded-full font-semibold 
                               hover:bg-[#013B35] hover:text-white transition 
                               data-[state=active]:bg-[#013B35] data-[state=active]:text-white"
            >
              Mentor
            </TabsTrigger>
          </TabsList>

          {/* content Tabs */}
          <TabsContent value="deskripsi">
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
                  <Info
                    label="Buka Pendaftaran"
                    value={program.bukaPendaftaran}
                  />
                  <Info
                    label="Tanggal Pelaksanaan"
                    value={program.tanggalPelaksanaan}
                  />
                  <Info label="Lokasi" value={program.lokasi} />
                  <Info label="Waktu Mulai" value={program.waktuMulai} />
                  <Info label="Waktu Selesai" value={program.waktuSelesai} />
                  <Info label="Kuota" value={program.kuota} />

                  <div className="col-span-2">
                    <p className="font-medium text-gray-600 mb-1">
                      Detail Kegiatan
                    </p>
                    <p className="text-gray-800 whitespace-pre-line border p-3 rounded-xl">
                      {program.detailKegiatan || "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="peserta">
            {/* ====================== CARD peserta ====================== */}
            <div className="max-w-6xl mx-auto mb-10">
              <div className="bg-white shadow-md rounded-xl p-6 border">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-[#013B35]">
                    Peserta yang mendaftar
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Info label="Nama Peserta" value={program.mentorName} />
                  <Info label="Email Peserta" value={program.mentorEmail} />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="mentor">
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
                  <Info label="Nama Peseta" value={program.mentorName} />
                  <Info label="Email Mentor" value={program.mentorEmail} />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

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
    </>
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
