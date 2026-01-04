import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useAddProgram = create((set) => ({
  // State
  message: "",
  isLoading: false,
  error: null,

  // Action untuk menambahkan program baru
  addProgram: async (token, programData) => {
    set({ isLoading: true, error: null, message: "" });

    try {
      const API_URL = `${API_BASE_URL}/mentor/create-program`;

      // Mengirim programData (yang seharusnya berupa FormData)
      const response = await axios.post(API_URL, programData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Penting untuk upload file
        },
      });

      const successMessage = response.data.message;
      const statusCode = response.data.status;

      set({
        message: successMessage,
        isLoading: false,
        error: null,
      });

      return { success: true, message: successMessage, status: statusCode };
    } catch (error) {
      console.error("Failed to add program:", error);

      const errorMessage =
        error.response?.data?.message || "Gagal menambahkan program baru.";

      const statusCode = error.response?.status || 500;
      set({
        isLoading: false,
        error: errorMessage,
        status: statusCode,
      });

      throw new Error(errorMessage);
    }
  },

  clearState: () =>
    set({
      message: "",
      isLoading: false,
      error: null,
    }),
}));

export default useAddProgram;
