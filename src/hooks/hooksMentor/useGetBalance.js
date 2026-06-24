import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useGetBalance = create((set) => ({
  balance: 0,
  quotaMentee: 0,
  isLoadingWallet: false,
  error: null,

  // get balance
  getWallet: async (token) => {
    set({ isLoadingWallet: true, error: null });

    try {
      const response = await axios.get(`${API_BASE_URL}/mentor/get-balance`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const rawData = response.data.data;

      set({
        balance: rawData.balance,
        quotaMentee: rawData.quota_mentee,
        isLoadingWallet: false,
        error: null,
      });

      return { success: true, data: rawData };
    } catch (error) {
      console.error("Gagal mengambil data wallet:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Gagal mengambil data wallet.";

      set({ isLoading: false, error: errorMessage });
      throw error;
    }
  },

  resetState: () =>
    set({
      balance: 0,
      quotaMentee: 0,
      isLoadingWallet: false,
      error: null,
    }),
}));

export default useGetBalance;
