import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useUpdateLocationCampus = create((set) => ({
  isLoading: false,
  error: null,
  successMessage: null,

  /**
   * Memperbarui lokasi kampus.
   * Endpoint: PUT /update-location
   * @param {string} token - Token JWT otentikasi.
   * @param {object} payload - Data lokasi (idCampus, province, city, subdistrict, ward, lat, lng).
   */
  updateLocation: async (token, payload) => {
    set({ isLoading: true, error: null, successMessage: null });

    try {
      const response = await axios.put(
        `${API_BASE_URL}/update-location`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      set({
        isLoading: false,
        successMessage: response.data.message,
        error: null,
      });

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal memperbarui lokasi kampus.";

      set({ isLoading: false, error: errorMessage });
      throw error;
    }
  },

  clearState: () =>
    set({ isLoading: false, error: null, successMessage: null }),
}));

export default useUpdateLocationCampus;
