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

export const DialogGenerateQrCodePresensi = ({
  isOpen,
  onOpenChange,
  menteeList = [],
}) => {
  const attendanceUrl = `https://tempa.id/presensi/scan?program=${59}&t=${Date.now()}`;

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

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>
          <h3 className="font-bold text-slate-700">Scan untuk Presensi</h3>
        </DialogTitle>
        <DialogDescription>
          Bagikan Qr-Code dibawah kepada mentee untuk presensi.
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-col items-center ">
        <div className="p-3 border-4 border-emerald-500 rounded-lg">
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

        <Button className="my-4" onClick={downloadQRCanvas}>
          <Download /> Unduh QR Code
        </Button>
      </div>
    </DialogContent>
  );
};
