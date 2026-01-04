import { create } from "zustand";

// store filter program type sesi
export const useFilterProgramType = create((set) => ({
  selectedType: "",

  setSelectedType: (type_sesi) => set({ selectedType: type_sesi }),
}));
