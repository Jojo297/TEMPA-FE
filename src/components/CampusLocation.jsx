import { DisplayMapsLocation } from "./DisplayMapsLocation";
import Info from "./Info";

export default function CampusLocation({ kampus }) {
  return (
    <>
      {/* Location Campus */}
      <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 space-y-6 w-full">
        <h2 className="text-2xl font-bold text-[#013B35] text-center">
          Lokasi {kampus.campus_name}
        </h2>

        <div className="flex flex-col gap-10 justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Info label="Provinsi" value={kampus.province} />

            <Info label="Kota / Kabupaten" value={kampus.city} />

            <Info label="Kecamatan" value={kampus.subdistrict} />

            <Info label="Kelurahan / Desa" value={kampus.ward} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#013B35] text-center mb-4">
              Titik Lokasi
            </h2>
            <div className="p-1 bg-gray-200 rounded-xl overflow-hidden">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${kampus.lat},${kampus.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block "
              >
                <DisplayMapsLocation lat={kampus.lat} lng={kampus.lng} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
