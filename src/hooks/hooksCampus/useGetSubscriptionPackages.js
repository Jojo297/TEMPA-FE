import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useGetSubscriptionPackages = create((set) => ({
  packages: [],
  campusSubscription: {},
  isLoading: false,
  error: null,

  // Action untuk mengambil daftar paket berlangganan
  fetchPackages: async (token) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(
        `${API_BASE_URL}/subscription-packages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set({
        packages: response.data.data,
        campusSubscription: response.data.campusSubscription,
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

  resetState: () =>
    set({
      packages: [],
      isLoading: false,
      campusSubscription: {},
      error: null,
    }),
}));

export default useGetSubscriptionPackages;
