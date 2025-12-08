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
import useGetAllMajors from "@/hooks/hooksMentee/useGetAllMajors";
import useGetAllMajorsCampus from "@/hooks/hooksCampus/useGetAllMajors";

export function SearchMajorsProgramForm({
  className,
  value,
  onChange,
  initialMajorName,
}) {
  const token = localStorage.getItem("userJwt");
  const { majors, isLoading, error, fetchMajor } = useGetAllMajorsCampus();

  const displayMajors = majors ?? [];
  // console.log(displayMajors);

  useEffect(() => {
    if (token) {
      fetchMajor(token);
    }
  }, [token, fetchMajor]);

  const [open, setOpen] = useState(false);

  const handleSelectMajor = (selectedId) => {
    // `selectedId` adalah ID dari CommandItem, yang sudah berupa angka.
    // Kita langsung memanggil onChange dengan ID tersebut.
    // Jika nilai yang sama dipilih lagi, kita bisa atur untuk mengosongkan pilihan (opsional).
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
                  key={item.id}
                  value={item.id} // Gunakan ID sebagai value unik
                  onSelect={() => handleSelectMajor(item.id)} // Kirim ID ke handler
                >
                  {item.standard_major?.major_name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === item.id ? "opacity-100" : "opacity-0"
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
