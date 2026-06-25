import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./App.jsx";
import { Toaster } from "sonner";
import { RouterProvider } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

axios.defaults.baseURL = API_BASE_URL;

// Set Header bypass Ngrok globally
axios.defaults.headers.common["ngrok-skip-browser-warning"] = "true";

axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster position="top-right" richColors closeButton icons />
        <RouterProvider router={router} />
      </TooltipProvider>
    </HelmetProvider>
  </StrictMode>,
);
