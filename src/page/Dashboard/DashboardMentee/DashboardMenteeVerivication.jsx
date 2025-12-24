import SidebarMenteeVerivication from "@/components/SidebarMenteeVerivication";
import useCheckVerifyStatus from "@/hooks/hooksMentee/useCheckVerifyStatus";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function DashboardMenteeVerivication() {
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

  // useEffect(() => {
  //   if (verifyMentee) {
  //     navigate("/dashboard-mentee/beranda");
  //   } else {
  //     navigate("/mentee-verification/verify-account");
  //     // navigate("/mentee-verification/major-interest");
  //   }
  // }, [token, verifyMentee]);
  return (
    <SidebarMenteeVerivication>
      <main className="px-4 pt-4 pb-6 flex-1 bg-[#F8FAFB] rounded-xl">
        {/* 3. Render Konten yang Dipilih */}
        <Outlet />
      </main>
    </SidebarMenteeVerivication>
  );
}
