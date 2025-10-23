import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function DashboardAdmin() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    try {
      setIsLoading(true);
      localStorage.removeItem("userJwt");
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="flex flex-col gap-2 justify-center items-center h-screen font-bold">
        Dashboard Admin
        <Button onClick={() => handleLogout()}>Logout</Button>
      </div>
    </>
  );
}
