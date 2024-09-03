import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    server: {
      port: 3000,
    },
    build: {
      outDir: "../app",
      rollupOptions: {
        input: mode === "production" ? "src/main.tsx" : "index.html",
        output: {
          entryFileNames: "js/main.js",
          chunkFileNames: "js/chunk.js",
          assetFileNames: "css/style.css",
        },
      },
    },
  };
});
