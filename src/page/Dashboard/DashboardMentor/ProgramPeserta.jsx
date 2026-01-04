import React from "react";

export default function ProgramPeserta() {
  const pesertaData = [
    {
      id: "3/2/2025",
      nama: "Paket 6 Bulan",
      email: "30302500",
      hp: "03 Des 2025 - 3 Juni 2026",
    },
    {
      id: "3/2/2025",
      nama: "Paket 6 Bulan",
      email: "30302500",
      hp: "03 Des 2025 - 3 Juni 2026",
    },
    {
      id: "3/2/2025",
      nama: "Paket 6 Bulan",
      email: "30302500",
      hp: "03 Des 2025 - 3 Juni 2026",
    },
    {
      id: "3/2/2025",
      nama: "Paket 6 Bulan",
      email: "30302500",
      hp: "03 Des 2025 - 3 Juni 2026",
    },
    {
      id: "3/2/2025",
      nama: "Paket 6 Bulan",
      email: "30302500",
      hp: "03 Des 2025 - 3 Juni 2026",
    },
  ];

  return (
    <div className="bg-white mt-8 p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold text-[#0B3B2E] mb-4">
        Peserta yang Mendaftar
      </h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[#96CCEC80] text-[#000000] text-left">
              <th className="p-3">ID</th>
              <th className="p-3">Nama</th>
              <th className="p-3">Email</th>
              <th className="p-3">No. Hp</th>
            </tr>
          </thead>
          <tbody>
            {pesertaData.map((p, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-3">{p.id}</td>
                <td className="p-3">{p.nama}</td>
                <td className="p-3">{p.email}</td>
                <td className="p-3">{p.hp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center mt-4 gap-3">
        <button className="px-4 py-1 border rounded-lg text-[#0B3B2E]">
          &lt;
        </button>
        <span className="px-4 py-1 border rounded-lg bg-[#0B3B2E] text-white">
          1
        </span>
        <button className="px-4 py-1 border rounded-lg text-[#0B3B2E]">
          &gt;
        </button>
      </div>
    </div>
  );
}
