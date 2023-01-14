const axios = require("axios");
const insertPilot = require("../db/insertPilot");

/**
 ** This function makes a get request to the json url
 ** and returns the pilot's info
 **/

function getPilot(baseUrl, serialNumbers, distance) {
  let pilotInfo = [];
  if (serialNumbers.length) {
    serialNumbers.forEach((element) => {
      axios
        .get(baseUrl + `pilots/` + element)
        .then((res) => {
          pilotInfo = res.data;
          insertPilot(pilotInfo, element, distance);
        })
        .catch((error) => console.error(error));
    });
  }
}

module.exports = getPilot;
