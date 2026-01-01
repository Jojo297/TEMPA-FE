import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_PAYMENT;

const useCreatePaymentIntent = create((set) => ({
  isLoading: false,
  error: null,
  paymentUrl: null,
  isFree: false,

  // Action untuk membuat payment intent
  createPaymentIntent: async (token, idSubscription) => {
    set({ isLoading: true, error: null, paymentUrl: null, isFree: false });

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

      const { paymentUrl, message, isFree } = response.data;

      set({ isLoading: false, paymentUrl: paymentUrl, isFree: isFree });
      return { success: true, message, paymentUrl, isFree };
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

  resetState: () =>
    set({ isLoading: false, error: null, paymentUrl: null, isFree: false }),
}));

export default useCreatePaymentIntent;
