import React, { useState } from "react";
import logo2 from "@/assets/logo-text.png";
import { useNavigate } from "react-router";

export default function LoginAdmin() {
  const navigate = useNavigate();

  const DARK_GREEN = "bg-[#10403D]";
  const LIGHT_BLUE = "text-[#5BC0EB]";
  const PROGRESS_BLUE = "bg-[#5BC0EB]";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div
        className={`flex w-[900px] h-[600px] shadow-2xl rounded-xl overflow-hidden`}
      >
        <div
          className={`w-2/5 p-10 ${DARK_GREEN} text-white flex flex-col justify-start`}
        >
          <div className="mb-20">
            <img
              src={logo2}
              alt="Logo TEMPA"
              className="w-30 h-30 object-contain"
            />
          </div>
          <h1 className="text-5xl font-extrabold leading-tight">
            Welcome <br />
            Admin!
          </h1>
        </div>

        {/* Bagian Kanan (Form Login/Signup) */}
        <div className="w-3/5 bg-white p-16 flex flex-col">
          {/* Header Form (Tab & Progress Bar) */}

          {/* Form Utama */}
          <form className="flex flex-col">
            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-2">Login</h2>
              <p className="text-sm text-gray-500 mb-2">
                Enter the name and password you used to sign up before
              </p>
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`${PROGRESS_BLUE} h-full transition-all duration-300 ease-in-out `}
                ></div>
              </div>
            </div>
            <div className="mb-6">
              {" "}
              {/* Input Name */}
              <label
                htmlFor="name"
                className="block text-xs text-gray-500 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>

            <div className="mb-6">
              {" "}
              {/* Input Password */}
              <label
                htmlFor="password"
                className="block text-xs text-gray-500 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={""}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full p-3 ${DARK_GREEN} text-white font-semibold rounded-lg mt-4 hover:bg-opacity-90 transition duration-300`}
            >
              Masuk
            </button>
            <button
              type="submit"
              onClick={() => navigate("/")}
              className={`w-full p-3 bg-white border border-green-900 text-[#10403D] font-semibold rounded-lg mt-4 hover:bg-opacity-100 transition duration-300`}
            >
              Kembali
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
