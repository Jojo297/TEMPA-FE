import { create } from "zustand";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useGetDetailStandardMajor = create((set) => ({
  detailMajor: null,
  isLoading: false,
  error: null,

  fetchDetailStandardMajor: async (token, id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `${BASE_URL}/admin/detail-standard-major/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set({
        detailMajor: response.data.data,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error fetching detail standard major:", error);
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Terjadi kesalahan saat mengambil detail data",
        isLoading: false,
      });
    }
  },
}));

export default useGetDetailStandardMajor;
