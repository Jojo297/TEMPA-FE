import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useUpdateSubscriptionPackage = create((set) => ({
  isLoading: false,
  error: null,
  data: null,

  updatePackage: async (token, id, payload) => {
    set({ isLoading: true, error: null, data: null });
    try {
      const response = await axios.put(
        `${API_BASE_URL}/admin/update-subscription-package/${id}`,
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
      console.error("Error updating subscription package:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Gagal memperbarui paket berlangganan.";
      set({ isLoading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },
}));

export default useUpdateSubscriptionPackage;
