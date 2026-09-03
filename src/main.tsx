import { createRoot } from 'react-dom/client'
import App from './App'
import './assets/index.css'
import { AnimatePresence } from 'framer-motion'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(<BrowserRouter>
  <AnimatePresence mode='wait'>
    <App />
  </AnimatePresence>
</BrowserRouter>)

declare global {
  interface Window {
    useTitle: (Title: string) => void
  }
}