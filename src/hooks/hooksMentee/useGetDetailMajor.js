import axios from "axios";
import { create } from "zustand";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useGetDetailMajor = create((set) => ({
  // state
  detailMajor: [],
  isLoading: false,
  error: null,

  // get detail program
  fetchDetailMajor: async (token, slug) => {
    set({ isLoading: true, error: null });

    try {
      const API_URL = `${API_BASE_URL}/mentee/detail-major/${slug}`;

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const fetchDetailMajor = response.data.data;

      // store to state
      set({
        detailMajor: fetchDetailMajor,
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
      }
    }
  },

  // clear state
  clearDetailMajor: () =>
    set({ detailCampus: [], isLoadingL: false, errors: false }),
}));

export default useGetDetailMajor;
