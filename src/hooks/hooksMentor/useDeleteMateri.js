import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useDeleteMateri = create((set) => ({
  isLoading: false,
  error: null,
  isSuccess: false,

  deleteMateri: async (token, idMateri) => {
    set({ isLoading: true, error: null, isSuccess: false });
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/mentor/delete-materi/${idMateri}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set({ isLoading: false, isSuccess: true });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Gagal menghapus materi.";
      set({ isLoading: false, error: errorMessage, isSuccess: false });
      throw error;
    }
  },

  resetState: () => set({ isLoading: false, error: null, isSuccess: false }),
}));

export default useDeleteMateri;
