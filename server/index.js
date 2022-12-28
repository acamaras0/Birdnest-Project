const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const db = require("./db/database");
const { XMLParser } = require("fast-xml-parser");
const parser = new XMLParser();
const port = 3001;

app.use(cors());

app.get("/pilot-info", async (req, res) => {
  const xml = await axios.get(
    "https://assignments.reaktor.com/birdnest/drones"
  );
  const json = parser.parse(xml.data);
  const droneInfo = json.report.capture;
  let serialNumbers = [];
  let pilotInfo = [];

  if (droneInfo) {
    droneInfo.drone.forEach((element) => {
      if (element.positionX <= 250000 && element.positionY <= 250000) {
        serialNumbers = [...serialNumbers, element.serialNumber];
      }
    });
  }

  serialNumbers.forEach((element) => {
    axios
      .get(`https://assignments.reaktor.com/birdnest/pilots/${element}`)
      .then((res) => {
        pilotInfo = res.data;
        let sql = `SELECT * FROM pilots WHERE phone = '${pilotInfo.phoneNumber}'`;
        db.query(sql, (err, result) => {
          if (err) throw err;
          if (result.length > 0) {
            sql = `UPDATE pilots SET firstname = '${pilotInfo.firstName.replace(
              "'",
              "\\'"
            )}', lastname = '${pilotInfo.lastName.replace(
              "'",
              "\\'"
            )}', email = '${pilotInfo.email.replace(
              "'",
              "\\'"
            )}' WHERE phone = '${pilotInfo.phoneNumber}'`;
            console.log("Pilot info already exists!");
          } else {
            sql = `INSERT INTO pilots (firstname, lastname, email, phone) VALUES ('${pilotInfo.firstName.replace(
              "'",
              "\\'"
            )}', '${pilotInfo.lastName.replace(
              "'",
              "\\'"
            )}', '${pilotInfo.email.replace("'", "\\'")}', '${
              pilotInfo.phoneNumber
            }')`;
            db.query(sql, (err, result) => {
              if (err) throw err;
              console.log("Pilot info inserted!");
            });
          }
        });
      });
  });
  sql = `SELECT * FROM pilots WHERE timestamp > DATE_SUB(NOW(), INTERVAL 10 MINUTE)`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
