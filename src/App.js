import React from "react"
import { Route, Routes } from "react-router";
import './App.css';
import Play from "./pages/Play"
import Login from "./pages/Login"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="play" element={<Play />} />
      </Routes>
    </div>
  );
}

export default App;
