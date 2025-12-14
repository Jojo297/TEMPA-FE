import React from "react";
import { FiEdit2 } from "react-icons/fi";

export default function ProgramDeskripsi() {
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showMentorModal, setShowMentorModal] = React.useState(false);
  const [showCampusModal, setShowCampusModal] = React.useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* DETAIL PROGRAM */}
      <div className="md:col-span-2 bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold">Detail Program</h2>
          <button
            className="flex items-center gap-2 text-[#0B3B2E] font-semibold"
            onClick={() => setShowEditModal(true)}>
            <FiEdit2 /> Edit
          </button>
        </div>

        {/* Modal Edit Program */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
            <div className="bg-white w-full max-w-3xl rounded-xl p-6 overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-[#0B3B2E]">
                  Tambahkan Detail Program
                </h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-2xl font-bold text-gray-600">
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="font-semibold text-sm">Deskripsi*</label>
                  <input className="w-full border rounded-lg p-2 mt-1" />
                </div>

                <div>
                  <label className="font-semibold text-sm">
                    Jenis Kegiatan*
                  </label>
                  <select className="w-full border rounded-lg p-2 mt-1">
                    <option>Onsite</option>
                    <option>Online</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-sm">
                    Batas Akhir Pendaftaran*
                  </label>
                  <input
                    type="date"
                    className="w-full border rounded-lg p-2 mt-1"
                  />
                </div>

                <div>
                  <label className="font-semibold text-sm">
                    Tanggal Pelaksanaan*
                  </label>
                  <input
                    type="date"
                    className="w-full border rounded-lg p-2 mt-1"
                  />
                </div>

                <div>
                  <label className="font-semibold text-sm">Lokasi*</label>
                  <input className="w-full border rounded-lg p-2 mt-1" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-sm">
                      Waktu Mulai*
                    </label>
                    <input
                      type="time"
                      className="w-full border rounded-lg p-2 mt-1"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-sm">
                      Waktu Selesai*
                    </label>
                    <input
                      type="time"
                      className="w-full border rounded-lg p-2 mt-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-sm">
                    Kapasitas Peserta*
                  </label>
                  <input className="w-full border rounded-lg p-2 mt-1" />
                </div>

                <div>
                  <label className="font-semibold text-sm">
                    Detail Kegiatan*
                  </label>
                  <textarea className="w-full border rounded-lg p-2 mt-1 h-28"></textarea>
                </div>

                <button className="bg-[#0B3B2E] text-white px-6 py-2 rounded-lg w-full mt-4 font-semibold">
                  Simpan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Text Deskripsi */}
        <p className="text-sm leading-relaxed text-gray-700 mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </p>

        <div className="mt-4 text-sm font-semibold text-[#0B3B2E] space-y-2">
          <p>Jenis Kegiatan:</p>
          <p>Batas Akhir Pendaftaran:</p>
          <p>Tanggal Pelaksanaan:</p>
          <p>Lokasi:</p>
          <p>Waktu:</p>
          <p>Kapasitas:</p>
          <p>Detail Kegiatan:</p>
        </div>
      </div>

      {/* KAMPUS */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">Kampus</h2>
          <button
            className="flex items-center gap-2 text-[#0B3B2E] font-semibold text-sm"
            onClick={() => setShowCampusModal(true)}>
            <FiEdit2 /> Edit
          </button>
        </div>
        <p className="text-sm text-gray-700">Nama Kampus</p>
        <p className="text-sm text-gray-700">Email Kampus</p>
      </div>

      {/* MODAL KAMPUS */}
      {showCampusModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
          <div className="bg-[#F8FBF9] w-full max-w-3xl rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#0B3B2E]">
                Informasi Kampus
              </h2>
              <button
                className="text-[#0B3B2E] text-xl font-bold"
                onClick={() => setShowCampusModal(false)}>
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="font-semibold text-sm">Nama Kampus*</label>
                <input className="w-full border border-[#CADECC] rounded-lg p-2 mt-1" />
              </div>

              <div>
                <label className="font-semibold text-sm">Email*</label>
                <input className="w-full border border-[#CADECC] rounded-lg p-2 mt-1" />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button className="bg-[#78B7D0] text-white px-6 py-2 rounded-lg font-semibold">
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MENTOR */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">Mentor</h2>
          <button
            className="flex items-center gap-2 text-[#0B3B2E] font-semibold text-sm"
            onClick={() => setShowMentorModal(true)}>
            <FiEdit2 /> Edit
          </button>
        </div>
        <p className="text-sm text-gray-700">Nama Mentor</p>
        <p className="text-sm text-gray-700">Email Mentor</p>
      </div>

      {/* MODAL MENTOR */}
      {showMentorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
          <div className="bg-[#F8FBF9] w-full max-w-3xl rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#0B3B2E]">
                Informasi Mentor
              </h2>
              <button
                className="text-[#0B3B2E] text-xl font-bold"
                onClick={() => setShowMentorModal(false)}>
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="font-semibold text-sm">Pilih Mentor*</label>
                <select className="w-full border border-[#CADECC] rounded-lg p-2 mt-1">
                  <option>Mentor 1</option>
                  <option>Mentor 2</option>
                  <option>Mentor 3</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-sm">Nama*</label>
                <input className="w-full border border-[#CADECC] rounded-lg p-2 mt-1" />
              </div>

              <div>
                <label className="font-semibold text-sm">Email*</label>
                <input className="w-full border border-[#CADECC] rounded-lg p-2 mt-1" />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button className="bg-[#78B7D0] text-white px-6 py-2 rounded-lg font-semibold">
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
