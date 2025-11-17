import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // Dev: http://localhost:5173/
  // Build: works under https://myrina.de/quietcv/
  base: mode === "production" ? "/quietcv/" : "/",
}));
