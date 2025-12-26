import axios from "axios";
import { create } from "zustand";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useSendMessage = create((set) => ({
  isLoadingSendMessage: false,
  errorSendMessage: null,
  successMessage: null,

  sendMessage: async (token, payload) => {
    set({
      isLoadingSendMessage: true,
      errorSendMessage: null,
      successMessage: null,
    });

    try {
      // Pastikan endpoint ini sesuai dengan route di backend Anda
      const API_URL = `${API_BASE_URL}/send-message-to-mentee`;

      const response = await axios.post(API_URL, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      set({
        isLoadingSendMessage: false,
        successMessage: response.data.message,
        errorSendMessage: null,
      });

      return { success: true, message: response.data.message };
    } catch (error) {
      console.error("Gagal mengirim pesan:", error);

      const errorMessage =
        error.response?.data?.message || "Gagal mengirim pesan.";

      set({
        isLoadingSendMessage: false,
        errorSendMessage: errorMessage,
        successMessage: null,
      });

      return { success: false, message: errorMessage };
    }
  },
}));

export default useSendMessage;
