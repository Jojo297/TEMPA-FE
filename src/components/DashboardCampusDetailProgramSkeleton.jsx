import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const DescriptionSkeleton = () => (
  <div className="max-w-6xl mx-auto mb-10">
    <div className="bg-white shadow-md rounded-xl p-6 border animate-pulse">
      {/* Header */}
      <div className="h-7 w-1/4 bg-gray-300 rounded mb-6"></div>

      {/* Grid Detail */}
      <div className="grid grid-cols-2 gap-6">
        {/* Info Item Skeleton */}
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
            <div className="h-5 w-2/3 bg-gray-300 rounded"></div>
          </div>
        ))}

        {/* Long Text Skeleton (Description) */}
        <div className="col-span-2 space-y-2">
          <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
          <div className="h-20 w-full bg-gray-300 rounded-xl p-3"></div>
        </div>

        {/* List Skeleton (Benefits) */}
        <div className="col-span-2 space-y-2">
          <div className="h-4 w-1/5 bg-gray-200 rounded"></div>
          <div className="h-20 w-full bg-gray-300 rounded-xl p-3"></div>
        </div>

        {/* List Skeleton (Terms) */}
        <div className="col-span-2 space-y-2">
          <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
          <div className="h-20 w-full bg-gray-300 rounded-xl p-3"></div>
        </div>
      </div>
    </div>
  </div>
);

export default function DashboardCampusDetailProgramSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Wrapper untuk Breadcrumb dan Tombol */}
      <div className="flex justify-between items-center mb-4">
        {/* Breadcrumb Skeleton */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Grup Tombol Skeleton */}
        <div className="flex gap-3">
          <div className="h-10 w-32 bg-gray-300 rounded-lg"></div>
          <div className="h-10 w-32 bg-gray-300 rounded-lg"></div>
        </div>
      </div>

      {/* Header Banner Skeleton */}
      <div className="relative rounded-xl overflow-hidden shadow-md mb-10">
        <div className="relative">
          {/* Image Placeholder */}
          <div className="w-full h-72 bg-gray-300"></div>
        </div>
        {/* Overlay konten di bawah gambar */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            {/* Program Name Placeholder */}
            <div className="h-8 w-72 bg-gray-400 rounded mb-3"></div>
            {/* Date Placeholder */}
            <div className="flex items-center gap-2 text-gray-300 text-sm mt-2">
              <div className="h-5 w-5 bg-gray-400 rounded-full"></div>
              <div className="h-5 w-48 bg-gray-400 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section Skeleton */}
      <section className="mt-7 max-w-7xl bg-[#F8FAFB] mx-auto mb-20 flex flex-col items-start">
        {/* Navigation button Skeleton */}
        <div className="flex flex-wrap gap-4 mb-5 justify-start h-auto bg-transparent">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`h-10 w-28 rounded-full ${
                i === 0 ? "bg-gray-400" : "bg-gray-200"
              }`}
            ></div>
          ))}
        </div>

        {/* Content Tabs Skeleton */}
        <DescriptionSkeleton />
      </section>
    </div>
  );
}
