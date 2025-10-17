import React from "react";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
// import robotHappy from "@/assets/robot-happy.png";
import roboterror from "@/assets/robot-error.png";

const DashboardMentee = () => {
  return (
    <div className="flex min-h-screen bg-[#F8F9F8]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header Section */}
        <header className="p-6 bg-white shadow-sm flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-[#003C3C]">
              Selamat Datang,
            </h2>
            <h1 className="text-2xl font-bold text-[#003C3C]">Teman TEMPA</h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-300"></div>
        </header>

        {/* Welcome Card */}
        <section className="p-6">
          <div className="bg-[#003C3C] text-white rounded-xl p-6 flex justify-between items-center shadow-lg">
            <div>
              <h3 className="text-lg font-semibold mb-3">Program</h3>
              <div className="flex gap-4">
                <div className="bg-white text-[#003C3C] rounded-lg p-3 w-32 text-center font-semibold">
                  Ongoing
                </div>
                <div className="bg-green-500 rounded-lg p-3 w-32 text-center font-semibold">
                  Lulus
                </div>
                <div className="bg-red-500 rounded-lg p-3 w-32 text-center font-semibold">
                  Tidak Lulus
                </div>
              </div>
            </div>
            {/* <img src={robotHappy} alt="Robot" className="w-32 md:w-40" /> */}
          </div>
        </section>

        {/* Aktivitas Section */}
        <section className="px-6 flex-1">
          <h2 className="text-2xl font-bold text-[#003C3C] mb-6">Aktivitas</h2>
          <div className="flex flex-col items-center justify-center text-center text-gray-500">
            <img src={roboterror} alt="Robot" className="w-40 mb-4" />
            <p>Belum ada aktivitas yang diikuti</p>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default DashboardMentee;
