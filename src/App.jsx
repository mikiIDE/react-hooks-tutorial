import './App.css'
import { useState, useEffect, useContext, useRef, useReducer, useMemo } from "react"
import MyInfoContext from './main';
import SomeChild from './SomeChild';

// action名称は自由に設定してOK！今回はincre/decrement
const reducer = (state, action) => {
  switch(action.type){
    case "increment": return state + 1
    case "decrement": return state -1
    default: return state
  }
}

function App() {

  // useState
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count+1)
  };

  // useEffect
  useEffect(() => {
    console.log("Hello Hooks!")
  }, [count]);

  // useContext
  const myInfo = useContext(MyInfoContext)

  // useRef
  const ref = useRef()
  const handleRef =() => {
    console.log(ref.current)
  }

  // useReducer
  const [state, dispatch] = useReducer(reducer, 0)

  // useMemo
  const [count01, setCount01] = useState(0);
  const [count02, setCount02] = useState(0);

  const square = useMemo(() => {
    let i = 0;
    while (i < 2000000){ //これが重たい処理
      i++;
    }
    console.log("クリックされました")
    return count02*count02;
  },[count02])

  // useCallBack 関数のメモ化
  // const [counter, useCallBack] = useState(0);
  // const showCount = useCallBack(() => {
  //   alert("これは思い処理です。");
  // },[counter])

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

        <hr />

        <h1>useMemo</h1>
        <p>ブラウザのメモリに保存（メモ）することができる！</p>
        <p>useStateを使った場合、カウント01を押下するだけの場合も処理が重たくなってしまう</p>
        <p>useMemoを使えば、カウント02の時だけ重い処理が走り01はスムーズに動く</p>
        <p>最初から使うことは殆どなく、大規模開発を進めていく中で重たくなったときにパフォーマンスチューニングを行うときに設定する</p>
        <div>カウント1：{count01}</div>
        <div>カウント2：{count02}</div>
        <div>結果：{square}</div>
        <button onClick={() => setCount01(count01 + 1)}>+</button>
        <button onClick={() => setCount02(count02 + 1)}>+</button>
        <p>※何でもuseMemoを使ってしまうとブラウザのメモリを圧迫する→それが原因で重たくなるため使い所を考えるべき</p>

        <hr />

        <h1>useCollBack</h1>
        <p>関数のメモ化</p>
        {/* <SomeChild show Count={showCount} /> */}

        <hr />

        <h1>カスタムフック</h1>


      </div>
    </>
  );
}

export default App
