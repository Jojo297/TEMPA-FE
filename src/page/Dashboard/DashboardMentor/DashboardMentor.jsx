import SidebarMentor from "@/components/SidebarMentor";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

export default function DashboardMentor() {
  const token = localStorage.getItem("userJwt");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login-mentor");
    } else {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("userJwt");
          navigate("/login-mentor");
        }
      } catch (error) {
        localStorage.removeItem("userJwt");
        navigate("/login-mentor");
      }
    }
  }, [token, navigate]);
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
