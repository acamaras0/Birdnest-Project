import React, { useEffect, useState } from "react";
import Loader from "react-loaders";
import { format } from "timeago.js";
import axios from "axios";

const PilotInfo = () => {
  const [pilotInfo, setPilotInfo] = useState([]);
  useEffect(() => {
    const getPilotInfo = async () => {
      const res = await axios.get("http://localhost:3001/pilot-info");
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
        <h4 style={{ fontStyle: "italic" }}>
          The NDZ perimeter was violated within the last 10 minutes by:
        </h4>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Intercepted</th>
              <th>Seen</th>
            </tr>
          </thead>
          <tbody>
            {pilotInfo &&
              pilotInfo.map((pilot) => (
                <tr key={pilot.id}>
                  <td>
                    {pilot.firstname} {pilot.lastname}
                  </td>
                  <td> {pilot.email} </td>
                  <td> {pilot.phone} </td>
                  <td style={{ color: "red" }}>
                    {" "}
                    {Math.round(pilot.distance / 1000)}m away{" "}
                  </td>
                  <td> {format(pilot.timestamp)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    );
  }
};

export default PilotInfo;
