import React, { useEffect, useState } from "react";
import Loader from "react-loaders";
import { BsPersonFill } from "react-icons/bs";
import { GiDeliveryDrone } from "react-icons/gi";
import PilotInfo from "../../models/PilotInfo";
import DroneInfo from "../../models/DroneInfo";
import Radar from "../../models/Radar/Radar";
import "./Dashboard.css";

const Dashboard = ({ socket }) => {
  const [pilots, setPilots] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (socket) {
      socket.on("getInfo", (data) => {
        setPilots(data);
      });
    }
  }, [socket]);

  const handleClick = (id) => (e) => {
    e.preventDefault();
    if (id === 1) setShow(false);
    else setShow(true);
  };

  if (pilots.length === 0) {
    return (
      <>
        <h3 style={{ paddingBottom: "40px", color: "#004849" }}>
          Searching for pilots in the NDZ
        </h3>
        <Loader type="ball-scale-ripple-multiple" />
      </>
    );
  } else {
    return (
      <>
        <div className="radar-dashboard">
          <Radar socket={socket} />
        </div>
        <br />
        <div className="list w-75">
          {pilots &&
            pilots.map((pilot) => (
              <div key={pilot.serialnumber} className="dashboard">
                <div className="card text-center">
                  <div className="card-header">
                    <ul className="nav nav-pills card-header-pills">
                      <li
                        className="nav-item text-center"
                        style={{
                          cursor: "pointer",
                          width: "100px",
                        }}
                      >
                        <BsPersonFill
                          onClick={handleClick(1)}
                          className="icon"
                        />
                      </li>
                      {" . . . "}
                      <li
                        className="nav-item"
                        style={{
                          cursor: "pointer",
                          width: "100px",
                        }}
                      >
                        <GiDeliveryDrone
                          onClick={handleClick(2)}
                          className="icon"
                        />
                      </li>
                    </ul>
                  </div>
                  {show === false ? (
                    <PilotInfo pilot={pilot} />
                  ) : (
                    <DroneInfo pilot={pilot} />
                  )}
                </div>
                <br />
              </div>
            ))}
        </div>
      </>
    );
  }
};

export default Dashboard;
