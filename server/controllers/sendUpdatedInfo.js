const axios = require("axios");
const { XMLParser } = require("fast-xml-parser");
const parser = new XMLParser();

const getPilot = require("./getPilot");
const insertDrone = require("../db/insertDrone");
const getDistance = require("../utils/getDistance");
const deleteData = require("../db/deleteData");
const getNDZinfo = require("../db/getNDZinfo");

const baseUrl = "https://assignments.reaktor.com/birdnest/";

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
            getPilot(baseUrl, serialNumbers, distance);
            insertDrone(drone);
          }
          io.emit("radarPositions", radarData); //used in the radar visualizer
        }
        io.emit("deviceInfo", deviceInfo); //used in the Navbar
      })
      .catch((error) => console.error(error));

    getNDZinfo((data) => {
      if (data && data.length > 0) {
        io.emit("getInfo", data); // the pilots and their drones
      }
    });

    deleteData();
  }, 2000);
};

module.exports = sendUpdatedInfo;
