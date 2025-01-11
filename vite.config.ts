import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false
  },
  server: {
    sourcemapIgnoreList(sourcePath) {
      return sourcePath.includes('sc.js') || sourcePath.includes('api.js');
    }
  }
})
