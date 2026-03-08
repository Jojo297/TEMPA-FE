import { X, Pencil, Calendar } from "lucide-react";

/* ========================== COMPONENT INFO ========================== */
function Info({ label, value }) {
  return (
    <div>
      <p className="font-medium text-gray-600">{label}</p>
      <p className="text-gray-900">{value || "-"}</p>
    </div>
  );
}

export default function DescriptionProgramCampus({ program }) {
  const benefits =
    typeof program.benefit === "string"
      ? program.benefit.split(",").map((item) => item.trim())
      : program.benefit || [];
  const termsAndConditions =
    typeof program.terms_and_conditions === "string"
      ? program.terms_and_conditions.split(",").map((item) => item.trim())
      : program.terms_and_conditions || [];

  const getTypeSesi = (sesi) => {
    switch (sesi) {
      case "online":
        return "Online";
      case "onsite":
        return "Onsite";
      default:
        return "-";
    }
  };

  const formatDateRange = (startDate, endDate) => {
    // console.log(startDate, endDate);
    if (!startDate || !endDate) return "-";
    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const fullOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    };

    const startYear = start.getUTCFullYear();
    const endYear = end.getUTCFullYear();
    const startMonth = start.getUTCMonth();
    const endMonth = end.getUTCMonth();

    let formattedDate = "";

    // Logika format teks tanggal
    if (startYear !== endYear) {
      formattedDate = `${start.toLocaleDateString("id-ID", fullOptions)} - ${end.toLocaleDateString("id-ID", fullOptions)}`;
    } else if (startMonth !== endMonth) {
      const startFormatted = start.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        timeZone: "UTC",
      });
      formattedDate = `${startFormatted} - ${end.toLocaleDateString("id-ID", fullOptions)}`;
    } else {
      const startDay = start.getUTCDate();
      formattedDate = `${startDay} - ${end.toLocaleDateString("id-ID", fullOptions)}`;
    }

    // Gabungkan dengan durasi
    return `${formattedDate} (${diffDays} hari)`;
  };

  const getMapsUrl = (lat, lng) => {
    // Format universal untuk Google Maps
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

    // Opsi lain: Untuk menampilkan pin tunggal (Place mode)
    // return `https://www.google.com/maps/place/${lat},${lng}`;
  };

  const formatTime = (isoTimeString) => {
    // Cek hanya jika string benar-benar null atau kosong
    if (!isoTimeString) {
      return "-";
    }

    // Buat objek Date dari string ISO (mis. "1970-01-01T07:00:00.000Z")
    const date = new Date(isoTimeString);

    // Opsi pemformatan
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // Format 24 jam (misalnya 07:00)
      timeZone: "UTC", // Penting: Mengambil waktu langsung dari string ISO tanpa konversi zona waktu lokal
    };

    // Ekstrak dan kembalikan hanya waktu yang diformat
    return date.toLocaleTimeString("id-ID", options);
  };
  return (
    <>
      {/* ====================== CARD PROGRAM ====================== */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="bg-white shadow-md rounded-xl p-6 border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#013B35]">
              Detail Program
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Info
              label="Jenis Kegiatan"
              value={getTypeSesi(program.type_sesi)}
            />
            <Info label="Jurusan" value={program.major_name} />

            <Info
              label="Buka Pendaftaran"
              value={formatDateRange(
                program.start_regis_date,
                program.end_regis_date,
              )}
            />
            <Info
              label="Tanggal Pelaksanaan"
              value={formatDateRange(
                program.start_program_date,
                program.end_program_date,
              )}
            />
            {program.type_sesi !== "online" && (
              <Info
                label="Lokasi"
                value={
                  <a
                    href={getMapsUrl(program.lat, program.lng)}
                    target="_blank" // Penting: Membuka di tab baru
                    rel="noopener noreferrer" // Praktik keamanan yang baik
                    style={{
                      cursor: "pointer",
                      color: "blue",
                      textDecoration: "underline",
                    }}
                  >
                    Lihat Lokasi di Google Maps
                  </a>
                }
              />
            )}
            <Info label="Waktu Mulai" value={formatTime(program.sesi_start)} />
            <Info label="Waktu Selesai" value={formatTime(program.sesi_end)} />
            <Info label="Kuota" value={program.capacity} />

            <div className="col-span-2">
              <p className="font-medium text-gray-600 mb-1">Detail Kegiatan</p>
              <p className="text-gray-800 whitespace-pre-line border p-3 rounded-xl">
                {program.description || "-"}
              </p>
            </div>

            <div className="col-span-2">
              <p className="font-medium text-gray-600 mb-1">Benefit</p>
              <p className="text-gray-800 whitespace-pre-line border p-3 rounded-xl">
                <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm sm:text-base">
                  {benefits.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </p>
            </div>

            <div className="col-span-2">
              <p className="font-medium text-gray-600 mb-1">
                Syarat dan Ketentuan
              </p>
              <p className="text-gray-800 whitespace-pre-line border p-3 rounded-xl">
                <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm sm:text-base">
                  {termsAndConditions.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
