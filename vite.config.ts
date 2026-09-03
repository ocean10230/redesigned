import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';
import path from 'path'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
   build: {
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
        
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("three"))
              return "three"
            else if (id.includes("react"))
              return "react"
            else if (id.includes("tailwind"))
              return "tailwind"
            else if (id.includes("framer"))
              return "motion"
            else 
              return "vendor"
          }
        },
      },
    },
  },
})
