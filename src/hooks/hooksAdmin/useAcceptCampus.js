import axios from "axios";
import { create } from "zustand";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useAcceptCampus = create((set) => ({
  // State
  isLoadingAccept: false,
  errorAccept: null,
  successMessage: null,

  // Actions
  /**
   * Mengubah status verifikasi kampus menjadi accepted.
   * Endpoint: PUT /admin/accept-campus/:id
   * @param {string} token - Token JWT otentikasi.
   * @param {number|string} id - ID Kampus yang akan diverifikasi.
   */
  acceptCampus: async (token, id) => {
    set({ isLoadingAccept: true, errorAccept: null, successMessage: null });

    try {
      const API_URL = `${API_BASE_URL}/admin/accept-campus/${id}`;

      const response = await axios.put(
        API_URL,
        {}, // Body kosong karena ID dikirim via params
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set({
        isLoadingAccept: false,
        successMessage: response.data.message,
        errorAccept: null,
      });

      return { success: true, message: response.data.message };
    } catch (error) {
      console.error("Gagal memverifikasi kampus:", error);

      const errorMessage =
        error.response?.data?.message || "Gagal memverifikasi kampus.";

      set({
        isLoadingAccept: false,
        errorAccept: errorMessage,
        successMessage: null,
      });

      return { success: false, message: errorMessage };
    }
  },

  clearState: () =>
    set({ isLoadingAccept: false, errorAccept: null, successMessage: null }),
}));

export default useAcceptCampus;
