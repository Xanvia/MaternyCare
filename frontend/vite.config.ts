import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  build: {
    outDir: "dist",
    manifest: true,
    rollupOptions: {
      output: {
        format: "es",
        manualChunks: undefined,
      },
    },
    cssMinify: true,
    cssCodeSplit: true,
  },
  server: {
    port: 3005,
  },
});
