// File: src/page/loginAdmin.jsx

import React, { useState } from "react";
import logo2 from "@/assets/logo-text.png";

// TIDAK ADA LAGI IMPORT './LoginAdmin.css'

// Asumsi Anda sudah menginstal dan mengkonfigurasi Tailwind CSS di proyek Anda.

export default function LoginAdmin() {
  const [mode, setMode] = useState("signin");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isSignIn = mode === "signin";
  const progressWidth = isSignIn ? "w-full" : "w-1/2"; // w-full atau w-1/2 (50%)
  const formTitle = isSignIn
    ? "Enter your name and password"
    : "Create a New Account";
  const formSubtitle = isSignIn
    ? "Enter the name and password you used to sign up before."
    : "Please fill in your details to create an account.";
  const buttonText = isSignIn ? "Sign In" : "Sign Up";

  // Definisi warna khusus agar lebih mudah dibaca (sesuai gambar)
  const DARK_GREEN = "bg-[#10403D]";
  const LIGHT_BLUE = "text-[#5BC0EB]";
  const PROGRESS_BLUE = "bg-[#5BC0EB]";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignIn) {
      if (name === "admin" && password === "123") {
        alert(`Sign In berhasil! Selamat datang, ${name}.`);
      } else {
        alert("Nama atau kata sandi salah. Coba lagi.");
      }
    } else {
      if (password !== confirmPassword) {
        alert("Kata sandi dan Konfirmasi Kata Sandi tidak cocok!");
        return;
      }
      alert(`Akun ${name} berhasil didaftarkan! Silakan Sign In.`);
      setMode("signin");
    }
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setName("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    // Wrapper: Menengah di tengah layar
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      {/* Kontainer Utama: Efek shadow, border radius, dan lebar tetap */}
      <div
        className={`flex w-[900px] h-[600px] shadow-2xl rounded-xl overflow-hidden`}>
        {/* Bagian Kiri (Panel Hijau Gelap) */}
        <div
          className={`w-2/5 p-10 ${DARK_GREEN} text-white flex flex-col justify-start`}>
          <div className="mb-20">
            {" "}
            {/* logo */}
            <img
              src={logo2} // ganti dengan path logo TEMPA-mu
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
          <div className="mb-10">
            <div className="flex justify-between mb-1 font-bold text-gray-400">
              <span
                className={`cursor-pointer ${!isSignIn ? "text-gray-900" : ""}`}
                onClick={() => handleModeChange("signup")}>
                Sign Up
              </span>
              <span
                className={`cursor-pointer ${isSignIn ? "text-gray-900" : ""}`}
                onClick={() => handleModeChange("signin")}>
                Sign In
              </span>
            </div>
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`${PROGRESS_BLUE} h-full transition-all duration-300 ease-in-out ${progressWidth}`}></div>
            </div>
          </div>

          {/* Form Utama */}
          <form onSubmit={handleSubmit} className="flex flex-col">
            <h2 className="text-2xl font-semibold mb-1">{formTitle}</h2>
            <p className="text-sm text-gray-500 mb-8">{formSubtitle}</p>

            <div className="mb-6">
              {" "}
              {/* Input Name */}
              <label
                htmlFor="name"
                className="block text-xs text-gray-500 mb-1">
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
                className="block text-xs text-gray-500 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>

            {/* Input Confirm Password (Hanya untuk Sign Up) */}
            {!isSignIn && (
              <div className="mb-6">
                <label
                  htmlFor="confirm-password"
                  className="block text-xs text-gray-500 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  name="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi password"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              // Gunakan warna gelap yang sama untuk tombol
              className={`w-full p-3 ${DARK_GREEN} text-white font-semibold rounded-lg mt-4 hover:bg-opacity-90 transition duration-150`}>
              {buttonText}
            </button>

            <div className="text-center mt-6 text-sm text-gray-500">
              {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleModeChange(isSignIn ? "signup" : "signin");
                }}
                className={`font-bold hover:underline ${LIGHT_BLUE}`}>
                {isSignIn ? "Sign Up" : "Sign In"}
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
