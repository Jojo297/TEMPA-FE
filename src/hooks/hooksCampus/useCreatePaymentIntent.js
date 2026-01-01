import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_PAYMENT;

const useCreatePaymentIntent = create((set) => ({
  isLoading: false,
  error: null,
  paymentUrl: null,

  // Action untuk membuat payment intent
  createPaymentIntent: async (token, idSubscription) => {
    set({ isLoading: true, error: null, paymentUrl: null });

    try {
      // Endpoint: /create-payment-intent/:id
      const response = await axios.post(
        `${API_BASE_URL}/create-payment-intent/${idSubscription}`,
        {}, // Body kosong karena data diambil dari params dan token user
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { paymentUrl, message } = response.data;

      set({ isLoading: false, paymentUrl: paymentUrl });
      return { success: true, message, paymentUrl };
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

  resetState: () => set({ isLoading: false, error: null, paymentUrl: null }),
}));

export default useCreatePaymentIntent;
