import useGetResponseAi from "@/hooks/hooksMentee/useGetResponseAi";
import NotFounPages from "./NotFoundPages";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function RecomendationMajors({ responseAI }) {
  const navigate = useNavigate();
  const displayResponseAi = responseAI ?? [];

  //   handle displayResponseAi null
  if (displayResponseAi <= 0) {
    return <NotFounPages message="Anda Belum Meningisi Form" />;
  }
  return (
    <>
      <div className="bg-gray-50 min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header dan judul */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8">
            🎉 Jurusan yang Cocok Untuk Kamu!
          </h1>

          <p className="text-lg text-gray-700 mb-8">
            Berdasarkan hasil analisis, berikut adalah rekomendasi jurusan yang
            paling sesuai dengan minat dan potensi Anda:
          </p>

          {/* Daftar Hasil Rekomendasi */}
          <div className="space-y-6">
            {displayResponseAi.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300 border-l-4 border-primary"
              >
                <h2 className="text-xl md:text-2xl font-bold text-primary mb-2">
                  {index + 1}. {item.jurusan}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  <span className="font-semibold text-gray-800">
                    Deskripsi Kesesuaian:
                  </span>{" "}
                  {item.kesesuaian}
                </p>
              </div>
            ))}
          </div>

          {/* Bagian Penutup / Next Step */}
          <div className="mt-12 p-6 bg-primary rounded-lg text-center shadow-md">
            <h3 className="text-xl font-semibold text-white mb-3">
              Langkah Selanjutnya?
            </h3>
            <p className="text-white mb-4">
              Pelajari lebih lanjut dan cari jurusan-jurusan di atas.
            </p>
            <button
              // Anda bisa mengganti ini dengan fungsi navigasi ke halaman lain
              onClick={() => navigate("/dashboard-mentee/jurusan")}
              className="bg-secondary text-primary font-bold py-3 px-6 rounded-lg hover:bg-secondary transition duration-300 shadow-md"
            >
              Cari Jurusan Tersebut
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
