// File: src/hooks/useRecomendationMajors.js

import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useRecomendationMajors = create((set) => ({
  // State
  recomendationMajors: [],
  isLoadingSubmit: false, // Digunakan untuk submit form (getMajors)
  isLoadingFetch: false, // Digunakan untuk cek hasil awal (fetchResponseAi)
  error: null,

  // Actions get data program mentee
  getMajors: async (token, data) => {
    set({ isLoadingSubmit: true, error: null }); // <-- Gunakan isLoadingSubmit

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

      // Setelah POST berhasil, kita TIDAK mengupdate data di sini,
      // tapi akan memanggil fetchResponseAi di komponen.
      set({
        isLoadingSubmit: false, // <-- Setel ke false
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
        isLoadingSubmit: false, // <-- Setel ke false
        error: errorMessage,
      });
      throw error; // Lempar error agar bisa di-catch saat submit
    }
  },

  // Actions get data program mentee
  fetchResponseAi: async (token) => {
    set({ isLoadingFetch: true, error: null }); // <-- Gunakan isLoadingFetch

    try {
      const API_URL = `${API_BASE_URL}/mentee/get-response`;

      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // PENTING: Asumsi struktur data adalah response.data.data.response_ai
      // Jika response.data.data sudah berupa array/objek rekomendasi,
      // hapus .response_ai, tapi saya asumsikan perlu sesuai pengalaman sebelumnya.
      const fetchedResponseAi =
        response.data.data.response_ai || response.data.data;

      set({
        recomendationMajors: fetchedResponseAi,
        isLoadingFetch: false, // <-- Setel ke false
        error: null,
      });
    } catch (error) {
      console.error("Failed to fetch response:", error);

      const errorMessage =
        error.response?.data?.message || "Gagal mengambil response ai.";

      set({
        isLoadingFetch: false, // <-- Setel ke false
        error: errorMessage,
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
