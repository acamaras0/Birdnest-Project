import React from "react";
import drone from "./assets/drone.svg";
import { DronePos, PilotInfo } from "./components";
import "./App.css";

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={drone} className="App-logo" alt="logo" />
        <h1>Drone Surveillance System</h1>
        <DronePos />
        <PilotInfo />
      </header>
    </div>
  );
}

export default App;
