import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { kampusList } from "@/lib/kampusList";
import { CampusHeaderProfile } from "@/components/campusHeaderProfile";
import SidebarWithNavbar from "@/components/SidebarMentee";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CampusPrestasiPage from "./DashboardMenteeCampusPrestasi";
import CampusDescription from "@/components/CampusDescription";
import DashboardCampusJurusan from "./DashboardMenteeCampusJurusan";
import DashboardCampusProgram from "./DashboardMenteeCampusProgram";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import useGetDetailCampus from "@/hooks/hooksMentee/useGetDetailCampus";
import DashboardCampusDetailSkeleton from "@/components/DashboardCampusDetailSkeleton";
import CampusLocation from "@/components/CampusLocation";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const DashboardCampusDetail = () => {
  const { id } = useParams();
  const token = localStorage.getItem("userJwt");
  const { detailCampus, isLoading, error, fetchDetailCampus, addViewCampus } =
    useGetDetailCampus();

  // store detail campus to displayCampusDetail
  const displayCampusDetail = detailCampus ?? [];
  console.log(displayCampusDetail);

  const idCampus = displayCampusDetail.id;

  // fetch detail campus
  useEffect(() => {
    if (token) {
      fetchDetailCampus(token, id);
    }
  }, [token, fetchDetailCampus]);

  // add view if mentee stay 5 second in this page
  useEffect(() => {
    if (!token) return;
    const threshold = 5000; // 5 second

    const isViewed = sessionStorage.getItem(`viewed_cam_${idCampus}`);
    if (isViewed) return;

    const timer = setTimeout(() => {
      addViewCampus(token, idCampus);
    }, threshold);

    // cleanup timer
    return () => {
      clearTimeout(timer);
    };
  }, [idCampus, token]);

  if (!displayCampusDetail)
    return (
      <SidebarWithNavbar>
        <div className="min-h-screen flex items-center justify-center text-red-500">
          <p className="text-xl font-semibold">Kampus tidak ditemukan</p>
        </div>
      </SidebarWithNavbar>
    );

  if (isLoading) {
    return <DashboardCampusDetailSkeleton />;
  }

  return (
    <div className="max-w-7xl mx-auto w-full min-w-0">
      {/* breadcum */}
      <Breadcrumb className="mb-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="hover:text-primary">
              <Link to="/dashboard-mentee">Beranda</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="hover:text-primary">
              <Link to="/dashboard-mentee/kampus">Kampus</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="text-primary">
            <BreadcrumbPage className="text-primary max-w-[150px] truncate md:max-w-none inline-block align-bottom">
              {displayCampusDetail.campus_name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header Kampus */}
      <CampusHeaderProfile kampus={displayCampusDetail} />
      <section className="mt-7 max-w-7xl bg-[#F8FAFB] mx-auto mb-20 flex flex-col items-start">
        <Tabs defaultValue="deskripsi" className="w-full">
          <div className="flex justify-between">
            {/* Navigation button */}
            <TabsList className="flex flex-nowrap overflow-x-auto w-full gap-3 sm:gap-4 mb-5 justify-start h-auto bg-transparent pb-2 sm:pb-0">
              {/* description */}
              <TabsTrigger
                value="deskripsi"
                className="flex-shrink-0 px-4 py-1.5 sm:px-6 sm:py-2 text-sm sm:text-base border border-[#013B35] bg-white text-[#013B35] rounded-full font-semibold 
                               hover:bg-[#013B35] hover:text-white transition 
                               data-[state=active]:bg-[#013B35] data-[state=active]:text-white whitespace-nowrap"
              >
                Deskripsi
              </TabsTrigger>

              {/* major */}
              <TabsTrigger
                value="jurusan"
                className="flex-shrink-0 px-4 py-1.5 sm:px-6 sm:py-2 text-sm sm:text-base border border-[#013B35] bg-white text-[#013B35] rounded-full font-semibold 
                               hover:bg-[#013B35] hover:text-white transition 
                               data-[state=active]:bg-[#013B35] data-[state=active]:text-white whitespace-nowrap"
              >
                Jurusan
              </TabsTrigger>

              {/* program */}
              <TabsTrigger
                value="program"
                className="flex-shrink-0 px-4 py-1.5 sm:px-6 sm:py-2 text-sm sm:text-base border border-[#013B35] bg-white text-[#013B35] rounded-full font-semibold 
                               hover:bg-[#013B35] hover:text-white transition 
                               data-[state=active]:bg-[#013B35] data-[state=active]:text-white whitespace-nowrap"
              >
                Program
              </TabsTrigger>
              <TabsTrigger
                value="lokasi"
                className="flex-shrink-0 px-4 py-1.5 sm:px-6 sm:py-2 text-sm sm:text-base border border-[#013B35] bg-white text-[#013B35] rounded-full font-semibold 
                               hover:bg-[#013B35] hover:text-white transition 
                               data-[state=active]:bg-[#013B35] data-[state=active]:text-white whitespace-nowrap"
              >
                Lokasi
              </TabsTrigger>
            </TabsList>

            {/* button redirect website campus */}
            <Button
              variant="outline"
              className="border-[#013B35] text-[#013B35] hover:bg-[#013B35]/5"
              onClick={() =>
                window.open(displayCampusDetail.website_campus || "", "_blank")
              }
            >
              <span>Lihat Website Kampus</span>
              <ExternalLink size={16} className="ml-2" />
            </Button>
          </div>

          {/* content Tabs */}
          <TabsContent value="deskripsi">
            <CampusDescription kampus={displayCampusDetail} />
          </TabsContent>

          <TabsContent value="jurusan">
            <DashboardCampusJurusan kampus={displayCampusDetail} />
          </TabsContent>

          <TabsContent value="program">
            <DashboardCampusProgram kampus={displayCampusDetail} />
          </TabsContent>

          <TabsContent value="lokasi">
            <CampusLocation kampus={displayCampusDetail} />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default DashboardCampusDetail;
