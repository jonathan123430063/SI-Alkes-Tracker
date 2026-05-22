import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import {
  AlatProvider
} from "./context/AlatContext.tsx";

ReactDOM.createRoot(
  document.getElementById('root')!,
).render(

  <React.StrictMode>

    <AlatProvider>

      <App />

    </AlatProvider>

  </React.StrictMode>,
)