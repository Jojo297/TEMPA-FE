import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useSaveMajorInterest = create((set) => ({
  isLoadingMajorInterest: false,
  errorMajorInterest: null,
  message: null,

  saveMajorInterest: async (token, selectedMajors) => {
    set({
      isLoadingMajorInterest: true,
      errorMajorInterest: null,
      message: null,
    });
    try {
      const response = await axios.post(
        `${API_BASE_URL}/mentee/save-major-interest`,
        { selectedMajors },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set({
        isLoadingMajorInterest: false,
        message: response.data.message,
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Terjadi kesalahan saat menyimpan minat jurusan.";
      set({
        isLoadingMajorInterest: false,
        error: errorMessage,
      });
      throw error;
    }
  },
}));

export default useSaveMajorInterest;
