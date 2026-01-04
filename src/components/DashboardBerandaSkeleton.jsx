import { Check, GraduationCap, X } from "lucide-react";

import robotHappy from "@/assets/robot-happy.png";
import React from "react";

const BannerSkeleton = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-primary w-full rounded-2xl p-6 md:p-10 shadow-xl overflow-hidden flex flex-col md:flex-row items-start justify-between gap-6">
        {/* Left Side */}
        <div className="relative flex-1 w-full">
          <div className="mb-8">
            <div className="h-4 bg-white/20 rounded w-48 mb-2 animate-pulse"></div>
            <div className="h-10 md:h-14 bg-white/20 rounded w-3/4 animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            {/* Program */}
            <div className="bg-white rounded-md p-4 shadow-md flex items-center gap-3">
              <div className="bg-blue-200 rounded-full w-10 h-10 flex items-center justify-center text-[#003C3C] shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="w-full">
                <div className="h-3 bg-gray-200 rounded w-16 mb-1 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
              </div>
            </div>

            {/* Lulus */}
            <div className="bg-white rounded-md p-4 shadow-md flex items-center gap-3">
              <div className="bg-green-200 rounded-full w-10 h-10 flex items-center justify-center text-[#32A852] shrink-0">
                <Check className="w-5 h-5" />
              </div>
              <div className="w-full">
                <div className="h-3 bg-gray-200 rounded w-16 mb-1 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
              </div>
            </div>

            {/* Tidak Lulus */}
            <div className="bg-white rounded-md p-4 shadow-md flex items-center gap-3">
              <div className="rounded-full w-10 h-10 flex bg-red-200 items-center justify-center text-[#FF4136] shrink-0">
                <X className="w-5 h-5" />
              </div>
              <div className="w-full">
                <div className="h-3 bg-gray-200 rounded w-20 mb-1 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
        {/* Robot */}
        <div className="hidden md:block relative z-10 flex-shrink-0">
          <img
            src={robotHappy}
            alt="Robot TEMPA"
            className="w-48 lg:w-64 object-contain opacity-50 grayscale"
          />
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6 mt-8">Aktivitas</h2>
    </>
  );
};

// Komponen Card Skeleton Tunggal
export const SkeletonCard = () => (
  <>
    <section>
      <div className="flex flex-col lg:flex-row border relative rounded-2xl overflow-hidden shadow-lg bg-white animate-pulse">
        {/* Image Area */}
        <div className="lg:w-1/3 bg-gray-300 min-h-[200px] flex flex-col justify-end p-6 relative">
          {/* Badge Placeholder */}
          <div className="absolute top-4 left-4 bg-gray-400 h-6 w-24 rounded-full"></div>
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

            {/* Date and Location Grid */}
            <div className="flex gap-y-3 gap-x-4 text-sm mb-6 border-t pt-4">
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
    <div>
      <BannerSkeleton />
      <div className="flex flex-col gap-8">
        {Array(count)
          .fill(0)
          .map((_, index) => (
            <SkeletonCard key={index} />
          ))}
      </div>
    </div>
  );
};

export default DashboardBerandaSkeleton;
