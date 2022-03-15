import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/pages/login"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
              <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/main"/>
              </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
