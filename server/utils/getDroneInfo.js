const { XMLParser } = require("fast-xml-parser");
const axios = require("axios");

function getDroneInfo() {
  const parser = new XMLParser();

  axios.get("https://assignments.reaktor.com/birdnest/drones").then((xml) => {
    const json = parser.parse(xml.data);
    const droneInfo = json.report.capture;

    let serialNumbers = [];

    if (droneInfo) {
      droneInfo.drone.forEach((element) => {
        if (element.positionX <= 250000 && element.positionY <= 250000) {
          serialNumbers = [...serialNumbers, element.serialNumber];
        }
      });
    }
    return serialNumbers;
  });
}

module.exports = getDroneInfo;
