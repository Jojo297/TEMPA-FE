import SidebarAdmin from "@/components/SidebarAdmin";
import { Outlet } from "react-router-dom"; // <-- WAJIB

export default function DashboardAdmin() {
  return (
    <>
      <SidebarAdmin>
        <main className="px-4 pt-4 pb-6 flex-1 bg-[#F8FAFB] rounded-xl">
          <Outlet />
        </main>
      </SidebarAdmin>
    </>
  );
}
