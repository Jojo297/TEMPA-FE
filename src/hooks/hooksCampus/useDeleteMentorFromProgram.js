import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useDeleteMentorFromProgram = create((set) => ({
  isLoading: false,
  error: null,

  deleteMentorFromProgram: async (token, idProgramMentor) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/delete-program-mentor/${idProgramMentor}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set({ isLoading: false });
      return { success: true, message: response.data.message };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal menghapus mentor dari program.";
      set({ isLoading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },
}));

export default useDeleteMentorFromProgram;
