import React, { useEffect, useState } from "react";
import PilotInfo from "../../models/PilotInfo";
import DroneInfo from "../../models/DroneInfo";
import Loader from "react-loaders";
import axios from "axios";
import { BsPersonFill } from "react-icons/bs";
import { GiDeliveryDrone } from "react-icons/gi";
import "./Dashboard.css";

const Dashboard = ({ socket }) => {
  const [info, setInfo] = useState([]);
  const [show, setShow] = useState(false);

  
  useEffect(() => {
    if (socket) {
        socket.on("getInfo", (data) => {
            console.log("data", data);
            // setInfo(data);
          });
        }

    const getInfo = async () => {
      const res = await axios.get("http://localhost:5001/");
      setInfo(res.data);
    };
    setInterval(() => {
      getInfo();
    }, 20000);

    return () => {
      clearInterval();
    };
  }, [setInfo]);

  const handleClick = (id) => (e) => {
    e.preventDefault();
    if (id === 1) setShow(false);
    else setShow(true);
  };

  // console.log(info);
  // console.log(socket);

  if (info.length === 0) {
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
        <br />
        <div className="list">
          {info &&
            info.map((pilot) => (
              <div key={pilot.id} className="dashboard">
                <div className="card text-center" style={{ width: "80rem" }}>
                  <div className="card-header">
                    <ul className="nav nav-pills card-header-pills">
                      <li
                        className="nav-item text-center"
                        style={{ cursor: "pointer", width: "100px" }}
                      >
                        <BsPersonFill
                          onClick={handleClick(1)}
                          className="icon"
                        />
                      </li>
                      {" . . . "}
                      <li
                        className="nav-item"
                        style={{ cursor: "pointer", width: "100px" }}
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
