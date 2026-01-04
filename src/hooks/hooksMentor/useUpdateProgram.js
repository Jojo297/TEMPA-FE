import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useUpdateProgram = create((set) => ({
  // State
  isLoading: false,
  error: null,
  data: null,

  // Action untuk memperbarui program
  updateProgram: async (token, programId, formData) => {
    set({ isLoading: true, error: null, data: null });

    try {
      const API_URL = `${API_BASE_URL}/mentor/edit-program/${programId}`;

      const response = await axios.put(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "multipart/form-data" tidak perlu di-set manual
          // untuk axios saat mengirim FormData, browser akan menanganinya.
        },
      });

      const responseData = response.data;

      set({
        data: responseData,
        isLoading: false,
        error: null,
      });

      return responseData; // Mengembalikan data jika berhasil
    } catch (error) {
      console.error("Failed to update program:", error);

      const errorMessage =
        error.response?.data?.message || "Gagal memperbarui program.";
      set({
        isLoading: false,
        error: errorMessage,
      });

      throw new Error(errorMessage);
    }
  },

  // Action untuk menghapus program
  deleteProgram: async (token, programId) => {
    set({ isLoading: true, error: null, data: null });

    try {
      const API_URL = `${API_BASE_URL}/mentor/delete-program/${programId}`;

      const response = await axios.delete(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = response.data;

      set({
        data: responseData,
        isLoading: false,
        error: null,
      });

      return responseData;
    } catch (error) {
      console.error("Failed to delete program:", error);

      const errorMessage =
        error.response?.data?.message || "Gagal menghapus program.";
      set({ isLoading: false, error: errorMessage });
      throw new Error(errorMessage);
    }
  },

  clearState: () => set({ isLoading: false, error: null, data: null }),
}));

export default useUpdateProgram;
