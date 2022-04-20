import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import './App.css';
/* Router is in fact used, eslint is wrong */
// eslint-disable-next-line
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/pages/login"
import { Main } from "./components/pages/main"
 

function App() {

  const [token, setToken] = useState();
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate()

  useEffect(()=>{
    if(localStorage.getItem("usertoken")){
      setToken(localStorage.getItem("usertoken"));
    }  
    
    if(token){
      navigate("/main");
      localStorage.setItem("usertoken", token)
    }

    setLoaded(true);
  }, [token, navigate])

  function logout () {
    localStorage.removeItem("usertoken");
    navigate("/");
  }

  return (
    <div className="App">
      <header className="App-header">
              <Routes>
                <Route path="/" element={<Login setToken={setToken}/>}/>
                {
                  token ?
                      [ 
                          <Route key="123" path="/main" element={<Main token={token} logout={logout}/>}/>
                      ]
                      :
                      null
                }
                {loaded && <Route path={"*"} element={<Login setToken={setToken}/>}/>}

              </Routes>
      </header>
    </div>
  );
}

export default App;
