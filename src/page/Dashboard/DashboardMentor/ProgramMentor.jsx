import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";

export default function ProgramMentor() {
  const [showEditModal, setShowEditModal] = useState(false);

  const mentorData = [
    {
      id: "3/12/2025",
      nama: "Budi Setiawan",
      email: "budi@mentor.com",
      hp: "081234567890",
      tanggal: "03 Des 2025 - 3 Juni 2026",
    },
    {
      id: "3/12/2025",
      nama: "Santi Pratiwi",
      email: "santi@mentor.com",
      hp: "082345678900",
      tanggal: "03 Des 2025 - 3 Juni 2026",
    },
  ];

  return (
    <div className="bg-white mt-8 p-6 rounded-xl shadow">
      {/* TITLE + EDIT BUTTON */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-[#0B3B2E]">Mentor Terdaftar</h2>

        <button
          onClick={() => setShowEditModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#003631] text-white rounded-lg hover:bg-[#0A4F42] transition">
          <FiEdit2 size={18} />
          Edit
        </button>
      </div>

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
            {mentorData.map((m, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-3">{m.id}</td>
                <td className="p-3">{m.nama}</td>
                <td className="p-3">{m.email}</td>
                <td className="p-3">{m.hp}</td>
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

      {/* MODAL EDIT (opsional, kosong dulu biar tidak error) */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
            <h3 className="text-lg font-bold mb-4 text-[#003631]">
              Edit Mentor
            </h3>

            <button
              onClick={() => setShowEditModal(false)}
              className="w-full py-2 bg-[#003631] text-white rounded-lg">
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
