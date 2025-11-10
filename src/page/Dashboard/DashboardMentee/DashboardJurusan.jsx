import React, { useEffect, useState } from "react";
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
import NotFounPages from "@/components/NotFoundPages";

const DashboardJurusan = () => {
  const [searchTerm, setSearchTerm] = useState("");
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

  // handle search majors
  const filteredMajors = mergedData.filter((major) =>
    major.major_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        {/* header Section */}
        <div className="bg-primary text-white p-6 rounded-2xl shadow-md mb-8 text-center">
          <h1 className="text-2xl font-semibold mb-2">Jurusan</h1>
          <p className="text-sm">
            Jelajahi berbagai jurusan dan temukan bidang yang sesuai dengan
            minat serta bakatmu.
          </p>
        </div>

        {/* all majors section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Seluruh Jurusan</h2>
            {/* input search */}
            <div className="relative w-full md:w-60">
              <Search
                size={16}
                className="absolute top-2.5 left-3 text-gray-400"
              />
              <input
                type="text"
                placeholder="Cari jurusan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-2 w-full border rounded-lg text-sm focus:outline-none focus:ring focus:ring-[#004D40]/40"
              />
            </div>
          </div>

          {/* card majors */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {/* majors not found */}
            {filteredMajors.length <= 0 ? (
              <NotFounPages message={"Jurusan tidak ditemukan"} />
            ) : (
              // card majors
              filteredMajors.map((item) => (
                <Link
                  to={`/dashboard-mentee/jurusan/${item.major_name.toLowerCase()}`}
                  key={item.id}
                  className="bg-primary text-white rounded-xl flex flex-col items-center justify-center p-6 hover:scale-105 transition-transform">
                  {item.icon}
                  <p className="mt-2 text-sm font-medium">{item.major_name}</p>
                </Link>
              ))
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default DashboardJurusan;
