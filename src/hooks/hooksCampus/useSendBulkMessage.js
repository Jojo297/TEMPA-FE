import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useSendBulkMessage = create((set) => ({
  isLoading: false,
  error: null,
  successMessage: null,

  /**
   * Send bulk message to many mentee.
   * Endpoint: POST /send-bulk-message
   * @param {string} token - Token JWT otentikasi.
   * @param {object} payload - Data pesan ({ subject, message, idCampus, idMentee: [] }).
   */
  sendBulkMessage: async (token, payload) => {
    set({ isLoading: true, error: null, successMessage: null });

    try {
      const API_URL = `${API_BASE_URL}/send-bulk-message`;

      const response = await axios.post(API_URL, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      set({
        isLoading: false,
        successMessage: response.data.message,
        error: null,
      });

      return { success: true, message: response.data.message };
    } catch (error) {
      console.error("Gagal mengirim pesan massal:", error);

      const errorMessage =
        error.response?.data?.message || "Gagal mengirim pesan massal.";

      set({
        isLoading: false,
        error: errorMessage,
        successMessage: null,
      });

      return { success: false, message: errorMessage };
    }
  },

  resetState: () =>
    set({ isLoading: false, error: null, successMessage: null }),
}));

export default useSendBulkMessage;
