import React, { useEffect, useState } from "react";
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

  return (
    <>
      <h3>Pilot info</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {pilotInfo && pilotInfo.map((pilot) => (
            <tr key={pilot.id}>
              <td>
                {pilot.firstname} {pilot.lastname}
              </td>
              <td>{pilot.email}</td>
              <td>{pilot.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PilotInfo;
