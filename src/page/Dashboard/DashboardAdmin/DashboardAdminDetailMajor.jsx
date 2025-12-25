import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import useGetDetailStandardMajor from "@/hooks/hooksAdmin/useGetDetailStandardMajor";
import DeleteProgram from "@/components/DeleteProgram";
import { Pencil, Trash2 } from "lucide-react";
import MajorEditForm from "@/components/MajorEditForm";
import DashboardAdminDetailMajorSkeleton from "@/components/DashboardAdminDetailMajorSkeleton";

export default function DashboardAdminDetailMajor() {
  const token = localStorage.getItem("userJwt");
  const { id } = useParams();
  const { detailMajor, isLoading, error, fetchDetailStandardMajor } =
    useGetDetailStandardMajor();
  const [editMode, setEditMode] = useState(false);

  const displayDetailMajor = detailMajor ?? [];
  // console.log(displayDetailMajor);

  const handleSave = () => {
    fetchDetailStandardMajor(token, id); // Refetch data
    setEditMode(false); // Exit edit mode
    window.scrollTo(0, 0);
  };

  // fetch detail major
  useEffect(() => {
    if (token) {
      fetchDetailStandardMajor(token, id);
    }
  }, [token]);

  if (isLoading) {
    return <DashboardAdminDetailMajorSkeleton />;
  }

  if (editMode) {
    return (
      <MajorEditForm
        initialData={displayDetailMajor}
        onClose={() => setEditMode(false)}
        onSave={handleSave}
      />
    );
  }

  return (
    <div className="min-h-screen pb-16">
      {/* breadcum */}

      <div className="flex justify-between items-center mb-4">
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
                <Link to="/dashboard-admin/jurusan">Jurusan</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="text-primary">
              <BreadcrumbPage className="text-primary">
                {displayDetailMajor.major_name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Grup Tombol */}
        <div className="flex gap-3">
          <button
            className={
              "bg-red-500 hover:opacity-60 transition text-white px-4 py-2 text-sm rounded-lg shadow-md flex items-center gap-2"
            }
          >
            {<Trash2 size={16} />}
            Hapus Jurusan
          </button>
          <button
            onClick={() => setEditMode(true)}
            className="bg-secondary text-white px-4 py-2 text-sm hover:opacity-60 transition rounded-lg shadow-md flex items-center gap-2"
          >
            <Pencil size={16} /> Ubah Jurusan
          </button>
        </div>
      </div>

      {/* header  */}
      <div className=" mx-auto">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
          <div className="relative w-full h-[320px]">
            <img
              src={displayDetailMajor.banner_url}
              alt={displayDetailMajor.major_name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-[#013B35] py-4 px-6">
            <h1 className="text-2xl font-extrabold text-white uppercase tracking-wider">
              {displayDetailMajor.major_name}
            </h1>
          </div>
        </div>
      </div>

      {/* description */}
      <div className="max-w-6xl mx-auto px-6 mt-10">
        <h2 className="text-2xl font-semibold text-[#013B35] mb-3">
          Tentang Jurusan
        </h2>
        <p className="text-gray-700 leading-relaxed text-justify">
          {displayDetailMajor.description ||
            "Deskripsi jurusan belum tersedia."}
        </p>
      </div>

      {/* job prospects */}
      <div className="max-w-6xl mx-auto px-6 mt-12">
        <h2 className="text-2xl font-semibold text-[#013B35] mb-4">
          Prospek Kerja
        </h2>
        <div className="flex flex-wrap gap-2">
          {displayDetailMajor.prospek_kerja?.map((item, i) => (
            <span
              key={i}
              className="px-4 py-2 border border-[#013B35] text-[#013B35] font-medium rounded-full text-sm hover:bg-[#013B35] hover:text-white transition"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
