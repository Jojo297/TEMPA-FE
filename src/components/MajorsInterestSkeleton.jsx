import React from "react";

const MajorsInterestSkeleton = () => {
  // Simulasikan 10 item jurusan yang sedang dimuat
  const skeletonMajorCards = Array.from({ length: 10 });

  return (
    <div className="max-w-7xl mx-auto w-full min-w-0 animate-pulse">
      <div className="min-h-screen">
        {/* all majors section */}
        <section className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
            <div className="w-full md:w-auto">
              {/* Title */}
              <div className="h-8 w-48 bg-gray-200 rounded mb-2"></div>
              {/* Description */}
              <div className="h-4 w-64 bg-gray-200 rounded"></div>
            </div>
            {/* input search */}
            <div className="w-full md:w-60 h-10 bg-gray-200 rounded-lg"></div>
          </div>

          {/* Alert Placeholder */}
          <div className="mb-4 h-24 bg-indigo-50/50 border border-indigo-100 rounded-lg w-full"></div>

          {/* card majors */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {skeletonMajorCards.map((_, index) => (
              <div
                key={index}
                className="rounded-xl border-2 border-gray-100 p-6 flex flex-col items-center justify-center h-40"
              >
                {/* Icon Placeholder */}
                <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
                {/* Major Name Placeholder */}
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>

          {/* Submit Button Placeholder */}
          <div className="col-span-full mt-8 flex justify-end gap-3">
            <div className="h-10 w-48 bg-gray-200 rounded-lg"></div>
            <div className="h-10 w-40 bg-gray-200 rounded-lg"></div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MajorsInterestSkeleton;
