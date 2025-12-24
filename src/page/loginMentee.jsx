import React, { useCallback, useEffect, useRef, useState } from "react";
import logoText from "@/assets/logo-text.png";
import { Button } from "@/components/ui/button";
import googleIcon from "@/assets/google-logo.svg";
import { ArrowBigLeft } from "lucide-react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";

const data_client_id = import.meta.env.VITE_DATA_CLIENT_ID;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function LoginMentee() {
  // Definisi warna khusus agar lebih mudah dibaca (sesuai gambar)
  const DARK_GREEN = "bg-[#10403D]";
  const LIGHT_BLUE = "text-[#5BC0EB]";
  const PROGRESS_BLUE = "bg-[#5BC0EB]";

  const navigate = useNavigate();
  const handleRedirect = () => navigate("/");

  // handle oauth google and send to backend
  window.handleCredentialResponse = async (response) => {
    // console.log("Encoded JWT ID token: " + response.credential);
    const googleToken = response.credential;
    try {
      const loginMentee = await axios.post(
        `${BASE_URL}/login-mentee`,
        { credential: googleToken } // Backend can get req.body.credential
      );
      const { token, uniqueId, fullName, email, verify_status } =
        loginMentee.data.data;
      // save JWT to localstorage
      localStorage.setItem("userJwt", token);
      // console.log(verify_status);

      if (!verify_status) {
        navigate("/mentee-verification/verify-account");
      } else {
        // redirect
        navigate("/dashboard-mentee");
      }

      toast.success("Anda Berhasil Masuk!");
    } catch (error) {
      console.log(error);
      const statusCode = error.response.status;
      // Unauthorized
      if (statusCode === 401) {
        toast.error("Username atau Password salah!");
        // url not found
      } else if (statusCode === 404) {
        const axiosMessage = error.message;
        toast.error(`${axiosMessage}`);
        // internal server error
      } else if (statusCode >= 500) {
        toast.error("Server sedang bermasalah. Coba lagi nanti.");
      } else {
        // get all error stautus HTTP
        const serverMsg =
          error.response.data.message ||
          "Terjadi kesalahan yang tidak terduga.";
        toast.error(serverMsg);
      }
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="">
      {/* popup login google */}
      <div
        id="g_id_onload"
        data-client_id={data_client_id}
        data-context="signin"
        data-ux_mode="popup"
        data-callback="handleCredentialResponse"
        data-nonce=""
        data-itp_support="true"
      ></div>
      {/* end popup login google */}

      {/* button login google*/}
      <div className="flex flex-col items-center">
        <div
          className="g_id_signin mb-3"
          data-type="standard"
          data-shape="rectangular"
          data-theme="outline"
          data-text="signin_with"
          data-size="large"
          data-logo_alignment="left"
          data-width="300"
        ></div>
      </div>
    </div>
  );
}
