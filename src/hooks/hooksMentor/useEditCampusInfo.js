import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useEditCampusInfo = create((set) => ({
  // State
  isLoading: false,
  error: null,
  successMessage: null,

  // Actions
  /**
   * Mengedit deskripsi dan/atau visi-misi kampus.
   * Menggunakan endpoint: PUT /edit-description-campus
   * @param {object} params - Parameter untuk fungsi.
   * @param {string} params.token - Token JWT otentikasi.
   * @param {string} [params.description] - Deskripsi baru kampus (opsional).
   * @param {object|string} [params.vision_mission] - Visi misi baru (opsional).
   */
  editCampusDescription: async ({
    token,
    campus_website,
    description,
    vision_mission,
  }) => {
    set({ isLoading: true, error: null, successMessage: null });

    try {
      if (description === undefined && vision_mission === undefined) {
        set({ isLoading: false });
        return { message: "Tidak ada data deskripsi yang diubah." };
      }

      const API_URL = `${API_BASE_URL}/mentor/edit-description-campus`;
      const payload = {};

      if (campus_website !== undefined) payload.campus_website = campus_website;
      if (description !== undefined) payload.description = description;
      if (vision_mission !== undefined) payload.vision_mission = vision_mission;

      const response = await axios.put(API_URL, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const successMsg = response.data.message;
      set({ isLoading: false, successMessage: successMsg });
      return response.data;
    } catch (error) {
      console.error("Gagal mengedit deskripsi kampus:", error);
      const errorMessage =
        error.response?.data?.message || "Gagal memperbarui deskripsi.";
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

export default useEditCampusInfo;
