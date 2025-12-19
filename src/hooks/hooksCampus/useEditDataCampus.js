import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useEditDataCampus = create((set) => ({
  // State
  isLoading: false,
  errorEditCampus: null,
  successMessage: null,

  // Actions
  /**
   * Mengedit data lengkap profil kampus.
   * Endpoint: PUT /edit-data-campus
   * @param {string} token - Token JWT otentikasi.
   * @param {object} payload - Data yang akan dikirim (campusName, emailCampus, description, websiteCampus, province, city, subdistrict, ward, lat, lng).
   */
  editDataCampus: async (token, payload) => {
    set({ isLoading: true, error: null, successMessage: null });

    try {
      const API_URL = `${API_BASE_URL}/edit-data-campus`;

      const response = await axios.put(API_URL, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const successMsg = response.data.message;

      set({
        isLoading: false,
        successMessage: successMsg,
        error: null,
      });

      return { success: true, message: successMsg, data: response.data.data };
    } catch (error) {
      console.error("Gagal memperbarui data kampus:", error);

      const errorMessage =
        error.response?.data?.message || "Gagal memperbarui data kampus.";

      set({ isLoading: false, error: errorMessage, successMessage: null });
      throw new Error(errorMessage);
    }
  },

  // Fungsi untuk membersihkan state
  clearState: () =>
    set({ isLoading: false, error: null, successMessage: null }),
}));

export default useEditDataCampus;
