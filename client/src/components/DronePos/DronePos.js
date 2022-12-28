import React, { useEffect, useState } from "react";
import axios from "axios";

const DronePos = () => {
  const [droneInfo, setDroneInfo] = useState([]);
  const [droneSerialNumber, setDroneSerialNumber] = useState("");
  // const [dronePosX, setDronePosX] = useState([]);
  // const [dronePosY, setDronePosY] = useState([]);

  useEffect(() => {
    const getDroneInfo = async () => {
      const res = await axios.get("http://localhost:3001/drone-info");
      setDroneInfo(res.data);
      if (droneInfo.drone !== "" && droneInfo.drone !== undefined) {
        setDroneSerialNumber(droneInfo.drone[0].serialNumber);
      }
    };
    getDroneInfo();
  }, [droneInfo.drone]);
  
  console.log(droneInfo);
  return (
    <>
      <h3>Drone Info</h3>
      <p>Serial Number: {droneSerialNumber? droneSerialNumber : null}</p>
    </>
  );
};

export default DronePos;
