import { useEffect } from "react";
import { useBlocker } from "react-router-dom";

/**
 * Hook untuk memblokir navigasi client-side (useNavigate).
 * @param {boolean} shouldBlock - True jika navigasi harus diblokir (misalnya, form isDirty).
 * @param {string} message - Pesan yang akan ditampilkan (hanya berfungsi di versi lama React Router).
 */
export const useNavigationBlocker = (shouldBlock, message) => {
  // useBlocker akan menyediakan 'state' dari blocker tersebut
  let blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      shouldBlock && currentLocation.pathname !== nextLocation.pathname
  );

  useEffect(() => {
    // Jika blocker aktif (misalnya user klik link)
    if (blocker.state === "blocked") {
      // 1. Tampilkan pop-up konfirmasi kustom Anda (bukan pop-up browser)
      if (window.confirm(message)) {
        // 2. Jika user mengonfirmasi (OK), lanjutkan navigasi
        blocker.proceed();
      } else {
        // 3. Jika user membatalkan (Cancel), reset blocker
        blocker.reset();
      }
    }
  }, [blocker, message]);

  // Catatan: Pastikan Anda menangani juga pop-up browser (window.onbeforeunload)
  // yang sudah Anda implementasikan sebelumnya, karena useBlocker tidak menanganinya.
};
