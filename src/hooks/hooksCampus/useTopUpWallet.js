import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_PAYMENT;

const useTopUpWallet = create((set) => ({
  isLoadingTopUp: false,
  error: null,

  topUpSaldo: async (token, amount) => {
    set({ isLoadingTopUp: true, error: null });

    try {
      const response = await axios.post(
        `${API_BASE_URL}/top-up-saldo`,
        { amount: Number(amount) },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const rawData = response.data.data;

      set({ isLoadingTopUp: false });
      return { success: true, data: rawData };
    } catch (error) {
      console.error("Gagal melakukan top up saldo:", error);

      // Ambil pesan error dari backend sesuai struktur res.status().json() kamu
      const errorMessage =
        error.response?.data?.errors ||
        error.response?.data?.messages ||
        "Gagal memproses pembayaran ke penyedia layanan.";

      set({ isLoadingTopUp: false, error: errorMessage });
      throw error;
    }
  },

  resetTopUpState: () =>
    set({
      isLoadingTopUp: false,
      error: null,
    }),
}));

export default useTopUpWallet;
