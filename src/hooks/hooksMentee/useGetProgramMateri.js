import axios from "axios";
import { create } from "zustand";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useGetProgramMateri = create((set) => ({
  // state
  materi: [],
  isLoading: false,
  error: null,
  statusCode: 0,

  // get materi program
  fetchMateri: async (token, slug) => {
    set({ isLoading: true, error: null });

    try {
      const API_URL = `${API_BASE_URL}/mentee/get-materi/${slug}`;

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const fetchMateri = response.data.data;

      // store to state
      set({
        materi: fetchMateri,
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

      if (error.status == 404) {
        set({ error: "404 not fount" });
        set({ statusCode: error.status });
      }
    }
  },

  // clear state
  clearDetailMajor: () =>
    set({ materi: [], isLoading: false, errors: false, statusCode: 0 }),
}));

export default useGetProgramMateri;
