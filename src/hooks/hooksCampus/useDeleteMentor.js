import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useDeleteMentor = create((set) => ({
  // State
  isLoading: false,
  error: null,
  data: null,

  // Action untuk menghapus mentor
  deleteMentor: async (token, mentorId) => {
    set({ isLoading: true, error: null, data: null });

    try {
      const API_URL = `${API_BASE_URL}/delete-mentor/${mentorId}`;

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

      return { success: true, message: responseData.message };
    } catch (error) {
      console.error("Gagal menghapus mentor:", error);

      const errorMessage =
        error.response?.data?.message || "Gagal menghapus mentor.";
      set({ isLoading: false, error: errorMessage });

      // Mengembalikan objek error agar mudah ditangani di komponen
      return { success: false, error: errorMessage };
    }
  },

  // Fungsi untuk membersihkan state
  clearState: () => set({ isLoading: false, error: null, data: null }),
}));

export default useDeleteMentor;
