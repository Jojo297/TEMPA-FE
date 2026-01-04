import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const DescriptionTabSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 space-y-6 w-full">
    <div className="flex justify-between items-start">
      <div className="h-8 w-1/3 bg-gray-200 rounded-md"></div>
      <div className="h-10 w-24 bg-gray-200 rounded-full"></div>
    </div>
    <div className="space-y-3 pt-4">
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-11/12"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
    <div className="space-y-3 pt-4">
      <div className="h-6 w-1/4 bg-gray-200 rounded-md"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
    </div>
    <div className="space-y-3 pt-4">
      <div className="h-6 w-1/5 bg-gray-200 rounded-md"></div>
      <div className="h-4 bg-gray-200 rounded w-4/5"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    </div>
  </div>
);

export default function DashboardCampusDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto w-full min-w-0 animate-pulse">
      {/* Breadcrumb Skeleton */}
      <Breadcrumb className="mb-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header Skeleton */}
      <div className="relative w-full rounded-xl overflow-hidden shadow-md bg-white mb-7">
        {/* Banner Placeholder */}
        <div className="h-48 md:h-80 bg-gray-300 w-full"></div>

        {/* Profile Info Section */}
        <div className="px-6 pb-6 relative">
          <div className="flex flex-col md:flex-row items-start md:items-end -mt-12 md:-mt-16 mb-4 gap-4">
            {/* Logo */}
            <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-200 rounded-full border-4 border-white shadow-md shrink-0"></div>

            {/* Text Info */}
            <div className="flex-1 w-full mt-2 md:mt-0 md:mb-4">
              <div className="h-8 w-3/4 md:w-1/2 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-1/2 md:w-1/3 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <section className="mt-7 w-full flex flex-col items-start">
        <div className="flex flex-nowrap overflow-x-auto w-full gap-3 sm:gap-4 mb-5 justify-start h-auto pb-2 sm:pb-0">
          {/* Tab Triggers */}
          <div className="h-10 w-28 bg-gray-200 rounded-full shrink-0"></div>
          <div className="h-10 w-28 bg-gray-200 rounded-full shrink-0"></div>
          <div className="h-10 w-28 bg-gray-200 rounded-full shrink-0"></div>
          <div className="h-10 w-28 bg-gray-200 rounded-full shrink-0"></div>
        </div>

        {/* Tab Content */}
        <div className="w-full">
          <DescriptionTabSkeleton />
        </div>
      </section>
    </div>
  );
}
