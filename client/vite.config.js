import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // the port the client runs on in development
    port: 3000,
    // this proxies the requests to /api/ to the backend server
    // proxy: {
    //   "/api/": {
    //     target: `${import.meta.env.VITE_SERVER_URL}/api/`,
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },
  },
  build: {
    outDir: "build",
  },
});
