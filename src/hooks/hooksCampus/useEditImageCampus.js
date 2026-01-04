import axios from "axios";
import { create } from "zustand";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useEditImageCampus = create((set) => ({
  // State
  isLoading: false,
  error: null,
  successMessage: null,

  // Actions
  /**
   * Mengedit gambar logo dan/atau banner kampus.
   * Menggunakan endpoint: PUT /edit-image-campus
   * @param {object} params - Parameter untuk fungsi.
   * @param {string} params.token - Token JWT otentikasi.
   * @param {File} [params.logo] - File gambar logo baru (opsional).
   * @param {File} [params.banner] - File gambar banner baru (opsional).
   */
  editImageCampus: async ({ token, logo, banner, campus_name }) => {
    set({ isLoading: true, error: null, successMessage: null });

    try {
      const API_URL = `${API_BASE_URL}/edit-image-campus`;
      const formData = new FormData();

      if (logo) {
        formData.append("logo", logo);
      }
      if (banner) {
        formData.append("banner", banner);
      }

      if (campus_name) {
        formData.append("campus_name", campus_name);
      }
      //   console.log(campus_name);
      // Jika tidak ada file yang dipilih, lewati proses unggah.
      if (!logo && !banner && campus_name == null) {
        set({ isLoading: false });
        return { message: "Tidak ada gambar yang diubah." };
      }

      const response = await axios.put(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const successMsg = response.data.message;

      set({
        isLoading: false,
        error: null,
        successMessage: successMsg,
      });

      return response.data;
    } catch (error) {
      console.error("Gagal mengedit gambar kampus:", error);

      const errorMessage =
        error.response?.data?.message || "Gagal mengedit gambar kampus.";

      set({
        isLoading: false,
        error: errorMessage,
        successMessage: null,
      });
      throw new Error(errorMessage);
    }
  },

  /**
   * Fungsi untuk membersihkan state.
   */
  clearState: () =>
    set({ isLoading: false, error: null, successMessage: null }),
}));

export default useEditImageCampus;
