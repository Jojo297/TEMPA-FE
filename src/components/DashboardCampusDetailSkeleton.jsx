import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Komponen Card Skeleton yang meniru struktur tab
const TabsContentSkeleton = () => (
  <div className="p-6 bg-white w-full rounded-xl shadow-md">
    {/* Title/Section Header Placeholder */}
    <div className="h-7 w-1/4 bg-gray-300 animate-pulse rounded-md mb-5"></div>

    {/* Deskripsi/Paragraph Placeholder */}
    <div className="space-y-3">
      <div className="h-4 w-full bg-gray-200 animate-pulse rounded"></div>
      <div className="h-4 w-11/12 bg-gray-200 animate-pulse rounded"></div>
      <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded"></div>
    </div>

    {/* Visi & Misi Header Placeholder */}
    <div className="h-6 w-1/5 bg-gray-300 animate-pulse rounded-md mt-8 mb-4"></div>

    {/* List/Bullet Points Placeholder */}
    <div className="space-y-2">
      <div className="h-3 w-2/3 bg-gray-200 animate-pulse rounded"></div>
      <div className="h-3 w-4/5 bg-gray-200 animate-pulse rounded"></div>
      <div className="h-3 w-1/2 bg-gray-200 animate-pulse rounded"></div>
    </div>
  </div>
);

// --- Skeleton Utama ---
export default function DashboardCampusDetailSkeleton() {
  // Array untuk mengulang tampilan tombol tab
  const tabTriggers = Array(4).fill(0);

  return (
    <>
      {/* Breadcrumb Skeleton */}
      <Breadcrumb className="mb-2">
        <BreadcrumbList>
          {/* Beranda Link */}
          <BreadcrumbItem>
            <div className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {/* Kampus Link */}
          <BreadcrumbItem>
            <div className="h-4 w-12 bg-gray-200 animate-pulse rounded"></div>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {/* Nama Kampus Page */}
          <BreadcrumbItem>
            <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header Kampus Skeleton (Meniru CampusHeaderProfile) */}
      <div className="bg-[#013B35] rounded-xl shadow-md overflow-hidden relative mb-7">
        {/* Banner Placeholder */}
        <div className="w-full h-40 bg-gray-200 animate-pulse"></div>

        <div className="absolute top-20 left-10 flex items-end p-6">
          {/* Logo Placeholder */}
          <div className="w-24 h-24 bg-gray-200 animate-pulse rounded-full border-4 border-white shadow-lg"></div>

          <div className="ml-4 text-white">
            {/* Nama Kampus Placeholder */}
            <div className="h-7 w-64 bg-gray-100 animate-pulse rounded-md mb-2"></div>
            {/* Alamat Placeholder */}
            <div className="h-4 w-40 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
        {/* Tambahkan padding bawah untuk menyesuaikan dengan logo */}
        <div className="h-12"></div>
      </div>

      {/* Navigation & Content Section Skeleton */}
      <section className="mt-7 bg-[#F8FAFB] mx-auto mb-20 flex flex-col items-start w-full">
        {/* Tombol Navigasi (TabsList) Skeleton */}
        <div className="flex flex-wrap gap-4 mb-5 ">
          {tabTriggers.map((_, index) => (
            <div
              key={index}
              // Tampilan tombol (lebih gelap untuk yang aktif/default)
              className={`px-6 py-2 rounded-full font-semibold h-9 ${
                index === 0
                  ? "bg-gray-400"
                  : "bg-gray-200 border border-gray-400"
              } animate-pulse w-24`}
            ></div>
          ))}
        </div>

        {/* Konten Tabs Skeleton (Hanya tampilkan satu konten default) */}
        <TabsContentSkeleton />
      </section>
    </>
  );
}
