import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useAddMentor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addMentor = async (token, mentorData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/create-mentor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(mentorData),
      });

      const result = await response.json();

      if (!response.ok) {
        // Jika respons tidak ok, lempar error dengan pesan dari backend
        throw new Error(result.message || "Gagal menambahkan mentor.");
      }

      // Jika berhasil
      return { success: true, message: result.message };
    } catch (err) {
      // Tangkap error (baik dari fetch maupun dari throw di atas)
      setError(err.message);
      console.error("Error adding mentor:", err);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addMentor,
    isLoading,
    error,
  };
};

export default useAddMentor;
