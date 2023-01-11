import React, { useEffect, useState } from "react";
import drone from "../../assets/drone.svg";
import { format } from "timeago.js";
import { MdUpdate, MdTimer, MdBatteryCharging80 } from "react-icons/md";
import { HiStatusOnline } from "react-icons/hi";
import "./Navbar.css";

const Navbar = ({ socket }) => {
  const [deviceInfo, setDeviceInfo] = useState([]);
  useEffect(() => {
    if (socket) {
      socket.on("deviceInfo", (data) => {
        setDeviceInfo(data);
      });
    }
  }, [socket]);

  if (deviceInfo) {
    return (
      <>
        <nav className="navbar navbar-light bg-light">
          <div className="container">
            <div>
              <img src={drone} className="nav-logo" alt="logo" />
              <span className="navbar-brand mb-0 h1">Birdy</span>
            </div>
            <div>
              <HiStatusOnline className="nav-icon" />
              <span className="navbar-text">
                {deviceInfo.length !== 0 && deviceInfo.listenRange / 1000}m
              </span>
            </div>
            <div>
              <MdTimer className="nav-icon" />
              <span className="navbar-text">
                {deviceInfo.length !== 0 && format(deviceInfo.deviceStarted)}
              </span>
            </div>
            <div>
              <MdUpdate className="nav-icon" />
              <span className="navbar-text">
                {deviceInfo.length !== 0 && deviceInfo.updateIntervalMs / 1000}s
              </span>
            </div>
            <div>
              <MdBatteryCharging80 className="nav-icon" />
              <span className="navbar-text">77%</span>
            </div>
          </div>
        </nav>
      </>
    );
  }
};

export default Navbar;
