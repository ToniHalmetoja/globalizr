import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/pages/login"
import { Main } from "./components/pages/main"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
              <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/main" element={<Main/>}/>
              </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
