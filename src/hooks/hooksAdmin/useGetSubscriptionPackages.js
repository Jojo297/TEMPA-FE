import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useGetSubscriptionPackages = create((set) => ({
  packages: [],
  isLoading: false,
  error: null,

  // Action untuk mengambil daftar paket berlangganan
  fetchPackages: async (token) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(
        `${API_BASE_URL}/admin/subscription-packages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Response structure: { message: "...", data: [...] }
      set({
        packages: response.data.data,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Gagal mengambil data paket berlangganan:", error);

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Gagal mengambil data paket berlangganan.";

      set({ isLoading: false, error: errorMessage });
    }
  },

  resetState: () => set({ packages: [], isLoading: false, error: null }),
}));

export default useGetSubscriptionPackages;
