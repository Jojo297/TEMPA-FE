import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilterProgramType } from "@/hooks/hooksMentee/useFilterProgramType";

export function SelectTypeProgram() {
  // get state from hooks
  const selectedType = useFilterProgramType((state) => state.selectedType);
  const setSelectedType = useFilterProgramType(
    (state) => state.setSelectedType
  );

  const handleValueChange = (newValue) => {
    const typeValue = newValue === "default" ? "" : newValue;

    setSelectedType(typeValue);
  };

  return (
    <Select
      // Mengikat nilai Select ke state Zustand
      value={selectedType || "default"}
      // Panggil handler saat ada perubahan
      onValueChange={handleValueChange}
    >
      <SelectTrigger className="w-[180px] bg-white text-gray-400">
        <SelectValue placeholder="Pilih Tipe Program" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Pilih Tipe Program</SelectLabel>
          <SelectItem value="online">Online</SelectItem>
          <SelectItem value="onsite">OnSite</SelectItem>
          <SelectItem value="default">Online/OnSite</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
