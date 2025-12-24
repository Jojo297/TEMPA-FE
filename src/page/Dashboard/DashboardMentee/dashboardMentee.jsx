import React, { useEffect } from "react";
import { Check, X, GraduationCap } from "lucide-react";
import SidebarWithNavbar from "@/components/SidebarMentee";
import robotHappy from "@/assets/robot-happy.png";
import roboterror from "@/assets/robot-error.png";
import { Outlet, useNavigate } from "react-router";
import useCheckVerifyStatus from "@/hooks/hooksMentee/useCheckVerifyStatus";

const DashboardMentee = () => {
  const token = localStorage.getItem("userJwt");
  const navigate = useNavigate();
  const { verifyStatus, isLoading, error, checkVerifyStatus } =
    useCheckVerifyStatus();

  const verifyMentee = verifyStatus ?? {};
  // console.log(verifyMentee);

  // fetch status acc
  useEffect(() => {
    if (token) {
      checkVerifyStatus(token);
    }
  }, [token]);

  useEffect(() => {
    if (verifyMentee) {
      navigate("/dashboard-mentee/beranda");
    } else {
      navigate("/mentee-verification/verify-account");
    }
  }, [token, verifyMentee]);
  return (
    <SidebarWithNavbar>
      <main className="px-4 pt-4 pb-6 flex-1 bg-[#F8FAFB] rounded-xl">
        <Outlet />
      </main>
    </SidebarWithNavbar>
  );
};

export default DashboardMentee;
