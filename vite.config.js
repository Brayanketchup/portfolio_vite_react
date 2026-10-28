import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),  
    tailwindcss(),
  ],
  // Bundle gsap into the pre-render build; Node can't resolve its plugin imports as ESM.
  ssr: {
    noExternal: ['gsap'],
  },
})
