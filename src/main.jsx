import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./App.jsx";
import { Toaster } from "sonner";
import { RouterProvider } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TooltipProvider>
      <Toaster position="top-right" richColors closeButton icons />
      <RouterProvider router={router} />
    </TooltipProvider>
  </StrictMode>
);
