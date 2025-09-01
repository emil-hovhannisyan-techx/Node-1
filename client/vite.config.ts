import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      "/students": "http://localhost:3000", // Proxy student API calls to backend
      "/classes": "http://localhost:3000", // Proxy class API calls to backend
    },
  },
});
