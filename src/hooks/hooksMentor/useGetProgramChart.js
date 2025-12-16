import axios from "axios";
import { create } from "zustand";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useGetProgramChart = create((set) => ({
  // State
  programs: [],
  totalProgram: 0,
  isLoading: false,
  error: null,

  // Actions get data program mentee
  fetchPrograms: async (token) => {
    set({ isLoading: true, error: null });

    try {
      const API_URL = `${API_BASE_URL}/mentor/get-program-campus-chart`;

      const response = await axios.get(API_URL, {
        headers: {
          // Mengirim JWT dalam header Authorizationb
          Authorization: `Bearer ${token}`,
        },
      });

      const fetchedPrograms = response.data.data;
      const fetchedTotalPrograms = response.data.total_program;

      set({
        programs: fetchedPrograms,
        totalProgram: fetchedTotalPrograms,
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

export default useGetProgramChart;
