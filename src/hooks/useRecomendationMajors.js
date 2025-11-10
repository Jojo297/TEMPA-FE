// File: src/hooks/useRecomendationMajors.js

import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useRecomendationMajors = create((set) => ({
  // State
  recomendationMajors: [],
  isLoadingSubmit: false, // use for submit form (getMajors)
  isLoadingFetch: false, // use for (fetchResponseAi)
  error: null,

  // Actions submit form
  getMajors: async (token, data) => {
    set({ isLoadingSubmit: true, error: null });
    try {
      const API_URL = `${API_BASE_URL}/mentee/recomendation-major`;

      await axios.post(
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
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      set({
        isLoadingSubmit: false,
        error: null,
      });
    } catch (error) {
      console.error("Failed to post submission:", error);
      const errorMessage =
        error.response?.data?.message ===
        "The model is overloaded. Please try again later."
          ? "Server AI sedang sibuk. Mohon tunggu 1-2 menit lalu coba KIRIM ULANG."
          : error.response?.data?.message || "Gagal mengirim data program.";

      set({
        isLoadingSubmit: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  // Actions get data response ai from database
  fetchResponseAi: async (token) => {
    set({ isLoadingFetch: true, error: null });

    try {
      const API_URL = `${API_BASE_URL}/mentee/get-response`;

      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const fetchedResponseAi = response.data.data.response_ai ?? [];

      set({
        recomendationMajors: fetchedResponseAi,
        isLoadingFetch: false,
        error: null,
      });
    } catch (error) {
      console.error("Failed to fetch response:", error);

      // if status 404 thats means mentee is have never filled out the form
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        set({
          recomendationMajors: [],
          isLoadingFetch: false,
          error: null,
        });
        return;
      }

      // Untuk error lain (500, jaringan, dll) tetap set error
      const errorMessage =
        error.response?.data?.message || "Gagal mengambil response ai.";

      set({
        isLoadingFetch: false,
        error: errorMessage, // Ini akan memicu render Error di komponen
      });
    }
  },

  // function for clear state
  clearRecomdationMajors: () =>
    set({
      recomendationMajors: [],
      isLoadingSubmit: false,
      isLoadingFetch: false,
      error: null,
    }),
}));

export default useRecomendationMajors;
