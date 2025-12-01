import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import SidebarCampus from "@/components/SideBarCampus";
import { jwtDecode } from "jwt-decode";
import CampusFirst from "./CampusFirst";

export default function DashboardBerandaCampus() {
  const navigate = useNavigate();
  const token = localStorage.getItem("userJwt");
  const decode = jwtDecode(token);
  console.log(decode);

  // if verif redirect component CampusFirst
  useEffect(() => {
    if (
      decode.verif.verification_status == "null" ||
      decode.verif.verification_status == "pending" ||
      decode.verif.verification_status == "rejected"
    ) {
      navigate("/campus-verification/welcome");
    }
  }, [token]);

  return (
    <SidebarCampus>
      <main className="px-4 pt-4 pb-6 flex-1 bg-[#F8FAFB] rounded-xl">
        <Outlet />
      </main>
    </SidebarCampus>
  );
}
