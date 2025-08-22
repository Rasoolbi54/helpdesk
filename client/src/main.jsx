import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import HelpDeskContextProvider from './context/HelpDeskContext.jsx'

createRoot(document.getElementById('root')).render(

    <BrowserRouter>
     <HelpDeskContextProvider>
      <App />
     </HelpDeskContextProvider>
    </BrowserRouter>
 
)
