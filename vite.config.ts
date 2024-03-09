import react from "@vitejs/plugin-react"
import path from "node:path"
import { defineConfig } from "vite"
import { qrcode } from "vite-plugin-qrcode"
import rune from "vite-plugin-rune"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.join(__dirname, "src"),
    },
  },
  base: "", // Makes paths relative
  plugins: [
    qrcode(), // only applies in dev mode
    react(),
    rune({ logicPath: path.resolve("./src/logic/logic.ts") }),
  ],
})
