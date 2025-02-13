import './App.css'
import { useState, useEffect, useContext, useRef, useReducer } from "react"
import MyInfoContext from './main';

// action名称は自由に設定してOK！今回はincre/decrement
const reducer = (state, action) => {
  switch(action.type){
    case "increment": return state + 1
    case "decrement": return state -1
    default: return state
  }
}

function App() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count+1)
  };

  useEffect(() => {
    console.log("Hello Hooks!")
  }, [count]);

  const myInfo = useContext(MyInfoContext)

  const ref = useRef()
  const handleRef =() => {
    console.log(ref.current)
  }

  const [state, dispatch] = useReducer(reducer, 0)

  return (
    <>
      <div className='App'>
        <h1>useState, useEffect</h1>
        <p>useStateは「仮想DOM（前）と仮想DOM（後）の差分を見てレンダリング」する！ ＝ 効率がいいよね</p>
        <p>useEffectは第１引数にコールバック関数を取り、もし第２引数に空の配列をとる場合はページ読み込み時に発火する！</p>
        <p>main.jsx内のStrictModeによってローカル環境では２回発火するのは正常</p>
        <p>[]の中に、状態変数を入れるとその変数が更新されたときにコールバック関数が実行される（発火する）</p>
        <button onClick={handleClick}>+</button>
        <p>{count}</p>

        <hr />

        <h1>useContext</h1>
        <p>データの受け渡しバケツリレーをせず、ダイレクトアタックができる！ ＝ 効率がいいよね</p>
        <p>{myInfo.name}</p>
        <p>{myInfo.age}</p>

        <hr />

        <h1>useRef</h1>
        <p>inputされたものの属性？が取得できる！どういう高さ横幅大きさ、どういう内容か？など</p>
        <p>例えば、console.log(ref.current.value)だったら入力した値が取得できる</p>
        <input type="text" ref={ref} />
        <button onClick={handleRef}>UseRef</button>

        <hr />

        <h1>useReducer</h1>
        <p>増減に関連する処理を行う…？ちょっとよく分からなかった</p>
        <p>カウント：{state}</p>
        <button onClick={() => dispatch({ type: "increment" })}>+</button>
        <button onClick={() => dispatch({ type: "decrement" })}>-</button>


      </div>
    </>
  );
}

export default App
