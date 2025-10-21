import { useState } from "react";
import { Angry, Frown, Meh, Smile, Laugh, X } from "lucide-react";

export default function PenilaianModal({ program, onClose, onSubmit }) {
  const [rating, setRating] = useState(null);
  const [feedback, setFeedback] = useState("");

  // Jangan render apa pun kalau popup belum aktif
  if (!program) return null;

  const handleSubmit = () => {
    if (!rating) {
      alert("Silakan pilih rating terlebih dahulu!");
      return;
    }
    onSubmit({ rating, feedback, program });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#013B35] text-white rounded-2xl p-6 w-96 relative animate-scaleIn">
        {/* Tombol Tutup */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:text-gray-300">
          <X size={20} />
        </button>

        {/* Judul Dinamis */}
        <h2 className="text-center text-lg font-semibold mb-4">
          BAGAIMANA PENGALAMANMU BERSAMA <br />
          {program?.namaKampus ||
            program?.jurusanNama ||
            program?.nama ||
            "KAMPUS INI"}
          ?
        </h2>

        {/* Emoji Rating */}
        <div className="flex justify-center gap-3 mb-3">
          {[Angry, Frown, Meh, Smile, Laugh].map((Icon, i) => (
            <button
              key={i}
              onClick={() => setRating(i + 1)}
              className={`p-2 rounded-full transition ${
                rating === i + 1
                  ? "bg-[#A5E3E7] text-[#013B35]"
                  : "text-white hover:text-[#A5E3E7]"
              }`}>
              <Icon size={30} />
            </button>
          ))}
        </div>

        {/* Label Rating */}
        {rating && (
          <p className="text-center mb-3 text-sm bg-[#A5E3E7] text-[#013B35] py-1 rounded-full">
            {
              ["Sangat Buruk", "Buruk", "Biasa", "Baik", "Sangat Baik"][
                rating - 1
              ]
            }
          </p>
        )}

        {/* Kolom Feedback */}
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Berikan penilaianmu dan bantu kampus untuk meningkatkan pelayanannya!"
          className="w-full rounded-lg p-3 text-gray-800 h-24 text-sm focus:outline-none"
        />

        {/* Tombol Kirim */}
        <button
          onClick={handleSubmit}
          className="w-full mt-4 bg-[#A5E3E7] text-[#013B35] font-semibold py-2 rounded-lg hover:bg-[#8ed1d5] transition">
          Kirim
        </button>
      </div>
    </div>
  );
}
