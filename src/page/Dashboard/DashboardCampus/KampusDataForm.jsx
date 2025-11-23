import { ManageMapsCampusLocation } from "@/components/ManageMapsCampusLocation";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export default function KampusDataForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    namaKampus: "",
    emailKampus: "",
    alamatKampus: "",
    deskripsiKampus: "",
    visiMisi: "",
    website: "",
  });
  const [openProvince, setOpenProvince] = React.useState(false);
  const [openCity, setOpenCity] = React.useState(false);
  const [openSubdistrict, setOpenSubdistrict] = React.useState(false);
  const [openWard, setOpenWard] = React.useState(false);
  const [valueProvince, setvalueProvince] = React.useState("");
  const [valueCity, setvalueCity] = React.useState("");
  const [valueSubdistrict, setValueSubdistrict] = React.useState("");
  const [valueWard, setValueWard] = React.useState("");
  const [selectedLocation, setSelectedLocation] = useState({
    lat: null,
    lng: null,
  });
  const [selectedAddress, setSelectedAddress] = useState("");

  const handleLocationChange = async (location) => {
    setSelectedLocation(location);

    // console.log(location);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data kampus dikirim:", formData);
    navigate("/dashboard-campus/kampus-verifikasi");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-[#013D3A] w-full mx-auto text-center text-white  py-6 rounded-md">
        <h2 className="text-2xl font-semibold">Bergabung Sebagai Mitra</h2>
        <p className="text-gray-300 text-sm mt-1">
          Kami membutuhkan beberapa informasi. Silakan isi data kampus di bawah
          ini.
        </p>
      </section>

      {/* Form */}
      <main className="flex justify-center w-full mt-10">
        <form
          onSubmit={handleSubmit}
          className="bg-[#013D3A] text-white w-full rounded-lg p-8 shadow-lg"
        >
          <div className="grid grid-cols-2 gap-5">
            {/* campus name */}
            <div>
              <label className="block text-sm mb-1">Nama Kampus</label>
              <input
                type="text"
                name="namaKampus"
                value={formData.namaKampus}
                onChange={handleChange}
                placeholder="Masukkan nama kampus"
                className="w-full px-4 py-2 text-black rounded-md outline-none"
              />
            </div>

            {/* email */}
            <div>
              <label className="block text-sm mb-1">Email Kampus</label>
              <input
                type="email"
                name="emailKampus"
                value={formData.emailKampus}
                onChange={handleChange}
                placeholder="Masukkan email kampus"
                className="w-full px-4 py-2 text-black rounded-md outline-none"
              />
            </div>

            {/* deskription */}
            <div>
              <label className="block text-sm mb-1">Deskripsi Kampus</label>
              <Textarea
                name="deskripsiKampus"
                value={formData.deskripsiKampus}
                onChange={handleChange}
                placeholder="Tuliskan deskripsi singkat kampus"
                rows={3}
                className="w-full px-4 py-2 bg-white text-black rounded-md outline-none resize-none"
              />
            </div>

            {/* website campus */}
            <div>
              <label className="block text-sm mb-1">Website Kampus</label>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="Masukkan link website kampus"
                className="w-full px-4 py-2 text-black rounded-md outline-none"
              />
            </div>

            {/* provinsi */}
            <div>
              <label className="block text-sm mb-1">Provinsi</label>
              <Popover open={openProvince} onOpenChange={setOpenProvince}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openCity}
                    className="w-full justify-between text-gray-400"
                  >
                    {valueProvince
                      ? frameworks.find(
                          (framework) => framework.value === valueProvince
                        )?.label
                      : "Pilih Provinsi..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search framework..."
                      className="h-9 w-full"
                    />
                    <CommandList>
                      <CommandEmpty>Provonsi tidak ditemukan.</CommandEmpty>
                      <CommandGroup>
                        {frameworks.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                              setvalueProvince(
                                currentValue === valueProvince
                                  ? ""
                                  : currentValue
                              );
                              setOpenProvince(false);
                            }}
                          >
                            {framework.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                valueProvince === framework.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* kota/kabupaten */}
            <div>
              <label className="block text-sm mb-1">Kota/Kabupaten</label>
              <Popover open={openCity} onOpenChange={setOpenCity}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openCity}
                    className="w-full justify-between text-gray-400"
                  >
                    {valueCity
                      ? frameworks.find(
                          (framework) => framework.value === valueCity
                        )?.label
                      : "Kota/Kabupaten"}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search framework..."
                      className="h-9 w-full"
                    />
                    <CommandList>
                      <CommandEmpty>
                        Kota/Kabupaten tidak ditemukan.
                      </CommandEmpty>
                      <CommandGroup>
                        {frameworks.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                              setvalueCity(
                                currentValue === valueCity ? "" : currentValue
                              );
                              setOpenCity(false);
                            }}
                          >
                            {framework.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                valueCity === framework.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* kecamatan */}
            <div>
              <label className="block text-sm mb-1">Kecamatan</label>
              <Popover open={openSubdistrict} onOpenChange={setOpenSubdistrict}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openSubdistrict}
                    className="w-full justify-between text-gray-400"
                  >
                    {valueSubdistrict
                      ? frameworks.find(
                          (framework) => framework.value === valueSubdistrict
                        )?.label
                      : "Pilih Kecamatan..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search framework..."
                      className="h-9 w-full"
                    />
                    <CommandList>
                      <CommandEmpty>Kecamatan tidak ditemukan.</CommandEmpty>
                      <CommandGroup>
                        {frameworks.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                              setValueSubdistrict(
                                currentValue === valueSubdistrict
                                  ? ""
                                  : currentValue
                              );
                              setOpenSubdistrict(false);
                            }}
                          >
                            {framework.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                valueSubdistrict === framework.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* desa/kelurahan */}
            <div>
              <label className="block text-sm mb-1">Desa/Kelurahan</label>
              <Popover open={openWard} onOpenChange={setOpenWard}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openWard}
                    className="w-full justify-between text-gray-400"
                  >
                    {valueWard
                      ? frameworks.find(
                          (framework) => framework.value === valueWard
                        )?.label
                      : "Pilih Desa/Kelurahan..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search framework..."
                      className="h-9 w-full"
                    />
                    <CommandList>
                      <CommandEmpty>
                        Desa/Kelurahan tidak ditemukan.
                      </CommandEmpty>
                      <CommandGroup>
                        {frameworks.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                              setValueWard(
                                currentValue === valueWard ? "" : currentValue
                              );
                              setOpenWard(false);
                            }}
                          >
                            {framework.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                valueWard === framework.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* maps */}
          <div className="mt-5">
            <label className="block text-sm mb-1">Masukkan Titik Lokasi</label>
            <ManageMapsCampusLocation
              onLocationSelect={handleLocationChange}
              // Tambahkan props initialLat dan initialLng jika Anda perlu memuat data lama
              // initialLat={initialLat}
              // initialLng={initialLng}
            />
          </div>

          {/* button submit */}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-[#5CC6BA] text-[#013D3A] font-semibold px-12 py-2 rounded-md hover:bg-[#4bb2a8] transition-all"
            >
              Kirim
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
