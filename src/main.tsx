import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
import { Legend } from "./components/Top/Legend";
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <App /> */}
    <Legend />
  </React.StrictMode>,
)
