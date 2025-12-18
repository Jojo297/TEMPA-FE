import axios from "axios";
import { create } from "zustand";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useGetAllCampus = create((set) => ({
  // State
  campusData: [],
  isLoadingCampus: false,
  errorCampus: null,

  // Actions
  /**
   * Mengambil semua data kampus untuk admin.
   * Endpoint: GET /admin/get-all-campus
   * @param {string} token - Token JWT otentikasi.
   */
  fetchAllCampus: async (token) => {
    set({ isLoadingCampus: true, error: null });

    try {
      const API_URL = `${API_BASE_URL}/admin/get-all-campus`;

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({
        campusData: response.data.data,
        isLoadingCampus: false,
        errorCampus: null,
      });
    } catch (error) {
      console.error("Failed to fetch all campus data:", error);

      const errorMessage =
        error.response?.data?.message || "Gagal mengambil data kampus.";

      set({
        isLoadingCampus: false,
        errorCampus: errorMessage,
      });
    }
  },

  clearState: () =>
    set({ campusData: [], isLoadingCampus: false, errorCampus: null }),
}));

export default useGetAllCampus;
