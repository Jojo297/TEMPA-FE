import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

export default function CampusFirst() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <main className="flex-grow flex items-center justify-center my-40">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#013D3A]">
          Selamat Datang di Dashboard Kampus 👋
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Kelola data kampus Anda, isi form verifikasi, dan pantau status kerja
          sama dengan platform TEMPA.
        </p>
        <Button
          onClick={() => navigate("/campus-verification/form-data")}
          className="bg-[#013D3A] hover:bg-[#024E4B] text-white px-6 py-2 rounded-lg font-semibold mt-2"
        >
          Isi Data Kampus
        </Button>
      </div>
    </main>
  );
}
