import React, { useEffect, useState } from "react";
import Loader from "react-loaders";
import { format } from "timeago.js";
import axios from "axios";

const PilotInfo = () => {
  const [pilotInfo, setPilotInfo] = useState([]);
  useEffect(() => {
    const getPilotInfo = async () => {
      const res = await axios.get("http://localhost:3001/");
      setPilotInfo(res.data);
    };
    setInterval(() => {
      getPilotInfo();
    }, 20000);
  }, []);

  if (pilotInfo.length === 0) {
    return (
      <>
        <h3 style={{ paddingBottom: "30px" }}>
          Searching for pilots in the NDZ
        </h3>
        <Loader type="ball-scale-ripple-multiple" />
      </>
    );
  } else {
    return (
      <>
        <span style={{ fontStyle: "italic" }}>
          The NDZ perimeter was violated within the last 10 minutes by:
        </span>
        <br />
        <div className="list">
          {pilotInfo &&
            pilotInfo.map((pilot) => (
              <div key={pilot.id}>
                <div className="card text-center">
                  <div className="card-header">
                    <ul className="nav nav-pills card-header-pills">
                      <li className="nav-item">
                        <a className="nav-link active" href="#">
                          Contact
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          Device
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      {pilot.firstname} {pilot.lastname}
                    </h5>
                    <p className="card-text">{pilot.phone}</p>
                    <p className="card-text">{pilot.email}</p>
                    <p className="card-text">
                      {Math.round(pilot.distance / 1000)}m away
                    </p>
                    <p className="card-text">{format(pilot.timestamp)}</p>
                  </div>
                </div>
                <br />
              </div>
            ))}
        </div>
      </>
    );
  }
};

export default PilotInfo;
