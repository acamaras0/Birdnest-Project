import { useEffect, useState } from "react";
import "./Radar.css";

const Radar = ({ socket }) => {
  const [positions, setPositions] = useState([]);
  const [distance, setDistance] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on("radar", (data) => {
        setPositions(data);

        // setDistance(
        //   positions.map((drone) => {
        //     Math.sqrt(
        //       Math.pow(250000 - drone.positionX, 2) +
        //         Math.pow(250000 - drone.positionY, 2)
        //     );
        //   })
        // );
      });
    }
  }, [socket]);

  return (
    <div className="radar">
      <div className="sweep"></div>
      {positions &&
        positions.map((pilot) => {
          return (
            <div className="dots" key={pilot.serialNumber}>
              <div className="dot">{pilot.serialNumber}</div>
            </div>
          );
        })}
    </div>
  );
};

export default Radar;
