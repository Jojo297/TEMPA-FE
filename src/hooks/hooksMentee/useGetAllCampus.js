import axios from "axios";
import { create } from "zustand";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useGetAllCampus = create((set) => ({
  // State
  campus: [],
  isLoading: false,
  error: null,

  // Actions get data program mentee
  fetchCampus: async (token) => {
    set({ isLoading: true, error: null });

    try {
      const API_URL = `${API_BASE_URL}/mentee/all-campus`;

      const response = await axios.get(API_URL, {
        headers: {
          // Mengirim JWT dalam header Authorizationb
          Authorization: `Bearer ${token}`,
        },
      });

      const fetchedCampus = response.data.data ?? [];

      set({
        campus: fetchedCampus,
        isLoading: false,
        error: null,
      });
      return fetchedCampus;
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
  clearPrograms: () => set({ campus: [], isLoading: false, error: null }),
}));

export default useGetAllCampus;
