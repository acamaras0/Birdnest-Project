import React from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import "./App.scss";

import socketIO from "socket.io-client";
const socket = socketIO.connect("http://localhost:5001");

function App() {
	return (
		<>
			<Navbar />
			<div className="App">
				<Dashboard socket={socket} />
			</div>
			<Footer />
		</>
	);
}

export default App;
