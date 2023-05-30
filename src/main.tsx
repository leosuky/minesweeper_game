import React, { FC } from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
import './index.css'

import { GameWithHooks } from "./modules/GameWithHook";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <App /> */}
    <>
      <GameWithHooks/>
    </>
  </React.StrictMode>,
)
