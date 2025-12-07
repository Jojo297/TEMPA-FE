import React from "react";
import SidebarAdmin from "@/components/SidebarAdmin";

const VerificationField = ({ label, value }) => (
  <div className="mb-5">
    <label className="block text-white text-sm font-medium mb-2">{label}</label>

    <div className="bg-transparent border border-white/40 rounded-lg py-3 px-4 text-sm text-white/90">
      {value}
    </div>
  </div>
);

export default function Verifikasi() {
  const kampusData = {
    nama: "Universitas Lorem Ipsum Jakarta",
    email: "lorem.ipsum@kampus.ac.id",
    alamat: "Jl. Contoh No. 123, Kecamatan Jakarta Pusat, DKI Jakarta",
    kontak: "021-99887766",
    akreditasi: "A (Sangat Baik)",
    tanggalRegistrasi: "12 Desember 2024",
  };

  return (
    <SidebarAdmin>
      {/* BLOCK HEADER BESAR */}
      <div className="bg-[#013B36] text-white rounded-xl px-10 py-6 mt-4 shadow-md flex justify-center">
        <h2 className="text-3xl font-semibold tracking-wide">
          Verifikasi Kampus
        </h2>
      </div>

      {/* CARD KONTEN */}
      <div className="bg-[#013B36] text-white rounded-xl shadow-lg p-8 mt-8 mb-10">
        {/* FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
          <VerificationField label="Nama Kampus" value={kampusData.nama} />
          <VerificationField label="Email Kampus" value={kampusData.email} />

          {/* Full Width */}
          <div className="md:col-span-2">
            <VerificationField
              label="Alamat Kampus"
              value={kampusData.alamat}
            />
          </div>

          <VerificationField label="Nomor Kontak" value={kampusData.kontak} />
          <VerificationField
            label="Akreditasi Institusi"
            value={kampusData.akreditasi}
          />
          <VerificationField
            label="Tanggal Registrasi"
            value={kampusData.tanggalRegistrasi}
          />
        </div>

        {/* SPACING */}
        <div className="my-10 border-t border-white/20"></div>

        {/* DOKUMEN */}
        <h3 className="text-xl font-semibold mb-4">
          Dokumen Pendukung (PDF/Image)
        </h3>

        <div className="flex flex-wrap gap-4 mb-10">
          <button className="bg-[#2E5859] text-white px-4 py-2 rounded-lg hover:bg-[#3b7273] text-sm">
            Lihat Akta Pendirian
          </button>
          <button className="bg-[#2E5859] text-white px-4 py-2 rounded-lg hover:bg-[#3b7273] text-sm">
            Lihat Sertifikat Akreditasi
          </button>
        </div>

        {/* BUTTON BAWAH – CENTER + STYLE SAMA */}
        <div className="flex justify-center gap-6">
          <button className="bg-[#D9D9D9] text-[#003135] font-semibold px-10 py-3 rounded-lg shadow hover:opacity-90 transition">
            Ditolak
          </button>

          <button className="bg-[#96CCEC] text-[#003135] font-semibold px-10 py-3 rounded-lg shadow hover:bg-[#7bc8e9] transition">
            Diterima
          </button>
        </div>
      </div>
    </SidebarAdmin>
  );
}
