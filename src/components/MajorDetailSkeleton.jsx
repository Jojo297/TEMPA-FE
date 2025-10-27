import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRightIcon, Calendar, Home, Users, Map } from "lucide-react";

/**
 * Komponen Loading Skeleton untuk Halaman Detail Jurusan.
 *
 * Catatan:
 * - Menggunakan `animate-pulse` untuk efek loading.
 * - Menggunakan `bg-gray-200` atau `bg-gray-300` sebagai placeholder warna.
 * - Menggunakan tinggi/lebar tetap (`h-`, `w-`) untuk meniru ukuran konten.
 */
const MajorDetailSkeleton = () => {
  // Fungsi dummy untuk mensimulasikan data
  const skeletonItems = Array.from({ length: 3 }); // Untuk Kampus/Program
  const skeletonTags = Array.from({ length: 5 }); // Untuk Prospek Kerja

  return (
    <div className="min-h-screen pb-16">
      {/* breadcum Skeleton */}
      <Breadcrumb className="mb-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <div classNameName="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <div className="h-4 w-32 bg-gray-300 rounded animate-pulse"></div>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* header Skeleton */}
      <div className="max-w-7xl mx-auto ">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <div className="relative w-full h-[320px] bg-gray-200 animate-pulse">
            {/* Placeholder untuk Hero Image */}
          </div>
          <div className="bg-gray-300 py-4 px-6 animate-pulse">
            <div className="h-7 w-64 bg-gray-400 rounded"></div>
          </div>
        </div>
      </div>

      {/* Tentang Jurusan Skeleton */}
      <div className="max-w-6xl mx-auto px-6 mt-10">
        <div className="h-6 w-48 bg-gray-300 rounded mb-3 animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
        </div>
      </div>

      {/* Prospek Kerja Skeleton */}
      <div className="max-w-6xl mx-auto px-6 mt-12">
        <div className="h-6 w-40 bg-gray-300 rounded mb-4 animate-pulse"></div>
        <div className="flex flex-wrap gap-2">
          {skeletonTags.map((_, i) => (
            <div
              key={i}
              className="px-4 py-2 border bg-gray-200 rounded-full text-sm h-8 w-24 animate-pulse"
            ></div>
          ))}
        </div>
      </div>

      {/* Kampus Terkait Skeleton */}
      <div className="max-w-6xl mx-auto px-6 mt-12">
        <div className="h-6 w-48 bg-gray-300 rounded mb-4 animate-pulse"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skeletonItems.map((_, index) => (
            <div
              key={index}
              className="relative rounded-xl overflow-hidden shadow-lg bg-white"
            >
              {/* banner placeholder */}
              <div className="w-full h-64 object-cover bg-gray-200 animate-pulse"></div>

              <div className="absolute bottom-0 left-0 right-0 bg-gray-400/80 p-3 h-16 animate-pulse">
                <div className="flex justify-between items-start">
                  {/* campus name placeholder */}
                  <div className="h-5 w-4/5 bg-gray-500 rounded"></div>
                  <div className="p-1 rounded-full bg-gray-500 flex-shrink-0 ml-2 mt-1 h-6 w-6">
                    <ChevronRightIcon className="text-gray-500" size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Program Terkait Skeleton */}
      <div className="max-w-6xl mx-auto px-6 mt-12">
        <div className="h-6 w-48 bg-gray-300 rounded mb-4 animate-pulse"></div>
        {/* Card Program Skeleton */}
        <div className="flex flex-col gap-8">
          {skeletonItems.map((_, index) => (
            <div
              key={index}
              className="flex flex-col lg:flex-row border bg-white rounded-2xl overflow-hidden shadow-md"
            >
              {/* left side skeleton */}
              <div className="lg:w-1/3 flex flex-col justify-end bg-gray-600 p-6 text-white min-h-[200px] relative animate-pulse">
                {/* Status badge placeholder */}
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-sm font-medium h-6 w-20 bg-gray-400"></div>
                {/* Program name placeholder */}
                <div className="h-8 w-11/12 bg-gray-400 rounded drop-shadow-lg"></div>
              </div>

              {/* right side skeleton */}
              <div className="lg:w-2/3 p-6 flex flex-col justify-between">
                <div>
                  {/* Main info skeleton: Program Name, Type Sesi */}
                  <div className="flex flex-wrap items-center space-x-4 mb-4">
                    <div className="h-6 w-40 bg-gray-300 rounded animate-pulse"></div>
                    <div className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium mt-2 sm:mt-0 h-6 w-16 animate-pulse"></div>
                  </div>

                  {/* description skeleton */}
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-11/12 animate-pulse"></div>
                  </div>

                  {/* date and location skeleton */}
                  <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm mb-6 border-t pt-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center">
                        <div className="mr-2 h-4 w-4 bg-gray-300 rounded-full animate-pulse"></div>
                        <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    ))}
                  </div>

                  {/* Button skeleton */}
                  <div className="w-full py-3 bg-gray-300 rounded-xl font-bold h-12 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MajorDetailSkeleton;
