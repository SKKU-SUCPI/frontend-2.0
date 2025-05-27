import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

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
    // 로컬 개발 환경에서 프록시 설정
    // 상용 서버에서는 프록시 설정 필요 없음
    proxy: {
      "/api": {
        target: "http://siop-dev.skku.edu:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
