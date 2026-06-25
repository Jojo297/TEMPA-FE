import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useGetMajorInterest = create((set) => ({
  majorInterest: [],
  isLoading: false,
  error: null,

  fetchMajorInterest: async (token) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `${API_BASE_URL}/mentee/get-major-interest`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
            "Content-Type": "application/json",
          },
        },
      );

      set({
        isLoading: false,
        majorInterest: response.data.data,
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Terjadi kesalahan saat mengambil minat jurusan.";
      set({
        isLoading: false,
        error: errorMessage,
      });
    }
  },
}));

export default useGetMajorInterest;
