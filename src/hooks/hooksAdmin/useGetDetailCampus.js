import axios from "axios";
import { create } from "zustand";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useGetDetailCampus = create((set) => ({
  // state
  detailCampus: [],
  isLoading: false,
  error: null,

  // get detail program
  fetchDetailCampus: async (token, id) => {
    set({ isLoading: true, error: null });

    try {
      const API_URL = `${API_BASE_URL}/admin/detail-campus/${id}`;

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const fetchDetailCampus = response.data.data;

      // store to state
      set({
        detailCampus: fetchDetailCampus,
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
  clearDetailProgram: () =>
    set({ detailCampus: [], isLoadingL: false, errors: false }),
}));

export default useGetDetailCampus;
