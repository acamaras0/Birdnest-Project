const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const db = require("./db/database");
const { XMLParser } = require("fast-xml-parser");
const parser = new XMLParser();
const port = 3001;

app.use(cors());

app.get("/drone-info", async (req, res) => {
  const xml = await axios.get(
    "https://assignments.reaktor.com/birdnest/drones"
  );
  const json = parser.parse(xml.data);
  const droneInfo = json.report.capture;
  if (droneInfo) {
    droneInfo.drone.forEach((element) => {
      const sql = `INSERT INTO drones (serialNumber, posX, posY) VALUES ('${element.serialNumber}', '${element.positionX}', '${element.positionY}')
      ON DUPLICATE KEY UPDATE serialNumber='${element.serialNumber}', posX='${element.positionX}', posY='${element.positionY}'`;
      db.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Drone info inserted!");
      });
    });
  }
  console.log(droneInfo);
  res.send(droneInfo);
});

// app.get("/")

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
