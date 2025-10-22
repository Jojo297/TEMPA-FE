import React, { useCallback, useEffect, useRef, useState } from "react";
import logoText from "@/assets/logo-text.png";
import { Button } from "@/components/ui/button";
import googleIcon from "@/assets/google-logo.svg";
import { ArrowBigLeft } from "lucide-react";
import { useNavigate } from "react-router";
import axios from "axios";

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
      const { token, uniqueId, fullName, email } = loginMentee.data.data;

      console.log(loginMentee.data.data);

      // save JWT to localstorage
      localStorage.setItem("userJwt", token);

      // redirect
      navigate("/dashboard-mentee");
    } catch (error) {
      console.log(error);
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
