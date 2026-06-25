import axios from "axios";
import { create } from "zustand";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useGetDetailCampus = create((set) => ({
  // state
  detailCampus: [],
  isLoading: false,
  error: null,

  // get detail program
  fetchDetailCampus: async (token, id) => {
    set({ isLoading: true, error: null });

    try {
      const API_URL = `${API_BASE_URL}/mentee/detail-campus/${id}`;

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
        },
      });

      const fetchDetailCampus = response.data.data;

      // store to state
      set({
        detailCampus: fetchDetailCampus,
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

  // add view campus
  addViewCampus: async (token, id) => {
    try {
      const API_URL = `${API_BASE_URL}/mentee/add-seen-campus/${id}`;

      const response = await axios.post(
        API_URL,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
            "Content-Type": "application/json",
          },
        },
      );

      if (response) {
        sessionStorage.setItem(`viewed_cam_${id}`, "true");
      }
    } catch (error) {
      console.error("Failed to add view campus:", error);

      const errorMessage = error.response?.data?.message;

      if (error.response?.status === 404) {
        set({ error: "404 not found" });
      }
    }
  },

  // clear state
  clearDetailProgram: () =>
    set({ detailCampus: [], isLoadingL: false, errors: false }),
}));

export default useGetDetailCampus;
