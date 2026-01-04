import { Skeleton } from "./ui/skeleton";

const AnalyticsPageSkeletonLoading = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen text-gray-800 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <div className="h-6 bg-gray-300 rounded-md w-64 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded-md w-48"></div>
        </div>
      </div>

      {/* Grid Statistik Utama */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1: Profil Visits */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-blue-400 flex items-center gap-4">
          <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
            <Skeleton className="w-6 h-6 rounded-full" />
          </div>
          <div>
            <Skeleton className="w-32 h-4 mb-1" />
            <Skeleton className="w-20 h-6" />
          </div>
        </div>

        {/* Card 2: Program Visits */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-orange-400 flex items-center gap-4">
          <div className="bg-orange-50 p-3 rounded-lg text-orange-600">
            <Skeleton className="w-6 h-6 rounded-full" />
          </div>
          <div>
            <Skeleton className="w-32 h-4 mb-1" />
            <Skeleton className="w-20 h-6" />
          </div>
        </div>

        {/* Card 3: Favorite Major */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-yellow-400 flex items-center gap-4">
          <div className="bg-yellow-50 p-3 rounded-lg text-yellow-600">
            <Skeleton className="w-6 h-6 rounded-full" />
          </div>
          <div>
            <Skeleton className="w-32 h-4 mb-1" />
            <Skeleton className="w-24 h-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Chart Minat Jurusan */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <div className="flex justify-between items-center mb-8">
            <div>
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="w-5 h-5 rounded-full" />
          </div>

          <div className="space-y-6">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="group cursor-default">
                <div className="flex justify-between items-center mb-2">
                  <Skeleton className="w-40 h-4" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-10 h-4" />
                    <Skeleton className="w-8 h-3" />
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <Skeleton className="h-full w-1/2 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Insights & Demographics */}
        <div className="lg:col-span-4 space-y-6">
          {/* Insight Card */}
          <div className="bg-[#013B35] p-6 rounded-2xl text-white shadow-md relative overflow-hidden">
            <Skeleton className="h-4 w-24 mb-4 bg-white/20" />
            <Skeleton className="h-3 w-40 mb-6 bg-white/20" />
            <Skeleton className="h-3 w-32 mb-6 bg-white/20" />
            <Skeleton className="h-3 w-48 mb-6 bg-white/20" />
            <Skeleton className="h-3 w-20 mb-6 bg-white/20" />
            <Skeleton className="h-4 w-full bg-white/20" />
          </div>

          {/* Demographics Card */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md">
            <Skeleton className="h-4 w-32 mb-6" />
            <Skeleton className="h-3 w-48 mb-4" />
            <Skeleton className="h-3 w-40 mb-4" />
            <Skeleton className="h-3 w-32 mb-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPageSkeletonLoading;
