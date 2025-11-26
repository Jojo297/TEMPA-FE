import axios from "axios";
import { create } from "zustand";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useAdressCampus = create((set) => ({
  // State
  province: [],
  city: [],
  subdistrict: [],
  ward: [],
  isLoading: false,
  error: null,

  // Actions get data province
  fetchProvince: async () => {
    set({ isLoading: true, error: null });

    try {
      const API_URL = `/api/wilayah/provinces.json`;

      const response = await axios.get(API_URL);

      const fetchedProvince = response.data.data ?? [];

      set({
        province: fetchedProvince,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Failed to fetch province:", error);

      const errorMessage =
        error.response?.data?.message || "Gagal mengambil data province.";

      set({
        isLoading: false,
        error: errorMessage,
      });
    }
  },

  // Actions get data city
  fetchCity: async (code) => {
    set({ isLoading: true, error: null });

    try {
      const API_URL = `/api/wilayah/regencies/${code}.json`;

      const response = await axios.get(API_URL);

      const fetchedCity = response.data.data ?? [];

      set({
        city: fetchedCity,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Failed to fetch province:", error);

      const errorMessage =
        error.response?.data?.message || "Gagal mengambil data province.";

      set({
        isLoading: false,
        error: errorMessage,
      });
    }
  },

  // Actions get data Subdistrict
  fetchSubdistrict: async (code) => {
    set({ isLoading: true, error: null });

    try {
      const API_URL = `/api/wilayah/districts/${code}.json`;

      const response = await axios.get(API_URL);

      const fetchedSubdistrict = response.data.data ?? [];

      set({
        subdistrict: fetchedSubdistrict,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Failed to fetch province:", error);

      const errorMessage =
        error.response?.data?.message || "Gagal mengambil data province.";

      set({
        isLoading: false,
        error: errorMessage,
      });
    }
  },

  // Actions get data Subdistrict
  fetchWard: async (code) => {
    set({ isLoading: true, error: null });

    try {
      const API_URL = `/api/wilayah/villages/${code}.json`;

      const response = await axios.get(API_URL);

      const fetchedWards = response.data.data ?? [];

      set({
        ward: fetchedWards,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Failed to fetch province:", error);

      const errorMessage =
        error.response?.data?.message || "Gagal mengambil data province.";

      set({
        isLoading: false,
        error: errorMessage,
      });
    }
  },

  // function for clear state
  clearAll: () =>
    set({
      province: [],
      city: [],
      subdistrict: [],
      ward: [],
      isLoading: false,
      error: null,
    }),
}));

export default useAdressCampus;
