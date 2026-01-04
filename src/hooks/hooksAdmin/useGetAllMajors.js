import axios from "axios";
import { create } from "zustand";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useGetAllMajors = create((set) => ({
  // State
  majors: [],
  isLoading: false,
  error: null,

  // Actions get data program mentee
  fetchMajor: async (token) => {
    set({ isLoading: true, error: null });

    try {
      const API_URL = `${API_BASE_URL}/admin/all-majors`;

      const response = await axios.get(API_URL, {
        headers: {
          // Mengirim JWT dalam header Authorizationb
          Authorization: `Bearer ${token}`,
        },
      });

      const fetchedMajor = response.data.data ?? [];

      set({
        majors: fetchedMajor,
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
  clearPrograms: () => set({ majors: [], isLoading: false, error: null }),
}));

export default useGetAllMajors;
