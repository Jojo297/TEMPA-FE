import axios from "axios";
import { create } from "zustand";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useGetDetailVerificationCampus = create((set) => ({
  // State
  detailCampus: null,
  isLoading: false,
  error: null,

  // Actions
  /**
   * Mengambil detail data kampus untuk verifikasi admin.
   * Endpoint: GET /admin/get-detail-verification-campus/:id
   * @param {string} token - Token JWT otentikasi.
   * @param {number|string} id - ID Kampus yang akan diambil detailnya.
   */
  fetchDetailVerificationCampus: async (token, id) => {
    set({ isLoading: true, error: null });

    try {
      const API_URL = `${API_BASE_URL}/admin/get-detail-verification-campus/${id}`;

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
