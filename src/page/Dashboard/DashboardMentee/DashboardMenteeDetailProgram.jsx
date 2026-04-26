import React, { useEffect, useState } from "react";
import { BadgeCheckIcon, Calendar, MapPin } from "lucide-react";
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
import { DisplayMapsLocation } from "@/components/DisplayMapsLocation";
import Info from "@/components/Info";

const DashboardMenteeDetailProgram = () => {
  // get id program from url
  const { id } = useParams();
  const idProgram = parseInt(id);
  const navigate = useNavigate();
  const [isAgreed, setIsAgreed] = useState(false);

  // hooks get details program
  const token = localStorage.getItem("userJwt");
  const {
    detailProgram,
    isLoading,
    error,
    fetchDetailProgram,
    addViewProgram,
  } = useGetDetailProgram();

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
  // console.log(displayDetailProgram);

  // add view if mentee stay 5 second in this page
  useEffect(() => {
    if (!token) return;
    const threshold = 5000; // 5 second

    const isViewed = sessionStorage.getItem(`viewed_prog_${idProgram}`);
    if (isViewed) return;

    const timer = setTimeout(() => {
      addViewProgram(token, idProgram);
    }, threshold);

    // cleanup timer
    return () => {
      clearTimeout(timer);
    };
  }, [idProgram, token]);

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
        return sesi.onsiteLocationName;
    }
  };

  const getCapacity = (num) => {
    if (num <= 0) {
      return "Sudah Penuh";
    } else if (num > 0) {
      return num + " Orang";
    }
  };

  const getTypeSesi = (sesi) => {
    switch (sesi) {
      case "online":
        return "Online";
      case "onsite":
        return "Onsite";
      default:
        return "-";
    }
  };

  const formatDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) return "-";
    const start = new Date(startDate);
    const end = new Date(endDate);

    const fullOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    };

    const startYear = start.getUTCFullYear();
    const endYear = end.getUTCFullYear();

    if (startYear !== endYear) {
      // Different years: "20 Des 2025 - 10 Jan 2026"
      return `${start.toLocaleDateString(
        "id-ID",
        fullOptions,
      )} - ${end.toLocaleDateString("id-ID", fullOptions)}`;
    }

    // Same year
    const startMonth = start.getUTCMonth();
    const endMonth = end.getUTCMonth();

    if (startMonth !== endMonth) {
      // Different month, same year: "27 Nov - 28 Des 2025"
      const startFormatted = start.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        timeZone: "UTC",
      });
      return `${startFormatted} - ${end.toLocaleDateString(
        "id-ID",
        fullOptions,
      )}`;
    }

    // Same month, same year: "10 - 12 April 2025"
    const startDay = start.toLocaleDateString("id-ID", {
      day: "numeric",
      timeZone: "UTC",
    });
    return `${startDay} - ${end.toLocaleDateString("id-ID", fullOptions)}`;
  };

  const getMapsUrl = (lat, lng) => {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  };

  const formatTime = (isoTimeString) => {
    if (!isoTimeString) {
      return "-";
    }

    const date = new Date(isoTimeString);

    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "UTC",
    };

    return date.toLocaleTimeString("id-ID", options);
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
  const now = new Date();
  const start = new Date(displayDetailProgram.start_regis_date);
  const end = new Date(displayDetailProgram.end_regis_date);

  // Fungsi untuk reset waktu ke 00:00:00.000 agar akurat per tanggal
  const stripTime = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const todayClean = stripTime(now);
  const startClean = stripTime(start);
  const endClean = stripTime(end);

  const isFull = displayDetailProgram.capacity <= 0;

  let buttonText = "Daftar Sekarang";
  let buttonClass = "bg-[#B4D0E7] text-[#0E3B3D] hover:bg-[#A3C5E0]";
  let isDisabled = false;

  // check date if date not
  if (todayClean < startClean) {
    buttonText = "Segera Dibuka";
    buttonClass = "bg-gray-400 text-white cursor-not-allowed";
    isDisabled = true;
  } else if (
    todayClean > endClean ||
    displayDetailProgram.is_registration_closed
  ) {
    buttonText = "Pendaftaran Ditutup";
    buttonClass = "bg-red-500 text-white cursor-not-allowed text-xs";
    isDisabled = true;
  } else if (isFull) {
    buttonText = "Kuota Penuh";
    buttonClass = "bg-orange-500 text-white cursor-not-allowed";
    isDisabled = true;
  }

  return (
    <div className="max-w-7xl mx-auto w-full min-w-0">
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
            <BreadcrumbPage className="text-primary max-w-[150px] truncate md:max-w-none inline-block align-bottom">
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
          className="w-full h-48 sm:h-72 object-cover"
        />
        {/* Overlay konten di bawah gambar */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#0E3B3D]/90 text-white p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="w-full sm:w-auto">
            <h1 className="text-sm sm:text-2xl font-bold line-clamp-1">
              {displayDetailProgram.program_name}
            </h1>
          </div>
          {/* start Popup register program */}
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <button
                  disabled={isDisabled}
                  className={`w-full sm:w-auto font-semibold px-4 py-2 sm:px-6 rounded-md transition flex-shrink-0 text-sm sm:text-base ${buttonClass}`}
                >
                  {buttonText}
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
                        ),
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
                    <strong> Ketentuan dan Prasyarat</strong> di atas.
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
        <div className="md:col-span-2 bg-white shadow-md rounded-xl p-6 border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#013B35]">
              Detail Program
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Info
              label="Jenis Kegiatan"
              value={getTypeSesi(displayDetailProgram.type_sesi)}
            />
            <Info label="Jurusan" value={displayDetailProgram.major_name} />

            <Info
              label="Buka Pendaftaran"
              value={formatDateRange(
                displayDetailProgram.start_regis_date,
                displayDetailProgram.end_regis_date,
              )}
            />
            <Info
              label="Tanggal Pelaksanaan"
              value={formatDateRange(
                displayDetailProgram.start_program_date,
                displayDetailProgram.end_program_date,
              )}
            />

            <Info
              label="Waktu Mulai"
              value={formatTime(displayDetailProgram.sesi_start)}
            />
            <Info
              label="Waktu Selesai"
              value={formatTime(displayDetailProgram.sesi_end)}
            />
            <Info label="Kuota" value={displayDetailProgram.capacity} />

            <div className="col-span-2">
              <p className="font-medium text-gray-600 mb-1">Detail Kegiatan</p>
              {/* Ganti <p> di bawah ini menjadi <div> */}
              <div className="text-sm text-gray-900 sm:text-base border p-3 rounded-xl break-words">
                <div
                  className="whitespace-pre-wrap 
      [&_ol]:list-decimal [&_ol]:ml-5 
      [&_ul]:list-disc [&_ul]:ml-5 
      [&_li]:mb-1
      [&_p]:mb-4 
      [&_a]:text-blue-600 [&_a]:underline"
                  dangerouslySetInnerHTML={{
                    __html:
                      displayDetailProgram.description ||
                      "Deskripsi belum ditambahkan.",
                  }}
                />
              </div>
            </div>

            <div className="col-span-2">
              <p className="font-medium text-gray-600 mb-1">Benefit</p>
              <p className="text-gray-800 whitespace-pre-line border p-3 rounded-xl">
                <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm sm:text-base">
                  {displayDetailProgram.benefit &&
                    displayDetailProgram.benefit.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                </ul>
              </p>
            </div>
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
              {/* badge verif */}
              {displayDetailProgram.badge && (
                <div className="flex items-center gap-1.5 bg-blue-50  py-0.5 rounded-full ">
                  <BadgeCheckIcon
                    size={14}
                    className="fill-blue-600 text-white"
                  />
                </div>
              )}
            </div>
            <div className="flex items-center gap-1 text-gray-500 text-xs">
              <MapPin size={14} />
              {/* campus location */}
              <span>
                {`${displayDetailProgram.campus_program_id_campusTocampus?.province}, ${displayDetailProgram.campus_program_id_campusTocampus?.city}`}
              </span>
            </div>
          </Link>

          {/* Card Lokasi (Hanya tampil jika sesi 'onsite') */}
          {displayDetailProgram.type_sesi === "onsite" && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${displayDetailProgram.lat},${displayDetailProgram.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white shadow-md rounded-xl p-6 h-fit block transition hover:shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-4 text-[#0E3B3D]">
                Titik Lokasi
              </h2>
              <div className="w-full h-auto text-gray-700 text-sm sm:text-base">
                <DisplayMapsLocation
                  lat={displayDetailProgram.lat}
                  lng={displayDetailProgram.lng}
                />
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardMenteeDetailProgram;
