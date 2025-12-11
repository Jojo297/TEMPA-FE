import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useUpdateProgramMentors = create((set) => ({
  isLoading: false,
  error: null,
  success: false,

  updateProgramMentors: async (token, idProgram, mentorsData) => {
    set({ isLoading: true, error: null, success: false });
    try {
      const response = await axios.post(
        `${API_BASE_URL}/update-program-mentors/${idProgram}`,
        mentorsData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      set({ isLoading: false, success: true });
      return { success: true, message: response.data.message };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal memperbarui daftar mentor.";
      set({ isLoading: false, error: errorMessage, success: false });
      throw new Error(errorMessage);
    }
  },
}));

export default useUpdateProgramMentors;
