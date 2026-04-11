import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Wallet2,
  QrCode,
  Info,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";

export default function TopUpModal({ isOpen, onClose, onConfirm, isLoading }) {
  const [amount, setAmount] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);

  // LOGIC: Hitung estimasi kuota (15rb per peserta)
  const estimatedQuota = amount ? Math.floor(Number(amount) / 15000) : 0;
  const isMinimumMet = Number(amount) >= 15000;

  // Helper format rupiah
  const formatPreview = (val) => {
    if (!val) return "Rp 0";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(val);
  };

  const handleConfirm = async (amount) => {
    if (isAgreed) {
      await onConfirm(amount);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={isLoading ? undefined : onClose}>
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden border-none shadow-2xl rounded-[2rem] max-h-[92vh] flex flex-col">
        {" "}
        {/* Header dengan Aksen Gelap seperti Card Wallet */}
        <div className="bg-[#0f172a] p-8 pb-20 relative shrink-0">
          {" "}
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full -mr-16 -mt-16 blur-2xl" />
          <DialogHeader className="relative z-10">
            <div className="w-12 h-12 bg-amber-400/20 rounded-2xl flex items-center justify-center mb-4 border border-amber-400/30">
              <Wallet2 className="text-amber-400 h-6 w-6" />
            </div>
            <DialogTitle className="text-2xl font-bold text-white tracking-tight">
              Isi Saldo Deposit
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Tambahkan saldo untuk kuota pendaftaran mentee.
            </DialogDescription>
          </DialogHeader>
        </div>
        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-8 -mt-16 bg-white rounded-t-[2.5rem] relative z-20 space-y-6 custom-scrollbar shadow-[0_-15px_30px_rgb(0,0,0,0.1)]">
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <Label
                  htmlFor="amount"
                  className="text-xs font-bold uppercase tracking-widest text-slate-500"
                >
                  Nominal Top Up
                </Label>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                  Min. Rp 15.000
                </span>
              </div>

              <div className="relative group">
                <span
                  className={`absolute left-4 top-1/2 -translate-y-1/2 font-bold transition-colors ${amount && !isMinimumMet ? "text-red-500" : "text-slate-400 group-focus-within:text-amber-600"}`}
                >
                  Rp
                </span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className={`pl-12 py-7 text-xl font-black rounded-2xl transition-all ${amount && !isMinimumMet ? "border-red-200 bg-red-50/30 focus:ring-red-500" : "border-slate-200 focus:ring-amber-500"}`}
                />
              </div>

              {/* VALIDASI & ESTIMASI KUOTA */}
              {amount > 0 && (
                <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-1">
                  <p
                    className={`text-xs font-semibold ${isMinimumMet ? "text-emerald-600" : "text-red-500"}`}
                  >
                    {isMinimumMet
                      ? `Preview: ${formatPreview(amount)}`
                      : "⚠️ Minimal pengisian adalah Rp 15.000"}
                  </p>

                  {isMinimumMet && (
                    <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl flex items-center justify-between">
                      <span className="text-xs font-medium text-emerald-700">
                        Estimasi Kuota Diperoleh:
                      </span>
                      <span className="text-sm font-black text-emerald-800">
                        +{estimatedQuota} Peserta
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Info Box: QRIS Only */}
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center gap-4">
            <div className="bg-white p-2 rounded-xl shadow-sm">
              <QrCode className="h-5 w-5 text-slate-700" />
            </div>
            <div>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
                Metode Pembayaran
              </p>
              <p className="text-sm font-bold text-slate-700">
                QRIS (Otomatis & Real-time)
              </p>
            </div>
          </div>
          {/* Info Box: Refund Policy */}
          <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-2xl flex gap-3">
            <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs leading-relaxed text-amber-800">
              <span className="font-bold">Informasi Penting:</span> Pembayaran
              melalui QRIS bersifat <span className="underline">final</span>.
              Saldo yang telah berhasil di-topup tidak dapat ditarik kembali
              (Non-Refundable).
            </p>
          </div>
          {/* Checkbox Persetujuan */}
          <div
            className={`flex items-start space-x-3 p-4 rounded-2xl border transition-all cursor-pointer ${
              isAgreed
                ? "bg-amber-50/30 border-amber-200"
                : "bg-slate-50 border-transparent"
            }`}
            onClick={() => setIsAgreed(!isAgreed)}
          >
            <Checkbox
              id="terms"
              checked={isAgreed}
              onCheckedChange={setIsAgreed}
              className="mt-0.5 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
            />
            <label
              htmlFor="terms"
              className="text-xs font-medium leading-relaxed text-slate-600 cursor-pointer select-none"
            >
              Saya memahami bahwa saldo deposit hanya dapat digunakan untuk
              layanan TEMPA dan tidak dapat diuangkan kembali.
            </label>
          </div>
        </div>
        {/* Action Buttons */}
        <DialogFooter className="p-8 pt-4 bg-white flex flex-col sm:flex-row gap-3 shrink-0 border-t border-slate-50">
          {" "}
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-xl font-semibold sm:flex-1 text-slate-500"
          >
            Batal
          </Button>
          <Button
            onClick={() => handleConfirm(amount)}
            disabled={!isAgreed || !amount || amount <= 0 || isLoading}
            className="rounded-xl font-bold sm:flex-[1.5] bg-amber-400 hover:bg-amber-500 text-slate-900 shadow-lg shadow-amber-200"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
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
}
