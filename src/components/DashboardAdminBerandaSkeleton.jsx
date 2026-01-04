import React from "react";

export default function DashboardAdminBerandaSkeleton() {
  return (
    <div className="p-2 w-full animate-pulse">
      {/* HEADER SKELETON */}
      <div className="mb-6">
        <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
        <div className="h-8 bg-gray-300 rounded w-64"></div>
      </div>

      {/* === STATS CARDS SKELETON === */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 mb-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-md flex items-center gap-5"
          >
            {/* Icon Placeholder */}
            <div className="bg-gray-200 rounded-full w-14 h-14 shrink-0"></div>
            <div className="flex-1 space-y-2">
              {/* Label Placeholder */}
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              {/* Value Placeholder */}
              <div className="h-8 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>

      {/* === CHART SECTION SKELETON === */}
      <section className="bg-white w-full rounded-xl p-6 shadow-md mb-6 border border-gray-200">
        <div className="mb-6">
          {/* Title Placeholder */}
          <div className="h-6 bg-gray-200 rounded w-64"></div>
        </div>

        {/* Chart Placeholder Area */}
        <div className="h-80 w-full flex items-end gap-2 sm:gap-4 px-2 sm:px-4 pb-4 border-b border-l border-gray-100">
          {/* Mock Bars */}
          {[40, 70, 50, 85, 60, 30, 55, 45].map((height, idx) => (
            <div
              key={idx}
              className="w-full bg-gray-100 rounded-t-sm"
              style={{ height: `${height}%` }}
            ></div>
          ))}
        </div>

        <div className="flex justify-center mt-4">
          <div className="h-3 bg-gray-200 rounded w-40"></div>
        </div>
      </section>
    </div>
  );
}
