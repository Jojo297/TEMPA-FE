import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useGetProfileMentee = create((set) => ({
  profile: null,
  isLoading: false,
  error: null,

  fetchProfile: async (token) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_BASE_URL}/mentee/get-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const profileData = response.data.data;
      set({ profile: profileData, isLoading: false });
      return profileData;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal mengambil data profil.";
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },
}));

export default useGetProfileMentee;
