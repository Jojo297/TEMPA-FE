import SidebarAdmin from "@/components/SidebarAdmin";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"; // <-- WAJIB

export default function DashboardAdmin() {
  const token = localStorage.getItem("userJwt");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("userJwt");
          navigate("/");
        }
      } catch (error) {
        localStorage.removeItem("userJwt");
        navigate("/");
      }
    }
  }, [token, navigate]);
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
