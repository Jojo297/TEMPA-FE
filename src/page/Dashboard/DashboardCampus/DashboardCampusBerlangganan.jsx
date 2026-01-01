import React, { useEffect, useState } from "react";
import { TrendingUp, Handshake, Check, Star, Info, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import useCreatePaymentIntent from "@/hooks/hooksCampus/useCreatePaymentIntent";
import { id } from "date-fns/locale";
import useGetSubscriptionPackages from "@/hooks/hooksCampus/useGetSubscriptionPackages";
import DynamicIcon from "@/components/DynamicIcon";
import { set } from "zod";
import { Spinner } from "@/components/ui/spinner";
import DashboardCampusBerlanggananSkeleton from "@/components/DashboardCampusBerlanggananSkeleton";

export default function DashboardCampusBerlangganan() {
  const token = localStorage.getItem("userJwt");
  const {
    packages,
    isLoading: isLoadingPackages,
    error: errorPackages,
    fetchPackages,
  } = useGetSubscriptionPackages();
  const { isLoading, error, paymentUrl, createPaymentIntent } =
    useCreatePaymentIntent();
  const [loadingPackageId, setLoadingPackageId] = useState(null);

  // const packages = [
  //   {
  //     id: 1,
  //     title: "TEMPA Berkembang",
  //     tagline: "Presence & Growth",
  //     description:
  //       "Membangun kehadiran digital dan mengenalkan kurikulum secara luas.",
  //     icon: <TrendingUp size={28} className="text-[#003631]" />,
  //     price: "3.000.000",
  //     duration: "/ 6 bulan",
  //     isPopular: false,
  // features: [
  //   {
  //     title: "Publikasi Program",
  //     desc: "Kelola hingga 5 program trial sistematis.",
  //   },
  //   {
  //     title: "Mentor Terverifikasi",
  //     desc: "Libatkan dosen & mahasiswa berprestasi.",
  //   },
  //   {
  //     title: "Sertifikat Otomatis",
  //     desc: "Pemberian sertifikat digital otomatis.",
  //   },
  //   {
  //     title: "Statistik Dasar",
  //     desc: "Pantau pengunjung & minat program.",
  //   },
  // ],
  //   },
  //   {
  //     id: 2,
  //     title: "TEMPA Eksklusif",
  //     tagline: "Conversion & Data-Driven",
  //     description:
  //       "Konversi maksimal dengan pengambilan keputusan berbasis data analitik.",
  //     icon: <Crown size={28} className="text-amber-600" />,
  //     price: "6.000.000",
  //     duration: "/ 6 bulan",
  //     isPopular: true,
  // features: [
  //   {
  //     title: "Database Leads",
  //     desc: "Akses kontak email peserta untuk follow-up.",
  //   },
  //   {
  //     title: "Analitik Mendalam",
  //     desc: "Pahami demografi & perilaku peserta detail.",
  //   },
  //   {
  //     title: "Badge Terverifikasi",
  //     desc: "Badge eksklusif untuk membangun trust instan.",
  //   },
  //   {
  //     title: "Interaksi Tanpa Batas",
  //     desc: "Bebas unggah materi tanpa kuota.",
  //   },
  //   {
  //     title: "Promosi Sosmed",
  //     desc: "Promosi melalui jaringan resmi TEMPA.",
  //   },
  // ],
  //   },
  // ];

  const displayPackages = packages ?? [];
  // console.log(displayPackages);

  useEffect(() => {
    if (token) {
      fetchPackages(token);
    }
  }, [token, fetchPackages]);

  if (isLoadingPackages) {
    return <DashboardCampusBerlanggananSkeleton />;
  }

  // handle payment
  const dokuPayment = async (idSubscription) => {
    // console.log(idSubscription);
    setLoadingPackageId(idSubscription);
    try {
      // Ambil token (pastikan token ada)
      const token = localStorage.getItem("userJwt");

      // 1. Panggil hook Zustand
      // createPaymentIntent sudah kita buat mengembalikan { success, paymentUrl }
      const result = await createPaymentIntent(token, idSubscription);

      if (result.success && result.paymentUrl) {
        // 2. Panggil SDK DOKU untuk memunculkan modal pembayaran
        window.loadJokulCheckout(result.paymentUrl);
        setLoadingPackageId(null);
      } else {
        setLoadingPackageId(null);
        alert("Gagal memulai pembayaran: " + result.error);
        console.log("Gagal memulai pembayaran: " + result.error);
      }
    } catch (err) {
      // Error sudah dihandle di Zustand, tapi bisa tambah alert di sini
      alert("Gagal memulai pembayaran: " + err.message);
      console.log("Gagal memulai pembayaran: " + err.message);
      setLoadingPackageId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 font-sans">
      {/* Header Section */}
      <div className="bg-[#003631] pt-16 pb-32 px-6 rounded-b-[40px] rounded-t-[12px] shadow-2xl relative overflow-hidden">
        {/* Dekorasi Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/10 rounded-full -ml-10 -mb-10 blur-2xl" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
            Investasikan Masa Depan Kampus Anda
          </h1>
          <p className="text-emerald-100/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Tingkatkan jangkauan institusi Anda dan hubungkan kurikulum terbaik
            dengan calon mahasiswa yang tepat melalui fitur berlangganan kami.
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto -mt-20 px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {displayPackages.map((pkg, index) => (
          <div
            key={index}
            className={`relative bg-white rounded-3xl p-8 transition-all duration-300 ${
              pkg.isPopular
                ? "ring-4 ring-amber-400 shadow-[0_20px_50px_rgba(0,0,0,0.1)] scale-105 z-20"
                : "border border-gray-100 shadow-xl hover:shadow-2xl z-10"
            }`}
          >
            {pkg.isPopular && (
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-xs font-black px-6 py-2 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-2">
                <Star size={14} fill="white" /> Paling Populer
              </div>
            )}

            <div className="flex flex-col h-full">
              {/* Card Header */}
              <div className="mb-8 text-center md:text-left">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 mx-auto md:mx-0 ${
                    pkg.isPopular ? "bg-amber-100" : "bg-emerald-50"
                  }`}
                >
                  <DynamicIcon name={pkg.logo_name} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {pkg.package_name}
                </h3>
                <p className="text-[#003631] font-semibold text-xs uppercase tracking-widest mb-3 opacity-70">
                  {pkg.sub_heading}
                </p>
                <p className="text-gray-500 text-sm leading-relaxed italic">
                  "{pkg.description}"
                </p>
              </div>

              {/* Price */}
              <div className="mb-8 py-6 border-y border-gray-50 flex flex-col items-center">
                <div className="flex items-baseline gap-1 text-[#003631]">
                  <span className="text-sm font-bold">Rp</span>
                  <span className="text-4xl font-black tracking-tighter">
                    {pkg.price.toLocaleString("id-ID")}
                  </span>
                </div>
                <p className="text-gray-400 text-xs font-medium mt-1 uppercase tracking-widest">
                  Per {pkg.duration_month} Bulan (Flat Rate)
                </p>
              </div>

              {/* Features List */}
              <ul className="space-y-5 mb-10 flex-grow">
                {pkg.benefit.map((feature, i) => (
                  <li key={i} className="flex gap-4 group">
                    <div
                      className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                        pkg.isPopular ? "bg-amber-100" : "bg-emerald-100"
                      }`}
                    >
                      <Check
                        size={14}
                        className={
                          pkg.isPopular ? "text-amber-700" : "text-emerald-700"
                        }
                        strokeWidth={3}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800 mb-0.5">
                        {feature.title}
                      </p>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => {
                  dokuPayment(pkg.id);
                }}
                disabled={loadingPackageId !== null}
                className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-95 shadow-lg ${
                  pkg.isPopular
                    ? "bg-gradient-to-br from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 shadow-amber-200"
                    : "bg-[#003631] text-white hover:bg-[#004d45] shadow-emerald-100"
                } ${
                  loadingPackageId !== null
                    ? "opacity-70 cursor-not-allowed"
                    : ""
                }`}
              >
                {loadingPackageId === pkg.id ? (
                  <div className="flex items-center justify-center gap-2">
                    <Spinner /> Loading...
                  </div>
                ) : (
                  "Aktifkan Sekarang"
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Footer */}
      <div className="max-w-2xl mx-auto mt-16 text-center px-6">
        <div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full mb-4 shadow-sm">
          <Info size={16} className="text-blue-500" />
          <span className="text-xs font-semibold text-gray-600 italic">
            Pembayaran menggunakan Doku (Virtual Account, QRIS, E-Wallet)
          </span>
        </div>
      </div>
    </div>
  );
}
