import logo from './logo.svg';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/pages/login"
import { Main } from "./components/pages/main"
 

function App() {

  const [token, setToken] = useState();
  const navigate = useNavigate()

  useEffect(()=>{
    if(token) navigate("/main");
  }, [token])

  return (
    <div className="App">
      <header className="App-header">
              <Routes>
                <Route path="/" element={<Login setToken={setToken}/>}/>
                {
                  token ?
                      [ 
                          <Route key="123" path="/main" element={<Main token={token}/>}/>
                      ]
                      :
                      null
                }
                <Route path={"*"} element={<Login setToken={setToken}/>}/>

              </Routes>
      </header>
    </div>
  );
}

export default App;
