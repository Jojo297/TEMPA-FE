// useProgramStore.js

import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useProgramStore = create((set) => ({
  // State
  programs: [],
  isLoading: false,
  error: null,

  // Actions get data program mentee
  fetchPrograms: async (token) => {
    set({ isLoading: true, error: null });

    try {
      const API_URL = `${API_BASE_URL}/mentee/get-program-mentee`; // Ganti dengan URL API Anda

      const response = await axios.get(API_URL, {
        headers: {
          // Mengirim JWT dalam header Authorization
          Authorization: `Bearer ${token}`,
        },
      });

      const fetchedPrograms = response.data.data;

      set({
        programs: fetchedPrograms,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Failed to fetch programs:", error);

      const errorMessage =
        error.response?.data?.message || "Gagal mengambil data program.";

      set({
        isLoading: false,
        error: errorMessage,
      });
    }
  },

  // function for clear state
  clearPrograms: () => set({ programs: [], isLoading: false, error: null }),
}));

export default useProgramStore;
