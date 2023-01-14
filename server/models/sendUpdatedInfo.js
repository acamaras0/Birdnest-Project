const axios = require("axios");
const { XMLParser } = require("fast-xml-parser");
const parser = new XMLParser();
const baseUrl = "https://assignments.reaktor.com/birdnest/";

const getDistance = require("../utils/getDistance");
const insertPilotInfo = require("../utils/insertPilotInfo");
const insertDroneInfo = require("../utils/insertDroneInfo");
const db = require("../db/database");

/**
 ** Every 2 seconds a get request will be done to the XML url
 ** and the pilots (and their drones) that got in the NDZ will be added to database.
 ** After that the socket will emit the new arrays (i.e positions, deviceInfo and db result)
 ** to be shown to the client.
 ** Old pilots/drones will be deleted from the database.
 **/

const sendUpdatedInfo = (io) => {
  setInterval(() => {
    axios
      .get(baseUrl + "drones")
      .then((xml) => {
        let json = parser.parse(xml.data);
        let droneInfo = json.report.capture;
        let deviceInfo = json.report.deviceInformation;
        let serialNumbers = [];
        let radarData = [];
        for (const drone of droneInfo.drone) {
          let distance = getDistance(drone.positionX, drone.positionY);
          radarData.push({
            serialNumber: drone.serialNumber,
            positionX: drone.positionX,
            positionY: drone.positionY,
            distance: distance,
          });
          if (distance < 100000) {
            serialNumbers = [...serialNumbers, drone.serialNumber];
            insertPilotInfo(baseUrl, serialNumbers, distance);
            insertDroneInfo(drone);
          }
          io.emit("radarPositions", radarData); //used in the radar visualizer
        }
        io.emit("deviceInfo", deviceInfo); //used in the Navbar
      })
      .catch((error) => console.error(error));

    let sql = `SELECT * FROM pilots INNER JOIN drones ON pilots.serialNumber = drones.serialNumber WHERE pilots.time > NOW() - INTERVAL '10 MINUTES' ORDER BY pilots.time DESC`;
    db.query(sql, (err, result) => {
      if (err) console.error(err);
      io.emit("getInfo", result.rows); // the pilots and their drones
    });

    sql = `DELETE FROM pilots WHERE time < NOW() - INTERVAL '10 MINUTES'`;
    db.query(sql, (err) => {
      if (err) console.error(err);
    });

    sql = `DELETE FROM drones WHERE time < NOW() - INTERVAL '10 MINUTES'`;
    db.query(sql, (err) => {
      if (err) console.error(err);
    });
  }, 2000);
};

module.exports = sendUpdatedInfo;
