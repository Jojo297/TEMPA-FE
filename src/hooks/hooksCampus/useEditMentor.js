import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useEditMentor = create((set) => ({
  isLoading: false,
  error: null,
  success: false,

  editMentor: async (token, mentorId, payload) => {
    set({ isLoading: true, error: null, success: false });
    try {
      const response = await axios.put(
        `${API_BASE_URL}/edit-mentor/${mentorId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set({ isLoading: false, success: true });
      return { success: true, message: response.data.message };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal memperbarui mentor.";
      set({ isLoading: false, error: errorMessage, success: false });
      throw new Error(errorMessage);
    }
  },

  clearState: () => set({ isLoading: false, error: null, success: false }),
}));

export default useEditMentor;
