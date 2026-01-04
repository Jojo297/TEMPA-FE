import axios from "axios";
import { create } from "zustand";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useGetProgramCampusChart = create((set) => ({
  // State
  programChartData: [],
  isLoadingProgramChart: false,
  errorProgramChart: null,

  // Actions
  /**
   * Mengambil data chart program kampus (total mentee per program).
   * Endpoint: GET /admin/get-program-campus-chart
   * @param {string} token - Token JWT otentikasi.
   */
  fetchProgramCampusChart: async (token) => {
    set({ isLoadingProgramChart: true, errorProgramChart: null });

    try {
      const API_URL = `${API_BASE_URL}/admin/get-program-campus-chart`;

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({
        programChartData: response.data.data,
        isLoadingProgramChart: false,
        errorProgramChart: null,
      });
    } catch (error) {
      console.error("Failed to fetch program campus chart data:", error);

      const errorMessage =
        error.response?.data?.message ||
        "Gagal mengambil data chart program kampus.";

      set({
        isLoadingProgramChart: false,
        errorProgramChart: errorMessage,
      });
    }
  },

  clearState: () =>
    set({
      programChartData: [],
      isLoadingProgramChart: false,
      errorProgramChart: null,
    }),
}));

export default useGetProgramCampusChart;
