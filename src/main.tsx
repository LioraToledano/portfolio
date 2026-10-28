import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// Apply saved theme synchronously to avoid flash on load
const savedTheme = sessionStorage.getItem('portfolio-theme')
if (savedTheme && savedTheme !== 'rose') {
  document.documentElement.dataset.theme = savedTheme
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
