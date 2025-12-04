import axios from "axios";
import { is } from "zod/v4/locales";
import { create } from "zustand";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useRegisterMitraCampus = create((set, get) => ({
  // State
  isVerify: null,
  isLoadingRegister: false,
  abortController: null,
  isLoading: false,
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
    // 1. Batalkan request sebelumnya jika masih berjalan
    const currentController = get().abortController;
    if (currentController) {
      currentController.abort();
    }

    // 2. Buat controller baru
    const controller = new AbortController();
    set({
      isLoading: true,
      errorVerificationCampus: null,
      abortController: controller, // Simpan controller baru
    });

    try {
      const API_URL = `${API_BASE_URL}/check-verification-status`;

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const getVerificationStatus = response.data.data ?? [];

      set({
        isVerify: getVerificationStatus,
        isLoading: false,
        errorVerificationCampus: null,
        abortController: null, // Hapus controller setelah selesai
      });
    } catch (error) {
      console.error("Failed to fetch verification status:", error); // Ubah log

      if (axios.isCancel(error) || error.name === "AbortError") {
        console.log("Request dibatalkan saat render ulang.");
        set({ isLoading: false, abortController: null });
        return;
      }

      const errorMessage =
        error.response?.data?.message || "Gagal mengambil data verifikasi.";

      set({
        isLoading: false,
        errorVerificationCampus: errorMessage,
      });
    }
  },

  // function for clear state
  cleanup: () => {
    const controller = get().abortController;
    if (controller) {
      controller.abort();
    }
    // Reset semua state
    set({
      isVerify: null,
      isLoadingRegister: false,
      abortController: null,
      isLoading: false,
      errorRegisterMitraCampus: null,
      errorVerificationCampus: null,
    });
  },
}));

export default useRegisterMitraCampus;
