import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { useEffect, useState } from "react";
import useGetAllMajorsCampus from "@/hooks/hooksCampus/useGetAllMajorsCampus";

export function EditSearchMajorsProgramForm({
  className,
  value,
  onChange,
  initialMajorName,
}) {
  const token = localStorage.getItem("userJwt");
  const { majors, fetchMajor, isLoading, error, fetchMajorsForForm } =
    useGetAllMajorsCampus();

  const displayMajors = majors ?? [];
  // console.log("display major", displayMajors);

  useEffect(() => {
    if (token) {
      fetchMajor(token);
    }
  }, [token, fetchMajorsForForm]);

  const [open, setOpen] = useState(false);

  const handleSelectMajor = (selectedId) => {
    // selectedId sekarang adalah item.id (ID tabel major, misal: 3)
    onChange(value === selectedId ? undefined : selectedId);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen} className="">
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={` ${className || ""} justify-between ${
            value ? "text-black" : "text-gray-400"
          } text-sm overflow-hidden whitespace-nowrap text-ellipsis`}
        >
          {value
            ? displayMajors.find((item) => item.id === value)?.standard_major
                ?.major_name || initialMajorName
            : "Pilih Jurusan"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Cari Jurusan..." className="h-9" />
          <CommandList>
            <CommandEmpty>Jurusan tidak ditemukan.</CommandEmpty>
            <CommandGroup>
              {displayMajors.map((item) => (
                <CommandItem
                  key={item.id} // ID: 3, 4, 5
                  value={item.standard_major?.major_name}
                  onSelect={() => {
                    onChange(item.id); // Kirim 3 untuk Informatika Kampus 1
                    setOpen(false);
                  }}
                >
                  {item.standard_major?.major_name}
                  <Check
                    className={cn(
                      "ml-auto",
                      // PERBAIKAN: Bandingkan value dengan item.id, bukan id_standard_major
                      value === item.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
