import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_PAYMENT;

const useGetHistoryTransaction = create((set) => ({
  data: [],
  isLoading: false,
  error: null,

  // get history transaction
  getHistoryTransaction: async (token) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(
        `${API_BASE_URL}/get-history-transaction`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const rawData = response.data.data;

      set({
        data: rawData,
        isLoading: false,
      });

      return { success: true, data: rawData };
    } catch (error) {
      console.error("Gagal mengambil history:", error);
      const errorMessage =
        error.response?.data?.messages || // Sesuaikan dengan backend kamu (messages/message)
        error.message ||
        "Gagal mengambil riwayat transaksi.";

      set({ isLoading: false, error: errorMessage });
      throw error;
    }
  },

  resetState: () =>
    set({
      data: [],
      isLoading: false,
      error: null,
    }),
}));

export default useGetHistoryTransaction;
