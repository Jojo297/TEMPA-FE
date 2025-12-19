import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function DashboardAdminVerificationSkeleton() {
  return (
    <div className="animate-pulse w-full">
      {/* Breadcrumb Skeleton */}
      <div className="mb-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <section className="mt-7 max-w-7xl mx-auto mb-20 flex flex-col items-start">
        <div className="w-full mb-10">
          <div className="bg-white shadow-md rounded-xl p-6 border">
            {/* Header Title */}
            <div className="flex justify-between items-center mb-6">
              <div className="h-7 w-48 bg-gray-300 rounded"></div>
            </div>

            {/* Grid Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Loop untuk membuat 8 item skeleton (Nama, Email, Deskripsi, dll) */}
              {[...Array(8)].map((_, index) => (
                <div key={index} className="space-y-2">
                  {/* Label Skeleton */}
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
                  {/* Value Box Skeleton */}
                  <div className="h-10 w-full bg-gray-100 border border-gray-200 rounded-md"></div>
                </div>
              ))}
            </div>

            {/* Map Section Skeleton */}
            <div className="w-full mt-6 space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="bg-white shadow-md rounded-xl h-fit block">
                <div className="p-2 border mt-2 rounded-md bg-gray-50">
                  {/* Map Placeholder */}
                  <div className="h-[250px] w-full bg-gray-200 rounded-md"></div>
                </div>
              </div>
            </div>

            {/* Action Buttons Skeleton */}
            <div className="flex justify-end gap-2 mt-6">
              {/* Button Tolak */}
              <div className="h-10 w-32 bg-gray-300 rounded-lg"></div>
              {/* Button Terima */}
              <div className="h-10 w-36 bg-gray-300 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
