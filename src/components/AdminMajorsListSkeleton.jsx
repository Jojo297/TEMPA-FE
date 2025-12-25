import { Search } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const AdminMajorsListSkeleton = () => {
  // Simulasikan 10 item jurusan yang sedang dimuat
  const skeletonMajorCards = Array.from({ length: 10 });

  return (
    <div className="min-h-screen">
      {/* breadcum Skeleton */}
      <Breadcrumb className="mb-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <div className="h-4 w-16 bg-gray-300 rounded animate-pulse"></div>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* header Section Skeleton */}
      <div className="bg-gray-300 p-6 rounded-2xl shadow-md mb-8 text-center animate-pulse">
        <div className="h-6 w-40 bg-gray-400 rounded-lg mx-auto mb-3"></div>
        <div className="h-4 w-3/4 bg-gray-400 rounded mx-auto"></div>
      </div>

      {/* all majors section Skeleton */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="h-6 w-48 bg-gray-300 rounded animate-pulse"></div>

          {/* Search Input Skeleton */}
          <div className="h-6 w-48 bg-gray-300 rounded animate-pulse"></div>
        </div>

        {/* card majors Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {skeletonMajorCards.map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded-xl flex flex-col items-center justify-center p-6 h-32 animate-pulse"
            >
              {/* Icon Placeholder */}
              <div className="h-8 w-8 bg-gray-400 rounded-full mb-2"></div>
              {/* Major Name Placeholder */}
              <div className="h-4 w-3/4 bg-gray-400 rounded"></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminMajorsListSkeleton;
