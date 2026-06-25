import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useCheckVerifyStatus = create((set) => ({
  verifyStatus: null,
  isLoading: false,
  error: null,

  checkVerifyStatus: async (token) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `${API_BASE_URL}/mentee/check-verify-status`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
            "Content-Type": "application/json",
          },
        },
      );

      const status = response.data.data.verify_status;
      set({ verifyStatus: status, isLoading: false });
      return status;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal mengambil status verifikasi.";
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },
}));

export default useCheckVerifyStatus;
