import axios from "axios";
import { create } from "zustand";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * @typedef {object} ProgramItem
 * @property {number} id - ID unik program.
 * @property {string} program_status - Status program (e.g., 'open', 'closed').
 * @property {string} program_name - Nama program.
 * @property {string | null} major_name - Nama jurusan terkait.
 * @property {string} description - Deskripsi singkat program.
 * @property {string} image_url - URL gambar program yang sudah diformat.
 * @property {string} start_date - Tanggal mulai program (ISO string).
 * @property {string} end_date - Tanggal berakhir program (ISO string).
 * @property {number} capacity - Kapasitas maksimal mentee.
 * @property {Array<{type_sesi: string; sesi_date: string;}>} sesi_program - Detail sesi program.
 */

const useGetAllProgram = create((set) => ({
  // State
  /** @type {ProgramItem[] | null} */
  allPrograms: null,
  isLoadingPrograms: false,
  errorPrograms: null,

  // Actions
  /**
   * Mengambil semua program yang dibuat oleh kampus yang sedang login.
   * Menggunakan endpoint: GET /get-program-campus
   * @param {string} token - Token JWT otentikasi.
   */
  getAllPrograms: async (token) => {
    set({ isLoadingPrograms: true, errorPrograms: null, allPrograms: null });

    try {
      const API_URL = `${API_BASE_URL}/mentor/get-mentor-programs`;

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Data yang dikembalikan dari backend adalah ProgramItem[]
      /** @type {ProgramItem[]} */
      const programsData = response.data.data;

      set({
        allPrograms: programsData,
        isLoadingPrograms: false,
        errorPrograms: null,
      });
      return programsData;
    } catch (error) {
      console.error("Failed to fetch all programs:", error);

      const errorMessage =
        error.response?.data?.message ||
        "Gagal mengambil daftar program kampus.";

      set({
        isLoadingPrograms: false,
        errorPrograms: errorMessage,
        allPrograms: [], // Set ke array kosong jika gagal
      });
      return [];
    }
  },

  /**
   * Fungsi untuk membersihkan state program.
   */
  clearProgramState: () =>
    set({
      allPrograms: null,
      isLoadingPrograms: false,
      errorPrograms: null,
    }),
}));

export default useGetAllProgram;
