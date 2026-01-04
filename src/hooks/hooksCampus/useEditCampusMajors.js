import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useEditCampusMajors = create((set) => ({
  // State
  isLoading: false,
  error: null,
  successMessage: null,

  /**
   * Menambahkan satu atau lebih jurusan baru ke kampus yang sedang login.
   * Menggunakan endpoint: POST /add-majors-campus
   * @param {object} params - Parameter untuk fungsi.
   * @param {string} params.token - Token JWT otentikasi.
   * @param {Array<{id: number, name: string}>} params.majorsToAdd - Array berisi objek jurusan yang akan ditambahkan.
   */
  addMajorsToCampus: async ({ token, majorsToAdd }) => {
    set({ isLoading: true, error: null, successMessage: null });

    try {
      const API_URL = `${API_BASE_URL}/add-majors-campus`;

      // Backend hanya memerlukan array objek dengan properti 'id'.
      const payload = majorsToAdd.map((major) => ({ id: major.id }));

      const response = await axios.post(API_URL, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const successMsg = response.data.message;
      set({ isLoading: false, successMessage: successMsg });
      return response.data;
    } catch (error) {
      console.error("Gagal menambahkan jurusan ke kampus:", error);
      const errorMessage =
        error.response?.data?.message || "Gagal menambahkan jurusan.";
      set({ isLoading: false, error: errorMessage });
      throw new Error(errorMessage);
    }
  },

  /**
   * Fungsi untuk membersihkan state.
   */
  clearState: () =>
    set({ isLoading: false, error: null, successMessage: null }),
}));

export default useEditCampusMajors;
