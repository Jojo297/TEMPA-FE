import React from "react";
import { Check, X, GraduationCap } from "lucide-react";
import SidebarWithNavbar from "@/components/SidebarWithNavbar";
import robotHappy from "@/assets/robot-happy.png";
import roboterror from "@/assets/robot-error.png";
import Footer from "@/components/Footer";

const DashboardMentee = () => {
  const darkText = "#003C3C";
  const cardBgColor = "#E6F3F3";
  const heroBg = "#003C3C";

  return (
    <SidebarWithNavbar>
      <main className="px-10 pt-4 pb-6 flex-1">
        {/* Hero Section */}
        <div
          className="rounded-xl p-6 shadow-xl flex flex-col md:flex-row items-start justify-between"
          style={{ backgroundColor: heroBg }}
        >
          {/* Left Side */}
          <div className="flex-1 pr-4">
            <p className="text-sm tracking-widest text-white/80 mb-1">
              SELAMAT DATANG,
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              TEMAN TEMPA
            </h1>

            <div className="flex flex-wrap gap-4">
              {/* Program */}
              <div className="bg-white rounded-xl p-4 w-48 shadow-md flex items-center gap-3">
                <div
                  className="rounded-full w-10 h-10 flex items-center justify-center text-[#003C3C]"
                  style={{ backgroundColor: cardBgColor }}
                >
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">PROGRAM</p>
                  <p className="font-semibold text-lg" style={{ color: darkText }}>
                    00 Program
                  </p>
                </div>
              </div>

              {/* Lulus */}
              <div className="bg-white rounded-xl p-4 w-48 shadow-md flex items-center gap-3">
                <div
                  className="rounded-full w-10 h-10 flex items-center justify-center text-[#32A852]"
                  style={{ backgroundColor: cardBgColor }}
                >
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">LULUS</p>
                  <p className="font-semibold text-lg" style={{ color: darkText }}>
                    00 Program
                  </p>
                </div>
              </div>

              {/* Tidak Lulus */}
              <div className="bg-white rounded-xl p-4 w-48 shadow-md flex items-center gap-3">
                <div
                  className="rounded-full w-10 h-10 flex items-center justify-center text-[#FF4136]"
                  style={{ backgroundColor: cardBgColor }}
                >
                  <X className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">TIDAK LULUS</p>
                  <p className="font-semibold text-lg" style={{ color: darkText }}>
                    00 Program
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
          <h2 className="text-2xl font-bold mb-6" style={{ color: darkText }}>
            Aktivitas
          </h2>
          <div className="flex flex-col items-center justify-center py-16 rounded-xl bg-white/40 border border-white/10 shadow-inner">
            <img src={roboterror} alt="Belum Ada Aktivitas" className="w-40 mb-4" />
            <p className="text-gray-600">Belum ada aktivitas yang diikuti</p>
          </div>
        </section>
      </main>
    </SidebarWithNavbar>
  );
};

export default DashboardMentee;
