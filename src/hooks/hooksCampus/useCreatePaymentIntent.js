import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_PAYMENT;

const useCreatePaymentIntent = create((set) => ({
  balance: 0,
  quotaMentee: 0,
  isLoadingWallet: false,
  error: null,

  // create invoice
  createPaymentIntent: async (token, idSubscription) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(
        `${API_BASE_URL}/create-payment-invoice/${idSubscription}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      // Sesuai response yang Anda kirim: response.data.data
      const rawData = response.data.data;

      return { success: true, data: rawData };
    } catch (error) {
      console.error("Gagal membuat payment intent:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Gagal memproses pembayaran.";

      set({ isLoading: false, error: errorMessage });
      throw error;
    }
  },

  // get balance
  getWallet: async (token) => {
    set({ isLoadingWallet: true, error: null });

    try {
      const response = await axios.get(`${API_BASE_URL}/get-balance`, {
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

export default useCreatePaymentIntent;
