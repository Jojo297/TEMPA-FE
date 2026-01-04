import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      path: "path-browserify",
    },
  },
  server: {
    proxy: {
      "/api/wilayah": {
        target: "https://wilayah.id/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/wilayah/, ""),
      },
      allowedHosts: [
        "pegasus-accepted-surely.ngrok-free.app",
        "*.ngrok-free.app",
      ],
    },
  },
});
