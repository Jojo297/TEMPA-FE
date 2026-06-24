import { Skeleton } from "@/components/ui/skeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function LoadingSkeletonMentorPage() {
  return (
    <>
      <div className="flex-1 flex flex-col p-4">
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

          {/* Mentor Section Skeleton */}
          <section className="bg-white rounded-xl p-6 shadow-md border space-y-6">
            {/* Section Header & Button */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <Skeleton className="h-7 w-32" />
              <Skeleton className="h-10 w-36 rounded-lg" />
            </div>

            {/* Info Alert Skeleton */}
            <div className="rounded-lg border border-blue-100 bg-blue-50/30 p-4">
              <div className="flex gap-3 items-center">
                <Skeleton className="h-5 w-5 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-8 w-24 rounded-md" />
                  </div>
                </div>
              </div>
            </div>

            {/* Data Table Skeleton */}
            <div className="space-y-3">
              {/* Table Header */}
              <div className="flex gap-4 pb-2 border-b">
                <Skeleton className="h-6 flex-1" />
                <Skeleton className="h-6 flex-1" />
                <Skeleton className="h-6 flex-1" />
                <Skeleton className="h-6 w-20" />
              </div>

              {/* Table Rows (Generated 5 rows) */}
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex gap-4 py-3 border-b last:border-0">
                  <Skeleton className="h-5 flex-1" />
                  <Skeleton className="h-5 flex-1" />
                  <Skeleton className="h-5 flex-1" />
                  <Skeleton className="h-8 w-20 rounded-md" />
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
