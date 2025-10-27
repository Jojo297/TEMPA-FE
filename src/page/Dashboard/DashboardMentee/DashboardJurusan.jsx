import React, { useEffect } from "react";
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
  FileQuestionIcon,
} from "lucide-react";
import roboterror from "@/assets/robot-error.png";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import useGetAllMajors from "@/hooks/useGetAllMajors";
import MajorsListSkeleton from "@/components/MajorsListSkeleton";

const DashboardJurusan = () => {
  const token = localStorage.getItem("userJwt");
  const { majors, isLoading, error, fetchMajor } = useGetAllMajors();

  const displayMajors = majors ?? [];

  // icon majors
  const majorIconMap = {
    Informatika: <Cpu size={48} />,
    Mesin: <Cog size={48} />,
    Elektronika: <Lightbulb size={48} />,
    Akuntansi: <DollarSign size={48} />,
    Hukum: <Scale size={48} />,
    "Desain Komunikasi Visual (DKV)": <Palette size={48} />,
    Psikologi: <Brain size={48} />,
    Matematika: <Plus size={48} />,
    Kelautan: <Waves size={48} />,
    Kedokteran: <Cross size={48} />,
  };

  // merge majors name to icon
  const mergedData = displayMajors.map((major) => ({
    ...major,
    icon: majorIconMap[major.major_name] || <FileQuestionIcon size={48} />,
  }));
  // console.log(mergedData);

  // fetch data majors
  useEffect(() => {
    if (token) {
      fetchMajor(token);
    }
  }, []);

  // handling error
  if (error) {
    return (
      <p className="justify-center text-center" style={{ color: "red" }}>
        ❌ Error: {error}
      </p>
    );
  }

  // handle loading
  if (isLoading) {
    return <MajorsListSkeleton />;
  }

  return (
    <div className="min-h-screen bg-white px-6 py-6">
      {/* Header Section */}
      <div className="bg-[#003135] text-white p-6 rounded-2xl shadow-md mb-8 text-center">
        <h1 className="text-2xl font-semibold mb-2">Jurusan</h1>
        <p className="text-sm">
          Jelajahi berbagai jurusan dan temukan bidang yang sesuai dengan minat
          serta bakatmu.
        </p>
      </div>

      {/* all majors section */}
      <section>
        <div className="flex items-center justify-between mb-6">
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
              className="bg-[#003135] text-white rounded-xl flex flex-col items-center justify-center p-6 hover:scale-105 transition-transform">
              {item.icon}
              <p className="mt-2 text-sm font-medium">{item.name}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardJurusan;
