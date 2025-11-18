import { create } from "zustand";

// store filter program type sesi
export const useFilterStore = create((set) => ({
  selectedMajor: "",

  setSelectedMajor: (majorName) => set({ selectedMajor: majorName }),
}));
