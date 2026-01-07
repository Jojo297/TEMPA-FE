import React, { useCallback, useEffect, useRef, useState } from "react";
import logoText from "@/assets/logo-text.png";
import { Button } from "@/components/ui/button";
import googleIcon from "@/assets/google-logo.svg";
import { ArrowBigLeft } from "lucide-react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "sonner";

const data_client_id = import.meta.env.VITE_DATA_CLIENT_ID;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function LoginCampus() {
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
        `${BASE_URL}/login-campus`,
        { credential: googleToken } // Backend can get req.body.credential
      );
      const { token, uniqueId, fullName, email } = loginMentee.data.data;

      // console.log(loginMentee.data.data);

      // save JWT to localstorage
      localStorage.setItem("userJwt", token);

      // redirect
      navigate("/dashboard-campus/beranda");

      toast.success("Anda Berhasil Masuk!");
    } catch (error) {
      // console.log(error);
      const statusCode = error.response?.status;
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
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div
        className={`flex flex-col md:flex-row w-full max-w-[900px] h-auto md:h-[600px] shadow-2xl rounded-xl overflow-hidden bg-white`}
      >
        <div
          className={`hidden md:flex w-full md:w-2/5 p-10 ${DARK_GREEN} text-white flex-col justify-start`}
        >
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
            Selamat Datang Kampus!
          </h1>
        </div>

        <div className="w-full md:w-3/5 bg-white p-8 md:p-16 flex flex-col justify-center lg:justify-start">
          {/* Mobile Logo */}
          <div className="md:hidden flex justify-center mb-10">
            <div className="bg-[#10403D] p-4 rounded-2xl shadow-md flex items-center justify-center w-full transform transition-transform duration-300">
              <img
                src={logoText}
                alt="Logo TEMPA"
                className="w-40 h-24 object-contain"
              />
            </div>
          </div>
          <div className="mb-10">
            <div className="flex justify-between mb-1 font-bold text-gray-400">
              <span className="text-gray-900">Kampus Masuk</span>
            </div>
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`${PROGRESS_BLUE} h-full transition-all duration-300 ease-in-out`}
              ></div>
            </div>
          </div>

          {/* Form Utama */}
          <div className="flex flex-col gap-5 lg:mb-8">
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
              data-itp_support="true"
            ></div>
            {/* end popup login google */}

            {/* button login google*/}
            <div className="flex flex-col items-center">
              <div
                className="g_id_signin mb-3 lg:hidden"
                data-type="standard"
                data-shape="rectangular"
                data-theme="outline"
                data-text="signin_with"
                data-size="large"
                data-logo_alignment="left"
                data-width="300"
              ></div>
              <div
                className="g_id_signin mb-3 hidden lg:block"
                data-type="standard"
                data-shape="rectangular"
                data-theme="outline"
                data-text="signin_with"
                data-size="large"
                data-logo_alignment="left"
                data-width="600"
              ></div>
              {/* button back */}
              <Button
                variant="default"
                className="w-full py-5 bg-[#10403D] text-primary-foreground hover:bg-[#10403dcc]"
                onClick={handleRedirect}
              >
                Kembali
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
