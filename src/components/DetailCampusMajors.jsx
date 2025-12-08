import { Pencil } from "lucide-react";

export default function DetailCampusMajors() {
  return (
    <>
      <section className="mt-6 mx-auto  mb-20 w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-[#013B35]">Jurusan</h2>
            <button className="px-6 py-2 bg-[#4BA8FF] text-white rounded-full flex items-center gap-2 hover:bg-blue-600 transition-colors">
              <Pencil size={18} /> Tambah Jurusan
            </button>
          </div>

          {/* Bubble list */}
          <div className="flex flex-wrap gap-3">
            {/* {jurusanList.length === 0 && ( */}
            <span className="text-gray-500">
              Belum ada jurusan yang ditambahkan.
            </span>
            {/* )} */}

            {/* {jurusanList.map((j) => ( */}
            <button
              //   key={j.id}
              //   onClick={() => setSelectedJurusan(j)}
              className={`px-4 py-2 rounded-full border ${
                // selectedJurusan?.id === j.id
                //   ?
                "bg-[#013B35] text-white"
                //   : "bg-gray-100 text-gray-700"
              }`}
            >
              {/* {j.name} */} kjdsk
            </button>
            {/* ))} */}
          </div>
        </div>
      </section>
    </>
  );
}
