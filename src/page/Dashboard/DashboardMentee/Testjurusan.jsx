import SidebarWithNavbar from "@/components/SidebarWithNavbar";
import robot1 from "@/assets/robot-normal.png"; // ganti dengan path gambar robot kamu

export default function TestJurusan() {
  const history = [
    { id: 1, date: "Kamis, 16 Oktober 2025" },
    { id: 2, date: "Kamis, 16 Oktober 2025" },
    { id: 3, date: "Kamis, 16 Oktober 2025" },
  ];

  return (
    <>
      {/* Tes Jurusan */}
      <section className="bg-[#013B35] text-center text-white rounded-2xl py-10 px-6 shadow-md">
        <h1 className="text-2xl font-semibold mb-2">Tes Jurusan</h1>
        <p className="text-gray-200 max-w-2xl mx-auto mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <button className="bg-[#A5E3E7] text-[#013B35] font-semibold px-6 py-2 rounded-lg hover:bg-[#90d6db] transition">
          Mulai Tes
        </button>
      </section>

      {/* Riwayat Tes*/}
      <section>
        <h2 className="text-xl font-semibold mb-6">Riwayat Tes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((item) => (
            <div
              key={item.id}
              className="bg-white border rounded-2xl shadow-sm p-4 flex flex-col"
            >
              <div className="bg-[#013B35] rounded-xl h-36 flex items-center justify-center mb-4">
                <img src={robot1} alt="Robot" className="h-20 object-contain" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-4">
                  <span className="font-medium">📅 Tanggal:</span> {item.date}
                </p>
              </div>
              <button className="bg-[#A5E3E7] text-[#013B35] font-medium py-2 rounded-lg hover:bg-[#90d6db] transition">
                Hasil Tes
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
