import React, { useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiChevronDown } from "react-icons/fi";

export default function ProgramMateri() {
  const [openSection, setOpenSection] = useState({
    materi: true,
    quiz: true,
    meeting: false,
  });

  const [showModalMateri, setShowModalMateri] = useState(false);
  const [showModalQuiz, setShowModalQuiz] = useState(false);
  const [showModalMeeting, setShowModalMeeting] = useState(false);

  const materiData = [
    { id: 1, title: "Pengenalan Program" },
    { id: 2, title: "Dasar-dasar React" },
  ];

  const quizData = [
    { id: 1, title: "Quiz  1" },
    { id: 2, title: "Quiz  2" },
  ];

  const toggleSection = (key) => {
    setOpenSection({ ...openSection, [key]: !openSection[key] });
  };

  return (
    <div className="bg-white mt-8 p-6 rounded-xl shadow">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#0B3B2E]">Konten Program</h2>

        <button className="flex items-center gap-2 px-4 py-2 bg-[#003631] text-white rounded-lg hover:bg-[#0A4F42] transition">
          <FiPlus size={18} />
          Tambah Seksi
        </button>
      </div>

      {/* ===== MATERI ===== */}
      <div className="border rounded-xl mb-4 overflow-hidden">
        <div
          onClick={() => toggleSection("materi")}
          className="flex items-center justify-between px-4 py-3 bg-[#F3F8F6] cursor-pointer">
          <div className="flex items-center gap-2 font-semibold text-[#0B3B2E]">
            <FiChevronDown
              className={`transition ${openSection.materi ? "rotate-180" : ""}`}
            />
            Materi
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowModalMateri(true);
            }}
            className="flex items-center gap-2 px-3 py-1 bg-[#003631] text-white rounded-lg text-sm">
            <FiPlus />
            Tambah Materi
          </button>
        </div>

        {openSection.materi && (
          <div className="divide-y">
            {materiData.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50">
                <div className="flex items-center gap-2 text-gray-700">
                  📄 {item.title}
                </div>

                <div className="flex items-center gap-3 text-[#0B3B2E]">
                  <FiEdit2 className="cursor-pointer" />
                  <FiTrash2 className="cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===== QUIZ ===== */}
      <div className="border rounded-xl mb-4 overflow-hidden">
        <div
          onClick={() => toggleSection("quiz")}
          className="flex items-center justify-between px-4 py-3 bg-[#F3F8F6] cursor-pointer">
          <div className="flex items-center gap-2 font-semibold text-[#0B3B2E]">
            <FiChevronDown
              className={`transition ${openSection.quiz ? "rotate-180" : ""}`}
            />
            Quiz
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowModalQuiz(true);
            }}
            className="flex items-center gap-2 px-3 py-1 bg-[#003631] text-white rounded-lg text-sm">
            <FiPlus />
            Tambah Quiz
          </button>
        </div>

        {openSection.quiz && (
          <div className="divide-y">
            {quizData.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50">
                <div className="flex items-center gap-2 text-gray-700">
                  📝 {item.title}
                </div>

                <div className="flex items-center gap-3 text-[#0B3B2E]">
                  <FiEdit2 className="cursor-pointer" />
                  <FiTrash2 className="cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===== MEETING ===== */}
      <div className="border rounded-xl overflow-hidden">
        <div
          onClick={() => toggleSection("meeting")}
          className="flex items-center justify-between px-4 py-3 bg-[#F3F8F6] cursor-pointer">
          <div className="flex items-center gap-2 font-semibold text-[#0B3B2E]">
            <FiChevronDown
              className={`transition ${
                openSection.meeting ? "rotate-180" : ""
              }`}
            />
            Link Meeting
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowModalMeeting(true);
            }}
            className="flex items-center gap-2 px-3 py-1 bg-[#003631] text-white rounded-lg text-sm">
            <FiPlus />
            Tambah Link
          </button>
        </div>

        {openSection.meeting && (
          <div className="px-4 py-3 text-gray-500">Belum ada link meeting</div>
        )}
      </div>

      {/* ===================== MODAL TAMBAH MATERI ===================== */}
      {showModalMateri && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
            <h3 className="text-lg font-bold mb-4 text-[#003631]">
              Tambah Materi
            </h3>

            <input
              placeholder="Judul Materi"
              className="w-full border p-2 rounded-lg mb-4"
            />

            <button
              className="w-full py-2 bg-[#003631] text-white rounded-lg"
              onClick={() => setShowModalMateri(false)}>
              Simpan
            </button>
          </div>
        </div>
      )}

      {/* ===================== MODAL TAMBAH QUIZ ===================== */}
      {showModalQuiz && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
            <h3 className="text-lg font-bold mb-4 text-[#003631]">
              Tambah Quiz
            </h3>

            <input
              placeholder="Judul Quiz"
              className="w-full border p-2 rounded-lg mb-4"
            />

            <button
              className="w-full py-2 bg-[#003631] text-white rounded-lg"
              onClick={() => setShowModalQuiz(false)}>
              Simpan
            </button>
          </div>
        </div>
      )}

      {/* ===================== MODAL TAMBAH LINK MEETING ===================== */}
      {showModalMeeting && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
            <h3 className="text-lg font-bold mb-4 text-[#003631]">
              Tambah Link Meeting
            </h3>

            <input
              placeholder="Masukkan Link Meeting"
              className="w-full border p-2 rounded-lg mb-4"
            />

            <button
              className="w-full py-2 bg-[#003631] text-white rounded-lg"
              onClick={() => setShowModalMeeting(false)}>
              Simpan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
