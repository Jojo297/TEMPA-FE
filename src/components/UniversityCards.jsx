// UniversityCards.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

export default function UniversityCards({ campuses }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {campuses.map((item, index) => (
                <Link
                    key={index}
                    to={`/kampus/${item.id}`}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition duration-300 overflow-hidden border border-gray-100 block group"
                >
                    {/* Header Logo + Warna Kampus */}
                    <div className={`h-24 ${item.color} flex items-center justify-center`}>
                        <img 
                            src={item.imageUrl} 
                            alt={`Logo ${item.title}`} 
                            className="w-16 h-16 object-contain bg-white rounded-full p-2"
                            onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src = `https://placehold.co/64x64/cccccc/000000?text=LOGO`;
                            }}
                        />
                    </div>
                    
                    {/* Detail Kampus */}
                    <div className="p-4">
                        <p className="text-xs font-semibold uppercase text-gray-500 mb-1">
                            {item.subtitle}
                        </p>
                        <h3 className="text-lg font-bold mb-3 group-hover:text-[#5BC0EB] transition duration-300">
                            {item.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 mt-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{item.location}</span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
