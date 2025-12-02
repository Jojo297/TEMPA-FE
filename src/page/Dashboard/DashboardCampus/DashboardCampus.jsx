import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import SidebarCampus from "@/components/SideBarCampus";

export default function DashboardBerandaCampus() {
  const navigate = useNavigate();

  return (
    <SidebarCampus>
      <main className="px-4 pt-4 pb-6 flex-1 bg-[#F8FAFB] rounded-xl">
        <Outlet />
      </main>
    </SidebarCampus>
  );
}
