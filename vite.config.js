import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { visualizer } from "rollup-plugin-visualizer";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tailwindcss(),
    ...(mode === "development"
      ? [
          visualizer({
            filename: "dist/stats.html",
            open: true,
            gzipSize: true,
            brotliSize: true,
          }),
        ]
      : []),
  ],
  server: {
    open: true,
    port: mode === "production" ? 5173 : 5174,
  },
  resolve: {
    alias: {
      "#components": resolve(__dirname, "src/components"),
      "#constants": resolve(__dirname, "src/constants"),
      "#store": resolve(__dirname, "src/store"),
      "#hoc": resolve(__dirname, "src/hoc"),
      "#windows": resolve(__dirname, "src/windows"),
    },
  },
  build: {
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-gsap": ["gsap"],
          "vendor-zustand": ["zustand"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
}));
