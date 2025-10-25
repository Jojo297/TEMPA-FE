import React from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Cpu,
  Cog,
  Lightbulb,
  DollarSign,
  Scale,
  Palette,
  Brain,
  Plus,
  Waves,
  Cross,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const DashboardJurusan = () => {
  const rekomendasi = [
    { icon: <Cpu size={48} />, name: "Informatika" },
    { icon: <Cog size={48} />, name: "Mesin" },
    { icon: <Lightbulb size={48} />, name: "Elektronika" },
  ];

  const seluruhJurusan = [
    { icon: <Cpu size={48} />, name: "Informatika" },
    { icon: <Cog size={48} />, name: "Mesin" },
    { icon: <Lightbulb size={48} />, name: "Elektronika" },
    { icon: <DollarSign size={48} />, name: "Akuntansi" },
    { icon: <Scale size={48} />, name: "Hukum" },
    { icon: <Palette size={48} />, name: "DKV" },
    { icon: <Brain size={48} />, name: "Psikologi" },
    { icon: <Plus size={48} />, name: "Matematika" },
    { icon: <Waves size={48} />, name: "Kelautan" },
    { icon: <Cross size={48} />, name: "Kedokteran" },
  ];

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
            <BreadcrumbPage className="text-primary">Jurusan</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="min-h-screen  ">
        {/* Header Section */}
        <div className="bg-primary text-white p-6 rounded-2xl shadow-md mb-8 text-center">
          <h1 className="text-2xl font-semibold mb-2">Jurusan</h1>
          <p className="text-sm">
            Jelajahi berbagai jurusan dan temukan bidang yang sesuai dengan
            minat serta bakatmu.
          </p>
        </div>

        {/* Rekomendasi Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Rekomendasi</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {rekomendasi.map((item, index) => (
              <Link
                to={`/dashboard-mentee/jurusan/${item.name.toLowerCase()}`}
                key={index}
                className="bg-primary text-white rounded-xl flex flex-col items-center justify-center p-6 hover:scale-105 transition-transform"
              >
                {item.icon}
                <p className="mt-2 text-sm font-medium">{item.name}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Seluruh Jurusan Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Seluruh Jurusan</h2>
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Cari Jurusan"
                className="w-full border border-gray-300 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003135]"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-500"
                size={18}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {seluruhJurusan.map((item, index) => (
              <Link
                to={`/dashboard-mentee/jurusan/${item.name.toLowerCase()}`}
                key={index}
                className="bg-primary text-white rounded-xl flex flex-col items-center justify-center p-6 hover:scale-105 transition-transform"
              >
                {item.icon}
                <p className="mt-2 text-sm font-medium">{item.name}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default DashboardJurusan;
