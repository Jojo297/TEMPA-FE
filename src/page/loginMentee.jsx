import React, { useCallback, useEffect, useRef, useState } from "react";
import logoText from "@/assets/logo-text.png";
import { Button } from "@/components/ui/button";
import googleIcon from "@/assets/google-logo.svg";
import { ArrowBigLeft } from "lucide-react";
import { useNavigate } from "react-router";
import axios from "axios";

const data_client_id = import.meta.env.VITE_DATA_CLIENT_ID;

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
        "http://localhost:8080/api/v1/login-mentee",
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
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div
        className={`flex w-[900px] h-[600px] shadow-2xl rounded-xl overflow-hidden`}>
        <div
          className={`w-2/5 p-10 ${DARK_GREEN} text-white flex flex-col justify-start`}>
          <div className="mb-20">
            {" "}
            {/* logo */}
            <img
              src={logoText}
              alt="Logo TEMPA"
              className="w-30 h-30 object-contain"
            />
          </div>
          <h1 className="text-5xl font-extrabold leading-tight">
            Welcome <br />
            Mentee!
          </h1>
        </div>

        <div className="w-3/5 bg-white p-16 flex flex-col">
          <div className="mb-10">
            <div className="flex justify-between mb-1 font-bold text-gray-400">
              <span className="text-gray-900">Login</span>
            </div>
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`${PROGRESS_BLUE} h-full transition-all duration-300 ease-in-out`}></div>
            </div>
          </div>

          {/* Form Utama */}
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="text-2xl font-semibold mb-1">
                Masuk ke Akun Anda
              </h2>
              <p className="text-sm text-gray-500 mb-8">
                Lanjutkan dengan Google untuk pengalaman yang lebih cepat dan
                aman.
              </p>
            </div>

            {/* popup login google */}
            <div
              id="g_id_onload"
              data-client_id={data_client_id}
              data-context="signin"
              data-ux_mode="popup"
              data-callback="handleCredentialResponse"
              data-nonce=""
              data-itp_support="true"></div>
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
                data-width="500"></div>
              {/* button back */}
              <Button
                variant="default"
                className="w-full py-5 bg-[#10403D] text-primary-foreground hover:bg-[#10403dcc]"
                onClick={handleRedirect}>
                Kembali
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
