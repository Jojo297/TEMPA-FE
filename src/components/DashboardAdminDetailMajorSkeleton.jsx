import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardAdminDetailMajorSkeleton() {
  return (
    <div className="min-h-screen pb-16">
      {/* Breadcrumb Skeleton */}
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-6 w-1/2" />
        <div className="flex gap-3">
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-10 w-36" />
        </div>
      </div>

      {/* Header Skeleton */}
      <div className="mx-auto">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
          <Skeleton className="w-full h-[320px]" />
          <div className="bg-gray-200 py-4 px-6 flex items-center gap-4">
            <Skeleton className="w-16 h-16 rounded-md" />
            <div>
              <Skeleton className="h-8 w-64" />
            </div>
          </div>
        </div>
      </div>

      {/* Description Skeleton */}
      <div className="max-w-6xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md border">
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>

      {/* Job Prospects Skeleton */}
      <div className="max-w-6xl mx-auto mt-8 bg-white p-6 rounded-xl shadow-md border">
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="flex flex-wrap gap-3">
          <Skeleton className="h-8 w-32 rounded-full" />
          <Skeleton className="h-8 w-40 rounded-full" />
          <Skeleton className="h-8 w-28 rounded-full" />
          <Skeleton className="h-8 w-36 rounded-full" />
        </div>
      </div>
    </div>
  );
}
