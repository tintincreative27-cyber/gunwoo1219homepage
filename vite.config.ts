import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const openaiKey = "" || env.OPENAI_API_KEY || env.VITE_OPENAI_API_KEY;

  return {
    server: {
      host: "::",
      port: 8080,
      proxy: openaiKey
        ? {
            "/api/openai": {
              target: "https://api.openai.com",
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api\/openai/, ""),
              configure: (proxy) => {
                proxy.on("proxyReq", (proxyReq) => {
                  proxyReq.setHeader("Authorization", `Bearer ${openaiKey}`);
                });
              },
            },
          }
        : undefined,
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
