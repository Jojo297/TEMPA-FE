import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardCampusBerlanggananSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 font-sans">
      {/* Header Section Skeleton */}
      <div className="bg-gray-200/80 pt-16 pb-32 px-6 rounded-b-[40px] rounded-t-[12px] relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center gap-4">
          {/* Title Skeleton */}
          <Skeleton className="h-10 w-3/4 md:w-1/2 bg-gray-300" />
          {/* Description Skeleton */}
          <Skeleton className="h-6 w-full md:w-2/3 bg-gray-300" />
        </div>
      </div>

      {/* Pricing Cards Skeleton */}
      <div className="max-w-6xl mx-auto -mt-20 px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="relative bg-white rounded-3xl p-8 border border-gray-100 shadow-xl"
          >
            <div className="flex flex-col h-full">
              {/* Card Header */}
              <div className="mb-8 text-center md:text-left">
                <Skeleton className="w-14 h-14 rounded-2xl mb-4 mx-auto md:mx-0" />
                <Skeleton className="h-8 w-3/4 mb-2 mx-auto md:mx-0" />
                <Skeleton className="h-4 w-1/3 mb-4 mx-auto md:mx-0" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>

              {/* Price */}
              <div className="mb-8 py-6 border-y border-gray-50 flex flex-col items-center gap-2">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>

              {/* Features List */}
              <div className="space-y-5 mb-10 flex-grow">
                {[1, 2, 3, 4].map((feature) => (
                  <div key={feature} className="flex gap-4">
                    <Skeleton className="shrink-0 w-6 h-6 rounded-full" />
                    <div className="w-full space-y-2">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-3 w-full" />
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Skeleton className="w-full h-14 rounded-2xl" />
            </div>
          </div>
        ))}
      </div>

      {/* Trust Footer Skeleton */}
      <div className="max-w-2xl mx-auto mt-16 text-center px-6 flex justify-center">
        <Skeleton className="h-10 w-80 rounded-full" />
      </div>
    </div>
  );
}
