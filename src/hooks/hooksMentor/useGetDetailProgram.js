import axios from "axios";
import { create } from "zustand";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useGetDetailProgram = create((set) => ({
  // state
  detailProgram: [],
  mentee: [],
  isLoading: false,
  isLoadingMentee: false,
  errorMentee: null,
  error: null,

  // get detail program
  fetchDetailProgram: async (token, id) => {
    set({ isLoading: true, error: null });

    try {
      const API_URL = `${API_BASE_URL}/mentor/get-detail-program/${id}`;

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const fetchDetailProgram = response.data.data;

      // store to state
      set({
        detailProgram: fetchDetailProgram,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Failed to fetch programs:", error);

      const errorMessage =
        error.response?.data?.message || "Gagal mengambil data program.";

      set({
        isLoading: false,
        error: errorMessage,
      });

      if (error.status == 404) {
        set({ error: "404 not fount" });
      }
    }
  },

  // get detail mentee
  fetchMentee: async (token, id) => {
    set({ isLoadingMentee: true, errorMentee: null });

    try {
      const API_URL = `${API_BASE_URL}/get-detail-program-total-mentee/${id}`;

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const fetchDetailMentee = response.data.data;

      // store to state
      set({
        mentee: fetchDetailMentee,
        isLoadingMentee: false,
        errorMentee: null,
      });
    } catch (error) {
      console.error("Failed to fetch programs:", error);

      const errorMessage =
        error.response?.data?.message || "Gagal mengambil data program.";

      set({
        isLoadingMentee: false,
        errorMentee: errorMessage,
      });

      if (error.status == 404) {
        set({ error: "404 not fount" });
      }
    }
  },

  // clear state
  clearDetailProgram: () =>
    set({
      detailProgram: [],
      mentee: [],
      isLoading: false,
      isLoadingMentee: false,
      errorMentee: null,
      error: null,
    }),
}));

export default useGetDetailProgram;
