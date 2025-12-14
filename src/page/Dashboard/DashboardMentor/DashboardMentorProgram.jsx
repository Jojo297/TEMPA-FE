import React, { useState } from "react";

// Import konten
import ProgramDeskripsi from "./ProgramDeskripsi";
import ProgramPeserta from "./ProgramPeserta";
import ProgramMentor from "./ProgramMentor";
import ProgramMateri from "./ProgramMateri";

import InformatikaImg from "@/assets/informatika.png";

export default function DashboardMentorProgram() {
  const [tab, setTab] = useState("deskripsi");

  const tabs = [
    { id: "deskripsi", label: "Deskripsi" },
    { id: "peserta", label: "Peserta" },
    { id: "mentor", label: "Mentor" },
    { id: "materi", label: "Materi" },
  ];

  return (
    <div className="w-full min-h-screen bg-[#F8FBF9] p-4 md:p-8">
      {/* HEADER */}
      <div className="w-full rounded-xl overflow-hidden relative">
        <img
          src={InformatikaImg}
          alt="banner"
          className="w-full h-64 md:h-72 object-cover"
        />

        <button className="absolute top-4 right-4 bg-white px-4 py-2 rounded-lg shadow font-semibold flex items-center gap-2">
          Edit Info +
        </button>
      </div>

      {/* TITLE */}
      <h1 className="text-3xl md:text-4xl font-extrabold mt-4 text-[#003631]">
        Data Science Essential
      </h1>

      {/* TABS — SAMA PERSIS DENGAN DESAIN */}
      <div className="flex gap-4 mt-6 flex-wrap">
        {tabs.map((item) => {
          const isActive = tab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`
                px-6 py-2 rounded-full text-sm font-medium transition
                ${
                  isActive
                    ? "bg-[#003631] text-white"
                    : "border border-[#003631] text-[#003631] hover:bg-[#e5f1ef]"
                }
              `}>
              {item.label}
            </button>
          );
        })}
      </div>

      {/* CONTENT */}
      <div className="mt-8">
        {tab === "deskripsi" && <ProgramDeskripsi />}
        {tab === "peserta" && <ProgramPeserta />}
        {tab === "mentor" && <ProgramMentor />}
        {tab === "materi" && <ProgramMateri />}
      </div>
    </div>
  );
}
