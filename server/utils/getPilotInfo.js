const axios = require("axios");
const db = require("../db/database");

function getPilotInfo(baseUrl, serialNumbers, distance) {
  let pilotInfo = [];
  if (serialNumbers) {
    serialNumbers.forEach((element) => {
      axios.get(baseUrl + `pilots/` + element).then((res) => {
        pilotInfo = res.data;
        let firstname = pilotInfo.firstName.replace("'", "\\'");
        let lastname = pilotInfo.lastName.replace("'", "\\'");
        let email = pilotInfo.email.replace("'", "\\'");
        let phone = pilotInfo.phoneNumber;

        let sql = `SELECT * FROM pilots WHERE phone = '${phone}'`;
        db.query(sql, (err, result) => {
          if (err) throw err;
          if (result.length > 0 || !result) {
            sql = `UPDATE pilots SET firstname = '${firstname}', lastname = '${lastname}', email = '${email}', distance = '${distance}'' WHERE phone = '${phone}'`;
            console.log("Pilot info updated!");
          } else {
            sql = `INSERT INTO pilots (firstname, lastname, email, phone, distance) VALUES ('${firstname}', '${lastname}', '${email}', '${phone}', '${distance}')`;
            db.query(sql, (err, result) => {
              if (err) throw err;
              console.log("Pilot info inserted!");
            });
          }
        });
      });
    });
  }
}

module.exports = getPilotInfo;
