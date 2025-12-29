export default function CampusDescription({ kampus }) {
  return (
    <>
      {/* Deskripsi & Visi Misi */}
      <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 md:p-10 space-y-6 w-full">
        <h2 className="text-xl sm:text-2xl font-bold text-[#013B35] text-center">
          Tentang {kampus.campus_name}
        </h2>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
          {kampus.description}
        </p>

        <h3 className="text-xl sm:text-2xl font-bold text-[#013B35] text-center">
          Visi & Misi
        </h3>
        <div className="text-sm sm:text-base text-gray-700 space-y-4">
          <div>
            <strong className="block mb-1 text-[#013B35]">Visi:</strong>
            <p className="leading-relaxed">{kampus.vision_mission?.vision}</p>
          </div>
          <div>
            <strong className="block mb-1 text-[#013B35]">Misi:</strong>
            {Array.isArray(kampus.vision_mission?.mission) ? (
              <ul className="list-disc list-inside space-y-1 leading-relaxed">
                {kampus.vision_mission?.mission.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="leading-relaxed">{kampus.misi}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
