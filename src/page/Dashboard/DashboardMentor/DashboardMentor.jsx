import SidebarMentor from "@/components/SidebarMentor";
import { Outlet } from "react-router";

export default function DashboardMentor() {
  return (
    <>
      <SidebarMentor>
        <main className="px-4 pt-4 pb-6 flex-1 bg-[#F8FAFB] rounded-xl">
          <Outlet />
        </main>
      </SidebarMentor>
    </>
  );
}
