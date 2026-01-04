import React, { useEffect } from "react";
import { Check, X, GraduationCap } from "lucide-react";
import SidebarWithNavbar from "@/components/SidebarMentee";
import { Outlet, useNavigate } from "react-router";
import useCheckVerifyStatus from "@/hooks/hooksMentee/useCheckVerifyStatus";
import { jwtDecode } from "jwt-decode";

const DashboardMentee = () => {
  const token = localStorage.getItem("userJwt");
  const navigate = useNavigate();
  const { verifyStatus, isLoading, error, checkVerifyStatus } =
    useCheckVerifyStatus();

  const verifyMentee = verifyStatus ?? {};
  // console.log(verifyMentee);

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

  // fetch status acc
  useEffect(() => {
    if (token) {
      checkVerifyStatus(token);
    }
  }, [token]);

  useEffect(() => {
    if (!isLoading && verifyMentee === false) {
      navigate("/mentee-verification/verify-account");
    }
  }, [token, verifyMentee, isLoading]);
  return (
    <SidebarWithNavbar>
      <main className="px-4 pt-4 pb-6 flex-1 bg-[#F8FAFB] rounded-xl">
        <Outlet />
      </main>
    </SidebarWithNavbar>
  );
};

export default DashboardMentee;
