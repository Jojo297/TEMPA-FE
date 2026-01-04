import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Search } from "lucide-react";

const ProgramCardSkeleton = () => (
  <div className="flex flex-col lg:flex-row border bg-white relative rounded-2xl overflow-hidden shadow-lg animate-pulse">
    {/* LEFT IMAGE SKELETON */}
    <div className="lg:w-1/3 bg-gray-300 min-h-[200px] p-6 flex flex-col justify-end">
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <div className="h-6 w-16 bg-gray-400 rounded-full"></div>
        <div className="h-6 w-16 bg-gray-400 rounded-full"></div>
      </div>
      <div className="h-8 bg-gray-400 rounded w-3/4"></div>
    </div>

    {/* RIGHT SIDE SKELETON */}
    <div className="lg:w-2/3 p-6 flex flex-col justify-between">
      <div>
        <div className="flex flex-wrap items-center space-x-4 mb-4">
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>
          <div className="h-6 bg-gray-200 rounded-full w-24"></div>
          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>

        <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-gray-700 text-sm mb-6 border-t pt-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center">
              <div className="h-4 w-4 bg-gray-300 rounded-full mr-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <div className="h-12 bg-gray-300 rounded-xl w-full"></div>
          <div className="h-12 bg-gray-300 rounded-xl w-full"></div>
        </div>
      </div>
    </div>
  </div>
);

export default function DashboardCampusProgramSkeleton() {
  return (
    <div className="flex-1 flex flex-col">
      <main className="flex-1 overflow-y-auto">
        {/* Breadcrumb Skeleton */}
        <div className="mb-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <div className="h-4 w-20 bg-gray-300 rounded animate-pulse"></div>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Header Skeleton */}
        <div className="mb-8 text-center">
          <div className="bg-primary/80 text-white rounded-xl p-6 shadow animate-pulse">
            <div className="h-7 w-32 bg-white/30 rounded mx-auto mb-3"></div>
            <div className="h-4 w-3/4 bg-white/30 rounded mx-auto"></div>
          </div>
        </div>

        {/* Filters Skeleton */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3 animate-pulse">
            <div className="h-7 w-48 bg-gray-300 rounded"></div>

            <div className="flex gap-2">
              <div className="h-10 w-36 bg-gray-200 rounded-lg"></div>
              <div className="relative h-10 w-36 bg-gray-200 rounded-lg"></div>
              <div className="h-10 w-36 bg-gray-300 rounded-lg"></div>
            </div>
          </div>

          {/* LIST PROGRAM SKELETON */}
          <div className="flex flex-col gap-8">
            <ProgramCardSkeleton />
            <ProgramCardSkeleton />
            <ProgramCardSkeleton />
          </div>
        </section>
      </main>
    </div>
  );
}
