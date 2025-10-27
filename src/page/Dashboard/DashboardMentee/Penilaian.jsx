import SidebarWithNavbar from "@/components/SidebarWithNavbar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { jurusanList } from "@/lib/JurusanList";
import PenilaianModal from "@/components/PenilaianModal"; // 🧩 import popup

export default function Penilaian() {
  const [activeTab, setActiveTab] = useState("belumDinilai");
  const [selectedProgram, setSelectedProgram] = useState(null);

  // Fungsi buka & tutup popup
  const handleOpenPopup = (program) => setSelectedProgram(program);
  const handleClosePopup = () => setSelectedProgram(null);

  // Fungsi kirim penilaian
  const handleSubmit = (data) => {
    console.log("Penilaian:", { program: selectedProgram, ...data });
    alert("Terima kasih atas penilaiannya!");
  };

  const allPrograms = jurusanList.flatMap((jurusan) =>
    jurusan.programTerkait.map((program) => ({
      ...program,
      jurusanNama: jurusan.nama,
    }))
  );

  return (
    <>
      <section className="bg-[#013B35] text-white rounded-xl py-8 px-6 text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Penilaian</h1>
        <p className="max-w-2xl mx-auto text-gray-200">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Penilaian Saya</h2>
        <div className="flex gap-4">
          <Button
            onClick={() => setActiveTab("belumDinilai")}
            className={`px-6 py-2 rounded-full text-sm font-medium ${
              activeTab === "belumDinilai"
                ? "bg-[#A5E3E7] text-[#013B35]"
                : "border border-[#013B35] text-[#013B35] bg-transparent"
            }`}
          >
            Belum Dinilai
          </Button>
          <Button
            onClick={() => setActiveTab("penilaianSaya")}
            className={`px-6 py-2 rounded-full text-sm font-medium ${
              activeTab === "penilaianSaya"
                ? "bg-[#A5E3E7] text-[#013B35]"
                : "border border-[#013B35] text-[#013B35] bg-transparent"
            }`}
          >
            Penilaian Saya
          </Button>
        </div>
      </section>

      {/* ================== Program Cards ================== */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {allPrograms.map((program, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all"
          >
            {program.gambar && (
              <img
                src={program.gambar}
                alt={program.nama}
                className="w-full h-44 object-cover"
              />
            )}
            <div className="p-5">
              <h3 className="font-bold text-lg text-[#013B35] mb-1">
                {program.nama}
              </h3>
              <p className="text-sm text-gray-700">{program.jurusanNama}</p>
              <p className="text-sm text-gray-500">{program.lokasi}</p>
              <p className="text-sm text-gray-500 mb-4">{program.tanggal}</p>
              <button
                onClick={() => handleOpenPopup(program)} // 🧩 buka popup
                className="w-full bg-[#A5E3E7] text-[#013B35] font-medium py-2 rounded-lg hover:bg-[#8ed1d5] transition"
              >
                Beri Penilaian
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* ================== Popup Modal ================== */}
      <PenilaianModal
        program={selectedProgram}
        onClose={handleClosePopup}
        onSubmit={handleSubmit}
      />
    </>
  );
}
