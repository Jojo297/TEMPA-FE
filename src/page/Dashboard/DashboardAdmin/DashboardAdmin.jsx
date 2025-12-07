import SidebarAdmin from "@/components/SidebarAdmin";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom"; // <-- WAJIB

export default function DashboardAdmin() {
  const navigate = useNavigate(); // <-- WAJIB

  const data = [
    {
      status: "Belum Diverifikasi",
      statusClasses: "text-[#FFC107] border-[#FFC107] bg-[#FFC107]/10",
    },
    {
      status: "Belum Diverifikasi",
      statusClasses: "text-[#FFC107] border-[#FFC107] bg-[#FFC107]/10",
    },
    {
      status: "Data Diterima",
      statusClasses: "text-[#4CAF50] border-[#4CAF50] bg-[#4CAF50]/10",
    },
    {
      status: "Data Ditolak",
      statusClasses: "text-[#F44336] border-[#F44336] bg-[#F44336]/10",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SidebarAdmin>
        <main className="flex-1 px-4 sm:px-12 pt-6 pb-10 max-w-7xl mx-auto w-full">
          <div className="mb-10 pl-2">
            <h2 className="text-sm sm:text-lg font-normal text-[#003135] tracking-widest">
              SELAMAT DATANG,
            </h2>
            <h1 className="text-3xl font-extrabold text-[#003135]">
              ADMIN TEMPA
            </h1>
          </div>

          <div className="bg-[#003631] text-white rounded-xl shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl font-bold mb-8">Verifikasi Kampus</h2>

            <div className="flex flex-col space-y-5 divide-y divide-[#003631]">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="py-4 px-6 grid grid-cols-[auto,1fr,auto] items-center gap-6 hover:bg-[#2E5859] transition">
                  <div className="flex-shrink-0">
                    <div className="w-5 h-5 rounded-full bg-gray-400/70" />
                  </div>

                  <div className="min-w-0">
                    <p className="font-semibold text-base truncate">
                      Lorem ipsum
                    </p>
                    <p className="text-gray-300 text-xs truncate">
                      Lorem ipsum | Lorem ipsum | Lorem ipsum
                    </p>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0 ml-auto">
                    <button
                      onClick={() => navigate("/dashboard-admin/verifikasi")}
                      className="bg-[#96CCEC] text-[#003135] font-semibold px-10 py-1.5 text-sm rounded-md shadow-sm hover:bg-[#7bc8e9] transition">
                      Verifikasi
                    </button>

                    <span
                      className={`px-3 py-1.5 text-xs rounded-md border ${item.statusClasses} font-semibold`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6 pt-4 pr-6">
              <div className="flex items-center gap-1.5 text-white">
                <button
                  className="p-1 h-6 w-6 flex items-center justify-center rounded-sm text-white hover:bg-[#3d6e6f] transition disabled:opacity-50"
                  disabled>
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <span className="text-sm font-medium border border-white/50 px-3 py-1 rounded-sm">
                  1/1
                </span>

                <button
                  className="p-1 h-6 w-6 flex items-center justify-center rounded-sm text-white hover:bg-[#3d6e6f] transition disabled:opacity-50"
                  disabled>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </SidebarAdmin>
    </div>
  );
}
