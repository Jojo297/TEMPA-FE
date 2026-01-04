import { create } from "zustand";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useDeleteStandardMajor = create((set) => ({
  isLoading: false,
  error: null,

  deleteMajor: async (token, id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.delete(
        `${BASE_URL}/admin/delete-standard-major/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set({ isLoading: false });
      return {
        success: true,
        message: response.data.message,
      };
    } catch (error) {
      console.error("Error deleting standard major:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Gagal menghapus jurusan.";
      set({ isLoading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },
}));

export default useDeleteStandardMajor;
