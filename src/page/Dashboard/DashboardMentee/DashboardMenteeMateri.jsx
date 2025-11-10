import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ChevronDown,
  FileText,
  ClipboardList,
  CheckCircle,
} from "lucide-react";

export default function DashboardMenteeMateri() {
  return (
    <>
      {/* breadcum */}
      <Breadcrumb className="mb-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="hover:text-primary">
              <Link to="/dashboard-mentee">Beranda</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="text-primary">
            <BreadcrumbPage className="text-primary">
              Nama Program
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="min-h-screen  ">
        {/* header Section */}
        <div className="bg-primary text-white p-6 rounded-2xl shadow-md mb-8 text-center">
          <h1 className="text-2xl font-semibold mb-2">Nama Materi</h1>
          <p className="text-sm">
            Jelajahi berbagai jurusan dan temukan bidang yang sesuai dengan
            minat serta bakatmu.
          </p>
        </div>

        <div className="container">
          {/* Accordion Materi, Quiz, Link Meeting */}
          <Accordion type="single" collapsible className="w-full">
            {/* Accordion Link Meeting */}
            <AccordionItem
              value="item-3"
              className="border-b-0 p-4 rounded-lg bg-white shadow-lg mb-3 "
            >
              <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
                <div className="flex items-center">
                  <ChevronDown className="w-5 h-5 mr-3 transition-transform duration-300 data-[state=open]:rotate-180" />
                  Link Meeting
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pl-8 space-y-2">
                <div className="flex justify-between items-center bg-white p-3 border rounded-md">
                  <div className="flex items-center text-gray-600">
                    <Link className="w-5 h-5 mr-3 text-blue-600" />
                    <span>Meeting Zoom - Sesi 1</span>
                  </div>
                  <Button
                    variant="link"
                    size="sm"
                    className="h-7 text-blue-600"
                  >
                    Gabung Sekarang
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            {/* end Accordion Link Meeting */}

            {/* Accordion Materi */}
            <AccordionItem
              value="item-1"
              className="border-b-0 p-4 rounded-lg bg-white shadow-md mb-3"
            >
              <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
                <div className="flex items-center">
                  <ChevronDown className="w-5 h-5 mr-3 transition-transform duration-300 data-[state=open]:rotate-180" />
                  Materi
                </div>
              </AccordionTrigger>

              <AccordionContent className="pt-2 pl-8 space-y-2">
                <div className="flex items-center text-gray-600">
                  <FileText className="w-5 h-5 mr-3 text-green-600" />
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FileText className="w-5 h-5 mr-3 text-green-600" />
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </span>
                </div>
              </AccordionContent>
            </AccordionItem>
            {/* end Accordion Materi */}

            {/* Accordion Quiz */}
            <AccordionItem
              value="item-2"
              className="border-b-0 p-4 rounded-lg bg-white shadow-lg mb-3"
            >
              <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
                <div className="flex items-center">
                  <ChevronDown className="w-5 h-5 mr-3 transition-transform duration-300 data-[state=open]:rotate-180" />
                  Quiz
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pl-8 space-y-3">
                {/* Item Quiz (Belum Dikerjakan) */}
                <div className="flex justify-between items-center bg-white p-3 border rounded-md">
                  <div className="flex items-center text-gray-600">
                    <ClipboardList className="w-5 h-5 mr-3 text-orange-500" />
                    <span>Quiz</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 border-green-500 text-green-500 hover:bg-green-50"
                    >
                      Tuntas Dikerjakan
                    </Button>
                    <Button
                      size="sm"
                      className="h-7 bg-green-600 hover:bg-green-700"
                    >
                      Mulai
                    </Button>
                  </div>
                </div>

                {/* Item Quiz (Sudah Dikerjakan) */}
                <div className="flex justify-between items-center bg-white p-3 border rounded-md opacity-70">
                  <div className="flex items-center text-gray-600">
                    <ClipboardList className="w-5 h-5 mr-3 text-gray-400" />
                    <span>Quiz (Selesai)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-1" />
                    Selesai pada 10 Nov 2025
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            {/* end Accordion Quiz */}
          </Accordion>
        </div>
      </div>
    </>
  );
}
