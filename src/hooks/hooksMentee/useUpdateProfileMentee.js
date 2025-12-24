import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useUpdateProfileMentee = create((set) => ({
  isLoadingEdit: false,
  errorEdit: null,
  message: null,

  updateProfile: async (token, formData) => {
    set({ isLoadingEdit: true, errorEdit: null, message: null });
    try {
      const response = await axios.put(
        `${API_BASE_URL}/mentee/edit-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      set({ isLoadingEdit: false, message: response.data.message });
      return response.data;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Gagal memperbarui profil.";
      set({ isLoadingEdit: false, errorEdit: errorMsg });
      throw error;
    }
  },
}));

export default useUpdateProfileMentee;
