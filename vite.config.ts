import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import handler from "./api/quote/request";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === "/api/quote/request" && req.method === "POST") {
          let bodyStr = "";
          req.on("data", (chunk) => {
            bodyStr += chunk;
          });
          req.on("end", async () => {
            try {
              (req as any).body = JSON.parse(bodyStr);
            } catch (err) {
              (req as any).body = {};
            }

            // Mock Vercel response helper methods
            (res as any).status = (code: number) => {
              res.statusCode = code;
              return res;
            };
            (res as any).json = (data: any) => {
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify(data));
              return res;
            };

            try {
              await handler(req, res);
            } catch (err) {
              console.error("Vite API mock error:", err);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: "Internal server error" }));
            }
          });
          return;
        }
        next();
      });
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1200,
  },
}));
