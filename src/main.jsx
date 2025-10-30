import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./App.jsx";
import { Toaster } from "sonner";
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster position="top-right" richColors />
    <RouterProvider router={router} />
  </StrictMode>
);
