import React from "react";
import { Check, X, GraduationCap, Search } from "lucide-react";
import SidebarWithNavbar from "@/components/SidebarWithNavbar";
import robotHappy from "@/assets/robot-happy.png";
import roboterror from "@/assets/robot-error.png";
import { jwtDecode } from "jwt-decode";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function DashboardBeranda() {
  const navigate = useNavigate();
  const token = localStorage.getItem("userJwt");
  // console.log(token);

  const decode = jwtDecode(token);

  const userName = decode.username;

  const name = userName.split(" ").slice(0, 2).join(" ");
  // console.log(name);

  return (
    <>
      {/* Hero Section */}
      <div className="bg-primary rounded-xl p-6 shadow-xl flex flex-col md:flex-row items-start justify-between">
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
                <p className="font-semibold text-lg">0 Program</p>
              </div>
            </div>

            {/* Lulus */}
            <div className="bg-white rounded-xl p-4 w-48 shadow-md flex items-center gap-3">
              <div className="bg-green-200 rounded-full w-10 h-10 flex items-center justify-center text-[#32A852]">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500">LULUS</p>
                <p className="font-semibold text-lg">0 Program</p>
              </div>
            </div>

            {/* Tidak Lulus */}
            <div className="bg-white rounded-xl p-4 w-48 shadow-md flex items-center gap-3">
              <div className="rounded-full w-10 h-10 flex bg-red-200 items-center justify-center text-[#FF4136]">
                <X className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500">TIDAK LULUS</p>
                <p className="font-semibold text-lg">0 Program</p>
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
        <div className="flex flex-col items-center justify-center py-16 rounded-xl bg-white/40 border border-white/10 shadow-inner">
          <img
            src={roboterror}
            alt="Belum Ada Aktivitas"
            className="w-40 mb-4"
          />
          <div className="text-center">
            <p className="text-gray-600">Belum ada aktivitas yang diikuti</p>
            <Button
              className="mt-4 px-24 transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
              onClick={() => navigate("program")}
            >
              Cari Program <Search />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
