import axios from "axios";
import { create } from "zustand";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useGetAllMentee = create((set) => ({
  // State
  menteeData: [],
  isLoadingMentee: false,
  errorMentee: null,

  // Actions
  /**
   * Mengambil semua data mentee untuk admin.
   * Endpoint: GET /admin/get-all-mentee
   * @param {string} token - Token JWT otentikasi.
   */
  fetchAllMentee: async (token) => {
    set({ isLoadingMentee: true, errorMentee: null });

    try {
      const API_URL = `${API_BASE_URL}/admin/get-all-mentee`;

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({
        menteeData: response.data.data,
        isLoadingMentee: false,
        errorMentee: null,
      });
    } catch (error) {
      console.error("Failed to fetch all mentee data:", error);

      const errorMessage =
        error.response?.data?.message || "Gagal mengambil data mentee.";

      set({
        isLoadingMentee: false,
        errorMentee: errorMessage,
      });
    }
  },

  clearState: () =>
    set({ menteeData: [], isLoadingMentee: false, errorMentee: null }),
}));

export default useGetAllMentee;
