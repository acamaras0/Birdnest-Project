const db = require("../db/database");

function getDroneInfo(drone) {
  let sql = `SELECT * FROM drones WHERE serialNumber = '${drone.serialNumber}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0 || result != "") {
      sql = `UPDATE drones SET model = '${drone.model}', manufacturer = '${drone.manufacturer}', mac = '${drone.mac}', ipv4 = '${drone.ipv4}', ipv6 = '${drone.ipv6}', firmware = '${drone.firmware}' WHERE serialNumber = '${drone.serialNumber}'`;
      console.log("Drone info updated!");
    } else {
      sql = `INSERT INTO drones (serialNumber, model, manufacturer, mac, ipv4, ipv6, firmware) VALUES ('${drone.serialNumber}', '${drone.model}', '${drone.manufacturer}', '${drone.mac}', '${drone.ipv4}', '${drone.ipv6}', '${drone.firmware}')`;
      db.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Drone info inserted!");
      });
    }
  });
}

module.exports = getDroneInfo;