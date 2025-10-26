import { kampusList } from "@/lib/kampusList";
import { useParams } from "react-router";

export default function CampusDescription() {
  const { id } = useParams();
  const kampus = kampusList.find((k) => k.id === parseInt(id));
  return (
    <>
      {/* Deskripsi & Visi Misi */}
      <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 space-y-6 w-full">
        <h2 className="text-2xl font-bold text-[#013B35] text-center">
          Tentang {kampus.name}
        </h2>
        <p className="text-gray-700 leading-relaxed">{kampus.desc}</p>

        <h3 className="text-2xl font-bold text-[#013B35] text-center">
          Visi & Misi
        </h3>
        <p className="text-gray-700">
          <strong>Visi:</strong> {kampus.visi}
        </p>
        <div className="text-gray-700">
          <strong>Misi:</strong>{" "}
          {Array.isArray(kampus.misi) ? (
            <ul className="list-disc list-inside mt-1">
              {kampus.misi.map((item, index) => (
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
