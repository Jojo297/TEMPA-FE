import { Button } from "@/components/ui/button";
import useRegisterMitraCampus from "@/hooks/hooksCampus/useRegisterMitraCampus";
import { useNavigate, useLocation } from "react-router-dom";
import CampusVerificationAccept from "./CampusVerificationAccept";
import CampusVerificationPending from "./CampusVerificationPending";
import KampusVerifikasiGagal from "./KampusVerifikasiGagal";
import { useEffect } from "react";
import DashboardCampusRegisterMitra from "./DashboardCampusRegisterMitra";
import { jwtDecode } from "jwt-decode";

export default function CampusFirst() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("userJwt");
  const decode = jwtDecode(token);
  console.log(decode);
  const { isLoading, checkVeirificationCampus, isVerify } =
    useRegisterMitraCampus();

  const displayVerification = isVerify ?? {};

  useEffect(() => {
    if (token) {
      checkVeirificationCampus(token);
    }
  }, [token]);

  // direct component if
  switch (displayVerification.verification_status) {
    case "accepted":
      return <CampusVerificationAccept campusName={decode.verif.campus_name} />;
    case "pending":
      return <CampusVerificationPending />;
    case "rejected":
      return <KampusVerifikasiGagal />;

    default:
      break;
  }

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
          className="bg-[#013D3A] hover:bg-[#024E4B] hover:cursor-pointer text-white px-6 py-2 rounded-lg font-semibold mt-2"
        >
          Isi Data Kampus
        </Button>
      </div>
    </main>
  );
}
