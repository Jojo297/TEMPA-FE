import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useEditMateri = create((set) => ({
  isLoading: false,
  error: null,
  isSuccess: false,

  editMateri: async (token, idMateri, formData) => {
    set({ isLoading: true, error: null, isSuccess: false });
    try {
      // Menggunakan axios.put sesuai dengan router.put di backend
      const response = await axios.put(
        `${API_BASE_URL}/edit-materi/${idMateri}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      set({ isLoading: false, isSuccess: true });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Gagal memperbarui materi";
      set({ isLoading: false, error: errorMessage });
      throw error;
    }
  },

  resetState: () => set({ isLoading: false, error: null, isSuccess: false }),
}));

export default useEditMateri;
