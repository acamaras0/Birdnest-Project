import React from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import "./App.scss";

import socketIO from "socket.io-client";
const socket = socketIO.connect("https://birdnest-server-6dxs.onrender.com");

function App() {
  return (
    <>
      <Navbar socket={socket} />
      <div className="App">
        <Dashboard socket={socket} />
      </div>
      <Footer />
    </>
  );
}

export default App;
