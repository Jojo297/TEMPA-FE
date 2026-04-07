import { useEffect, useState, useMemo } from "react";
import {
  X,
  Plus,
  Pencil,
  MapPin,
  Upload,
  Loader2,
  Save,
  BadgeCheckIcon,
  Eye,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import DetailCampusDescription from "@/components/DetailCampusDescription";
import DetailCampusMajors from "@/components/DetailCampusMajors";
import useDetailCampus from "@/hooks/hooksCampus/useDetailCampus";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router";
import { Input } from "@/components/ui/input";
import useEditImageCampus from "@/hooks/hooksCampus/useEditImageCampus";
import DashboardCampusDetailSkeleton from "@/components/DashboardCampusDetailSkeleton";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import DetailCampusLocation from "@/components/DetailCampusLocation";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const editHeaderSchema = z.object({
  campus_name: z
    .string()
    .min(3, "Nama Kampus harus memiliki minimal 3 karakter."),
  banner: z
    .any()
    .optional()
    .refine(
      (files) =>
        !files || files.length === 0 || files?.[0]?.size <= MAX_FILE_SIZE,
      `Ukuran file maksimal adalah 5MB.`,
    )
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Format gambar yang didukung adalah .jpg, .jpeg, .png, dan .webp.",
    ),
  logo: z
    .any()
    .optional()
    .refine(
      (files) =>
        !files || files.length === 0 || files?.[0]?.size <= MAX_FILE_SIZE,
      `Ukuran file maksimal adalah 5MB.`,
    )
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Format gambar yang didukung adalah .jpg, .jpeg, .png, dan .webp.",
    ),
});

export default function DetailCampus() {
  const token = localStorage.getItem("userJwt");
  const [isInfoEditOpen, setIsInfoEditOpen] = useState(false);

  const { detailCampus, isLoading, error, fetchDetailCampus, clearState } =
    useDetailCampus();

  // Fallback ke objek kosong jika detailCampus null/undefined
  const displayDetailCampus = detailCampus || {};
  // console.log(displayDetailCampus);

  // State untuk form edit, diinisialisasi saat data tersedia
  const [campusData, setCampusData] = useState(displayDetailCampus);

  const campusName = displayDetailCampus.campus_name;

  const DescriptionSection = {
    desc: displayDetailCampus.description,
    visi: displayDetailCampus.vision_mission,
    campusWebsite: displayDetailCampus.website_campus,
  };

  const majors = displayDetailCampus.major;

  const location = {
    province: displayDetailCampus.province,
    city: displayDetailCampus.city,
    subdistrict: displayDetailCampus.subdistrict,
    ward: displayDetailCampus.ward,
    lat: displayDetailCampus.lat,
    lng: displayDetailCampus.lng,
  };

  // console.log(campusName);

  useEffect(() => {
    if (token) {
      clearState();
      fetchDetailCampus(token);
    }
  }, [token, fetchDetailCampus]);

  useEffect(() => {
    setCampusData(displayDetailCampus);
  }, [detailCampus]);

  if (isLoading) {
    return <DashboardCampusDetailSkeleton />;
  }

  return (
    <>
      <Breadcrumb className="mb-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="hover:text-primary">
              <Link to="/dashboard-campus">Beranda</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="text-primary">
            <span className="text-primary">Profil Kampus</span>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* HEADER BANNER*/}
      {isInfoEditOpen ? (
        <EditHeader
          displayDetailCampus={displayDetailCampus}
          setIsInfoEditOpen={setIsInfoEditOpen}
          refetchCampusData={() => fetchDetailCampus(token)}
        />
      ) : (
        <header className="bg-[#F8FAFB]">
          <div className=" mx-auto rounded-xl shadow-lg overflow-hidden">
            <div className="h-[400px] relative">
              {/* banner */}
              <img
                src={
                  displayDetailCampus.banner_url ||
                  "https://placehold.co/1200x400?text=Tambahkan+Banner+Kampus"
                }
                alt={`Banner Kampus`}
                className="w-full h-full object-cover"
              />

              {/* EDIT BUTTON */}
              <button
                onClick={() => setIsInfoEditOpen(true)}
                className="absolute top-4 right-4 bg-white text-[#013B35] px-4 py-2 rounded-full shadow-md flex items-center gap-2"
              >
                <Pencil size={16} /> Edit Info
              </button>
            </div>

            {/* info campus */}
            <div className="bg-[#013B35] text-white px-12 py-6 flex justify-between items-center rounded-b-xl -mt-16 relative z-10">
              <div className="flex items-center space-x-4">
                <div className="bg-white p-2 sm:p-3 rounded-full shadow-lg border-4 border-gray-100 -mt-16 sm:-mt-10 flex-shrink-0">
                  <img
                    src={
                      displayDetailCampus.logo_url ||
                      "https://placehold.co/200?text=Logo+Kampus"
                    }
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {displayDetailCampus.campus_name}{" "}
                  </h1>
                  {/* Badge Verif */}
                  {displayDetailCampus.badge && (
                    <div className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-3 py-1 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.4)] border border-blue-400/50 transition-transform cursor-default">
                      <div className="bg-white rounded-full p-0.5">
                        <BadgeCheckIcon size={14} className="text-blue-600" />
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-widest leading-none">
                        Verified
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>
      )}

      <section className="mt-7 max-w-7xl bg-[#F8FAFB] mx-auto mb-20 flex flex-col items-start">
        <Tabs defaultValue="deskripsi" className="w-full">
          <div className="flex items-center justify-between">
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

              {/* jurusan */}
              <TabsTrigger
                value="jurusan"
                className="px-6 py-2 border border-[#013B35] bg-white text-[#013B35] rounded-full font-semibold 
                               hover:bg-[#013B35] hover:text-white transition 
                               data-[state=active]:bg-[#013B35] data-[state=active]:text-white"
              >
                Jurusan
              </TabsTrigger>

              {/* location */}
              <TabsTrigger
                value="location"
                className="px-6 py-2 border border-[#013B35] bg-white text-[#013B35] rounded-full font-semibold 
                               hover:bg-[#013B35] hover:text-white transition 
                               data-[state=active]:bg-[#013B35] data-[state=active]:text-white"
              >
                Lokasi
              </TabsTrigger>
            </TabsList>

            {/* total view campus */}
            <div className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300">
              <div className="relative">
                <Eye className="h-4 w-4 transition-transform group-hover:scale-110" />
                <div className="absolute -top-1 -right-1 h-1.5 w-1.5 bg-blue-500 rounded-full border border-white" />
              </div>
              <span className="text-sm font-medium tracking-tight">
                Telah dilihat oleh{" "}
                <b
                  className={`text-foreground tabular-nums ${
                    !displayDetailCampus.seen
                      ? "blur-sm select-none pointer-events-none"
                      : ""
                  }`}
                >
                  {displayDetailCampus.seen
                    ? displayDetailCampus.seen?.toLocaleString("en-US")
                    : "xxx.xxx"}
                </b>{" "}
                mentee
              </span>
            </div>
          </div>
          {/* content Tabs */}
          <TabsContent value="deskripsi">
            <DetailCampusDescription
              DescriptionSection={DescriptionSection}
              refetchCampusData={() => fetchDetailCampus(token)}
            />
          </TabsContent>

          <TabsContent value="jurusan">
            <DetailCampusMajors
              majors={majors}
              refetchCampusData={() => fetchDetailCampus(token)}
            />
          </TabsContent>

          <TabsContent value="location">
            <DetailCampusLocation
              idCampus={displayDetailCampus.id}
              location={location}
              campusName={campusName}
              refetchCampusData={() => fetchDetailCampus(token)}
            />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}

// component edit header detail campus
function EditHeader({
  displayDetailCampus,
  setIsInfoEditOpen,
  refetchCampusData,
}) {
  const token = localStorage.getItem("userJwt");
  const {
    editImageCampus,
    isLoading,
    error: submissionError,
    clearState,
  } = useEditImageCampus();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editHeaderSchema),
    defaultValues: {
      campus_name: displayDetailCampus.campus_name || "",
    },
  });

  const bannerFile = watch("banner");
  const logoFile = watch("logo");

  const bannerPreview = bannerFile?.[0]
    ? URL.createObjectURL(bannerFile[0])
    : null;
  const logoPreview = logoFile?.[0] ? URL.createObjectURL(logoFile[0]) : null;

  useEffect(() => {
    // Membersihkan state hook (error, success message) saat komponen unmount
    return () => {
      clearState();
    };
  }, [clearState]);

  const onSubmit = async (data) => {
    try {
      // console.log(data);
      const result = await editImageCampus({
        token,
        logo: data.logo?.[0],
        banner: data.banner?.[0],
        campus_name: data.campus_name,
        // TODO: Tambahkan juga logic untuk update campus_name jika ada endpointnya
      });

      // Jika berhasil, muat ulang data dan tutup mode edit
      await refetchCampusData();
      setIsInfoEditOpen(false);
    } catch (error) {
      // Error sudah ditangani di dalam hook, bisa ditambahkan notifikasi (toast) di sini jika perlu
      console.error("Gagal mengirim form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-[#F8FAFB]">
      <div className="max-w-6xl mx-auto rounded-xl shadow-lg overflow-hidden">
        <div className="h-[400px] relative">
          {/* banner */}
          <img
            src={
              bannerPreview ||
              displayDetailCampus.banner_url ||
              "https://placehold.co/1200x400?text=Tambahkan+Banner+Kampus"
            }
            alt={`Banner Kampus`}
            className="w-full h-full object-cover"
          />

          {/* Tombol Ganti Banner */}
          <label
            htmlFor="banner-upload"
            className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-100 transition-opacity cursor-pointer"
          >
            <div className="bg-white/80 backdrop-blur-sm text-[#013B35] px-6 py-3 rounded-full shadow-lg flex items-center gap-3">
              <Upload size={20} />
              <span className="font-semibold text-lg">Ganti Banner</span>
            </div>
            <input
              id="banner-upload"
              type="file"
              className="hidden"
              accept="image/*"
              {...register("banner")}
            />
          </label>
          {/* Grup Tombol Aksi */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              type="button"
              onClick={() => setIsInfoEditOpen(false)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full shadow-md flex items-center gap-2 hover:bg-gray-300 transition-colors"
            >
              <X size={16} />
              Batal
            </button>
            <button
              type="submit"
              className="bg-white text-[#013B35] px-4 py-2 rounded-full shadow-md flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Save size={16} />
              )}
              {isLoading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </div>

        {/* info campus */}
        <div className="bg-[#013B35] text-white px-12 py-6 flex justify-between items-center rounded-b-xl -mt-16 relative z-10">
          <div className="flex items-center space-x-4">
            {/* Logo dengan tombol edit */}
            <div className="relative bg-white p-3 rounded-full shadow-lg border-4 border-gray-100 -mt-10">
              {/* logo image */}
              <img
                src={
                  logoPreview ||
                  displayDetailCampus.logo_url ||
                  "https://placehold.co/200?text=Logo+Kampus"
                }
                alt={`Logo Kampus`}
                className="w-20 h-20 object-contain"
              />
              <label
                htmlFor="logo-upload"
                className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full opacity-100 transition-opacity cursor-pointer"
              >
                <Pencil size={20} className="text-white" />
                <input
                  id="logo-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  {...register("logo")}
                />
              </label>
            </div>
            <div>
              <Input
                type="text"
                placeholder="Nama Kampus"
                className="text-3xl md:text-4xl font-bold text-white mb-1 bg-transparent border-0 border-b-2 focus-visible:ring-0 focus-visible:border-b-white rounded-none p-0 h-auto"
                {...register("campus_name")}
              />
              {errors.campus_name && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.campus_name.message}
                </p>
              )}
            </div>
          </div>
        </div>
        {(errors.banner || errors.logo || submissionError) && (
          <div className="max-w-6xl mx-auto text-red-500 text-sm mt-2 px-4">
            {errors.banner && <p>{errors.banner.message}</p>}
            {errors.logo && <p>{errors.logo.message}</p>}
            {submissionError && <p>{submissionError}</p>}
          </div>
        )}
      </div>
    </form>
  );
}
