import React from "react";
import { MapPin } from "lucide-react";

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
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {kampus.campus_name}
              </h1>
              <div className="flex items-center text-gray-300 mt-1">
                <MapPin size={16} className="mr-2" />
                <span className="text-sm">{kampus.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
