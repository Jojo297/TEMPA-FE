import axios from "axios";
import { create } from "zustand";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useGetDashboardData = create((set) => ({
  // State
  dashboardData: null,
  isLoading: false,
  error: null,

  // Actions
  /**
   * Mengambil data dashboard untuk admin.
   * Endpoint: GET /get-dashboard-data
   * @param {string} token - Token JWT otentikasi.
   */
  fetchDashboardData: async (token) => {
    set({ isLoading: true, error: null });

    try {
      const API_URL = `${API_BASE_URL}/admin/get-dashboard-data`;

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Mengambil data dari response.data.data sesuai struktur endpoint
      const fetchedData = response.data.data;

      set({
        dashboardData: fetchedData,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);

      const errorMessage =
        error.response?.data?.message || "Gagal mengambil data dashboard.";

      set({
        isLoading: false,
        error: errorMessage,
      });
    }
  },

  clearState: () => set({ dashboardData: null, isLoading: false, error: null }),
}));

export default useGetDashboardData;
