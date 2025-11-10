import { Skeleton } from "@/components/ui/skeleton";
import { ChevronDown } from "lucide-react";

// Fungsi untuk membuat elemen Accordion Item Skeleton
const AccordionItemSkeleton = ({ title }) => (
  <div className="border-b-0 p-4 rounded-lg bg-white shadow-lg mb-3">
    <div className="flex items-center justify-between py-1">
      <div className="flex items-center">
        {/* Ikon Chevron (Placeholder) */}
        <ChevronDown className="w-5 h-5 mr-3 text-gray-300" />
        {/* Judul Accordion */}
        <Skeleton className="h-5 w-32 bg-gray-200" />
      </div>
    </div>

    {/* Konten Placeholder (di dalam Accordion) */}
    <div className="pt-4 pl-8 space-y-3">
      {/* Baris Konten 1 */}
      <div className="flex items-center">
        <Skeleton className="w-5 h-5 mr-3 rounded-full bg-gray-200" />
        <Skeleton className="h-4 w-full max-w-lg bg-gray-200" />
      </div>
      {/* Baris Konten 2 */}
      <div className="flex items-center">
        <Skeleton className="w-5 h-5 mr-3 rounded-full bg-gray-200" />
        <Skeleton className="h-4 w-full max-w-md bg-gray-200" />
      </div>

      {/* Hanya untuk Quiz/Meeting (tombol) */}
      {title === "Quiz" || title === "Link Meeting" ? (
        <div className="flex justify-end items-center space-x-2 pt-2">
          <Skeleton className="h-7 w-28 rounded-md bg-gray-200" />
          <Skeleton className="h-7 w-16 rounded-md bg-gray-200" />
        </div>
      ) : null}
    </div>
  </div>
);

// --- Komponen Loading Skeleton Utama ---
export default function DashboardMenteeMateriSkeleton() {
  return (
    <div className="p-4 mx-auto max-w-4xl">
      {" "}
      {/* Sesuaikan container sesuai kebutuhan */}
      {/* Skeleton Breadcrumb */}
      <div className="mb-4 flex items-center space-x-2">
        <Skeleton className="h-4 w-12 bg-gray-300" />
        <span className="text-gray-300">/</span>
        <Skeleton className="h-4 w-20 bg-gray-300" />
      </div>
      <div className="min-h-screen">
        {/* Header Section Skeleton */}
        <div className="bg-gray-300 p-6 rounded-2xl shadow-md mb-8 text-center animate-pulse">
          <Skeleton className="h-6 w-48 mx-auto mb-3 bg-gray-200" />
          <Skeleton className="h-4 w-3/4 mx-auto bg-gray-200" />
        </div>

        <div className="container px-0">
          {/* Accordion Skeletons (sesuai urutan layout Anda) */}
          <AccordionItemSkeleton title="Link Meeting" />
          <AccordionItemSkeleton title="Materi" />
          <AccordionItemSkeleton title="Quiz" />
        </div>
      </div>
    </div>
  );
}
