import { create } from "zustand";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useAddStandardMajor = create((set) => ({
  isLoading: false,
  error: null,
  data: null,

  addMajor: async (token, payload) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${BASE_URL}/admin/add-standard-major`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      set({ isLoading: false, data: response.data.data });
      return {
        success: true,
        message: response.data.message,
        data: response.data.data,
      };
    } catch (error) {
      console.error("Error adding standard major:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Gagal menambahkan jurusan.";
      set({ isLoading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },
}));

export default useAddStandardMajor;
