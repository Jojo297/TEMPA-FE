import React, { useState } from "react";
import { TrendingUp, Handshake } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router";

export default function DashboardCampusBerlangganan() {
  const mainColor = "#003631";
  const secondaryColor = "#96CCEC";

  const [page, setPage] = useState("list");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showQR, setShowQR] = useState(false);

  const packages = [
    {
      title: "TEMPA Berkembang",
      description:
        "Fokus: Membangun kehadiran digital dan mengenalkan kurikulum unggulan secara luas.",
      icon: <TrendingUp size={55} className="text-[#101112]" />,
      price: "RP 2.000.000 / 6 bulan",
      amount: 2000000,
      features: [
        <>
          <strong>Publikasi Program Terintegrasi:</strong> Kelola hingga 5
          program trial dengan struktur kurikulum yang sistematis untuk menarik
          minat calon pendaftar.
        </>,
        <>
          <strong>Akses Mentor Terverifikasi:</strong> Libatkan dosen atau
          mahasiswa berprestasi sebagai wajah kampus untuk berinteraksi dengan
          peserta.
        </>,
        <>
          <strong>Sertifikat Digital Otomatis:</strong> Tingkatkan nilai jual
          program Anda dengan pemberian sertifikat penyelesaian trial secara
          otomatis kepada peserta atas nama kampus Anda.
        </>,
        <>
          <strong>Laporan Statistik Dasar:</strong> Pantau jumlah pengunjung dan
          peserta yang tertarik pada setiap program.
        </>,
      ],
    },
    {
      title: "TEMPA Eksklusif",
      description:
        "Fokus: Konversi maksimal dan pengambilan keputusan berbasis data.",
      icon: <Handshake size={55} className="text-[#101112]" />,
      price: "RP 3.000.000 / 6 bulan",
      amount: 3000000,
      features: [
        <>
          <strong>Database Calon Mahasiswa (Leads):</strong> Dapatkan akses data
          kontak (Email) peserta yang telah menyelesaikan trial untuk kebutuhan{" "}
          <em>follow-up</em> pendaftaran resmi.
        </>,
        <>
          <strong>Dashboard Analitik Mendalam:</strong> Pahami demografi, minat
          jurusan, dan perilaku peserta untuk membantu strategi pemasaran kampus
          yang lebih tepat sasaran.
        </>,
        <>
          <strong>Penyematan Badge Eksklusif:</strong> Bangun kepercayaan calon
          mentee secara instan dengan menampilkan badge verifikasi pada profil
          program Anda, menandakan kualitas dan kurikulum yang terjamin.
        </>,
        <>
          <strong>Interaksi Tanpa Batas:</strong> Bebas mengunggah materi atau
          dokumen tanpa batasan kuota untuk memberikan pengalaman kuliah yang
          utuh.
        </>,
        <>
          <strong>Dukungan Promosi Media Sosial:</strong> Program unggulan Anda
          akan dipromosikan melalui jaringan media sosial resmi TEMPA untuk
          jangkauan audiens yang lebih luas.
        </>,
      ],
    },
  ];

  // ======================
  //       LIST PAGE
  // ======================
  if (page === "payment" && selectedPackage)
    return <PaymentPage pkg={selectedPackage} />;

  if (page === "history") return <HistoryPage />;

  return (
    <div className="min-h-screen font-sans">
      {/* Breadcrumb */}
      <div className="mb-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild className="hover:text-primary">
                <Link to="/dashboard-campus/beranda">Beranda</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="text-primary">
              <BreadcrumbPage className="text-primary">
                Berlangganan
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="bg-primary text-white rounded-xl p-6 shadow">
          <h1 className="text-2xl font-bold mb-2">Berlangganan</h1>
          <p className="text-sm max-w-2xl mx-auto">
            Pilih paket sesuai kebutuhan kampus Anda.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto mt-4">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md border border-gray-200 p-8 flex flex-col hover:shadow-lg transition duration-200"
            style={{ borderTop: `5px solid ${mainColor}` }}
          >
            <div className="flex justify-center items-center mb-4">
              {pkg.icon}
            </div>

            <h3 className="text-xl font-bold text-center mb-2">{pkg.title}</h3>
            <p className="text-center text-sm text-gray-500 mb-6 italic px-2">
              {pkg.description}
            </p>

            <ul className="text-gray-700 text-sm space-y-3 mb-8 px-5">
              {pkg.features.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[#101112] mt-1">✔</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="text-center mt-auto">
              <p className="text-xl font-extrabold mb-5">{pkg.price}</p>

              <button
                onClick={() => {
                  setSelectedPackage(pkg);
                  setPage("payment");
                }}
                className="w-full bg-primary font-bold py-3 rounded-lg text-white hover:opacity-70 transition"
              >
                BERLANGGANAN
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
