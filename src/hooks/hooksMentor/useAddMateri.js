import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useAddMateri = create((set) => ({
  isLoading: false,
  error: null,
  isSuccess: false,

  addMateri: async (token, idProgram, data) => {
    set({ isLoading: true, error: null, isSuccess: false });

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("visibility", data.visibility);
      formData.append("type", data.type);

      // Logika kondisional untuk append file atau url
      if (data.type === "file") {
        // Pastikan ada file yang dipilih
        if (data.file && data.file.length > 0) {
          // data.file dari input type="file" adalah FileList, ambil index 0
          formData.append("file", data.file[0]);
        }
      } else if (["kuis", "video"].includes(data.type)) {
        if (data.url) {
          formData.append("url", data.url);
        }
      }

      // Kirim request ke backend
      // Sesuaikan path URL dengan konfigurasi routing backend Anda
      // Berdasarkan context hooksCampus, saya asumsikan ada prefix /campus
      const response = await axios.post(
        `${API_BASE_URL}/mentor/add-materi/${idProgram}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      set({ isLoading: false, isSuccess: true });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Terjadi kesalahan saat menambahkan materi.";

      set({ isLoading: false, error: errorMessage, isSuccess: false });
      throw error;
    }
  },

  resetState: () => set({ isLoading: false, error: null, isSuccess: false }),
}));

export default useAddMateri;
