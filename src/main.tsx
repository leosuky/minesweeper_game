import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
import { Top } from "./components/Top/";
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <App /> */}
    <Top feature='Flag' firstAction='ctrl' secondAction='click'>
      Minesweeper
    </Top>
  </React.StrictMode>,
)
