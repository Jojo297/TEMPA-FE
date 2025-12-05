import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown, Pencil, FileText } from "lucide-react";

/* ========================== COMPONENT INFO ========================== */
function Info({ label, value }) {
  return (
    <div>
      <p className="font-medium text-gray-600">{label}</p>
      <p className="text-gray-900">{value || "-"}</p>
    </div>
  );
}

export default function MateriProgramCampus({ materiList }) {
  // Fungsi utilitas untuk mendapatkan nama file dari URL
  const getFileNameFromUrl = (url) => {
    if (!url) return "File tidak tersedia";

    // 1. Dapatkan bagian path URL (setelah domain)
    // Contoh: /public/program_materi/Materi-1.pdf
    const pathname = new URL(url).pathname;

    // 2. Pisahkan path berdasarkan karakter slash (/)
    const parts = pathname.split("/");

    // 3. Ambil elemen terakhir dari array (nama file)
    return parts[parts.length - 1];
  };
  return (
    <div className="max-w-6xl mx-auto mb-10">
      <div className="bg-white shadow-md rounded-xl p-6 border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#013B35]">Materi</h2>
          <button
            onClick={() => setEditType("program")}
            className="flex items-center gap-2 bg-[#013B35] text-white px-4 py-2 rounded-full text-sm"
          >
            <Pencil size={14} /> Edit Materi
          </button>
        </div>

        <div className="w-full gap-4">
          <Accordion type="single" collapsible className="w-full">
            {/* Accordion Materi */}
            {materiList.length <= 0 ? (
              <NotFounPages message={"Materi Belum Ditambahkan"} />
            ) : (
              materiList.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={`materi-${item.id}`}
                  className="border-b-0 p-4 rounded-lg bg-white shadow-md mb-3"
                >
                  <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
                    <div className="flex items-center">
                      <ChevronDown className="w-5 h-5 mr-3 transition-transform duration-300 data-[state=open]:rotate-180" />
                      {item.title}
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="pt-2 pl-8 space-y-2">
                    {/* deskripsi */}
                    <div className="py-3 text-gray-700">{item.description}</div>
                    <hr />
                    {/* end deskripsi */}

                    {/* Tautan File/Resource (Nested Mapping) */}
                    {item.materi_resource && item.materi_resource.length > 0 ? (
                      item.materi_resource.map((resource, index) => {
                        // --- 1. Definisikan Ikon dan Warna secara Kondisional ---
                        let IconComponent = FileText;
                        let iconClassName = "text-green-600"; // Default untuk 'file' atau lainnya

                        if (resource.type === "kuis") {
                          IconComponent = ClipboardList;
                          iconClassName = "text-orange-500"; // Warna untuk Kuis
                        } else if (resource.type === "video") {
                          IconComponent = Video;
                          iconClassName = "text-red-500"; // Contoh warna untuk Video
                        }
                        // Anda bisa menambahkan logika lain (e.g., 'file' untuk PDF/DOCX)

                        // --- 2. Definisikan Teks Tautan ---
                        let linkText;
                        if (resource.type === "kuis") {
                          // Untuk Kuis/Link Google Form, tampilkan Judul Materi, bukan nama file yang diekstrak
                          linkText = item.title || "Mulai Kuis";
                        } else {
                          // Untuk File, gunakan nama file yang diekstrak
                          linkText = getFileNameFromUrl(resource.resource_url);
                        }

                        return (
                          <div
                            key={index}
                            className="flex items-center text-gray-600 mt-3"
                          >
                            {/* 3. Render Komponen Ikon yang dipilih */}
                            <IconComponent
                              className={`w-5 h-5 mr-3 ${iconClassName}`}
                            />

                            {/* 4. Gunakan resource.file_url sebagai href */}
                            <a
                              target="_blank"
                              href={resource.resource_url}
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline break-all"
                            >
                              {linkText}
                            </a>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-gray-500 mt-3 italic">
                        Tidak ada sumber daya yang tersedia.
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))
            )}
            {/* end Accordion Materi */}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
