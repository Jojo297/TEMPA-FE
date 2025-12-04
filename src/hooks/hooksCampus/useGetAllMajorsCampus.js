import { useState, useCallback } from "react";

const API_BASE = "https://your-api-url.com"; // Ganti sesuai API kamu

export default function useGetAllMajorsCampus() {
  const [majors, setMajors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMajorCampus = useCallback(async (token) => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch(`${API_BASE}/majors`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error("Gagal fetch majors");
      }

      const json = await res.json();

      // Jika API return: { data: [...] }
      const finalData = json.data || json;

      if (!Array.isArray(finalData)) {
        throw new Error("Format majors tidak valid (bukan array)");
      }

      setMajors(finalData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    majors,
    isLoading,
    error,
    fetchMajorCampus,
  };
}
