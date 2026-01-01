import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useDeleteSubscriptionPackage = create((set) => ({
  isLoading: false,
  error: null,

  deletePackage: async (token, id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/admin/delete-subscription-package/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set({ isLoading: false });
      return {
        success: true,
        message: response.data.message,
      };
    } catch (error) {
      console.error("Error deleting subscription package:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Gagal menghapus paket berlangganan.";
      set({ isLoading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },
}));

export default useDeleteSubscriptionPackage;
