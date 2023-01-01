import React from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import "./App.scss";

function App() {
  return (
    <>
      <Navbar />
      <div className="App">
        <Dashboard />
      </div>
      <Footer />
    </>
  );
}

export default App;
