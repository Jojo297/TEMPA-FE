import NotFounPages from "./NotFoundPages";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import preview from "@/../public/web-preview.png";

export default function RecomendationMajors({ responseAI }) {
  const navigate = useNavigate();
  const displayResponseAi = responseAI ?? [];

  // console.log(displayResponseAi);

  //   handle displayResponseAi null
  if (displayResponseAi <= 0) {
    return <NotFounPages message="Anda Belum Meningisi Form" />;
  }
  return (
    <>
      {/* header html */}
      <Helmet>
        <title>{`Rekomendasi Jurusan | Tempa`}</title>
        <meta
          name="description"
          content="TEMPA adalah platform pengembangan diri untuk menemukan potensi, mencoba simulasi perkuliahan, dan memilih jurusan terbaik seperti Informatika, Hukum, dan Kedokteran."
        />
        <meta
          name="keywords"
          content=" cobain kuliah, trial kuliah, rekomendasi jurusan, eksplorasi jurusan, simulasi kuliah, pengembangan diri, politeknik negeri batam, edukasi digital"
        />
        <link rel="canonical" href="https://tempaa.ddns.net" />
        {/* Open Graph / Facebook (Untuk tampilan saat share link) */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Eksplorasi Masa Depanmu Bersama TEMPA"
        />
        <meta
          property="og:description"
          content="Temukan potensi dan persiapkan kariermu melalui program coba kelas di berbagai jurusan populer."
        />
        <meta property="og:image" content={preview} />
        <meta
          name="twitter:title"
          content="TEMPA - Bangun Masa Depan Bersama"
        />
        <meta
          name="twitter:description"
          content="Platform edukasi digital untuk persiapan karier dan pemilihan jurusan mahasiswa."
        />
      </Helmet>
      <div className="bg-gray-50 min-h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header dan judul */}
          <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-4 text-center md:text-left md:mb-6">
            🎉 Jurusan yang Cocok Untuk Kamu!
          </h1>

          <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed text-center md:text-left">
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
                <h2 className="text-lg md:text-2xl font-bold text-primary mb-3">
                  {index + 1}. {item.jurusan}
                </h2>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  <span className="font-bold text-gray-800">
                    Deskripsi Kesesuaian:
                  </span>{" "}
                  {item.kesesuaian}
                </p>
                <div className="mt-4">
                  <h3 className="text-sm font-bold text-gray-800 mb-2">
                    Profesi Karir Terpopuler:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.profesi_relevan.map((profesi, profIndex) => (
                      <span
                        key={profIndex}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors duration-200"
                      >
                        {profesi}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bagian Penutup / Next Step */}
          <div className="mt-12 p-6 bg-primary rounded-lg text-center shadow-md">
            <h3 className="text-lg md:text-xl font-semibold text-white mb-3">
              Langkah Selanjutnya?
            </h3>
            <p className="text-sm md:text-base text-white/90 mb-4">
              Pelajari lebih lanjut dan cari jurusan-jurusan di atas.
            </p>
            <button
              // Anda bisa mengganti ini dengan fungsi navigasi ke halaman lain
              onClick={() => navigate("/dashboard-mentee/jurusan")}
              className="bg-secondary text-white font-bold py-2 px-5 text-sm md:py-3 md:px-6 md:text-base rounded-lg hover:bg-secondary/90 transition duration-300 shadow-md"
            >
              Cari Jurusan Tersebut
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
