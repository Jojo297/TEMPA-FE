import { Check, GraduationCap, X } from "lucide-react";

import robotHappy from "@/assets/robot-happy.png";
import React from "react";

// Komponen Card Skeleton Tunggal
export const SkeletonCard = () => (
  <>
    {/* Hero Section */}
    <div className="bg-primary max-w-7xl rounded-xl p-6 shadow-xl flex flex-col md:flex-row items-start justify-between">
      {/* Left Side */}
      <div className="flex-1 pr-4">
        <p className="text-sm tracking-widest text-white/80 mb-2">
          SELAMAT DATANG,
        </p>
        <h1 className="text-lg md:text-5xl font-extrabold text-white mb-6">
          <div className="h-6 bg-gray-200 rounded w-52 animate-pulse"></div>
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
                <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
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
              <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Tidak Lulus */}
          <div className="bg-white rounded-xl p-4 w-48 shadow-md flex items-center gap-3">
            <div className="rounded-full w-10 h-10 flex bg-red-200 items-center justify-center text-[#FF4136]">
              <X className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">TIDAK LULUS</p>
              <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
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

    <section className="mt-8">
      <h2 className="text-2xl font-bold mb-6">Aktivitas</h2>

      {/* // Meniru container card utama Anda */}
      <div className="flex flex-col lg:flex-row border relative rounded-2xl overflow-hidden shadow-lg bg-white animate-pulse">
        {/* KIRI (Image Area) */}
        <div className="lg:w-1/3 bg-gray-300 min-h-[200px] flex flex-col justify-end p-6 relative">
          {/* Badge Placeholder */}
          <div className="absolute top-4 right-4 bg-gray-400 h-6 w-24 rounded-full"></div>
          {/* Title Placeholder */}
          <div className="h-8 bg-gray-400 w-11/12 mt-20 rounded"></div>
        </div>

        {/* KANAN (Content Area) */}
        <div className="lg:w-2/3 p-6 flex flex-col justify-between">
          <div>
            {/* Main Info Line (Title & Badges) */}
            <div className="flex flex-wrap items-center space-x-4 mb-4">
              <div className="h-6 bg-gray-300 w-1/3 rounded"></div>
              <div className="h-6 bg-gray-300 w-20 rounded-full"></div>
            </div>

            {/* Description Placeholder */}
            <div className="space-y-2 mb-4">
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-11/12"></div>
              <div className="h-3 bg-gray-200 rounded w-10/12"></div>
            </div>

            {/* Date and Location Grid */}
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm mb-6 border-t pt-4">
              <div className="h-4 bg-gray-300 w-5/6 rounded"></div>
              <div className="h-4 bg-gray-300 w-5/6 rounded"></div>
            </div>
          </div>

          {/* Button Placeholder */}
          <div className="w-full py-3 bg-gray-400 rounded-xl"></div>
        </div>
      </div>
    </section>
  </>
);

// Komponen Wrapper untuk menampilkan beberapa Card
const DashboardBerandaSkeleton = ({ count = 3 }) => {
  return (
    <div className="flex flex-col gap-8">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <SkeletonCard key={index} />
        ))}
    </div>
  );
};

export default DashboardBerandaSkeleton;
