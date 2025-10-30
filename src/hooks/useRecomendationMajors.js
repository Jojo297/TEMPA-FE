import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useRecomendationMajors = create((set) => ({
  // State
  recomendationMajors: [],
  isLoading: false,
  error: null,

  // Actions get data program mentee
  getMajors: async (token, data) => {
    set({ isLoading: true, error: null });

    try {
      console.log(data);
      const API_URL = `${API_BASE_URL}/mentee/recomendation-major`; // Ganti dengan URL API Anda

      const response = await axios.post(
        API_URL,
        {
          q1: data.q1,
          q2: data.q2,
          q3: data.q3,
          q4: data.q4,
          q5: data.q5,
          q6: data.q6,
          q7: data.q7,
          q8: data.q8,
          q9: data.q9,
          q10: data.q10,
        },
        {
          headers: {
            // Mengirim JWT dalam header Authorization
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const fetchedPrograms = response.data.data;

      set({
        recomendationMajors: fetchedPrograms,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Failed to fetch programs:", error);

      const errorMessage =
        error.response?.data?.message ===
        "The model is overloaded. Please try again later."
          ? "Server AI sedang sibuk. Mohon tunggu 1-2 menit lalu coba KIRIM ULANG."
          : error.response?.data?.message || "Gagal mengambil data program.";

      set({
        isLoading: false,
        error: errorMessage,
      });
    }
  },

  // function for clear state
  clearRecomdationMajors: () =>
    set({ recomendationMajors: [], isLoading: false, error: null }),
}));

export default useRecomendationMajors;
