export default function CampusDescription({ kampus }) {
  return (
    <>
      {/* Deskripsi & Visi Misi */}
      <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 space-y-6 w-full">
        <h2 className="text-2xl font-bold text-[#013B35] text-center">
          Tentang {kampus.campus_name}
        </h2>
        <p className="text-gray-700 leading-relaxed">{kampus.description}</p>

        <h3 className="text-2xl font-bold text-[#013B35] text-center">
          Visi & Misi
        </h3>
        <p className="text-gray-700">
          <strong>Visi:</strong> {kampus.vision_mission?.vision}
        </p>
        <div className="text-gray-700">
          <strong>Misi:</strong>{" "}
          {Array.isArray(kampus.vision_mission?.mission) ? (
            <ul className="list-disc list-inside mt-1">
              {kampus.vision_mission?.mission.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>{kampus.misi}</p>
          )}
        </div>
      </div>
    </>
  );
}
