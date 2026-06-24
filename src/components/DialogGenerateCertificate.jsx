import React, { useState } from "react";
import {
  HardHat,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Mail,
  MedalIcon,
  Medal,
  Award,
  Mails,
  MailCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button"; // Pastikan path button sesuai
import useGenerateCertificate from "@/hooks/hooksCampus/useGenerateCertificate";
import { toast } from "sonner";

export const DialogGenerateCertificate = ({
  isOpen,
  onOpenChange,
  idProgram,
  selectedMentees = [],
  allMentee,
}) => {
  const token = localStorage.getItem("userJwt");
  const [isGenerating, setIsGenerating] = useState(false);
  const { message, isLoading, error, generateCertificate } =
    useGenerateCertificate();

  if (!isOpen) return null;
  const SelectedMenteeId = selectedMentees.map((mentee) => mentee.id);
  const AllMenteeId = allMentee.map((mentee) => mentee.id);
  // console.log("selected mentee", SelectedMenteeId);
  // console.log("all mentee", AllMenteeId);

  // send selected mentee
  const handleSelectedMentee = async () => {
    setIsGenerating(true);
    try {
      const payload = {
        menteeId: SelectedMenteeId,
        idProgram: idProgram,
      };
      console.log("ini di dialog: ", payload);
      const result = await generateCertificate(token, payload);
      toast.success(result);
      setIsGenerating(false);
      onOpenChange(false);
    } catch (error) {
      setIsGenerating(false);
      console.log(error);
      toast.error("Gagal menghasilkan sertifikat!", message);
    }
  };

  // send all mentee
  const handleAllMentee = async () => {
    setIsGenerating(true);
    try {
      const payload = {
        menteeId: AllMenteeId,
        idProgram: idProgram,
      };
      // console.log("ini di dialog: ", payload);
      const result = await generateCertificate(token, payload);
      toast.success(result);
      setIsGenerating(false);
      onOpenChange(false);
    } catch (error) {
      setIsGenerating(false);
      console.log(error);
      toast.error("Gagal menghasilkan sertifikat!", message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-md w-full border border-gray-100 transform transition-all animate-in zoom-in-95 duration-300">
        {/* Header Decor */}
        <div className="h-2 bg-primary w-full" />

        <div className="p-8">
          {/* Icon Section */}
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-primary/5">
            {isGenerating ? (
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
            ) : (
              <Award className="w-10 h-10 text-primary" strokeWidth={1.5} />
            )}
          </div>

          {/* Content */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Generate Sertifikat
            </h3>
            <p className="text-gray-500 text-sm">
              Sistem akan memproses sertifikat untuk{" "}
              <span className="font-semibold text-gray-700">mentee</span> yang
              terpilih.
            </p>
          </div>

          {/* Disclaimer Box */}
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-8 flex gap-3 text-left">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
                Penting
              </p>
              <p className="text-xs text-amber-700 leading-relaxed">
                Pastikan <strong>nama mentee</strong> sudah sesuai dengan nama
                asli. Sertifikat yang telah dibuat akan{" "}
                <strong>langsung dikirimkan ke alamat email</strong>{" "}
                masing-masing mentee.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            {/* Button send all mentee */}
            <Button
              onClick={handleAllMentee}
              disabled={isGenerating || allMentee.length === 0}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  <Mails className="w-5 h-5" />
                  Kirim ke Semua Mentee ({allMentee.length})
                </>
              )}
            </Button>

            {/* Button send selected mentee */}
            <Button
              onClick={handleSelectedMentee}
              disabled={isGenerating || selectedMentees.length === 0}
              className="w-full bg-white border-2 border-primary text-primary hover:bg-primary/5 font-bold py-6 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  <MailCheck className="w-5 h-5" />
                  Kirim ke Mentee Terpilih ({selectedMentees.length})
                </>
              )}
            </Button>

            {/* Button cancel */}
            <Button
              variant="ghost"
              onClick={() => !isGenerating && onOpenChange(false)}
              disabled={isGenerating}
              className="w-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 font-medium py-6 rounded-xl transition-all"
            >
              Batal
            </Button>
          </div>
        </div>

        {/* Footer Info */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-500" />
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
            Automated Certification System
          </span>
        </div>
      </div>
    </div>
  );
};
