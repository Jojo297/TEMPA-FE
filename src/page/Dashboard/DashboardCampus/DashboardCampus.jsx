import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import SidebarCampus from "@/components/SideBarCampus";
import useRegisterMitraCampus from "@/hooks/hooksCampus/useRegisterMitraCampus";

export default function DashboardBerandaCampus() {
  const navigate = useNavigate();
  const token = localStorage.getItem("userJwt");
  const decode = jwtDecode(token);
  console.log(decode);
  const { isLoading, checkVeirificationCampus, isVerify } =
    useRegisterMitraCampus();

  const displayVerification = isVerify ?? {};

  const status = displayVerification.verification_status;
  console.log(status);

  // if verif redirect component CampusFirst
  useEffect(() => {
    if (token) {
      checkVeirificationCampus(token);
    }
  }, [token]);

  if (status == "null" || status == "pending" || status == "rejected") {
    navigate("/campus-verification/welcome");
  }
  return (
    <SidebarCampus>
      <main className="px-4 pt-4 pb-6 flex-1 bg-[#F8FAFB] rounded-xl">
        <Outlet />
      </main>
    </SidebarCampus>
  );
}
