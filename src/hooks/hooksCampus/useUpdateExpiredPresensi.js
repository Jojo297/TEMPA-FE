import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useUpdateExpiredPresensi = create((set) => ({
  // State
  isLoading: false,
  errorEditExpired: null,
  successMessage: null,

  // Actions
  /**
   * Mengedit data lengkap profil kampus.
   * Endpoint: PUT /edit-data-campus
   * @param {string} token - Token JWT otentikasi.
   * @param {object} payload - Data yang akan dikirim (campusName, emailCampus, description, websiteCampus, province, city, subdistrict, ward, lat, lng).
   */
  editExpiredPresensi: async (token, payload, idProgram) => {
    set({ isLoading: true, error: null, successMessage: null });

    try {
      const API_URL = `${API_BASE_URL}/update-expired-presensi/${idProgram}`;

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
        errorEditExpired: null,
      });

      return { success: true, message: successMsg, data: response.data.data };
    } catch (error) {
      console.error("Gagal memperbarui expired presensi:", error);

      const errorMessage =
        error.response?.data?.message || "Gagal memperbarui expired presensi.";

      set({
        isLoading: false,
        errorEditExpired: errorMessage,
        successMessage: null,
      });
      throw new Error(errorMessage);
    }
  },

  editExpiredPresensiMentor: async (token, payload, idProgram) => {
    set({ isLoading: true, error: null, successMessage: null });

    try {
      const API_URL = `${API_BASE_URL}/mentor/update-expired-presensi-mentor/${idProgram}`;

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
        errorEditExpired: null,
      });

      return { success: true, message: successMsg, data: response.data.data };
    } catch (error) {
      console.error("Gagal memperbarui expired presensi:", error);

      const errorMessage =
        error.response?.data?.message || "Gagal memperbarui expired presensi.";

      set({
        isLoading: false,
        errorEditExpired: errorMessage,
        successMessage: null,
      });
      throw new Error(errorMessage);
    }
  },

  // Fungsi untuk membersihkan state
  clearState: () =>
    set({ isLoading: false, errorEditExpired: null, successMessage: null }),
}));

export default useUpdateExpiredPresensi;
