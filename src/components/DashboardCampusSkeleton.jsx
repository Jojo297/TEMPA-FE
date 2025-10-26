import React from "react";
import { Search } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

// --- Komponen Skeleton Card untuk Kampus ---
const CampusCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow p-3">
    {/* Banner Image Placeholder */}
    <div className="rounded-lg w-full h-40 bg-gray-200 animate-pulse mb-3"></div>

    {/* Logo and Name Placeholder */}
    <div className="flex items-center gap-2 mb-2">
      {/* Logo Placeholder */}
      <div className="w-8 h-8 bg-gray-300 animate-pulse rounded-full"></div>
      {/* Name Placeholder */}
      <div className="h-4 w-3/4 bg-gray-300 animate-pulse rounded"></div>
    </div>

    {/* Address Placeholder */}
    <div className="flex items-center gap-1 text-xs">
      {/* MapPin Placeholder (Warna abu-abu yang lebih terang) */}
      <div className="w-4 h-4 bg-gray-200 animate-pulse rounded-full"></div>
      {/* Address Text Placeholder */}
      <div className="h-3 w-1/2 bg-gray-200 animate-pulse rounded"></div>
    </div>
  </div>
);

// --- Komponen Skeleton Utama ---
export default function DashboardCampusSkeleton() {
  // Array untuk mengulang tampilan skeleton kartu
  const skeletonCards = Array(6).fill(0);

  return (
    <>
      {/* breadcum Skeleton */}
      <Breadcrumb className="mb-2">
        <BreadcrumbList>
          {/* Beranda Link Placeholder */}
          <BreadcrumbItem>
            <div className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {/* Kampus Page Placeholder */}
          <BreadcrumbItem>
            <BreadcrumbPage>
              <div className="h-4 w-12 bg-gray-300 animate-pulse rounded"></div>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Banner Section Skeleton */}
      <div className="mb-8 text-center">
        <div className="bg-gray-200 animate-pulse rounded-xl p-6 shadow">
          {/* Title Placeholder */}
          <div className="h-8 w-1/4 bg-gray-300 animate-pulse mx-auto mb-3 rounded-md"></div>
          {/* Paragraph Placeholder */}
          <div className="h-4 w-1/2 bg-gray-300 animate-pulse mx-auto rounded"></div>
        </div>
      </div>

      {/* Rekomendasi Section Skeleton */}
      <section className="mb-10">
        <div className="h-6 w-1/4 bg-gray-200 animate-pulse mb-4 rounded-md"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Tampilkan 3 kartu untuk rekomendasi */}
          {skeletonCards.slice(0, 3).map((_, index) => (
            <CampusCardSkeleton key={`rec-${index}`} />
          ))}
        </div>
      </section>

      {/* Seluruh Kampus Section Skeleton */}
      <section>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
          {/* Title Placeholder */}
          <div className="h-6 w-1/4 bg-gray-200 animate-pulse rounded-md"></div>

          {/* Search Input Placeholder */}
          <div className="relative w-full md:w-60">
            <Search
              size={16}
              className="absolute top-2.5 left-3 text-gray-400"
            />
            <div className="pl-8 pr-3 py-2 w-full border rounded-lg h-10 bg-gray-100 animate-pulse"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Tampilkan 6 kartu untuk seluruh kampus */}
          {skeletonCards.map((_, index) => (
            <CampusCardSkeleton key={`all-${index}`} />
          ))}
        </div>
      </section>
    </>
  );
}
