import axios from "axios";
import { create } from "zustand";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useGenerateCertificate = create((set) => ({
  // State
  message: "",
  isLoading: false,
  error: null,

  // Actions generate certificate
  generateCertificate: async (token, payload) => {
    set({ isLoading: true, error: null });

    try {
      const API_URL = `${API_BASE_URL}/generate-certificate`;

      const response = await axios.post(API_URL, payload, {
        headers: {
          // Mengirim JWT dalam header Authorizationb
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = response.data.message ?? [];

      set({
        message: result,
        isLoading: false,
        error: null,
      });

      return result;
    } catch (error) {
      console.error("Failed to generate certificate:", error);

      const errorMessage =
        error.response?.data?.message || "Gagal mengambil data program.";

      set({
        isLoading: false,
        error: errorMessage,
      });
    }
  },

  // function for clear state
  clearPrograms: () => set({ message: "", isLoading: false, error: null }),
}));

export default useGenerateCertificate;
