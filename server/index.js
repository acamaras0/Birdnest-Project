const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const axios = require("axios");
const port = 3001;
const baseUrl = "https://assignments.reaktor.com/birdnest/";

const db = require("./db/database");
const { XMLParser } = require("fast-xml-parser");
const parser = new XMLParser();

const getPilotInfo = require("./utils/getPilotInfo");
const getDistance = require("./utils/getDistance");
const getDroneInfo = require("./utils/getDroneInfo");

app.get("/pilot-info", async (req, res) => {
  axios.get(baseUrl + "drones").then((xml) => {
    let json = parser.parse(xml.data);
    let droneInfo = json.report.capture;

    let serialNumbers = [];
    for (const drone of droneInfo.drone) {
      let distance = getDistance(drone.positionX, drone.positionY);
      if (distance <= 100000) {
        serialNumbers = [...serialNumbers, drone.serialNumber];
        getPilotInfo(baseUrl, serialNumbers, distance);
        getDroneInfo(drone);
      }
    }
  });

  sql = `SELECT * FROM pilots INNER JOIN drones ON pilots.serialNumber = drones.serialNumber WHERE pilots.timestamp > DATE_SUB(NOW(), INTERVAL 11 MINUTE)`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });


  sql = `DELETE FROM pilots WHERE timestamp < DATE_SUB(NOW(), INTERVAL 20 MINUTE)`;
  db.query(sql, (err, result) => {
    if (err) throw err;
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
