import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
import { Top } from "./components/Top/";
import { Scoreboard} from './components/Scoreboard'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <App /> */}
    <>
      <Top feature='Flag' firstAction='ctrl' secondAction='click'>
        Minesweeper
      </Top>
      <Scoreboard
        time="000"
        levels={['beginner', 'intermediate', 'expert']}
        mines="010"
        onReset={() => null}
      />
    </>
  </React.StrictMode>,
)
