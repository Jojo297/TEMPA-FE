import { create } from "zustand";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useGetStandardMajors = create((set) => ({
  standardMajors: [],
  isLoading: false,

  error: null,

  // Action untuk mengambil data standard majors
  fetchStandardMajors: async (token) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `${BASE_URL}/admin/get-standard-majors`,
        {
          headers: {
            // Mengirim JWT dalam header Authorizationb
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set({
        standardMajors: response.data.data,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error fetching standard majors:", error);
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Terjadi kesalahan saat mengambil data",
        isLoading: false,
      });
    }
  },
}));

export default useGetStandardMajors;
