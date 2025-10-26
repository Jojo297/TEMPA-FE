import React from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { kampusList } from "@/lib/kampusList";
import { CampusHeaderProfile } from "@/components/campusHeaderProfile";
import SidebarWithNavbar from "@/components/SidebarWithNavbar";
import { MapPin } from "lucide-react";

const DashboardCampusDetail = () => {
  const { id } = useParams();
  const kampus = kampusList.find((k) => k.id === parseInt(id));
  const location = useLocation();

  // Fungsi utilitas untuk menentukan kelas aktif/non-aktif
  const getActiveClass = (targetPath) => {
    // 1. Definisikan path absolut penuh yang dicari (termasuk dashboard-mentee dan ID)
    const fullTargetPath = `/dashboard-mentee/kampus/${kampus.id}${targetPath}`;

    // 2. Cek apakah pathname saat ini SAMA dengan target path
    const isActive = location.pathname === fullTargetPath;

    // 3. Tentukan kelas berdasarkan status aktif
    return isActive
      ? "bg-[#013B35] text-white" // Kelas Aktif
      : "bg-white border border-[#013B35] text-[#013B35] hover:bg-[#013B35] hover:text-white transition"; // Kelas Non-Aktif
  };

  if (!kampus)
    return (
      <SidebarWithNavbar>
        <div className="min-h-screen flex items-center justify-center text-red-500">
          <p className="text-xl font-semibold">Kampus tidak ditemukan</p>
        </div>
      </SidebarWithNavbar>
    );

  return (
    <>
      {/* Header Kampus */}
      <CampusHeaderProfile kampus={kampus} />

      {/* Navigation Kampus */}
      <section className="mt-12 max-w-7xl bg-[#F8FAFB] mx-auto mb-20  flex flex-col items-start">
        {/* Tombol Navigasi */}
        <div className="flex flex-wrap gap-4 mb-10 justify-start">
          <Link
            to={`/dashboard-mentee/kampus/${kampus.id}`}
            className={`px-6 py-2 rounded-full font-semibold ${getActiveClass(
              ""
            )}`}
          >
            Deskripsi
          </Link>
          <Link
            to={`/dashboard-mentee/kampus/${kampus.id}/prestasi`}
            className={`px-6 py-2 rounded-full font-semibold ${getActiveClass(
              "/prestasi"
            )}`}
          >
            Prestasi
          </Link>
          <Link
            to={`/dashboard-mentee/kampus/${kampus.id}/jurusan`}
            className={`px-6 py-2 rounded-full font-semibold ${getActiveClass(
              "/jurusan"
            )}`}
          >
            Jurusan
          </Link>
          <Link
            to={`/dashboard-mentee/kampus/${kampus.id}/program`}
            className={`px-6 py-2 rounded-full font-semibold ${getActiveClass(
              "/program"
            )}`}
          >
            Program
          </Link>
        </div>

        <Outlet />
      </section>
    </>
  );
};

export default DashboardCampusDetail;
