import axios from "axios";
import { create } from "zustand";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useRegisterMitraCampus = create((set) => ({
  // State
  isLoading: false,
  error: null,

  // Actions save data campus
  registerMitraCampus: async (token, data) => {
    set({ isLoading: true, error: null });

    try {
      const API_URL = `${API_BASE_URL}/register-mitra-campus`;

      await axios.post(
        API_URL,
        {
          campusName: data.campusName,
          emailCampus: data.emailCampus,
          description: data.description,
          websiteCampus: data.websiteCampus,
          province: data.province,
          city: data.city,
          subdistrict: data.subdistrict,
          ward: data.ward,
          lat: data.lat,
          lng: data.lng,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      set({
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Failed to fetch response:", error);

      const errorMessage =
        error.response?.data?.message || "Gagal menyimpan data!";

      set({
        isLoading: false,
        error: errorMessage,
      });
    }
  },

  // function for clear state
  clearResponseAi: () => set({ isLoading: false, error: null }),
}));

export default useRegisterMitraCampus;
