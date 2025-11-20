// Asumsi Anda telah menginstal dan mengimpor jwt-decode
import { jwtDecode } from "jwt-decode";

export const isTokenValid = (token, allowedRoles) => {
  if (!token) return false;

  try {
    // Pastikan Anda telah mengimpor jwtDecode dengan benar (sesuai jawaban sebelumnya)
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    // Cek 1: Token Kadaluwarsa
    if (decoded.exp <= currentTime) {
      return false;
    }

    // Cek 2: Role
    // Pastikan decoded.role (misalnya: 'mentee') ada di dalam array allowedRoles
    // Jika allowedRoles tidak berupa array, kita anggap token tidak valid untuk keamanan
    if (!Array.isArray(allowedRoles) || !allowedRoles.includes(decoded.role)) {
      return false;
    }

    // Jika melewati semua cek, token valid
    return true;
  } catch (error) {
    // Token tidak valid atau rusak
    return false;
  }
};
