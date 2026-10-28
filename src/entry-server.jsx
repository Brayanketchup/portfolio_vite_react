import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'

// Used at build time by prerender.js to write the page's HTML into dist/index.html.
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  )
}
