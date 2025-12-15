import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useGetFeedback = create((set) => ({
  // State
  feedbackData: [],
  isLoading: false,
  error: null,

  // Action untuk mengambil data feedback berdasarkan id_program
  getFeedbackByProgramId: async (token, programId) => {
    set({ isLoading: true, error: null });

    try {
      // Pastikan endpoint ini sesuai dengan dokumentasi API backend Anda
      // Contoh asumsi: GET /feedback/program/{id}
      const API_URL = `${API_BASE_URL}/get-program-feedback/${programId}`;

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Sesuaikan pengambilan data dengan struktur response API (misal: response.data.data)
      const data = response.data.data || response.data;

      set({
        feedbackData: data,
        isLoading: false,
        error: null,
      });

      return { success: true, data: data };
    } catch (error) {
      console.error("Failed to fetch feedback:", error);

      const errorMessage =
        error.response?.data?.message || "Gagal mengambil data feedback.";

      set({
        isLoading: false,
        error: errorMessage,
      });

      // Opsional: throw error jika ingin di-handle di component juga
      // throw new Error(errorMessage);
    }
  },

  clearState: () =>
    set({
      feedbackData: [],
      isLoading: false,
      error: null,
    }),
}));

export default useGetFeedback;
