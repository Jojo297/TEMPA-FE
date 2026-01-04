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
import { useCallback, useEffect, useState } from "react";
import useGetAllMajors from "@/hooks/hooksMentee/useGetAllMajors";
import { useFilterStore } from "@/hooks/hooksMentee/useFilterProgramMajor";

export function SearchMajors({ className }) {
  const token = localStorage.getItem("userJwt");
  const { majors, isLoading, error, fetchMajor } = useGetAllMajors();

  const displayMajors = majors ?? [];
  // console.log(displayMajors);

  // get state and action from hooks
  const selectedMajor = useFilterStore((state) => state.selectedMajor);
  const setSelectedMajor = useFilterStore((state) => state.setSelectedMajor);

  useEffect(() => {
    if (token) {
      fetchMajor(token);
    }
  }, [token, fetchMajor]);

  // console.log(displayMajors);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleSelectMajor = useCallback(
    (currentValue) => {
      // update State Global
      const newValue = currentValue === selectedMajor ? "" : currentValue;
      setSelectedMajor(newValue);
      setOpen(false);
    },
    [selectedMajor, setSelectedMajor]
  );

  return (
    <Popover open={open} onOpenChange={setOpen} className="">
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={` ${
            className || ""
          } justify-between text-gray-400 text-sm overflow-hidden whitespace-nowrap text-ellipsis`}
        >
          {selectedMajor
            ? displayMajors.find((item) => item.major_name === selectedMajor)
                ?.major_name
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
                  value={item.major_name}
                  onSelect={handleSelectMajor}
                >
                  {item.major_name}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedMajor === item.major_name
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
  );
}
