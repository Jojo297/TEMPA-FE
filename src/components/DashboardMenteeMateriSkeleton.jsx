import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronDown } from "lucide-react";

const AccordionItemSkeleton = () => (
  <div className="border-b-0 p-4 rounded-lg bg-white shadow-md mb-3">
    <div className="flex items-center justify-between py-1">
      <div className="flex items-center w-full">
        <ChevronDown className="w-5 h-5 mr-3 text-gray-300" />
        <Skeleton className="h-6 w-1/3 bg-gray-200" />
      </div>
    </div>
    <div className="pt-4 pl-8 space-y-3">
      <Skeleton className="h-4 w-full max-w-2xl bg-gray-200" />
      <hr />
      <div className="flex items-center">
        <Skeleton className="w-5 h-5 mr-3 rounded-full bg-gray-200" />
        <Skeleton className="h-4 w-full max-w-lg bg-gray-200" />
      </div>
      <div className="flex items-center">
        <Skeleton className="w-5 h-5 mr-3 rounded-full bg-gray-200" />
        <Skeleton className="h-4 w-full max-w-md bg-gray-200" />
      </div>
    </div>
  </div>
);

export default function DashboardMenteeMateriSkeleton() {
  return (
    <div className="max-w-7xl mx-auto animate-pulse">
      {/* Skeleton Breadcrumb */}
      <Breadcrumb className="mb-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Skeleton className="h-4 w-20 bg-gray-200" />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Skeleton className="h-4 w-32 bg-gray-300" />
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="min-h-screen">
        {/* Header Section Skeleton */}
        <div className="bg-primary/80 p-6 md:p-8 rounded-xl md:rounded-2xl shadow-md mb-8 text-center">
          <Skeleton className="h-7 md:h-9 w-1/2 bg-white/20 rounded-lg mx-auto mb-3" />
          <Skeleton className="h-4 md:h-5 w-3/4 bg-white/20 rounded mx-auto" />
        </div>

        <div className="container px-0">
          {/* Accordion Skeletons (sesuai urutan layout Anda) */}
          <AccordionItemSkeleton />
          <AccordionItemSkeleton />
        </div>
      </div>
    </div>
  );
}
