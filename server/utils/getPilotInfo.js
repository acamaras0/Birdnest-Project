const axios = require("axios");
const db = require("../db/database");

function getPilotInfo(serialNumbers) {
  let pilotInfo = [];
  if (!serialNumbers) return;
  serialNumbers.forEach((element) => {
    axios
      .get(`https://assignments.reaktor.com/birdnest/pilots/${element}`)
      .then((res) => {
        pilotInfo = res.data;
        let firstname = pilotInfo.firstName.replace("'", "\\'");
        let lastname = pilotInfo.lastName.replace("'", "\\'");
        let email = pilotInfo.email.replace("'", "\\'");
        let phone = pilotInfo.phoneNumber;

        let sql = `SELECT * FROM pilots WHERE phone = '${phone}'`;
        db.query(sql, (err, result) => {
          if (err) throw err;
          if (result.length > 0) {
            sql = `UPDATE pilots SET firstname = '${firstname}', lastname = '${lastname}', email = '${email}' WHERE phone = '${phone}'`;
            console.log("Pilot info already exists!");
          } else {
            sql = `INSERT INTO pilots (firstname, lastname, email, phone) VALUES ('${firstname}', '${lastname}', '${email}', '${phone}')`;
            db.query(sql, (err, result) => {
              if (err) throw err;
              console.log("Pilot info inserted!");
            });
          }
        });
      });
  });
}

module.exports = getPilotInfo;
