import React, { useState } from "react";
import {
  Edit2,
  Trash2,
  Plus,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import SidebarAdmin from "@/components/SidebarAdmin";

export default function Siswa() {
  const [siswaList, setSiswaList] = useState([
    {
      id: "S001",
      nama: "Siswa Lorem Ipsum 1",
      email: "siswa1@gmail.com",
    },
    {
      id: "S002",
      nama: "Siswa Lorem Ipsum 2",
      email: "siswa2@gmail.com",
    },
    {
      id: "S003",
      nama: "Siswa Lorem Ipsum 3",
      email: "siswa3@gmail.com",
    },
    {
      id: "S004",
      nama: "Siswa Lorem Ipsum 4",
      email: "siswa4@gmail.com",
    },
    {
      id: "S005",
      nama: "Siswa Lorem Ipsum 5",
      email: "siswa5@gmail.com",
    },
  ]);

  const handleEdit = (id) => alert(`Edit siswa: ${id}`);
  const handleDelete = (id) => {
    if (window.confirm("Hapus siswa ini?")) {
      setSiswaList(siswaList.filter((item) => item.id !== id));
    }
  };

  return (
    <SidebarAdmin>
      {/* WRAPPER */}
      <div className="bg-[#013B36] min-h-[85vh] p-6 rounded-2xl text-white mt-3">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold tracking-wide">Kelola Siswa</h1>

          <div className="flex items-center gap-3">
            <button className="p-2.5 rounded-lg bg-white/20 hover:bg-white/30 transition">
              <RefreshCw size={18} />
            </button>

            <button className="flex items-center gap-2 bg-[#B4D0E7] text-[#003135] px-4 py-2.5 rounded-lg font-semibold hover:bg-[#A7C5DA] transition">
              <span>Tambah Siswa</span>
              <Plus size={18} />
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-xl border border-white/10">
          <table className="w-full">
            <thead className="bg-[#1A5A5A] text-white">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-medium">ID</th>
                <th className="py-3 px-6 text-left text-sm font-medium">
                  Nama
                </th>
                <th className="py-3 px-6 text-left text-sm font-medium">
                  Email
                </th>
                <th className="py-3 px-6 text-center text-sm font-medium w-40">
                  Tindakan
                </th>
              </tr>
            </thead>

            <tbody className="text-white/90">
              {siswaList.map((siswa) => (
                <tr
                  key={siswa.id}
                  className="border-b border-white/10 hover:bg-[#1A5A5A] transition">
                  <td className="py-4 px-6">{siswa.id}</td>
                  <td className="py-4 px-6">{siswa.nama}</td>
                  <td className="py-4 px-6">{siswa.email}</td>

                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-5">
                      <button
                        className="text-[#A8D5E8] hover:text-white transition"
                        onClick={() => handleEdit(siswa.id)}>
                        <Edit2 size={18} />
                      </button>

                      <button
                        className="text-red-400 hover:text-red-300 transition"
                        onClick={() => handleDelete(siswa.id)}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-end mt-4 pr-1">
          <div className="flex items-center gap-2">
            <button
              className="p-1 rounded-sm hover:bg-white/10 transition disabled:opacity-50"
              disabled>
              <ChevronLeft size={16} />
            </button>

            <span className="text-sm border px-3 py-1 rounded-sm border-white/40">
              1/1
            </span>

            <button
              className="p-1 rounded-sm hover:bg-white/10 transition disabled:opacity-50"
              disabled>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </SidebarAdmin>
  );
}
