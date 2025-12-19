import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function DashboardAdminCampusSkeleton() {
  return (
    <div className="p-2 w-full animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="mb-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Banner Skeleton */}
      <div className="mb-8 text-center">
        <div className="bg-primary/80 rounded-xl p-6 shadow">
          <div className="h-8 w-32 bg-white/20 rounded mx-auto mb-3"></div>
          <div className="h-4 w-3/4 bg-white/20 rounded mx-auto mb-2"></div>
          <div className="h-4 w-1/2 bg-white/20 rounded mx-auto"></div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="bg-white shadow-md rounded-xl border border-gray-200 p-6 sm:p-8">
        {/* Header: Title & Search */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="h-8 w-48 bg-gray-200 rounded"></div>
          <div className="w-full sm:w-72 h-10 bg-gray-200 rounded-lg"></div>
        </div>

        {/* Table Skeleton */}
        <div className="rounded-md border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-50 border-b border-gray-200 grid grid-cols-12 gap-4 p-4">
            <div className="col-span-1 h-4 bg-gray-300 rounded"></div>
            <div className="col-span-5 h-4 bg-gray-300 rounded"></div>
            <div className="col-span-3 h-4 bg-gray-300 rounded"></div>
            <div className="col-span-3 h-4 bg-gray-300 rounded"></div>
          </div>

          {/* Table Rows */}
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="border-b border-gray-100 grid grid-cols-12 gap-4 p-4 items-center"
            >
              <div className="col-span-1 h-4 bg-gray-200 rounded w-4"></div>
              <div className="col-span-5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="col-span-3">
                <div className="h-6 w-20 bg-gray-200 rounded-md"></div>
              </div>
              <div className="col-span-3 flex justify-end">
                <div className="h-8 w-24 bg-gray-200 rounded-md"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
