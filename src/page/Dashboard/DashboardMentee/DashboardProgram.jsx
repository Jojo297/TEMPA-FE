import { Link, useNavigate } from "react-router-dom";
import { Calendar, Home, Map, Search, Users } from "lucide-react";
import { useEffect } from "react";
import useGetAllProgram from "@/hooks/useGetAllProgram";
import DashboardProgramSkeleton from "@/components/DashboardProgramSkeleton";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function DashboardProgram() {
  const navigate = useNavigate();
  const token = localStorage.getItem("userJwt");
  const { programs, isLoading, error, fetchPrograms } = useGetAllProgram();

  // store all program
  const displayAllProgram = programs ?? [];
  console.log(displayAllProgram);

  // badge for status program
  const getBadgeClass = (status) => {
    switch (status) {
      case "open":
        return {
          text: "Buka",
          bgColor: "bg-green-200",
          textColor: "text-green-800",
        };
      case "closed":
        return {
          text: "Tutup",
          bgColor: "bg-red-100",
          textColor: "text-red-800",
        };
    }
  };

  const getLocation = (status, item) => {
    switch (status) {
      case "online":
        return "Zoom/Gmeet";
      case "onsite":
        return item.sesi_description;
      default: // 🏆 Tambahkan ini
        return "Tempat belum ditentukan";
    }
  };

  // get all program
  useEffect(() => {
    if (token) {
      fetchPrograms(token);
    }
  }, [token, fetchPrograms]);

  if (isLoading) {
    return <DashboardProgramSkeleton />;
  }

  if (!displayAllProgram) {
    return <p>Program tidak ditemukan.</p>;
  }

  // handling error
  if (error) {
    return (
      <p className="justify-center text-center" style={{ color: "red" }}>
        ❌ Error: {error}
      </p>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}

      {/* Konten utama */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto ">
          <div className="mb-2">
            {/* breadcum */}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild className="hover:text-primary">
                    <Link to="/dashboard-mentee">Beranda</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem className="text-primary">
                  <BreadcrumbPage className="text-primary">
                    Program
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {/* Header Section */}
          <div className=" mb-8 text-center">
            <div className="bg-primary text-white rounded-xl p-6 shadow">
              <h1 className="text-2xl font-bold mb-2">Program</h1>
              <p className="text-sm max-w-2xl mx-auto">
                Jelajahi berbagai kampus terbaik dan temukan informasi seputar
                program, jurusan, serta prestasi mereka di sini. Dapatkan
                kesempatan untuk mengikuti Trial Kuliah atau kelas singkat
                sebelum Anda membuat keputusan besar!
              </p>
            </div>
          </div>

          {/* Rekomendasi Section */}
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4">Rekomendasi</h2>
            <div className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-1/3 relative">
                <img
                  src={programs[0].img}
                  alt="Program"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold text-center leading-tight">
                    KULIAH <br /> BERSERTIFIKAT <br /> 1 HARI
                  </h3>
                </div>
              </div>
              <div className="md:w-2/3 p-6 bg-[#0E3B3D] text-white flex flex-col justify-between">
                <p className="text-sm mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <div className="flex flex-wrap text-sm mb-4 border-t border-gray-500 pt-4">
                  <p className="mr-4">
                    {programs[0].campus} | {programs[0].category} |{" "}
                    {programs[0].type}
                  </p>
                </div>
                <div className="flex flex-wrap gap-6 text-sm mb-4">
                  <p>📅 {programs[0].date}</p>
                  <p>🕒 {programs[0].time}</p>
                  <p>👥 {programs[0].capacity}</p>
                  <p>📍 {programs[0].location}</p>
                </div>
                <Link
                  to={`/dashboard-mentee/program/${programs[0].id}`}
                  className="mt-6 bg-[#B4D0E7] text-[#0E3B3D] py-2 px-48 rounded-md font-semibold hover:bg-[#A3C5E0] transition inline-block text-center">
                  Lihat Detail
                </Link>
              </div>
            </div>
            {/* Card Program */}
            <div className="flex flex-col gap-8">
              {/* Card Program */}
              {displayAllProgram.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col lg:flex-row border bg-white relative rounded-2xl overflow-hidden transition duration-300 hover:bg-white hover:shadow-xl">
                  {/* left side */}
                  <div
                    className="lg:w-1/3 flex flex-col justify-end bg-cover bg-center p-6 text-white"
                    // Menggunakan background image dengan overlay warna untuk efek keren
                    style={{
                      backgroundImage: `linear-gradient(rgba(1, 59, 53, 0.4), rgba(1, 59, 53, 0.7)),  url(${item.image_url})`,
                      backgroundColor: "#013B35",
                      minHeight: "200px",
                    }}>
                    {/* Completion Status */}
                    {(() => {
                      // get badge status
                      const statusData = getBadgeClass(item.program_status);
                      return (
                        <div
                          className={`absolute top-4 z-10 px-3 py-1 rounded-full text-sm font-medium mt-2 sm:mt-0 ${statusData.bgColor} ${statusData.textColor}`}>
                          {statusData.text}
                        </div>
                      );
                    })()}
                    <h3 className="text-3xl font-extrabold leading-tight drop-shadow-lg">
                      {item.program_name}
                    </h3>
                  </div>
                  <div className="md:w-2/3 p-6 bg-[#0E3B3D] text-white flex flex-col justify-between">
                    <p className="text-sm mb-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <div className="flex flex-wrap text-sm mb-4 border-t border-gray-500 pt-4">
                      <p className="mr-4">
                        {item.campus} | {item.category} | {item.type}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-6 text-sm mb-4">
                      <p>📅 {item.date}</p>
                      <p>🕒 {item.time}</p>
                      <p>👥 {item.capacity}</p>
                      <p>📍 {item.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
