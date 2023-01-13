import React, { useEffect, useState } from "react";
import Loader from "react-loaders";
import { BsPersonFill } from "react-icons/bs";
import { GiDeliveryDrone } from "react-icons/gi";
import PilotInfo from "../../models/PilotInfo";
import DroneInfo from "../../models/DroneInfo";
import Radar from "../../models/Radar/Radar";
import { motion } from "framer-motion";
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
        <div className="list w-50">
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ marginBottom: "20px" }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <BsPersonFill onClick={handleClick(1)} className="icon" />
              <p>Pilots</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <GiDeliveryDrone onClick={handleClick(2)} className="icon" />
              <p>Drones</p>
            </motion.div>
          </div>
          {pilots &&
            pilots.map((pilot) => (
              <motion.div
                whileInView={{ opacity: [0.5, 1] }}
                transition={{ duration: 0.7 }}
                className="dashboard"
                key={pilot.serialnumber}
              >
                <div className="card text-center">
                  {show === false ? (
                    <PilotInfo pilot={pilot} />
                  ) : (
                    <DroneInfo pilot={pilot} />
                  )}
                </div>
                <br />
              </motion.div>
            ))}
        </div>
      </>
    );
  }
};

export default Dashboard;
