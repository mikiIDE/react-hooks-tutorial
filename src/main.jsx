import { StrictMode, createContext } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// グローバルに使える変数を作っておく（useContext演習のため）
const myInfo = {
  name: "名前：IDE",
  age:"年齢：top secret"
}

const MyInfoContext = createContext(myInfo)

createRoot(document.getElementById('root')).render(
  <MyInfoContext.Provider value={myInfo}>
  <StrictMode>
    <App />
  </StrictMode>
  </MyInfoContext.Provider>
)

export default MyInfoContext
