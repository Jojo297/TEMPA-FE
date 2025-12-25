import { create } from "zustand";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useUpdateStandardMajor = create((set) => ({
  isLoading: false,
  error: null,
  updateMajor: async (token, id, formData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(
        `${BASE_URL}/admin/update-standard-major/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      set({ isLoading: false });
      return { success: true, message: response.data.message };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Gagal memperbarui jurusan.";
      set({ isLoading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },
}));

export default useUpdateStandardMajor;
