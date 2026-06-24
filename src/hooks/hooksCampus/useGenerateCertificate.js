import axios from "axios";
import { create } from "zustand";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useGenerateCertificate = create((set) => ({
  // State
  message: "",
  isLoading: false,
  error: null,

  // Actions generate certificate
  generateCertificate: async (token, payload, idProgram) => {
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
      const errorMessage =
        error.response?.data?.message || "Gagal menghasilkan sertifikat.";

      set({ isLoading: false, error: errorMessage, message: errorMessage });

      throw new Error(errorMessage);
    }
  },

  // function for clear state
  clearPrograms: () => set({ message: "", isLoading: false, error: null }),
}));

export default useGenerateCertificate;
