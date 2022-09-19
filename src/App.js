import React from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import Play from "./pages/Play";
import Login from "./pages/Login";
import ConfigureGame from "./pages/configure-game";
import whodatpoke from "./whodatpoke.png";

function App() {
  return (
    <div className="App">
      <header>
        <img
          style={{ width: "600px", height: "100px", margin: "20px" }}
          src={whodatpoke}
          alt="who's that pokemon?"
        />
      </header>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/configure" element={<ConfigureGame />} />
        <Route path="play" element={<Play />} />
      </Routes>
    </div>
  );
}

export default App;
