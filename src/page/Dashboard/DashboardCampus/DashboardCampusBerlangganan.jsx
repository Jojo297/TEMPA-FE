import React, { useEffect, useState } from "react";
import {
  TrendingUp,
  Handshake,
  Check,
  Star,
  Info,
  Crown,
  Rocket,
  ShieldCheck,
  Calendar,
  ShieldX,
} from "lucide-react";
import { Link } from "react-router-dom";
import useCreatePaymentIntent from "@/hooks/hooksCampus/useCreatePaymentIntent";
import { id } from "date-fns/locale";
import useGetSubscriptionPackages from "@/hooks/hooksCampus/useGetSubscriptionPackages";
import DynamicIcon from "@/components/DynamicIcon";
import { set } from "zod";
import { Spinner } from "@/components/ui/spinner";
import DashboardCampusBerlanggananSkeleton from "@/components/DashboardCampusBerlanggananSkeleton";
import { toast } from "sonner";

export default function DashboardCampusBerlangganan() {
  const token = localStorage.getItem("userJwt");
  const {
    packages,
    isLoading: isLoadingPackages,
    error: errorPackages,
    campusSubscription,
    fetchPackages,
  } = useGetSubscriptionPackages();
  const { isLoading, error, paymentUrl, createPaymentIntent } =
    useCreatePaymentIntent();
  const [loadingPackageId, setLoadingPackageId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Cari paket yang sedang aktif (sesuaikan logika 'is_active' dengan response backend Anda)
  const currentPackage = campusSubscription;
  // const currentPackage = true;

  const isExpired = currentPackage?.expired_date
    ? new Date(currentPackage.expired_date) <= new Date()
    : false;

  const displayPackages = packages ?? [];
  const displayPackagesCampus = campusSubscription ?? [];
  // console.log(displayPackagesCampus);

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

      if (result.success) {
        if (result.isFree) {
          setLoadingPackageId(null);
          toast.success(
            result.message || "Paket Free Trial berhasil diaktifkan!"
          );
          window.location.reload();
        } else if (result.paymentUrl) {
          // 2. Panggil SDK DOKU untuk memunculkan modal pembayaran
          window.loadJokulCheckout(result.paymentUrl);
          setLoadingPackageId(null);
        }
      } else {
        setLoadingPackageId(null);
        toast.error(result.message || "Gagal memulai pembayaran");
        console.log("Gagal memulai pembayaran: " + result);
      }
    } catch (err) {
      // Error sudah dihandle di Zustand, tapi bisa tambah alert di sini
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Gagal memulai pembayaran";
      toast.error(errorMessage);
      console.log("Gagal memulai pembayaran: " + err);
      setLoadingPackageId(null);
    }
  };

  const handlePackageClick = (pkg) => {
    if (pkg.free_trial) {
      setSelectedPackage(pkg);
      setIsDialogOpen(true);
    } else {
      dokuPayment(pkg.id);
    }
  };

  const confirmFreeTrial = () => {
    if (selectedPackage) {
      dokuPayment(selectedPackage.id);
      setIsDialogOpen(false);
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
      <div className="max-w-6xl mx-auto -mt-20 px-6">
        {/* Section package now */}
        {currentPackage && (
          <div
            className={`rounded-3xl p-6 md:p-8 shadow-lg border relative overflow-hidden mb-8 z-30 transition-all duration-300 ${
              isExpired
                ? "bg-red-50 border-red-100"
                : "bg-white border-emerald-100"
            }`}
          >
            <div
              className={`absolute top-0 right-0 w-32 h-32 rounded-full -mr-10 -mt-10 blur-2xl ${
                isExpired ? "bg-red-100" : "bg-emerald-50"
              }`}
            />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                    isExpired ? "bg-red-100" : "bg-emerald-100"
                  }`}
                >
                  {isExpired ? (
                    <ShieldX size={32} className="text-red-600" />
                  ) : (
                    <ShieldCheck size={32} className="text-[#003631]" />
                  )}
                </div>
                <div>
                  <h2
                    className={`text-sm font-bold uppercase tracking-wider mb-1 ${
                      isExpired ? "text-red-600" : "text-emerald-600"
                    }`}
                  >
                    {isExpired ? "Paket Telah Berakhir" : "Paket Anda Saat Ini"}
                  </h2>
                  <h3
                    className={`text-2xl font-black ${
                      isExpired ? "text-red-900" : "text-gray-900"
                    }`}
                  >
                    {currentPackage
                      ? currentPackage.package_name
                      : "Belum Berlangganan"}
                  </h3>
                  <p
                    className={`text-sm mt-1 ${
                      isExpired ? "text-red-700/80" : "text-gray-500"
                    }`}
                  >
                    {isExpired
                      ? "Masa aktif paket Anda telah habis. Segera perbarui untuk menikmati layanan kembali."
                      : currentPackage.sub_heading ||
                        "Pilih paket di bawah untuk meningkatkan layanan kampus Anda."}
                  </p>
                </div>
              </div>

              {currentPackage && (
                <div
                  className={`flex items-center gap-4 px-5 py-3 rounded-xl border transition-colors ${
                    isExpired
                      ? "bg-white border-red-100 shadow-sm"
                      : "bg-gray-50 border-gray-100"
                  }`}
                >
                  <Calendar
                    size={20}
                    className={isExpired ? "text-red-400" : "text-gray-400"}
                  />
                  <div>
                    <p
                      className={`text-xs font-bold uppercase ${
                        isExpired ? "text-red-400" : "text-gray-400"
                      }`}
                    >
                      {isExpired ? "Berakhir Sejak" : "Berakhir Pada"}
                    </p>
                    <p
                      className={`text-sm font-bold ${
                        isExpired ? "text-red-700" : "text-gray-700"
                      }`}
                    >
                      {currentPackage.expired_date
                        ? new Date(
                            currentPackage.expired_date
                          ).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        : "-"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div
          className={`grid grid-cols-1 ${
            currentPackage ? "mt-20" : ""
          } md:grid-cols-2 gap-8`}
        >
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
                <div className="mb-8 py-6 border-y border-gray-50 flex flex-col items-center min-h-[120px] justify-center">
                  {pkg.free_trial ? (
                    <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <span className="text-3xl font-black tracking-tight text-[#003631] text-center">
                        Uji Coba Gratis
                      </span>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-gray-400 text-sm font-medium line-through decoration-red-400/60 decoration-2">
                          Rp {pkg.price.toLocaleString("id-ID")}
                        </span>
                        <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                          HEMAT 100%
                        </span>
                      </div>
                      <p className="text-gray-400 text-xs font-medium mt-2 uppercase tracking-widest">
                        Durasi {pkg.duration_month} Bulan
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
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
                  )}
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
                            pkg.isPopular
                              ? "text-amber-700"
                              : "text-emerald-700"
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
                  onClick={() => handlePackageClick(pkg)}
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

      {/* Confirmation Dialog */}
      {isDialogOpen && selectedPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl transform transition-all scale-100 animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-emerald-50/50">
                <Rocket
                  className="text-[#003631] w-10 h-10"
                  strokeWidth={1.5}
                />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Aktifkan Free Trial?
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                Anda akan mengaktifkan paket{" "}
                <span className="font-bold text-[#003631]">
                  {selectedPackage.package_name}
                </span>{" "}
                secara gratis. Kesempatan ini hanya berlaku satu kali untuk
                kampus Anda.
              </p>

              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className="flex-1 py-3.5 px-4 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={confirmFreeTrial}
                  className="flex-1 py-3.5 px-4 rounded-xl bg-[#003631] text-white font-bold text-sm hover:bg-[#004d45] shadow-lg shadow-emerald-100 transition-all active:scale-95"
                >
                  Ya, Aktifkan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
