import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import "./i18n/config.ts";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* React Suspense added so users on a slower connection see loading indicator instead of blank page.
    E.g. if i18n translation files are taking a while to load. */}
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </StrictMode>,
)
