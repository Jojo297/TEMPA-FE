import React, { useState } from "react";
import { MapPin, Search } from "lucide-react";
import { kampusList } from "@/lib/kampusList";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function DashboardCampus() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter kampus sesuai input search
  const filteredKampus = kampusList.filter((kampus) =>
    kampus.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* breadcum */}
      <Breadcrumb className="mb-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="hover:text-primary">
              <Link to="/dashboard-mentee">Beranda</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="text-primary">
            <BreadcrumbPage className="text-primary">Kampus</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* Banner Section */}
      <div className=" mb-8 text-center">
        <div className="bg-primary text-white rounded-xl p-6 shadow">
          <h1 className="text-2xl font-bold mb-2">Kampus</h1>
          <p className="text-sm max-w-2xl mx-auto">
            Jelajahi berbagai kampus terbaik dan temukan informasi seputar
            program, jurusan, serta prestasi mereka di sini.
          </p>
        </div>
      </div>

      {/* Rekomendasi Section */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Rekomendasi</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {kampusList.map((kampus) => (
            <Link
              to={`/dashboard-mentee/kampus/${kampus.id}`}
              key={kampus.id}
              className="bg-white rounded-xl shadow hover:shadow-md transition p-3 block hover:-translate-y-1 duration-200"
            >
              <img
                src={kampus.image}
                alt={kampus.name}
                className="rounded-lg w-full h-40 object-cover mb-3"
              />
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={kampus.logo}
                  alt="Logo"
                  className="w-8 h-8 object-contain"
                />
                <p className="font-semibold text-sm">{kampus.name}</p>
              </div>
              <div className="flex items-center gap-1 text-gray-500 text-xs">
                <MapPin size={14} />
                <span>{kampus.location}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Seluruh Kampus Section */}
      <section>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
          <h2 className="text-xl font-bold">Seluruh Kampus</h2>
          <div className="relative w-full md:w-60">
            <Search
              size={16}
              className="absolute top-2.5 left-3 text-gray-400"
            />
            <input
              type="text"
              placeholder="Cari kampus..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-2 w-full border rounded-lg text-sm focus:outline-none focus:ring focus:ring-[#004D40]/40"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredKampus.map((kampus) => (
            <Link
              to={`/dashboard-mentee/kampus/${kampus.id}`}
              key={kampus.id}
              className="bg-white rounded-xl shadow hover:shadow-md transition p-3 block hover:-translate-y-1 duration-200"
            >
              <img
                src={kampus.image}
                alt={kampus.name}
                className="rounded-lg w-full h-40 object-cover mb-3"
              />
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={kampus.logo}
                  alt="Logo"
                  className="w-8 h-8 object-contain"
                />
                <p className="font-semibold text-sm">{kampus.name}</p>
              </div>
              <div className="flex items-center gap-1 text-gray-500 text-xs">
                <MapPin size={14} />
                <span>{kampus.location}</span>
              </div>
            </Link>
          ))}
          {filteredKampus.length === 0 && (
            <p className="text-center text-gray-500 col-span-full">
              Kampus tidak ditemukan
            </p>
          )}
        </div>
      </section>
    </>
  );
}
