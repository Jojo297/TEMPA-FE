import axios from "axios";
import { is } from "zod/v4/locales";
import { create } from "zustand";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useRegisterMitraCampus = create((set) => ({
  // State
  isVerify: null,
  isLoadingRegister: false,
  errorRegisterMitraCampus: null,
  errorVerificationCampus: null,

  // Actions save data campus
  registerMitraCampus: async (token, data) => {
    set({ isLoadingRegister: true, errorRegisterMitraCampus: null });

    try {
      const API_URL = `${API_BASE_URL}/register-mitra-campus`;

      await axios.post(
        API_URL,
        {
          campusName: data.campusName,
          emailCampus: data.emailCampus,
          description: data.description,
          websiteCampus: data.websiteCampus,
          province: data.valueProvince,
          city: data.valueCity,
          subdistrict: data.valueSubdistrict,
          ward: data.valueWard,
          lat: data.selectedLocation.lat,
          lng: data.selectedLocation.lng,
          isCampusVerifiedByApi: data.isCampusVerifiedByApi,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      set({
        isLoadingRegister: false,
        errorRegisterMitraCampus: null,
      });
      return true;
    } catch (error) {
      console.error("Failed to fetch response:", error);

      const errorMessage =
        error.response?.data?.message || "Gagal menyimpan data!";

      set({
        isLoadingRegister: false,
        errorRegisterMitraCampus: errorMessage,
      });
      return false;
    }
  },

  // check verification status campus
  checkVeirificationCampus: async (token) => {
    set({ isLoading: true, error: null });

    try {
      const API_URL = `${API_BASE_URL}/check-verification-status`;

      const response = await axios.get(API_URL, {
        headers: {
          // Mengirim JWT dalam header Authorizationb
          Authorization: `Bearer ${token}`,
        },
      });

      const getVerificationStatus = response.data.data ?? [];

      set({
        isVerify: getVerificationStatus,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Failed to fetch province:", error);

      const errorMessage =
        error.response?.data?.message || "Gagal mengambil data province.";

      set({
        isLoading: false,
        errorVerificationCampus: errorMessage,
      });
    }
  },

  // function for clear state
  clearResponseAi: () =>
    set({
      isVerify: null,
      isLoading: false,
      errorRegisterMitraCampus: null,
      errorVerificationCampus: null,
    }),
}));

export default useRegisterMitraCampus;
