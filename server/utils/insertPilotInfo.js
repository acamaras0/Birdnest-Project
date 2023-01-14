const axios = require("axios");
const db = require("../db/database");

/**
 ** This function will insert/update the pilots data in the table
 ** after a get request to the json url
 **/

function insertPilotInfo(baseUrl, serialNumbers, distance) {
  let pilotInfo = [];
  if (serialNumbers.length) {
    serialNumbers.forEach((element) => {
      axios
        .get(baseUrl + `pilots/` + element)
        .then((res) => {
          pilotInfo = res.data;
          let firstname = pilotInfo.firstName;
          let lastname = pilotInfo.lastName;
          let email = pilotInfo.email;
          let phone = pilotInfo.phoneNumber;

          let sql = `INSERT INTO pilots (serialNumber, firstname, lastname, phone, email, distance) VALUES ($1,$2,$3, $4, $5, $6) \
					ON CONFLICT (serialNumber) DO UPDATE SET distance=$6, time=NOW() WHERE pilots.distance > $6 AND pilots.serialNumber=$1`;

          db.query(
            sql,
            [element, firstname, lastname, email, phone, distance],
            (err) => {
              if (err) throw err;
              else console.log("Pilot added/updated");
            }
          );
        })
        .catch((error) => console.error(error));
    });
  }
}

module.exports = insertPilotInfo;
