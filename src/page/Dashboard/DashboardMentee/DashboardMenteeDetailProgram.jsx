import kuliah from "@/assets/kuliah.png";
import React, { useEffect, useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import useGetDetailProgram from "@/hooks/hooksMentee/useGetDetailProgram";
import DetailProgramSkeleton from "@/components/DetailProgramSkeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import useRegisterProgram from "@/hooks/hooksMentee/useRegisterProgram";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const DashboardMenteeDetailProgram = () => {
  // get id program from url
  const { id } = useParams();
  const idProgram = parseInt(id);
  const navigate = useNavigate();
  const [isAgreed, setIsAgreed] = useState(false);

  // hooks get details program
  const token = localStorage.getItem("userJwt");
  const { detailProgram, isLoading, error, fetchDetailProgram } =
    useGetDetailProgram();

  // hooks register program
  const { message, isLoadingRegister, errorRegister, registerProgram } =
    useRegisterProgram();

  // handle register program
  const handleRegisterProgram = async () => {
    if (!isAgreed || isLoadingRegister) {
      return;
    }

    try {
      const result = await registerProgram(token, displayDetailProgram.id);

      if (result.status === 200 || result.status === 201) {
        toast.success(result.message || "Pendaftaran berhasil!");
        navigate("/dashboard-mentee");
      } else {
        toast.success(result.message || "Pendaftaran disubmit!");
        navigate("/dashboard-mentee");
      }
    } catch (error) {
      if (error.status === 409) {
        // Jika status 409 Conflict (Sudah terdaftar)
        toast.warning(error.message || "Anda sudah terdaftar di program ini.");
      } else {
        const errorMessage =
          error.message || "Terjadi kesalahan saat pendaftaran.";
        toast.error(errorMessage);
      }
    }
  };

  const displayDetailProgram = detailProgram ?? [];
  console.log(displayDetailProgram);

  // get detail program
  useEffect(() => {
    if (token) {
      fetchDetailProgram(token, idProgram);
    }
  }, [token, fetchDetailProgram]);

  // get location if sesi onsite
  const getLocation = (sesi) => {
    if (!sesi) {
      return [];
    }

    switch (sesi.type_sesi) {
      case "online":
        return "Online";
      case "onsite":
        return sesi.sesi_description;
    }
  };

  // error handling
  if (error) {
    return (
      <p className="justify-center text-center" style={{ color: "red" }}>
        ❌ Error: {error}
      </p>
    );
  }

  // loading handling
  if (isLoading) {
    return <DetailProgramSkeleton />;
  }

  return (
    <>
      {/* breadcum */}
      <Breadcrumb className="mb-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="hover:text-primary">
              <Link to="/dashboard-mentee">Beranda</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="hover:text-primary">
              <Link to="/dashboard-mentee/program">Program</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="text-primary">
            <BreadcrumbPage className="text-primary">
              {displayDetailProgram.program_name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* Header */}
      <div className="relative rounded-xl overflow-hidden shadow-md mb-10">
        <img
          src={displayDetailProgram.image_url}
          alt="Program"
          className="w-full h-72 object-cover"
        />
        {/* Overlay konten di bawah gambar */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#0E3B3D]/90 text-white p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">
              {displayDetailProgram.program_name}
            </h1>
            {/* start date */}
            <div className="flex items-center gap-2 text-gray-300 text-sm mt-2">
              <Calendar size={16} />
              <span>
                {new Date(displayDetailProgram.start_date).toLocaleDateString(
                  "id-ID",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </span>
            </div>
          </div>
          {/* start Popup register program */}
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
                      {displayDetailProgram.terms_and_conditions?.map(
                        (item, index) => (
                          <li key={index} className="text-sm">
                            {item}
                          </li>
                        )
                      )}
                    </ul>
                  </DialogDescription>
                </DialogHeader>

                {/* checkbox */}
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
                  disabled={!isAgreed || isLoadingRegister} // Tombol dinonaktifkan jika belum dicentang
                  onClick={() => handleRegisterProgram()}
                >
                  Submit Pendaftaran
                </button>
              </DialogContent>
            </form>
          </Dialog>
          {/* end Popup register program */}
        </div>
      </div>

      {/* Bagian Detail  */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Detail Program */}
        <div className="md:col-span-2 bg-white shadow-md rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-[#0E3B3D]">
            Detail Program
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            {displayDetailProgram.description}
          </p>

          <ul className="text-gray-700 space-y-2 text-sm sm:text-base">
            <li>
              <strong>Tanggal Pelaksanaan:</strong>{" "}
              {new Date(displayDetailProgram.start_date).toLocaleDateString(
                "id-ID",
                {
                  day: "numeric",
                }
              )}
              {" - "}
              {new Date(displayDetailProgram.end_date).toLocaleDateString(
                "id-ID",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </li>
            <li>
              <strong>Waktu Pelaksanaan :</strong>{" "}
              {new Date(displayDetailProgram.sesi_start).toLocaleTimeString(
                "id-ID",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                }
              )}
              {" - "}
              {new Date(displayDetailProgram.sesi_end).toLocaleTimeString(
                "id-ID",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                }
              )}
            </li>
            <li>
              <strong>Tempat:</strong> {getLocation(displayDetailProgram)}
            </li>
          </ul>

          <div className="mt-6">
            <h3 className="font-semibold text-[#0E3B3D] mb-2">Fasilitas:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm sm:text-base">
              {displayDetailProgram.benefit &&
                displayDetailProgram.benefit.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>
          </div>
        </div>

        <div className="md:col-span-1 flex flex-col space-y-8">
          {/* Card Campus */}
          <Link
            to={`/dashboard-mentee/kampus/${displayDetailProgram.campus_program_id_campusTocampus?.id}`}
            className="bg-white rounded-xl shadow-md transition p-3 block "
          >
            {/* banner */}
            <img
              src={
                displayDetailProgram.campus_program_id_campusTocampus
                  ?.banner_url
              }
              alt={
                displayDetailProgram.campus_program_id_campusTocampus
                  ?.campus_name
              }
              className="rounded-lg w-full h-40 object-cover mb-3"
            />
            <div className="flex items-center gap-2 mb-2">
              {/* logo campus */}
              <img
                src={
                  displayDetailProgram.campus_program_id_campusTocampus
                    ?.logo_url
                }
                alt="Logo"
                className="w-8 h-8 object-contain"
              />
              {/* campus name */}
              <p className="font-semibold text-sm">
                {
                  displayDetailProgram.campus_program_id_campusTocampus
                    ?.campus_name
                }
              </p>
            </div>
            <div className="flex items-center gap-1 text-gray-500 text-xs">
              <MapPin size={14} />
              {/* campus location */}
              <span>
                {displayDetailProgram.campus_program_id_campusTocampus?.address}
              </span>
            </div>
          </Link>

          {/* Informasi Mentor */}

          <div className="bg-white shadow-md rounded-xl p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4 text-[#0E3B3D]">
              Informasi Mentor
            </h2>
            <div className="space-y-2 text-gray-700 text-sm sm:text-base">
              <p>
                <strong>Nama:</strong> {displayDetailProgram.mentor?.name}
              </p>
              <p>
                <strong>Email:</strong> PKProgram@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardMenteeDetailProgram;
