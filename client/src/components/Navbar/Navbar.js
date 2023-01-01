import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Navbar.css";
import drone from "../../assets/drone.svg";
import { format } from "timeago.js";

const Navbar = () => {
  const [deviceInfo, setDeviceInfo] = useState([]);
  useEffect(() => {
    const getDeviceInfo = async () => {
      const res = await axios.get("http://localhost:3001/device");
      setDeviceInfo(res.data);
    };

    getDeviceInfo();
  }, []);

  if (deviceInfo) {
    return (
      <>
        <nav className="navbar navbar-dark bg-dark">
          <div className="container">
            <div>
              <img src={drone} className="nav-logo" alt="logo" />
              <span className="navbar-brand mb-0 h1">Some name</span>
            </div>
            <span className="navbar-text">{deviceInfo.listenRange / 1000}m</span>
            <span className="navbar-text">{format(deviceInfo.deviceStarted)}</span>
            <span className="navbar-text">
              {deviceInfo.updateIntervalMs / 1000}s
            </span>
          </div>
        </nav>
      </>
    );
  }
};

export default Navbar;
