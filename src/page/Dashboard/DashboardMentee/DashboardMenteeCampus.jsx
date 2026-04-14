import React, { useEffect, useState } from "react";
import { BadgeCheckIcon, MapPin, Search } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import useGetAllCampus from "@/hooks/hooksMentee/useGetAllCampus";
import DashboardCampusSkeleton from "@/components/DashboardCampusSkeleton";
import NotFounPages from "@/components/NotFoundPages";
import HeaderPage from "@/components/HeaderPage";

export default function DashboardCampus() {
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("userJwt");
  const { campus, isLoading, error, fetchCampus } = useGetAllCampus();

  // store all campus to displayCampus
  const displayCampus = campus ?? [];
  console.log(displayCampus);

  // fetch all campus
  useEffect(() => {
    if (token) {
      fetchCampus(token);
    }
  }, [token, fetchCampus]);

  // Filter kampus sesuai input search
  const filteredKampus = displayCampus.filter((kampus) => {
    // Check if campus_name is not null, not undefined, and is a string
    if (typeof kampus.campus_name === "string") {
      return kampus.campus_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    }
    // Exclude items where campus_name is invalid
    return false;
  });

  // handle loading
  if (isLoading) {
    return <DashboardCampusSkeleton />;
  }

  // handle error
  if (error) {
    return (
      <p className="justify-center text-center" style={{ color: "red" }}>
        ❌ Error: {error}
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
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
            <BreadcrumbPage className="text-primary">Kampus</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Banner Section */}
      <HeaderPage
        title={"Kampus"}
        description={
          "Temukan institusi pendidikan tinggi yang paling sesuai dengan ambisi dan minat Anda. Mulai dari profil lengkap universitas dan rincian jurusan. Kami menyajikan data komprehensif untuk memastikan setiap calon mahasiswa memiliki referensi yang kuat sebelum memutuskan tempat terbaik untuk bertumbuh dan berkarya."
        }
        badge={"Campus"}
      />

      {/* Seluruh Kampus Section */}
      <section>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            Seluruh Kampus
          </h2>
          {/* input search */}
          <div className="relative w-full md:w-72">
            <Search
              size={16}
              className="absolute top-2.5 left-3 text-gray-400"
            />
            <input
              type="text"
              placeholder="Cari kampus..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-2 w-full border rounded-lg text-sm focus:outline-none focus:ring focus:ring-[#004D40]/40"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredKampus.map((kampus) => (
            <Link
              to={`/dashboard-mentee/kampus/${kampus.id}`}
              key={kampus.id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition p-4 block hover:-translate-y-1 duration-200"
            >
              <img
                src={kampus.banner_url}
                alt={kampus.campus_name}
                className="rounded-lg w-full h-40 object-cover mb-4"
              />
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={kampus.logo_url}
                  alt="Logo"
                  className="w-10 h-10 object-contain p-1 bg-gray-50 rounded-full border border-gray-100"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="font-bold text-base text-gray-900 truncate">
                      {kampus.campus_name}
                    </p>
                    {kampus.badge && (
                      <BadgeCheckIcon
                        size={18}
                        className="fill-blue-600 text-white shrink-0"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                <MapPin size={16} className="shrink-0" />
                <span className="truncate">{`${kampus.province}, ${kampus.city}`}</span>
              </div>
            </Link>
          ))}
          {filteredKampus.length === 0 && (
            <NotFounPages message={"Kampus tidak ditemukan"} />
          )}
        </div>
      </section>
    </div>
  );
}
