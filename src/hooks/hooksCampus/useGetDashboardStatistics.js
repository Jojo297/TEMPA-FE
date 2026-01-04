import axios from "axios";
import { create } from "zustand";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useGetDashboardStatistics = create((set) => ({
  // State
  statistics: null,
  isLoading: false,
  error: null,
  status: null,

  // Actions
  /**
   * Mengambil data statistik dashboard kampus.
   * Endpoint: GET /get-dashboard-statistics
   * @param {string} token - Token JWT otentikasi.
   */
  fetchDashboardStatistics: async (token) => {
    set({ isLoading: true, error: null });

    try {
      const API_URL = `${API_BASE_URL}/get-dashboard-statistics`;

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const fetchedData = response.data.data;

      set({
        statistics: fetchedData,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Failed to fetch dashboard statistics:", error);

      const errorMessage =
        error.response?.data?.message ||
        "Gagal mengambil data statistik dashboard.";

      set({
        isLoading: false,
        error: errorMessage,
        status: error.response?.status,
      });
    }
  },

  // Function for clear state
  clearStatistics: () =>
    set({ statistics: null, isLoading: false, status: null, error: null }),
}));

export default useGetDashboardStatistics;
