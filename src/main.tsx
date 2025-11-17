import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { registerCoreModules } from '_di/registers/registerCoreModules'
import { BrowserRouter } from 'react-router'
import { App } from './App'

registerCoreModules()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
