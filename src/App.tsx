import {useState} from 'react'
import './App.css'
import 'antd/dist/antd.min.css'
import ETree from "./component/EditTree";
import {TreeData} from './config'

function App() {
  const [data, setData] = useState(TreeData)

  return (
    <div className="App">

      <ETree data={data} setData={(d:any[])=>setData(d)}/>


    </div>
  )
}

export default App
