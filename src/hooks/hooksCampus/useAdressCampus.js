import axios from "axios";
import { create } from "zustand";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const retryFetch = async (fn, maxRetries, initialDelayMs) => {
  let attempt = 0;

  while (attempt < maxRetries) {
    attempt++;
    try {
      // 1. Coba lakukan fetch
      const result = await fn();

      // Jika berhasil, segera kembalikan hasilnya
      return result;
    } catch (error) {
      // 2. Tangani Error

      // Log error hanya jika bukan percobaan terakhir
      if (attempt < maxRetries) {
        // Hitung jeda waktu dengan Exponential Backoff
        // Delay = initialDelayMs * 2^(attempt-1)
        const delay = initialDelayMs * Math.pow(2, attempt - 1);

        console.warn(
          `Fetch gagal (Percobaan ${attempt}/${maxRetries}). Mencoba lagi dalam ${delay}ms...`,
        );
        console.error(error.message);

        // Tunggu (delay) sebelum percobaan berikutnya
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        // 3. Jika sudah mencapai maxRetries, lempar error untuk ditangani oleh fungsi utama
        console.error(`Gagal melakukan fetch setelah ${maxRetries} percobaan.`);
        throw error;
      }
    }
  }
};

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
      const API_URL = `${API_BASE_URL}/api/wilayah/provinces.json`;
      const MAX_RETRIES = 3;
      const initialDelayMs = 1000; // Jeda awal 1 detik

      const response = await retryFetch(
        () => axios.get(API_URL),
        MAX_RETRIES,
        initialDelayMs,
      );

      const fetchedProvince = response.data.data ?? [];

      set({
        province: fetchedProvince,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Failed to fetch province after retries:", error);

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
      const API_URL = `${API_BASE_URL}/api/wilayah/regencies/${code}.json`;

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
      const API_URL = `${API_BASE_URL}/api/wilayah/districts/${code}.json`;

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
      const API_URL = `${API_BASE_URL}/api/wilayah/villages/${code}.json`;

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
