import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import informatikaImg from "@/assets/informatika.png";

const DetailJurusan = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      {/* Gambar Header dalam Card */}
      <div className="flex justify-center mt-10 px-4">
        <div className="relative w-full max-w-5xl rounded-3xl overflow-hidden shadow-xl">
          <img
            src={informatikaImg}
            alt="Informatika"
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-[#013B35]/90 py-4 px-8">
            <h1 className="text-white text-3xl md:text-4xl font-extrabold uppercase tracking-wide">
              Informatika
            </h1>
          </div>
        </div>
      </div>

      {/* Konten */}
      <div className="flex-1 container mx-auto px-6 md:px-16 py-12 text-[#013B35] max-w-5xl">
        {/* Tentang Jurusan */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3 border-b-2 border-[#00BFA6] inline-block pb-1">
            Tentang Jurusan
          </h2>
          <p className="text-justify text-gray-700 leading-relaxed mt-3">
            Teknik Informatika merupakan bidang ilmu yang mempelajari bagaimana
            menggunakan teknologi komputer secara optimal guna menangani masalah
            transformasi atau pengolahan data dengan proses logika. Di Jurusan
            Teknik Informatika kamu akan mempelajari berbagai prinsip terkait
            ilmu komputer mulai dari proses perancangan, pengembangan,
            pengujian, hingga evaluasi sistem operasi perangkat lunak. Selama
            kuliah kamu akan banyak mengekplorasi pemrograman dan komputasi, dan
            dibekali pula dengan keterampilan merancang perangkat lunak.
          </p>
        </section>

        {/* Prospek Kerja */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3 border-b-2 border-[#00BFA6] inline-block pb-1">
            Prospek Kerja
          </h2>
          <p className="text-justify text-gray-700 leading-relaxed mt-3">
            Lulusan Informatika memiliki peluang kerja yang luas di berbagai
            sektor industri, mulai dari teknologi, keuangan, hingga manufaktur.
            Beberapa posisi yang bisa kamu tekuni antara lain: Software
            Engineer, Data Analyst, IT Consultant, Web Developer, dan Network
            Administrator. Dengan perkembangan teknologi yang pesat, kebutuhan
            akan tenaga ahli di bidang ini terus meningkat setiap tahunnya.
          </p>
        </section>

        {/* Kampus Terkait */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3 border-b-2 border-[#00BFA6] inline-block pb-1">
            Kampus Terkait
          </h2>
          {/* <p className="text-gray-700 mt-3">
            Institut Teknologi Batam (ITEBA), Politeknik Negeri Batam,
            Universitas Indonesia, Institut Teknologi Bandung (ITB), Universitas
            Gadjah Mada (UGM).
          </p> */}
        </section>

        {/* Program Terkait */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3 border-b-2 border-[#00BFA6] inline-block pb-1">
            Program Terkait
          </h2>
          {/* <p className="text-gray-700 mt-3">
            Artificial Intelligence, Data Science, Software Engineering, dan
            Cyber Security.
          </p> */}
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default DetailJurusan;
