import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      _di: path.resolve(__dirname, 'src/_di'),
      core: path.resolve(__dirname, 'src/core'),
      ui: path.resolve(__dirname, 'src/ui'),
    },
  },
})
