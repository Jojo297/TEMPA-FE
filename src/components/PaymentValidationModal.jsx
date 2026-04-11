import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ShieldCheck,
  Info,
  Loader2,
  CalendarDays,
  CreditCard,
  Wallet,
  ArrowRight,
  QrCode,
} from "lucide-react";

const formatRupiah = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

const PaymentValidationModal = ({
  isOpen,
  onClose,
  onConfirm,
  packageData,
  isLoading = false,
}) => {
  const [isAgreed, setIsAgreed] = useState(false);

  if (!packageData) return null;

  const depositSaldo = packageData.id === 1 ? 1500000 : 2500000;

  const handleConfirm = async () => {
    if (isAgreed) {
      await onConfirm();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={isLoading ? undefined : onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none shadow-2xl rounded-3xl flex flex-col max-h-[90vh]">
        {/* Header dengan Aksen Background */}
        <div className="bg-slate-50 dark:bg-slate-900 p-6 pb-4">
          <DialogHeader className="flex flex-row items-center gap-4 space-y-0">
            <div className="bg-primary/10 p-3 rounded-2xl text-primary">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold tracking-tight">
                Konfirmasi Pembayaran
              </DialogTitle>
              <DialogDescription className="text-slate-500">
                Tinjau kembali detail pesanan Anda.
              </DialogDescription>
            </div>
          </DialogHeader>
        </div>

        <div className="p-6 pt-2 space-y-6 overflow-y-auto custom-scrollbar">
          {/* Ringkasan Paket */}
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <Badge
                  variant="outline"
                  className="mb-2 border-primary/30 text-primary uppercase tracking-wider text-[10px]"
                >
                  Paket Langganan
                </Badge>
                <h3 className="text-xl font-extrabold">
                  {packageData.package_name}
                </h3>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400 uppercase font-medium">
                  Total Tagihan
                </p>
                <p className="text-xl font-black text-primary">
                  {formatRupiah(packageData.price)}
                </p>
              </div>
            </div>

            <Separator className="my-4 opacity-50" />

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <CalendarDays className="h-4 w-4 text-primary" />
                <span>Durasi {packageData.duration_month} Bulan</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium">
                <Wallet className="h-4 w-4 text-emerald-500" />
                <span className="flex">
                  Deposit Saldo: {formatRupiah(depositSaldo)}
                </span>
              </div>
            </div>
          </div>

          <div className="col-span-2 mt-2 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-white dark:bg-slate-800 p-1 rounded shadow-sm">
                <QrCode className="h-4 w-4 text-slate-700 dark:text-slate-200" />
              </div>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                Metode Pembayaran
              </span>
            </div>
            <Badge className="bg-rose-50 text-rose-600 hover:bg-rose-50 border-rose-100 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/50 font-bold px-2 py-0">
              QRIS ONLY
            </Badge>
          </div>

          {/* Kotak Informasi Penting (Refund Policy) */}
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50 rounded-2xl p-4 flex gap-3">
            <Info className="h-5 w-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
            <div className="text-sm leading-relaxed text-amber-800 dark:text-amber-400">
              <span className="font-bold block mb-1">
                Kebijakan Layanan & Saldo
              </span>
              Seluruh saldo subsidi dan biaya langganan yang telah dibayarkan
              bersifat <span className="font-bold">final.</span> Saldo tidak
              dapat diuangkan kembali, dialihkan, atau di-refund setelah
              transaksi berhasil diproses.
            </div>
          </div>

          {/* Checkbox Persetujuan */}
          <div
            className={`flex items-start space-x-3 p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
              isAgreed
                ? "bg-primary/5 border-primary/30"
                : "bg-slate-50 border-slate-200 dark:bg-slate-900 dark:border-slate-800"
            }`}
            onClick={() => !isLoading && setIsAgreed(!isAgreed)}
          >
            <Checkbox
              id="agreement"
              checked={isAgreed}
              onCheckedChange={setIsAgreed}
              disabled={isLoading}
              className="mt-1 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <label
              htmlFor="agreement"
              className="text-sm font-medium leading-relaxed cursor-pointer select-none"
            >
              Saya mengerti dan menyetujui bahwa transaksi ini bersifat final
              dan saldo tidak dapat dikembalikan (Non-Refundable).
            </label>
          </div>
        </div>

        {/* Footer dengan Tombol Aksi */}
        <DialogFooter className="p-6 bg-slate-50 dark:bg-slate-900 flex flex-col-reverse sm:flex-row gap-3">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-xl font-semibold sm:flex-1"
          >
            Batalkan
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!isAgreed || isLoading}
            className="rounded-xl font-bold px-8 sm:flex-[1.5] shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                Lanjut ke Pembayaran
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentValidationModal;
