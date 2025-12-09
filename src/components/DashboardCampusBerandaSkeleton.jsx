import React from "react";

export default function DashboardCampusBerandaSkeleton() {
  return (
    <div className="animate-pulse">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div className="h-8 w-64 bg-gray-200 rounded-md"></div>
      </div>

      {/* === STATS CARDS === */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {/* Card Total Program Skeleton */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-5">
          <div className="bg-gray-200 rounded-full p-3 h-12 w-12"></div>
          <div>
            <div className="h-4 w-24 bg-gray-200 rounded-md mb-2"></div>
            <div className="h-7 w-16 bg-gray-200 rounded-md"></div>
          </div>
        </div>

        {/* Card Total Jurusan Skeleton */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-5">
          <div className="bg-gray-200 rounded-full p-3 h-12 w-12"></div>
          <div>
            <div className="h-4 w-24 bg-gray-200 rounded-md mb-2"></div>
            <div className="h-7 w-16 bg-gray-200 rounded-md"></div>
          </div>
        </div>

        {/* Card Total Mentor Skeleton */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-5">
          <div className="bg-gray-200 rounded-full p-3 h-12 w-12"></div>
          <div>
            <div className="h-4 w-24 bg-gray-200 rounded-md mb-2"></div>
            <div className="h-7 w-16 bg-gray-200 rounded-md"></div>
          </div>
        </div>

        {/* Card Total Mentee Skeleton */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-5">
          <div className="bg-gray-200 rounded-full p-3 h-12 w-12"></div>
          <div>
            <div className="h-4 w-24 bg-gray-200 rounded-md mb-2"></div>
            <div className="h-7 w-16 bg-gray-200 rounded-md"></div>
          </div>
        </div>
      </div>
      {/* === END STATS CARDS === */}

      <main className="flex-1 pt-6 overflow-y-auto">
        {/* === CHART SECTION SKELETON === */}
        <section className="bg-white w-full rounded-xl p-6 text-gray-800 shadow-2xl mb-6 border border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="h-6 w-72 bg-gray-200 rounded-md"></div>
          </div>

          <div className="h-80 w-full bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="h-48 w-full bg-gray-200 rounded-lg mx-4"></div>
          </div>

          <div className="h-4 w-64 bg-gray-200 rounded-md mx-auto mt-4"></div>
        </section>

        {/* === KELOLA MENTOR SKELETON === */}
        <section className="bg-white rounded-xl p-6 pt-6 text-gray-800 shadow-lg border">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div className="h-6 w-48 bg-gray-200 rounded-md"></div>
            <div className="h-10 w-36 bg-gray-200 rounded-lg"></div>
          </div>

          {/* Table Skeleton */}
          <div className="border rounded-md mt-4">
            {/* Table Header Skeleton */}
            <div className="grid grid-cols-3 gap-4 p-4 border-b">
              <div className="h-5 bg-gray-200 rounded-md w-24"></div>
              <div className="h-5 bg-gray-200 rounded-md w-24"></div>
              <div className="h-5 bg-gray-200 rounded-md w-24 ml-auto"></div>
            </div>
            {/* Table Rows Skeleton */}
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-4 p-4 border-b last:border-b-0"
              >
                <div className="h-5 bg-gray-200 rounded-md w-3/4"></div>
                <div className="h-5 bg-gray-200 rounded-md w-1/2"></div>
                <div className="flex justify-end gap-2">
                  <div className="h-8 w-8 bg-gray-200 rounded-md"></div>
                  <div className="h-8 w-8 bg-gray-200 rounded-md"></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
