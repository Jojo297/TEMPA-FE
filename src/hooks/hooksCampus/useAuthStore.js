import { create } from "zustand";

// Store ini digunakan untuk menyimpan status otentikasi (token).
export const useAuthStore = create((set) => ({
  // State Awal: Coba ambil token dari LocalStorage saat store diinisialisasi
  token: localStorage.getItem("authToken") || null,

  // Action untuk menyimpan/memperbarui token (digunakan saat login berhasil)
  // Store ini menyimpan token di state dan di localStorage.
  setToken: (newToken) => {
    if (newToken) {
      localStorage.setItem("authToken", newToken);
    } else {
      localStorage.removeItem("authToken"); // Jika newToken null, anggap logout
    }
    set({ token: newToken });
  },

  // Action untuk logout
  logout: () => {
    localStorage.removeItem("authToken");
    set({ token: null });
  },
}));
