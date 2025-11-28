import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import SidebarCampusVerivication from "@/components/SidebarCampusVerivication";

export default function DashboardCampusVerivication() {
  return (
    <SidebarCampusVerivication>
      <main className="px-4 pt-4 pb-6 flex-1 bg-[#F8FAFB] rounded-xl">
        <Outlet />
      </main>
    </SidebarCampusVerivication>
  );
}
