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
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button"; // Pastikan path button sesuai
import useGenerateCertificate from "@/hooks/hooksCampus/useGenerateCertificate";
import { toast } from "sonner";
import { QRCodeCanvas } from "qrcode.react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { differenceInDays, parseISO, format, addDays } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Calendar, Info } from "lucide-react";
import { Input } from "./ui/input";
import * as z from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import useUpdateExpiredPresensi from "@/hooks/hooksCampus/useUpdateExpiredPresensi";
import { Spinner } from "./ui/spinner";
import { jwtDecode } from "jwt-decode";

const DOMAIN_BASE_URL = import.meta.env.VITE_DOMAIN_URL;

const expiredPresensiSchema = z.object({
  expiredPresensi: z.array(
    z.object({
      day: z.number(),
      expiry_time: z
        .string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/, {
          message: "Format waktu harus HH:mm:ss",
        }),
    }),
  ),
});

export const DialogGenerateQrCodePresensi = ({
  isOpen,
  onOpenChange,
  menteeList = [],
  startProgram,
  endProgram,
  expiredPresensi: initialData,
  idProgram,
}) => {
  const token = localStorage.getItem("userJwt");
  const decode = jwtDecode(token);
  // console.log(decode);
  const {
    isLoading,
    errorEditExpired,
    successMessage,
    editExpiredPresensi,
    editExpiredPresensiMentor,
  } = useUpdateExpiredPresensi();
  const attendanceUrl = `${DOMAIN_BASE_URL}/presensi/${idProgram}`;

  // function download qr code
  const downloadQRCanvas = () => {
    // get id qr code
    const canvas = document.getElementById("qr-code-canvas");

    if (canvas instanceof HTMLCanvasElement) {
      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `QR_Presensi_${Date.now()}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } else {
      console.error(
        "Elemen QR bukan merupakan Canvas. Pastikan Anda menggunakan QRCodeCanvas.",
      );
    }
  };

  const totalDays =
    startProgram && endProgram
      ? differenceInDays(new Date(endProgram), new Date(startProgram)) + 1
      : 0;

  // console.log("Start:", startProgram, "End:", endProgram, "Total:", totalDays);

  // Setup Form
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(expiredPresensiSchema),
    defaultValues: {
      expiredPresensi: [],
    },
  });

  // Setup Field Array
  const { fields } = useFieldArray({
    control,
    name: "expiredPresensi",
  });

  // Sync data from props to form
  useEffect(() => {
    if (initialData && initialData.length > 0) {
      reset({ expiredPresensi: initialData });
    }
  }, [initialData, reset]);

  // Handle Submit
  const onSubmit = async (data) => {
    try {
      // console.log("Payload yang akan dikirim ke API:", data);
      if (decode.role == "mentor") {
        editExpiredPresensiMentor(token, data, idProgram);
      } else {
        await editExpiredPresensi(token, data, idProgram);
      }
      toast.success("Konfigurasi berhasil disimpan!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DialogContent className="sm:max-w-[700px] gap-0 p-0 overflow-hidden">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:row h-[550px]"
      >
        <div className="flex flex-col md:flex-row h-[550px]">
          {/* KIRI: Preview QR Code */}
          <div className="w-full md:w-1/2 bg-slate-50 p-6 flex flex-col items-center justify-center border-r">
            <div className="bg-white p-4 shadow-xl rounded-2xl border-2 border-primary/10">
              <QRCodeCanvas
                id="qr-code-canvas"
                value={attendanceUrl}
                size={200}
                level="H"
                includeMargin={true}
                imageSettings={{
                  src: "/logo-app.png", // logo
                  x: undefined,
                  y: undefined,
                  height: 50,
                  width: 50,
                  excavate: true,
                }}
              />
            </div>
            <Button
              className="mt-6 w-full max-w-[200px]"
              onClick={downloadQRCanvas}
            >
              <Download className="mr-2 h-4 w-4" /> Unduh QR
            </Button>
            <p className="mt-4 text-[10px] text-slate-400 text-center uppercase tracking-widest font-bold">
              Scan to check-in
            </p>
          </div>

          {/* KANAN: Pengaturan Expired Dinamis */}
          <div className="w-full md:w-1/2 p-6 flex flex-col">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-xl font-bold">
                Atur Jadwal Expired
              </DialogTitle>
              <DialogDescription>
                Tentukan batas jam presensi untuk setiap hari.
              </DialogDescription>
            </DialogHeader>

            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {fields.length > 0 ? (
                  fields.map((field, index) => {
                    const currentDate = startProgram
                      ? format(
                          addDays(new Date(startProgram), index),
                          "dd MMM yyyy",
                        )
                      : "-";

                    return (
                      <div
                        key={field.id}
                        className="p-3 rounded-xl border bg-white shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex flex-col">
                            <span className="text-[10px] font-black text-primary/50 uppercase">
                              Day
                            </span>
                            <span className="text-lg font-bold text-primary">
                              {field.day}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-1 rounded-full flex items-center">
                            <Calendar className="h-3 w-3 mr-1" /> {currentDate}
                          </span>
                        </div>

                        {/* INPUT RHF */}
                        <Input
                          type="time"
                          step="1" // Memungkinkan input detik jika browser mendukung
                          {...register(`expiredPresensi.${index}.expiry_time`)}
                          className="focus-visible:ring-primary border-slate-200"
                        />
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center py-10 text-slate-400">
                    Data tidak ditemukan
                  </p>
                )}
              </div>
            </ScrollArea>

            <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-100 flex items-start gap-2">
              <Info className="h-4 w-4 text-amber-600 mt-0.5" />
              <p className="text-[11px] text-amber-700">
                Mentee tidak dapat mengisi presensi setelah jam yang ditentukan
                pada hari tersebut.
              </p>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {isLoading ? <Spinner /> : "Simpan Konfigurasi"}
            </Button>
          </div>
        </div>
      </form>
    </DialogContent>
  );
};
