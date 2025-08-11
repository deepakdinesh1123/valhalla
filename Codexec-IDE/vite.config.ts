import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    define: {
      'process.env.VITE_WS_HOST': JSON.stringify(env.VITE_WS_HOST),
      'process.env.VITE_WS_PROTOCOL': JSON.stringify(env.VITE_WS_PROTOCOL),
    },
  };
});
