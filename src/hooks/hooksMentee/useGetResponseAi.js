import axios from "axios";
import { create } from "zustand";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useGetResponseAi = create((set) => ({
  // State
  getResponseAi: [],
  isLoading: false,
  error: null,

  // Actions get data program mentee
  fetchResponseAi: async (token) => {
    set({ isLoading: true, error: null });

    try {
      const API_URL = `${API_BASE_URL}/mentee/get-response`;

      const response = await axios.get(API_URL, {
        headers: {
          // Mengirim JWT dalam header Authorizationb
          Authorization: `Bearer ${token}`,
        },
      });

      const fetchedResponseAi = response.data.data;

      set({
        getResponseAi: fetchedResponseAi,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Failed to fetch response:", error);

      const errorMessage =
        error.response?.data?.message || "Gagal mengambil response ai.";

      set({
        isLoading: false,
        error: errorMessage,
      });
    }
  },

  // function for clear state
  clearResponseAi: () =>
    set({ getResponseAi: [], isLoading: false, error: null }),
}));

export default useGetResponseAi;
