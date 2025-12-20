import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { kampusList } from "@/lib/kampusList";
import { CampusHeaderProfile } from "@/components/campusHeaderProfile";
import SidebarWithNavbar from "@/components/SidebarMentee";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import useGetDetailCampus from "@/hooks/hooksAdmin/useGetDetailCampus";
import DashboardCampusDetailSkeleton from "@/components/DashboardCampusDetailSkeleton";
import CampusDescription from "@/components/CampusDescription";
import DashboardCampusJurusan from "../DashboardMentee/DashboardMenteeCampusJurusan";
import DashboardCampusProgram from "@/page/Dashboard/DashboardMentee/DashboardMenteeCampusProgram";
import { Check, Pencil, Trash2, X } from "lucide-react";
import RejectCampus from "@/components/RejectCampus";

const DashboardAdminCampusDetail = () => {
  const { id } = useParams();
  const token = localStorage.getItem("userJwt");
  const { detailCampus, isLoading, error, fetchDetailCampus } =
    useGetDetailCampus();
  const kampus = kampusList.find((k) => k.id === parseInt(id));

  // store detail campus to displayCampusDetail
  const displayCampusDetail = detailCampus ?? [];
  // console.log(displayCampusDetail);

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
      <div className="flex justify-between items-center mb-4">
        {/* breadcum */}
        <Breadcrumb className="mb-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild className="hover:text-primary">
                <Link to="/dashboard-admin/beranda">Beranda</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild className="hover:text-primary">
                <Link to="/dashboard-admin/kampus">Kampus</Link>
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

        {/* Grup Button */}
        <div className="flex gap-3">
          {displayCampusDetail.verification_status === "accepted" ? (
            <RejectCampus token={token} idCampus={displayCampusDetail.id} />
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-secondary text-white px-4 py-2 text-sm hover:opacity-60 transition rounded-lg shadow-md flex items-center gap-2"
            >
              <Check size={16} /> Terima Kampus
            </button>
          )}
        </div>
      </div>

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

export default DashboardAdminCampusDetail;
