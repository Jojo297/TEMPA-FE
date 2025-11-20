import React from "react";
import { Check, X, GraduationCap } from "lucide-react";
import SidebarWithNavbar from "@/components/SidebarWithNavbar";
import robotHappy from "@/assets/robot-happy.png";
import roboterror from "@/assets/robot-error.png";
import { Outlet } from "react-router";

const DashboardMentee = () => {
  return (
    <SidebarWithNavbar>
      <main className="px-4 pt-4 pb-6 flex-1 bg-[#F8FAFB] rounded-xl">
        <Outlet />
      </main>
    </SidebarWithNavbar>
  );
};

export default DashboardMentee;
