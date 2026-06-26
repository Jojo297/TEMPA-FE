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
  Wallet,
  Plus,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useCreatePaymentIntent from "@/hooks/hooksCampus/useCreatePaymentIntent";
import { id, se } from "date-fns/locale";
import useGetSubscriptionPackages from "@/hooks/hooksCampus/useGetSubscriptionPackages";
import DynamicIcon from "@/components/DynamicIcon";
import { set } from "zod";
import { Spinner } from "@/components/ui/spinner";
import DashboardCampusBerlanggananSkeleton from "@/components/DashboardCampusBerlanggananSkeleton";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import PaymentValidationModal from "@/components/PaymentValidationModal";
import { DialogTrigger } from "@radix-ui/react-dialog";
import TopUpModal from "@/components/TopUpModal";
import useTopUpWallet from "@/hooks/hooksCampus/useTopUpWallet";

export default function DashboardCampusBerlangganan() {
  const token = localStorage.getItem("userJwt");
  const navigate = useNavigate();
  const {
    packages,
    isLoading: isLoadingPackages,
    error: errorPackages,
    campusSubscription,
    fetchPackages,
  } = useGetSubscriptionPackages();
  const {
    createPaymentIntent,
    balance,
    quotaMentee,
    isLoadingWallet,
    error: errorWallet,
    getWallet,
  } = useCreatePaymentIntent();
  const { isLoadingTopUp, error, topUpSaldo } = useTopUpWallet();
  const [loadingPackageId, setLoadingPackageId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showTopUp, setShowTopUp] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Cari paket yang sedang aktif (sesuaikan logika 'is_active' dengan response backend Anda)
  const currentPackage = campusSubscription;
  // const currentPackage = true;

  const isExpired = currentPackage?.expired_date
    ? new Date(currentPackage.expired_date) <= new Date()
    : false;

  const displayPackages = packages ?? [];
  const displayPackagesCampus = campusSubscription ?? [];
  const displayBalance = balance ?? 0;
  const displayQuota = quotaMentee ?? 0;
  // console.log("berlangganan: ", currentPackage);

  useEffect(() => {
    if (token) {
      fetchPackages(token);
      getWallet(token);
    }
  }, [token, fetchPackages]);

  if (isLoadingPackages) {
    return <DashboardCampusBerlanggananSkeleton />;
  }

  // handle payment subscription feature
  const dokuPayment = async (idSubscription) => {
    setLoadingPackageId(idSubscription);
    try {
      const token = localStorage.getItem("userJwt");
      const result = await createPaymentIntent(token, idSubscription);

      if (result.success && result.data?.pay_url) {
        // Redirect menggunakan window.location.href untuk URL eksternal
        window.location.href = result.data.pay_url;
      } else {
        toast.error("Gagal memulai pembayaran");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Gagal memulai pembayaran";
      toast.error(errorMessage);
    } finally {
      setLoadingPackageId(null);
    }
  };

  // handle top up feature
  const handleTopUpProcess = async (amount) => {
    setIsProcessing(true);
    try {
      // console.log("saldo: ", amount);
      const token = localStorage.getItem("userJwt");
      const result = await topUpSaldo(token, amount);

      if (result.success && result.data?.pay_url) {
        // Redirect menggunakan window.location.href untuk URL eksternal
        window.location.href = result.data.pay_url;
      } else {
        toast.error("Gagal memulai pembayaran");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Gagal memulai pembayaran";
      toast.error(errorMessage);
    } finally {
      setIsProcessing(false);
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 z-30 relative items-start">
            {/* Status Paket Card */}
            <div
              className={`lg:col-span-2 rounded-3xl p-6 md:p-8 shadow-lg border overflow-hidden transition-all duration-300 ${
                isExpired
                  ? "bg-red-50 border-red-100"
                  : "bg-white border-emerald-100"
              }`}
            >
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                      isExpired
                        ? "bg-red-100 text-red-600"
                        : "bg-emerald-100 text-[#003631]"
                    }`}
                  >
                    {isExpired ? (
                      <ShieldX size={28} />
                    ) : (
                      <ShieldCheck size={28} />
                    )}
                  </div>
                  <div>
                    <h2
                      className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${
                        isExpired ? "text-red-500" : "text-emerald-600"
                      }`}
                    >
                      {isExpired ? "Status: Expired" : "Paket Aktif"}
                    </h2>
                    <h3 className="text-xl font-bold text-gray-900">
                      {currentPackage.package_name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Berlaku hingga{" "}
                      {new Date(currentPackage.expired_date).toLocaleDateString(
                        "id-ID",
                        { day: "numeric", month: "long", year: "numeric" },
                      )}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    navigate("/dashboard-campus/history-transaction")
                  }
                  className="text-xs font-bold text-[#003631] bg-emerald-50 px-4 py-2 rounded-lg hover:bg-emerald-100 transition-colors"
                >
                  Riwayat Transaksi
                </button>
              </div>
            </div>

            {/* Wallet / Balance Card */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 shadow-xl relative overflow-hidden group border border-slate-700">
              {/* Efek Glassmorphism lebih halus */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-amber-400/20 transition-all" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full -ml-12 -mb-12 blur-2xl" />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">
                      Sisa Saldo Deposit
                    </p>
                    <div className="h-1 w-8 bg-amber-400 rounded-full" />
                  </div>
                  <div className="p-2 bg-slate-700/50 rounded-xl border border-slate-600">
                    <Wallet size={18} className="text-amber-400" />
                  </div>
                </div>

                <div className="flex items-baseline gap-2 text-white">
                  <span className="text-lg font-medium text-slate-400 ">
                    Rp
                  </span>
                  {isLoadingWallet ? (
                    <Skeleton className="h-6 w-3/4 bg-gray-700 " />
                  ) : (
                    <span className="text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
                      {displayBalance?.toLocaleString("id-ID") || "0"}
                    </span>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-700/50 flex justify-between items-center">
                  <div className="flex flex-col">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">
                      Estimasi Kuota
                    </p>
                    {isLoadingWallet ? (
                      <div className="flex gap-2 text-sm items-center">
                        <Skeleton className="h-6 w-2/5 bg-gray-700 " />{" "}
                        <span className="text-slate-400 font-medium">
                          Siswa
                        </span>
                      </div>
                    ) : (
                      <p className="text-sm text-white font-bold">
                        ~{displayQuota || 0}{" "}
                        <span className="text-slate-400 font-medium">
                          Siswa
                        </span>
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => setShowTopUp(true)}
                    className="flex items-center gap-2 text-[10px] font-black text-slate-900 bg-amber-400 px-4 py-2 rounded-xl hover:bg-amber-300 transition-all shadow-lg shadow-amber-900/20 active:scale-95"
                  >
                    <Plus size={12} strokeWidth={4} />
                    TOP UP
                  </button>
                </div>
              </div>
            </div>
            <TopUpModal
              isOpen={showTopUp}
              onClose={() => setShowTopUp(false)}
              onConfirm={(amount) => handleTopUpProcess(amount)}
              isLoading={isProcessing}
            />
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
                  onClick={() => {
                    setSelectedPackage(pkg); // Simpan data paket yang diklik
                    setIsDialogOpen(true);
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

                <PaymentValidationModal
                  isOpen={isDialogOpen}
                  onClose={() => setIsDialogOpen(false)}
                  onConfirm={() => dokuPayment(selectedPackage.id)}
                  packageData={selectedPackage}
                  isLoading={loadingPackageId === pkg.id}
                />
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
    </div>
  );
}
