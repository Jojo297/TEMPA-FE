import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useVerifyMentee = create((set) => ({
  isLoading: false,
  error: null,
  message: null,

  verifyMentee: async (token, formData) => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await axios.put(
        `${API_BASE_URL}/mentee/verify-mentee`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      set({ isLoading: false, message: response.data.message });
      return response;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Terjadi kesalahan saat verifikasi.";
      set({ isLoading: false, error: errorMsg });
      throw error;
    }
  },
}));

export default useVerifyMentee;
