/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dotenv from "dotenv";

// .env 파일 로드
dotenv.config();

const isProxyOn = process.env.VITE_IS_PROXY_ON === "true";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    host: true,
    allowedHosts: ["siop-dev.skku.edu", "sucpi.skku.edu"],
    port: 5173,
    ...(isProxyOn
      ? {
          proxy: {
            "/api": {
              target: "http://siop-dev.skku.edu:8080",
              changeOrigin: true,
              secure: false,
            },
          },
        }
      : {}),
  },
});
