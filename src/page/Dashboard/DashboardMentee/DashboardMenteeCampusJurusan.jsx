import { Briefcase, ListCheck } from "lucide-react";
import roboterror from "@/assets/robot-error.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const DashboardCampusJurusan = ({ kampus }) => {
  const majors = kampus.major.map((item) => item.standard_major);
  // console.log(majors);

  return (
    <>
      {/* Accordion Jurusan */}
      <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 space-y-6 w-full">
        <h2 className="text-xl sm:text-2xl font-bold text-[#013B35] text-center">
          Jurusan & Program Studi {kampus.name}
        </h2>
        <p className="text-gray-700 leading-relaxed text-center max-w-3xl mx-auto mb-8">
          Pilih jurusan di bawah untuk melihat program studi dan informasi
          detail.
        </p>
        {majors.length <= 0 ? (
          <div>
            <div className="flex flex-col items-center justify-center py-16 ">
              <img
                src={roboterror}
                alt="Belum Ada Aktivitas"
                className="w-40 mb-4"
              />
              <div className="text-center">
                <p className="text-gray-600">Jurusan Belum Ditambahkan</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue={
                majors.length > 0 ? majors[0].id.toString() : "item-1"
              }
            >
              {majors.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id.toString()}
                  className="border-none rounded-2xl overflow-hidden shadow-sm mb-4"
                >
                  <AccordionTrigger
                    className="w-full text-left bg-[#013B35] text-white font-semibold px-6 py-4 
                           flex justify-between items-center hover:bg-[#015f53] transition 
                           data-[state=open]:bg-[#015f53] data-[state=open]:shadow-inner
                           group" // Tambahkan group untuk style ikon rotate
                  >
                    {/* major name */}
                    <span>{item.major_name}</span>
                  </AccordionTrigger>

                  {/* description */}
                  <AccordionContent className="p-6 bg-gray-50 border-t border-gray-200">
                    <h3 className="text-xl font-bold text-[#013B35] mb-3">
                      Deskripsi
                    </h3>

                    <div
                      className="whitespace-pre-wrap [&_p]:mb-4 [&_a]:text-blue-600 [&_a]:underline"
                      dangerouslySetInnerHTML={{
                        __html: item.description,
                      }}
                    />

                    {/* Prospek Kerja */}
                    <h3 className="text-xl font-bold text-[#013B35] mb-3 flex items-center">
                      <Briefcase size={20} className="mr-2" />
                      Prospek Kerja
                    </h3>

                    {/* Asumsi: Data prospek kerja ada di item.standard_major.prospekKerja (perlu dimuat dari backend) */}
                    <ul className="space-y-2 list-none text-gray-700">
                      {/* Menggunakan list-none karena Anda menggunakan ikon kustom */}
                      {item.prospek_kerja &&
                        item.prospek_kerja.map((prospek, index) => (
                          <li key={index} className="flex items-start">
                            <ListCheck
                              size={16}
                              className="text-[#013B35] mr-2 flex-shrink-0 mt-1"
                            />
                            {prospek}
                          </li>
                        ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardCampusJurusan;
