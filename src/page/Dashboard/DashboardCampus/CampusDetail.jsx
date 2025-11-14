import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { kampusList } from "@/lib/kampusList";
import SidebarWithNavbar from "@/components/SidebarWithNavbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CampusPrestasiPage from "./DashboardCampusPrestasi";
import DashboardCampusJurusan from "./DashboardCampusJurusan";
import DashboardCampusProgram from "./DashboardCampusProgram";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import useGetDetailCampus from "@/hooks/useGetDetailCampus";
import DashboardCampusDetailSkeleton from "@/components/DashboardCampusDetailSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Save, MapPin, Link as LinkIcon, Image } from "lucide-react";

const CampusDetail = () => {
  const { id } = useParams();
  const token = localStorage.getItem("userJwt");
  const { detailCampus, isLoading, error, fetchDetailCampus } =
    useGetDetailCampus();

  const kampus = kampusList.find((k) => k.id === parseInt(id));
  const displayCampusDetail = detailCampus ?? {};

  // STATE UNTUK EDIT
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    campus_name: "",
    description: "",
    vision_mission: "",
    address: "",
    website: "",
    banner: "",
    logo: "",
  });

  useEffect(() => {
    if (token) {
      fetchDetailCampus(token, id);
    }
  }, [token, fetchDetailCampus, id]);

  useEffect(() => {
    if (displayCampusDetail) {
      setFormData({
        campus_name: displayCampusDetail.campus_name || "",
        description: displayCampusDetail.description || "",
        vision_mission: displayCampusDetail.vision_mission || "",
        address: displayCampusDetail.address || "",
        website: displayCampusDetail.website || "",
        banner: displayCampusDetail.banner || "",
        logo: displayCampusDetail.logo || "",
      });
    }
  }, [displayCampusDetail]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (field, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, [field]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setEditMode(false);
    console.log("Data disimpan:", formData);
    // TODO: Kirim ke backend dengan fetch/axios
  };

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
      <SidebarWithNavbar>
        {/* breadcrumb */}
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild className="hover:text-primary">
                <Link to="/dashboard-campus">Beranda</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild className="hover:text-primary">
                <Link to="/dashboard-campus/kampus">Kampus</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="text-primary">
              <BreadcrumbPage>{formData.campus_name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* === HEADER KAMPUS === */}
        <div className="relative bg-[#013B35] text-white rounded-xl overflow-hidden mb-6">
          {/* Banner */}
          <div className="relative h-52 w-full bg-gray-200">
            {formData.banner ? (
              <img
                src={formData.banner}
                alt="Banner Kampus"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <Image className="mr-2" /> Banner Kampus
              </div>
            )}
            {editMode && (
              <label className="absolute top-2 right-2 bg-white text-[#013B35] text-xs px-3 py-1 rounded cursor-pointer">
                Ganti Banner
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange("banner", e)}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Profile Section */}
          <div className="flex items-center p-6 gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white bg-gray-200">
                {formData.logo ? (
                  <img
                    src={formData.logo}
                    alt="Logo Kampus"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <Image className="mr-2" /> Logo
                  </div>
                )}
              </div>
              {editMode && (
                <label className="absolute bottom-0 right-0 bg-white text-[#013B35] text-xs px-2 py-1 rounded cursor-pointer">
                  Ubah
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange("logo", e)}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <div className="flex-1">
              {editMode ? (
                <Input
                  value={formData.campus_name}
                  onChange={(e) => handleChange("campus_name", e.target.value)}
                  className="text-2xl font-bold text-[#013B35] bg-white"
                />
              ) : (
                <h2 className="text-2xl font-bold">{formData.campus_name}</h2>
              )}
              <div className="flex items-center gap-4 mt-2 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  <span>{formData.address}</span>
                </div>
                <div className="flex items-center gap-1">
                  <LinkIcon size={16} />
                  <span>{formData.website}</span>
                </div>
              </div>
            </div>

            <Button
              onClick={() => (editMode ? handleSave() : setEditMode(true))}
              className="bg-white text-[#013B35] hover:bg-gray-100">
              {editMode ? (
                <>
                  <Save size={16} className="mr-2" /> Simpan
                </>
              ) : (
                <>
                  <Edit size={16} className="mr-2" /> Edit
                </>
              )}
            </Button>
          </div>
        </div>

        {/* === TABS SECTION === */}
        <section className="mt-7 max-w-7xl bg-[#F8FAFB] mx-auto mb-20 flex flex-col items-start">
          <Tabs defaultValue="deskripsi" className="w-full">
            <TabsList className="flex flex-wrap gap-4 mb-5 justify-start h-auto bg-transparent">
              {["deskripsi", "prestasi", "jurusan", "program"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="px-6 py-2 border border-[#013B35] bg-white text-[#013B35] rounded-full font-semibold 
                    hover:bg-[#013B35] hover:text-white transition 
                    data-[state=active]:bg-[#013B35] data-[state=active]:text-white">
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="deskripsi">
              {editMode ? (
                <div className="space-y-5">
                  <div>
                    <label className="font-semibold">Tentang Kampus</label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) =>
                        handleChange("description", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="font-semibold">Visi & Misi</label>
                    <Textarea
                      value={formData.vision_mission}
                      onChange={(e) =>
                        handleChange("vision_mission", e.target.value)
                      }
                    />
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-semibold mb-2">Tentang Kampus</h3>
                  <p className="text-gray-700 mb-6">{formData.description}</p>

                  <h3 className="text-lg font-semibold mb-2">Visi & Misi</h3>
                  <p className="text-gray-700">{formData.vision_mission}</p>
                </>
              )}
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
      </SidebarWithNavbar>
    </>
  );
};

export default DashboardCampusDetail;
