import { BadgeCheckIcon, MapPin } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const CampusHeaderProfile = ({ kampus }) => {
  return (
    <header className="bg-[#F8FAFB]">
      <div className="max-w-7xl mx-auto rounded-xl shadow-md overflow-hidden">
        <div className="h-48 sm:h-64 md:h-80 lg:h-[400px] relative">
          {/* banner */}
          <img
            src={kampus.banner_url}
            alt={`Gedung ${kampus.campus_name}`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="bg-[#013B35] text-white px-4 sm:px-8 md:px-12 py-4 sm:py-6 flex flex-col sm:flex-row justify-between items-center rounded-b-xl -mt-12 sm:-mt-16 relative z-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6 w-full">
            <div className="bg-white p-2 sm:p-3 rounded-full shadow-lg border-4 border-gray-100 -mt-16 sm:-mt-10 flex-shrink-0">
              <img
                src={kampus.logo_url}
                alt={`${kampus.campus_name} Logo`}
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
              />
            </div>
            <div className="text-center sm:text-left w-full">
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-3">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  {kampus.campus_name}
                </h1>
                {/* Badge Verif */}
                {kampus.badge && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.4)] border border-blue-400/50 transition-transform cursor-default">
                        <div className="bg-white rounded-full p-0.5">
                          <BadgeCheckIcon className="text-blue-600 w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </div>
                        <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-widest leading-none">
                          Verified
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="bg-white p-4 shadow-xl border border-gray-100 rounded-xl max-w-xs z-[100]"
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                          <div className="bg-blue-50 p-1.5 rounded-lg">
                            <BadgeCheckIcon
                              size={18}
                              className="text-blue-600"
                            />
                          </div>
                          <p className="font-bold text-gray-900 text-sm">
                            Kampus Terverifikasi
                          </p>
                        </div>

                        <div className="space-y-1.5">
                          <p className="text-xs text-gray-600 leading-relaxed">
                            Profil kampus ini telah melewati proses{" "}
                            <strong>verifikasi resmi</strong> oleh tim kami
                            untuk memastikan:
                          </p>
                          <ul className="text-[11px] text-gray-500 space-y-1 list-disc pl-4 font-medium">
                            <li>Keaslian identitas institusi</li>
                            <li>Kualitas kurikulum program</li>
                            <li>Kredibilitas mentor pengajar</li>
                          </ul>
                        </div>

                        <div className="mt-1 pt-2 border-t border-gray-50 flex items-center justify-between">
                          <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded">
                            Trust & Verified
                          </span>
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
              <div className="flex items-center justify-center sm:justify-start text-gray-200 mt-4 sm:mt-1 text-xs sm:text-sm font-medium">
                <MapPin size={14} className="mr-1.5 sm:mr-2" />
                <span>{`${kampus.province}, ${kampus.city}`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
