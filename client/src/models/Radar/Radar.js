import { useEffect, useState } from "react";
import "./Radar.css";

const Radar = ({ socket }) => {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on("radarPositions", (data) => {
        setPositions(data);
      });
    }
  }, [socket]);

  return (
    <div className="radar">
      <div className="sweep"></div>
      {positions &&
        positions.map((pilot) => {
          return (
            <div
              className="dots"
              key={pilot.serialNumber}
              style={{
                left: Math.floor(pilot.positionX / 1000),
                top: Math.floor(pilot.positionY / 1000),
              }}
            >
              <div
                className="dot"
                style={
                  pilot.distance / 1000 < 100
                    ? { backgroundColor: "#EE4B2B" }
                    : { backgroundColor: "#52f8edc0" }
                }
              >
                <p className="serial">{Math.floor(pilot.distance / 1000)}m</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Radar;
