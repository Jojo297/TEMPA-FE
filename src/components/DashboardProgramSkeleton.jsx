import { SkeletonCard } from "@/components/DashboardBerandaSkeleton";

const DashboardProgramSkeleton = () => (
  <div className="flex min-h-screen">
    {/* Konten utama */}
    <div className="flex-1 flex flex-col">
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        {/* Header Section Skeleton */}
        <div className="mb-8 text-center animate-pulse">
          <div className="bg-gray-700 text-white rounded-xl p-6 shadow">
            {/* Title Skeleton */}
            <div className="h-8 w-32 bg-gray-600 rounded mx-auto mb-4"></div>
            {/* Description Skeleton */}
            <div className="h-4 w-2/3 bg-gray-600 rounded mx-auto mb-2"></div>
            <div className="h-4 w-1/2 bg-gray-600 rounded mx-auto"></div>
          </div>
        </div>

        {/* Seluruh Program Section & Search Bar Skeleton */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3 animate-pulse">
            {/* Title Section Skeleton */}
            <div className="h-6 w-48 bg-gray-200 rounded mb-4"></div>
            {/* Search Bar Skeleton */}
            <div className="relative w-full md:w-60 h-10 bg-gray-200 rounded-lg"></div>
          </div>

          {/* Card Program Skeletons */}
          <div className="flex flex-col gap-8">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        </section>
      </main>
    </div>
  </div>
);

const CardSkeleton = () => {
  return (
    <>
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
    </>
  );
};

export default DashboardProgramSkeleton;
