import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

const root = document.getElementById('root')

// Production HTML is pre-rendered by prerender.js; the dev server serves an empty root.
if (root.firstElementChild) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
