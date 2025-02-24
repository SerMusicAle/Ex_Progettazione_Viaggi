//controlli e avisi per problemi
import { StrictMode } from 'react'

//crea il root della app
import { createRoot } from 'react-dom/client'

//CSS
import './index.css'

//componente di avvio
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
