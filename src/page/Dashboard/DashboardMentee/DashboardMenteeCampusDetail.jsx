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

const DashboardCampusDetail = () => {
  const { id } = useParams();
  const token = localStorage.getItem("userJwt");
  const { detailCampus, isLoading, error, fetchDetailCampus } =
    useGetDetailCampus();
  const kampus = kampusList.find((k) => k.id === parseInt(id));

  // store detail campus to displayCampusDetail
  const displayCampusDetail = detailCampus ?? [];
  console.log(displayCampusDetail);

  // fetch detail campus
  useEffect(() => {
    if (token) {
      fetchDetailCampus(token, id);
    }
  }, [token, fetchDetailCampus]);

  if (!kampus)
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
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="hover:text-primary">
              <Link to="/dashboard-mentee/kampus">Kampus</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="text-primary">
            <BreadcrumbPage className="text-primary">
              {displayCampusDetail.campus_name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header Kampus */}
      <CampusHeaderProfile kampus={displayCampusDetail} />
      <section className="mt-7 max-w-7xl bg-[#F8FAFB] mx-auto mb-20 flex flex-col items-start">
        <Tabs defaultValue="deskripsi" className="w-full">
          {/* Navigation button */}
          <TabsList className="flex flex-wrap gap-4 mb-5 justify-start h-auto bg-transparent">
            {/* description */}
            <TabsTrigger
              value="deskripsi"
              className="px-6 py-2 border border-[#013B35] bg-white text-[#013B35] rounded-full font-semibold 
                               hover:bg-[#013B35] hover:text-white transition 
                               data-[state=active]:bg-[#013B35] data-[state=active]:text-white"
            >
              Deskripsi
            </TabsTrigger>

            {/* achivment */}
            <TabsTrigger
              value="prestasi"
              className="px-6 py-2 border border-[#013B35] bg-white text-[#013B35] rounded-full font-semibold 
                               hover:bg-[#013B35] hover:text-white transition 
                               data-[state=active]:bg-[#013B35] data-[state=active]:text-white"
            >
              Prestasi
            </TabsTrigger>

            {/* major */}
            <TabsTrigger
              value="jurusan"
              className="px-6 py-2 border border-[#013B35] bg-white text-[#013B35] rounded-full font-semibold 
                               hover:bg-[#013B35] hover:text-white transition 
                               data-[state=active]:bg-[#013B35] data-[state=active]:text-white"
            >
              Jurusan
            </TabsTrigger>

            {/* program */}
            <TabsTrigger
              value="program"
              className="px-6 py-2 border border-[#013B35] bg-white text-[#013B35] rounded-full font-semibold 
                               hover:bg-[#013B35] hover:text-white transition 
                               data-[state=active]:bg-[#013B35] data-[state=active]:text-white"
            >
              Program
            </TabsTrigger>
          </TabsList>

          {/* content Tabs */}
          <TabsContent value="deskripsi">
            <CampusDescription kampus={displayCampusDetail} />
          </TabsContent>

          <TabsContent value="prestasi">
            <CampusPrestasiPage kampus={kampus} />
          </TabsContent>

          <TabsContent value="jurusan">
            <DashboardCampusJurusan kampus={displayCampusDetail} />
          </TabsContent>

          <TabsContent value="program">
            <DashboardCampusProgram kampus={displayCampusDetail} />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
};

export default DashboardCampusDetail;
