import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ToolBoxContextProvider } from './ToolBoxContext.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ToolBoxContextProvider>
      <App />
    </ToolBoxContextProvider>
  </React.StrictMode>,
)
