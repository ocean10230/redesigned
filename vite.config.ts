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
        entryFileNames: "chunks/[name].js",
        chunkFileNames: "chunks/[name].js",
        assetFileNames: "assets/[name].[ext]",
        
        manualChunks(id) {
          if (id.includes("node_modules")) {
            console.log(id)

            if (id.includes("three.core"))
              return "three.core"
            else if (id.includes("three.module"))
              return "three.module"
            else if (id.includes("router"))
              return "router"
            else if (id.includes("react"))
              return "react"
            else if (id.includes("tailwind"))
              return "tailwind"
            else if (id.includes("framer"))
              return "motion"
            else if (id.includes("dom"))
              return "dom"
            else if (id.includes("lucide"))
              return "lucide"
            else 
              return "vendor"
          }
        },
      },
    },
  },
})
