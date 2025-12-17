import axios from "axios";
import { create } from "zustand";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useGetAllMajorsMentor = create((set) => ({
  // State
  majors: [],
  majorsForForm: [],
  isLoading: false,
  error: null,

  // Actions get data program mentee
  fetchMajor: async (token) => {
    set({ isLoading: true, error: null });

    try {
      const API_URL = `${API_BASE_URL}/mentor/all-majors`;

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

  // Actions get data majors for form
  fetchMajorsForForm: async (token) => {
    set({ isLoading: true, error: null });

    try {
      const API_URL = `${API_BASE_URL}/all-majors-form`;

      const response = await axios.get(API_URL, {
        headers: {
          // Mengirim JWT dalam header Authorization
          Authorization: `Bearer ${token}`,
        },
      });

      const fetchedMajor = response.data.data ?? [];

      set({
        majorsForForm: fetchedMajor,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Failed to fetch majors for form:", error);

      const errorMessage =
        error.response?.data?.message || "Gagal mengambil data jurusan.";

      set({
        isLoading: false,
        error: errorMessage,
      });
    }
  },

  // function for clear state
  clearPrograms: () =>
    set({ majors: [], majorsForForm: [], isLoading: false, error: null }),
}));

export default useGetAllMajorsMentor;
