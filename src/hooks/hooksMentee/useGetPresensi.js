import axios from "axios";
import { create } from "zustand";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useGetPresensi = create((set) => ({
  // State
  res: {},
  isLoadingFetch: false,
  statusCode: null,
  error: null,

  // Actions get data
  getPresensi: async (token, idProgram) => {
    set({ isLoadingFetch: true, error: null, statusCode: null });

    try {
      const API_URL = `${API_BASE_URL}/mentee/presensi/${idProgram}`;

      const response = await axios.get(API_URL, {
        headers: {
          // Mengirim JWT dalam header Authorizationb
          Authorization: `Bearer ${token}`,
        },
      });

      const result = response.data.data;

      set({
        res: result,
        isLoadingFetch: false,
        error: null,
      });
    } catch (error) {
      console.error("Failed to fetch response:", error);

      //   get status code
      const status = error.response?.status;

      const errorMessage =
        error.response?.data?.message || "Gagal mengambil response ai.";

      set({
        isLoadingFetch: false,
        statusCode: status,
        error: errorMessage,
      });
    }
  },

  // function for clear state
  clearState: () =>
    set({ res: {}, isLoadingFetch: false, error: null, statusCode: null }),
}));

export default useGetPresensi;
