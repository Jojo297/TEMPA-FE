import SidebarMenteeVerivication from "@/components/SidebarMenteeVerivication";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function DashboardMenteeVerivication() {
  return (
    <SidebarMenteeVerivication>
      <main className="px-4 pt-4 pb-6 flex-1 bg-[#F8FAFB] rounded-xl">
        {/* 3. Render Konten yang Dipilih */}
        <Outlet />
      </main>
    </SidebarMenteeVerivication>
  );
}
