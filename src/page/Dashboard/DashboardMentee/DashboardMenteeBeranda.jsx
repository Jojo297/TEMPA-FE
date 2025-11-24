import React, { useEffect } from "react";
import {
  Check,
  X,
  GraduationCap,
  Search,
  Home,
  Calendar,
  Users,
  Map,
} from "lucide-react";
import robotHappy from "@/assets/robot-happy.png";
import roboterror from "@/assets/robot-error.png";
import { jwtDecode } from "jwt-decode";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import DashboardBerandaSkeleton from "@/components/DashboardBerandaSkeleton";
import useProgramStoreMentee from "@/hooks/hooksMentee/useProgramMentee";

export default function DashboardBeranda() {
  const navigate = useNavigate();
  const { programs, isLoading, error, fetchPrograms } = useProgramStoreMentee();
  const token = localStorage.getItem("userJwt");
  // console.log(token);

  const decode = jwtDecode(token);

  // get username
  const userName = decode.username;
  const name = userName.split(" ").slice(0, 2).join(" ");

  // get all program
  const displayPrograms = programs ?? [];
  const countProgram = displayPrograms.length;
  console.log(displayPrograms);

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
    const startDate = new Date(start_date);
    console.log(start_date);

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (startDate.getTime() > today.getTime()) {
      return {
        text: "Program Belum Dimulai",
        bgColor: "bg-blue-100",
        textColor: "text-blue-800",
      };
    }

    // 4. Masuk ke switch statement jika program sudah dimulai atau selesai
    switch (status) {
      case "completed":
        return {
          text: "Lulus",
          bgColor: "bg-green-200",
          textColor: "text-green-800",
        };
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
    <>
      {/* Hero Section */}
      <div className="bg-primary w-full rounded-xl p-6 shadow-xl flex flex-col md:flex-row items-start justify-between">
        {/* Left Side */}
        <div className="flex-1 pr-4">
          <p className="text-sm tracking-widest text-white/80 mb-2">
            SELAMAT DATANG,
          </p>
          <h1 className="text-lg md:text-5xl font-extrabold text-white mb-6">
            {name}
          </h1>

          <div className="flex flex-wrap gap-4">
            {/* Program */}
            <div className="bg-white rounded-xl p-4 w-48 shadow-md flex items-center gap-3">
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
            <div className="bg-white rounded-xl p-4 w-48 shadow-md flex items-center gap-3">
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
            <div className="bg-white rounded-xl p-4 w-48 shadow-md flex items-center gap-3">
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
        <div className="mt-6 md:mt-0 md:ml-6 flex-shrink-0">
          <img
            src={robotHappy}
            alt="Robot TEMPA"
            className="w-44 md:w-56 object-contain"
            style={{ position: "relative", top: "-20px" }}
          />
        </div>
      </div>

      {/* Aktivitas */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Aktivitas</h2>

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
        ) : (
          <div className="flex flex-col gap-8">
            {/* Card Program */}
            {displayPrograms.map((item) => (
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
                    <div className="flex gap-y-3 gap-x-4 text-gray-700 text-sm mb-6 border-t pt-4">
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
                          {item.program_details?.sesi_program.map(
                            (sesi) => sesi.type_sesi
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Button */}
                    <button
                      onClick={() => {
                        navigate(`materi/${item.program_details?.id}`);
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
    </>
  );
}
