import { BadgeCheckIcon, MapPin } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const CampusHeaderProfile = ({ kampus }) => {
  return (
    <header className="bg-[#F8FAFB]">
      <div className="max-w-6xl mx-auto rounded-xl shadow-md overflow-hidden">
        <div className="h-[400px]">
          {/* banner */}
          <img
            src={kampus.banner_url}
            alt={`Gedung ${kampus.campus_name}`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="bg-[#013B35] text-white px-12 py-6 flex justify-between items-center rounded-b-xl -mt-16 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="bg-white p-3 rounded-full shadow-lg border-4 border-gray-100 -mt-10">
              <img
                src={kampus.logo_url}
                alt={`${kampus.campus_name} Logo`}
                className="w-20 h-20 object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {kampus.campus_name}
                </h1>
                {/* Badge Verif */}
                {kampus.badge && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-3 py-1 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.4)] border border-blue-400/50 transition-transform cursor-default">
                        <div className="bg-white rounded-full p-0.5">
                          <BadgeCheckIcon size={14} className="text-blue-600" />
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-widest leading-none">
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
              <div className="flex items-center text-gray-300 mt-1">
                <MapPin size={16} className="mr-2" />
                <span className="text-sm">{`${kampus.province}, ${kampus.city}`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
