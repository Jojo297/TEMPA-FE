import axios from "axios";
import { create } from "zustand";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useGetDetailVerificationCampus = create((set) => ({
  // State
  detailCampus: null,
  isLoadingEdit: false,
  errorEdit: null,

  // Actions
  /**
   * Mengambil detail data kampus yang sedang login.
   * Endpoint: GET /get-detail-verification-campus
   * @param {string} token - Token JWT otentikasi.
   */
  fetchDetailVerificationCampus: async (token) => {
    set({ isLoading: true, error: null });

    try {
      const API_URL = `${API_BASE_URL}/get-detail-verification-campus`;

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Mengambil data dari response.data.data sesuai struktur endpoint
      const fetchedData = response.data.data;

      set({
        detailCampus: fetchedData,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Failed to fetch detail verification campus:", error);

      const errorMessage =
        error.response?.data?.message || "Gagal mengambil detail kampus.";

      set({
        isLoading: false,
        error: errorMessage,
      });
    }
  },

  clearState: () => set({ detailCampus: null, isLoading: false, error: null }),
}));

export default useGetDetailVerificationCampus;
