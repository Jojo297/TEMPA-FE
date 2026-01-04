import axios from "axios";
import { create } from "zustand";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useRejectCampus = create((set) => ({
  isLoadingReject: false,
  errorReject: null,
  successMessage: null,

  rejectCampus: async (token, id, reason) => {
    set({ isLoadingReject: true, errorReject: null, successMessage: null });

    try {
      const API_URL = `${API_BASE_URL}/admin/reject-campus/${id}`;
      const response = await axios.put(
        API_URL,
        { reason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set({
        isLoadingReject: false,
        successMessage: response.data.message,
        errorReject: null,
      });

      return { success: true, message: response.data.message };
    } catch (error) {
      console.error("Gagal menolak kampus:", error);
      const errorMessage =
        error.response?.data?.message || "Gagal menolak kampus.";

      set({
        isLoadingReject: false,
        errorReject: errorMessage,
        successMessage: null,
      });

      return { success: false, message: errorMessage };
    }
  },
}));

export default useRejectCampus;
