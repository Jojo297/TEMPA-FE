import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const DescriptionTabSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 space-y-6 w-full mt-5 animate-pulse">
    <div className="flex justify-between items-start">
      <div className="h-8 w-1/3 bg-gray-300 rounded-md"></div>
      <div className="h-10 w-24 bg-gray-300 rounded-full"></div>
    </div>
    <div className="space-y-3 pt-4">
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-11/12"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
    <div className="space-y-3 pt-4">
      <div className="h-6 w-1/4 bg-gray-300 rounded-md"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
    </div>
    <div className="space-y-3 pt-4">
      <div className="h-6 w-1/5 bg-gray-300 rounded-md"></div>
      <div className="h-4 bg-gray-200 rounded w-4/5"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    </div>
  </div>
);

export default function DashboardCampusDetailSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Breadcrumb Skeleton */}
      <Breadcrumb className="mb-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <div className="h-4 w-24 bg-gray-300 rounded"></div>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header Skeleton */}
      <header className="bg-transparent">
        <div className="max-w-6xl mx-auto rounded-xl shadow-lg overflow-hidden">
          <div className="h-[400px] relative bg-gray-300">
            {/* Banner Placeholder */}
          </div>
          <div className="bg-gray-700 px-12 py-6 flex justify-between items-center rounded-b-xl -mt-16 relative z-10">
            <div className="flex items-center space-x-4">
              <div className="bg-gray-200 p-3 rounded-full shadow-lg border-4 border-gray-400 -mt-10">
                <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
              </div>
              <div>
                <div className="h-10 w-80 bg-gray-400 rounded-md mb-2"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs Skeleton */}
      <section className="mt-7 max-w-7xl mx-auto mb-20 flex flex-col items-start w-full">
        <div className="flex flex-wrap gap-4 mb-5 justify-start h-auto">
          {/* Tab Triggers */}
          <div className="h-10 w-32 bg-gray-400 rounded-full"></div>
          <div className="h-10 w-32 bg-gray-200 rounded-full"></div>
        </div>

        {/* Tab Content */}
        <div className="w-full">
          <DescriptionTabSkeleton />
        </div>
      </section>
    </div>
  );
}
