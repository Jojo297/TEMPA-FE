import robot from "@/assets/robot-info.png";

export default function CampusVerificationPending() {
  return (
    <>
      <main className="flex-grow flex flex-col items-center justify-center ">
        <div className="bg-[#013D3A] rounded-lg p-8 text-white flex flex-col md:flex-row items-center gap-6 max-w-3xl w-full justify-center shadow-lg animate-fade-in">
          <img
            src={robot}
            alt="Robot Senang"
            className="w-32 md:w-40 object-contain"
          />
          <div className="flex flex-col items-center ">
            <p className="text-lg leading-relaxed font-semibold text-center ">
              Verifikasi data mitra sedang berlangsung
            </p>

            <p className="text-lg leading-relaxed font-semibold text-center mt-1 md:text-left">
              mohon tunggu beberapa saat
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
