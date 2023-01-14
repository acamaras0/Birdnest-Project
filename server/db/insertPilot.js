const db = require("./init");

/**
 ** This function adds or updates the pilots table
 **/

function insertPilot(pilotInfo, element, distance) {
  let firstname = pilotInfo.firstName;
  let lastname = pilotInfo.lastName;
  let email = pilotInfo.email;
  let phone = pilotInfo.phoneNumber;

  let query = `INSERT INTO pilots (serialNumber, firstname, lastname, phone, email, distance) \
          VALUES ($1,$2,$3, $4, $5, $6) ON CONFLICT (serialNumber) DO UPDATE SET distance=$6,\
          time=NOW() WHERE pilots.distance > $6 AND pilots.serialNumber=$1`;

  if (pilotInfo) {
    db.query(
      query,
      [element, firstname, lastname, email, phone, distance],
      (err) => {
        if (err) throw err;
        else console.log("Pilot added/updated");
      }
    );
  }
}

module.exports = insertPilot;
