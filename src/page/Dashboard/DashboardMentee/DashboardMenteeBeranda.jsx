import React, { useEffect, useState } from "react";
import {
  Check,
  X,
  GraduationCap,
  Search,
  Home,
  Calendar,
  Users,
  Map,
  Sparkle,
  ChevronRight,
  Bell,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import robotHappy from "@/assets/robot-happy.png";
import roboterror from "@/assets/robot-error.png";
import { jwtDecode } from "jwt-decode";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import DashboardBerandaSkeleton from "@/components/DashboardBerandaSkeleton";
import useProgramStoreMentee from "@/hooks/hooksMentee/useProgramMentee";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NotFounPages from "@/components/NotFoundPages";

export default function DashboardBeranda() {
  const navigate = useNavigate();
  const { programs, isLoading, error, fetchPrograms, statusMajorInterest } =
    useProgramStoreMentee();
  const token = localStorage.getItem("userJwt");
  // console.log(token);
  const [selectedType, setSelectedType] = useState("all"); // for type_sesi
  const [selectedStatus, setSelectedStatus] = useState("all"); // for completion_status

  const decode = jwtDecode(token);

  // get username
  const userName = decode.username;
  const name = userName.split(" ").slice(0, 2).join(" ");

  // get all program
  const displayPrograms = programs ?? [];
  const countProgram = displayPrograms.length;
  // console.log(statusMajorInterest);

  // Filter programs based on selectedType and selectedStatus
  const filteredPrograms = displayPrograms.filter((program) => {
    const typeMatch =
      selectedType === "all" ||
      program.program_details.type_sesi === selectedType;
    const statusMatch =
      selectedStatus === "all" || program.completion_status === selectedStatus;
    return typeMatch && statusMatch;
  });

  // get completed program
  const completedPrograms = displayPrograms.filter((item) => {
    return item.completion_status === "completed";
  });

  const completedCount = completedPrograms.length;
  // console.log(completedCount);

  const unCompleted = displayPrograms.filter(
    (item) => item.completion_status === "uncompleted"
  );

  const countUnCompleted = unCompleted.length;

  // badge for status program
  const getBadgeClass = (status, start_date, end_date) => {
    if (status === "completed") {
      return {
        text: "Lulus",
        bgColor: "bg-green-200",
        textColor: "text-green-800",
      };
    }

    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    // console.log(start_date);

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (startDate.getTime() > today.getTime()) {
      return {
        text: "Program Belum Dimulai",
        bgColor: "bg-blue-100",
        textColor: "text-blue-800",
      };
    } else if (endDate.getTime() <= today.getTime()) {
      return {
        text: "Program Sudah Selesai",
        bgColor: "bg-red-100",
        textColor: "text-red-800",
      };
    }

    // 4. Masuk ke switch statement jika program sudah dimulai atau selesai
    switch (status) {
      case "uncompleted":
        return {
          text: "Tidak Lulus",
          bgColor: "bg-red-100",
          textColor: "text-red-800",
        };
      case "on_going":
        return {
          text: "Sedang Berjalan",
          bgColor: "bg-yellow-100",
          textColor: "text-yellow-800",
        };
      // Kasus default opsional
      default:
        return {
          text: "Status Lain",
          bgColor: "bg-gray-100",
          textColor: "text-gray-800",
        };
    }
  };

  // get location if onsite
  const getLocation = (status, item) => {
    const normalizedStatus = status?.toLowerCase()?.trim();
    switch (normalizedStatus) {
      case "online":
        return "Zoom/Gmeet";
      case "onsite":
        return item;
      default:
        return "Tempat belum ditentukan";
    }
  };

  // get all program
  useEffect(() => {
    if (token) {
      fetchPrograms(token);
    }
  }, [token, fetchPrograms]);

  // error handling
  if (error) {
    return (
      <p className="justify-center text-center" style={{ color: "red" }}>
        ❌ Error: {error}
      </p>
    );
  }

  // skeleton loading
  if (isLoading) {
    return <DashboardBerandaSkeleton />;
  }

  return (
    <div className="max-w-7xl mx-auto w-full min-w-0">
      {/* notification */}
      {!statusMajorInterest && (
        <Alert className="mb-4 bg-white border-indigo-100 shadow-sm py-3 px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center w-full justify-between gap-4">
            <div className="flex items-start gap-3">
              {/* Gunakan warna indigo/violet untuk kesan AI yang modern */}
              <div className="bg-indigo-100 p-2 rounded-full shrink-0">
                <Bell className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-blue-900 leading-tight mb-1">
                  Jangan Lupa Isi Minat Jurusan Anda!
                </p>
                <p className="text-xs text-indigo-700/80 leading-relaxed">
                  Bantu kami menyesuaikan rekomendasi kampus dan program studi
                  yang paling sesuai dengan passion serta rencana karier masa
                  depanmu.
                </p>
              </div>
            </div>

            <Button
              size="sm"
              variant="ghost"
              onClick={() => navigate("/dashboard-mentee/major-interest")}
              className="w-full md:w-auto bg-blue-600 text-white hover:bg-blue-700 hover:text-white transition-all shadow-sm shrink-0 px-4"
            >
              Isi Sekarang
              <ChevronRight size={14} className="ml-1" />
            </Button>
          </div>
        </Alert>
      )}

      {/* Hero Section */}
      <div className="relative bg-primary w-full rounded-2xl p-6 md:p-10 shadow-xl overflow-hidden flex flex-col md:flex-row items-start justify-between gap-6">
        {/* Left Side */}
        <div className="relative flex-1 w-full">
          <div className="mb-8">
            <p className="text-xs md:text-sm font-semibold tracking-widest text-green-100 mb-2 uppercase">
              Selamat Datang Kembali,
            </p>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight drop-shadow-sm">
              {name}
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            {/* Program */}
            <div className="bg-white rounded-xl p-4  shadow-md flex items-center gap-3">
              <div className="bg-blue-200 rounded-full w-10 h-10 flex items-center justify-center text-[#003C3C]">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500">PROGRAM</p>
                <p className="font-semibold text-lg">
                  {countProgram || 0} Program
                </p>
              </div>
            </div>

            {/* Lulus */}
            <div className="bg-white rounded-xl p-4  shadow-md flex items-center gap-3">
              <div className="bg-green-200 rounded-full w-10 h-10 flex items-center justify-center text-[#32A852]">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500">LULUS</p>
                <p className="font-semibold text-lg">
                  {completedCount} Program
                </p>
              </div>
            </div>

            {/* Tidak Lulus */}
            <div className="bg-white rounded-xl p-4  shadow-md flex items-center gap-3">
              <div className="rounded-full w-10 h-10 flex bg-red-200 items-center justify-center text-[#FF4136]">
                <X className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500">TIDAK LULUS</p>
                <p className="font-semibold text-lg">
                  {countUnCompleted} Program
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Robot */}
        <div className="hidden md:block relative z-10 flex-shrink-0">
          <img
            src={robotHappy}
            alt="Robot TEMPA"
            className="w-48 lg:w-64 object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Aktivitas */}
      <section className="mt-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold">Aktivitas</h2>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            {/* type program */}
            <div className="w-full md:w-auto">
              <Select onValueChange={setSelectedType} defaultValue="all">
                <SelectTrigger
                  className={`w-full sm:w-48 bg-white ${
                    selectedType !== "all" ? "text-black" : "text-gray-400"
                  }`}
                >
                  <SelectValue placeholder="Pilih Tipe Program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Pilih Tipe Program</SelectLabel>
                    <SelectItem value="all">Semua Tipe</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="onsite">Onsite</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {/* status program */}
            <div className="w-full md:w-auto">
              <Select onValueChange={setSelectedStatus} defaultValue="all">
                <SelectTrigger
                  className={`w-full sm:w-48 bg-white ${
                    selectedStatus !== "all" ? "text-black" : "text-gray-400"
                  }`}
                >
                  <SelectValue placeholder="Pilih Status Program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Pilih Status Program</SelectLabel>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="completed">Lulus</SelectItem>
                    <SelectItem value="on_going">Sedang Berjalan</SelectItem>
                    <SelectItem value="uncompleted">Tidak Lulus</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* if programs empty */}
        {displayPrograms.length === 0 ? (
          <div>
            <div className="flex flex-col items-center justify-center py-16 rounded-xl bg-white/40 border border-white/10 shadow-inner">
              <img
                src={roboterror}
                alt="Belum Ada Aktivitas"
                className="w-40 mb-4"
              />
              <div className="text-center">
                <p className="text-gray-600">
                  Belum ada aktivitas yang diikuti
                </p>
                <Button
                  className="mt-4 px-24 transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                  onClick={() => navigate("program")}
                >
                  Cari Program <Search />
                </Button>
              </div>
            </div>
          </div>
        ) : filteredPrograms.length === 0 ? (
          <NotFounPages
            message={"Program dengan filter yang dipilih tidak ditemukan"}
          />
        ) : (
          <div className="flex flex-col gap-8">
            {/* Card Program */}
            {filteredPrograms.map((item) => (
              <div
                key={item.id}
                className="flex flex-col lg:flex-row border relative rounded-2xl overflow-hidden bg-white transition hover:shadow-xl"
              >
                {/* left side */}
                <div
                  className="lg:w-1/3 flex flex-col justify-end bg-cover bg-center p-6 text-white"
                  style={{
                    backgroundImage: `linear-gradient(rgba(1, 59, 53, 0.4), rgba(1, 59, 53, 0.7)),  url(${item.program_details.image_url})`,
                    backgroundColor: "#013B35",
                    minHeight: "200px",
                  }}
                >
                  {/* Completion Status */}
                  {(() => {
                    // get badge status
                    const statusData = getBadgeClass(
                      item.completion_status,
                      item.program_details?.start_date,
                      item.program_details?.end_date
                    );
                    return (
                      <div
                        className={`absolute top-4 z-10 px-3 py-1 rounded-full text-sm font-medium mt-2 sm:mt-0 ${statusData.bgColor} ${statusData.textColor}`}
                      >
                        {statusData.text}
                      </div>
                    );
                  })()}
                  <h3 className="text-2xl font-extrabold leading-tight drop-shadow-lg">
                    {item.program_details?.program_name}
                  </h3>
                </div>

                {/* right side */}
                <div className="lg:w-2/3 p-6 flex flex-col justify-between">
                  <div>
                    {/* Main info: Kampus, Jurusan */}
                    <div className="flex flex-wrap items-center space-x-4 mb-4">
                      <div className="flex items-center text-[#013B35] font-semibold text-lg">
                        <Home size={18} className="mr-2" />
                        <span>{item.program_details?.program_name}</span>
                      </div>
                      <div className="px-3 py-1 bg-green-100 text-[#013B35] rounded-full text-sm font-medium mt-2 sm:mt-0">
                        {item.program_details?.major_name}
                      </div>
                    </div>

                    {/* date and location */}
                    <div className="flex flex-wrap gap-y-3 gap-x-4 text-gray-700 text-sm mb-6 border-t pt-4">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2 text-[#013B35]" />
                        <span>
                          {new Date(
                            item.program_details?.start_date
                          ).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      {/* <div className="flex items-center">
                        <Clock size={16} className="mr-2 text-[#013B35]" />
                        <span>jam</span>
                      </div> */}
                      <div className="flex items-center">
                        <Users size={16} className="mr-2 text-[#013B35]" />
                        <span>{item.program_details?.capacity} Orang</span>
                      </div>
                      <div className="flex items-center">
                        <Map size={16} className="mr-2 text-[#013B35]" />
                        <span>
                          Tempat:{" "}
                          {getLocation(
                            item.program_details?.type_sesi,
                            item.program_details.onsiteLocationName
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Button */}
                    <button
                      onClick={() => {
                        navigate(
                          `/dashboard-mentee/materi/${item.program_details?.id}`
                        );
                      }}
                      className="w-full py-3 bg-[#013B35] text-white rounded-xl font-bold hover:bg-[#015f53] transition-all duration-300"
                    >
                      Lihat Materi
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
