import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useRegisterProgram = create((set) => ({
  // State
  message: "",
  isLoadingRegister: false,
  errorRegister: null,

  // Actions get data program mentee
  registerProgram: async (token, idProgram) => {
    set({ isLoadingRegister: true, errorRegister: null, message: "" });

    try {
      const API_URL = `${API_BASE_URL}/mentee/register-program/${idProgram}`;

      const response = await axios.post(API_URL, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const successMessage = response.data.message;
      const statusCode = response.data.status;

      set({
        message: successMessage,
        isLoadingRegister: false,
        errorRegister: null,
      });

      return { success: true, message: successMessage, status: statusCode };
    } catch (error) {
      console.error("Failed to register program:", error);

      const errorMessage =
        error.response?.data?.message || "Gagal melakukan pendaftaran program.";

      const statusCode = error.response?.status || 500;
      set({
        isLoadingRegister: false,
        errorRegister: errorMessage,
        status: statusCode,
      });

      throw new Error(errorMessage);
    }
  },

  clearState: () =>
    set({
      message: "",
      isLoadingRegister: false,
      errorRegister: null,
    }),
}));

export default useRegisterProgram;
