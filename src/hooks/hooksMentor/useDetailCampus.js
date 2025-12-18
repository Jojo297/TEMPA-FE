import axios from "axios";
import { create } from "zustand";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useDetailCampus = create((set) => ({
  // State
  detailCampus: null,
  isLoading: false,
  error: null,

  // Actions
  /**
   * Mengambil detail kampus berdasarkan ID.
   * Menggunakan endpoint: GET /detail-campus/{id}
   * @param {string} token - Token JWT otentikasi.
   */
  fetchDetailCampus: async (token) => {
    set({ isLoading: true, error: null, detailCampus: null });

    try {
      const API_URL = `${API_BASE_URL}/mentor/detail-campus`;

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const campusData = response.data.data;

      set({
        detailCampus: campusData,
        isLoading: false,
        error: null,
      });
      return campusData;
    } catch (error) {
      console.error("Failed to fetch campus detail:", error);

      const errorMessage =
        error.response?.data?.message || "Gagal mengambil detail kampus.";

      set({
        isLoading: false,
        error: errorMessage,
        detailCampus: null,
      });
      throw new Error(errorMessage);
    }
  },

  /**
   * Fungsi untuk membersihkan state.
   */
  clearState: () => set({ detailCampus: null, isLoading: false, error: null }),
}));

export default useDetailCampus;
