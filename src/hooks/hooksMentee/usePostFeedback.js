import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const usePostFeedback = create((set) => ({
  // State
  message: "",
  isLoading: false,
  error: null,

  // Action
  postFeedback: async (token, idProgram, data) => {
    set({ isLoading: true, error: null, message: "" });

    try {
      const API_URL = `${API_BASE_URL}/mentee/program-feedback/${idProgram}`;

      const response = await axios.post(
        API_URL,
        {
          rating: data.rating,
          feedback: data.feedback,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set({
        isLoading: false,
        message: response.data.message,
        error: null,
      });

      return response.data;
    } catch (error) {
      console.error("Gagal mengirim feedback:", error);
      const errorMessage =
        error.response?.data?.message || "Gagal mengirim feedback.";

      set({
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  clearState: () => set({ isLoading: false, error: null, message: "" }),
}));

export default usePostFeedback;
