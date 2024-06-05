import logo from './logo.svg';
import {useState,useEffect} from 'react'
import axios from 'axios';
import './App.css';
import Login from './components/Login.js'
import Notes from './components/Notes.js'
import Register from './components/Register.js'

function App() {
  let [isLogin,setisLogin]= useState(false)
  let [isregister,setisRegister] = useState(false)
  useEffect(()=>{
    async function func()
    {
      const token = localStorage.getItem('tokenStorage')
      console.log(token)
      if(token)
        {
            const res = await axios.get('http://localhost:8085/user/verify',{
              headers:{Authorization:token}
            })
            console.log(res)
            setisLogin(res.data)
            if(res.data == false)
              return localStorage.clear()
        }
        else
        {
          setisLogin(false)
        }
      }
      func()
  })
  return (
    <div className="App">
        {isLogin ? <Notes setisLogin={setisLogin}></Notes> : isregister?<Register setisRegister={setisRegister}></Register> : <Login setisLogin={setisLogin} setisRegister={setisRegister}></Login>}
    </div>
  );
}
export default App;