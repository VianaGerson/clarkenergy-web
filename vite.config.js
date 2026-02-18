import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://git branch -M maindev/config/
export default defineConfig({
  plugins: [react()],
})
