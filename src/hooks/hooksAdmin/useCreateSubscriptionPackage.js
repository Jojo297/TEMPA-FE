import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useCreateSubscriptionPackage = create((set) => ({
  isLoading: false,
  error: null,
  data: null,

  createPackage: async (token, payload) => {
    set({ isLoading: true, error: null, data: null });
    try {
      const response = await axios.post(
        `${API_BASE_URL}/admin/create-subscription-package`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      set({ isLoading: false, data: response.data.data });
      return {
        success: true,
        message: response.data.message,
      };
    } catch (error) {
      console.error("Error creating subscription package:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Gagal membuat paket berlangganan.";
      set({ isLoading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },
}));

export default useCreateSubscriptionPackage;
