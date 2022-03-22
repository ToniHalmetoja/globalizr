import logo from './logo.svg';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/pages/login"
import { Main } from "./components/pages/main"
 

function App() {

  const navigate = useNavigate()

  const [token, setToken] = useState();

  if(token){
    console.log(token)
    navigate("/main");
  }

  useEffect(()=>{
    console.log(token)
  }, [token])

  return (
    <div className="App">
      <header className="App-header">
              <Routes>
                <Route path="/" element={<Login setToken={setToken}/>}/>
                <Route path="/main" element={<Main token={token}/>}/>
              </Routes>
      </header>
    </div>
  );
}

export default App;
