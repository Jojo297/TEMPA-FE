import { useState, useCallback } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useGetAllMentors = () => {
  const [mentors, setMentors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMentors = useCallback(async (token) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/all-mentors`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        // Jika status 404 (tidak ditemukan), anggap sebagai array kosong, bukan error.
        if (response.status === 404) {
          setMentors([]);
        } else {
          throw new Error(result.message || "Gagal mengambil data mentor.");
        }
      } else {
        setMentors(result.data || []);
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching mentors:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    mentors,
    isLoading,
    error,
    fetchMentors,
  };
};

export default useGetAllMentors;
