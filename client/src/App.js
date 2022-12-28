import React from "react";
import drone from "./assets/drone.svg";
import PilotInfo from "./components/PilotInfo";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={drone} className="App-logo" alt="logo" />
        <h2>Drone Surveillance System</h2>
        <PilotInfo />
      </header>
      <Footer />
    </div>
  );
}

export default App;
