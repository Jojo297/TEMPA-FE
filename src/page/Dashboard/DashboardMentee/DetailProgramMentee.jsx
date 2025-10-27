import SidebarWithNavbar from "@/components/SidebarWithNavbar";
import Footer from "@/components/Footer";
import kuliah from "@/assets/kuliah.png";
import React, { useState } from "react";
import { Calendar } from "lucide-react";
import { Navigate, useNavigate } from "react-router";
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
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const DetailProgramMentee = () => {
  const navigate = useNavigate();
  const [isAgreed, setIsAgreed] = useState(false);

  const prasyaratList = [
    "Anda berusia minimal 18 tahun.",
    "Data yang diisikan adalah data yang valid dan benar.",
    "Menyetujui syarat dan ketentuan penggunaan platform.",
    "Bersedia menerima email dan notifikasi terkait pendaftaran.",
  ];
  return (
    <>
      {/* Gambar Header */}
      <div className="relative rounded-xl overflow-hidden shadow-md mb-10">
        <img src={kuliah} alt="Program" className="w-full h-72 object-cover" />
        {/* Overlay konten di bawah gambar */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#0E3B3D]/90 text-white p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">
              KULIAH BERSERTIFIKAT 1 HARI
            </h1>
            <div className="flex items-center gap-2 text-gray-300 text-sm mt-2">
              <Calendar size={16} />
              <span>10 Oktober 2025</span>
            </div>
          </div>
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <button
                  // onClick={() => navigate("/dashboard-mentee/program/daftar")}
                  className="mt-4 sm:mt-0 bg-[#B4D0E7] text-[#0E3B3D] font-semibold px-6 py-2 rounded-md hover:bg-[#A3C5E0] transition flex-shrink-0"
                >
                  Daftar Sekarang
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-[#0E3B3D] border-[#B4D0E7]">
                <DialogHeader>
                  <DialogTitle className="text-center text-[#B4D0E7] text-xl">
                    Ketentuan dan Prasyarat
                  </DialogTitle>
                  {/* Mengganti DialogDescription dengan daftar ketentuan */}
                  <DialogDescription className="text-white pt-2 space-y-3">
                    <p className="font-semibold mb-2">
                      Mohon baca dan setujui prasyarat berikut:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                      {prasyaratList.map((item, index) => (
                        <li key={index} className="text-sm">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </DialogDescription>
                </DialogHeader>

                {/* --- Bagian Checkbox Persetujuan --- */}
                <div className="flex items-start mt-4">
                  <input
                    type="checkbox"
                    id="agreement-checkbox"
                    checked={isAgreed}
                    onChange={(e) => setIsAgreed(e.target.checked)}
                    className="mt-1 h-4 w-4 text-[#B4D0E7] bg-gray-700 border-gray-500 rounded focus:ring-transparent checked:bg-[#B4D0E7]"
                  />
                  <label
                    htmlFor="agreement-checkbox"
                    className="ml-2 text-sm text-white cursor-pointer"
                  >
                    Saya telah membaca, memahami, dan menyetujui semua
                    **Ketentuan dan Prasyarat** di atas.
                  </label>
                </div>

                <button
                  className={`font-semibold px-6 py-2 rounded-md transition flex-shrink-0 mt-6 ${
                    isAgreed
                      ? "bg-[#B4D0E7] text-[#0E3B3D] hover:bg-[#A3C5E0]"
                      : "bg-gray-500 text-gray-300 cursor-not-allowed" // Warna non-aktif
                  }`}
                  disabled={!isAgreed} // Tombol dinonaktifkan jika belum dicentang
                  onClick={() => {
                    if (isAgreed) {
                      // Tambahkan logika submit pendaftaran di sini
                      toast.success("Pendaftaran disubmit!");
                      navigate("/dashboard-mentee");
                    }
                  }}
                >
                  Submit Pendaftaran
                </button>
              </DialogContent>
            </form>
          </Dialog>
        </div>
      </div>

      {/* Bagian Detail dan Mentor */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Detail Program */}
        <div className="md:col-span-2 bg-white shadow-md rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-[#0E3B3D]">
            Detail Program
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>

          <ul className="text-gray-700 space-y-2 text-sm sm:text-base">
            <li>
              <strong>Jenis Kegiatan:</strong> Onsite
            </li>
            <li>
              <strong>Batas Akhir Pendaftaran:</strong> 9 Oktober 2025
            </li>
            <li>
              <strong>Tanggal Pelaksanaan:</strong> 10 Oktober 2025
            </li>
            <li>
              <strong>Tempat:</strong> Politeknik Negeri Batam, Gedung Tower A,
              Lantai 1B, Ruangan 3B
            </li>
            <li>
              <strong>Waktu:</strong> 10.00 – 17.00 WIB
            </li>
          </ul>

          <div className="mt-6">
            <h3 className="font-semibold text-[#0E3B3D] mb-2">Fasilitas:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm sm:text-base">
              <li>Sertifikat</li>
              <li>Ilmu dari mentor profesional</li>
              <li>Lunch & snack</li>
              <li>Kesempatan networking dengan mahasiswa dan dosen</li>
            </ul>
          </div>
        </div>

        {/* Informasi Mentor */}
        <div className="bg-white shadow-md rounded-xl p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4 text-[#0E3B3D]">
            Informasi Mentor
          </h2>
          <div className="space-y-2 text-gray-700 text-sm sm:text-base">
            <p>
              <strong>Nama:</strong> Nama Mentor
            </p>
            <p>
              <strong>Email:</strong> PKProgram@gmail.com
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProgramMentee;
