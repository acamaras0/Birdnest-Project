const db = require("./init");

/**
 ** This function adds or updates the drones table
 **/

function insertDrone(drone) {
  let query = `INSERT INTO drones (serialNumber, model, manufacturer, mac, ipv4, ipv6, firmware) VALUES \
	($1,$2,$3, $4, $5, $6, $7) ON CONFLICT (serialNumber) DO NOTHING`;

  if (drone) {
    db.query(
      query,
      [
        drone.serialNumber,
        drone.model,
        drone.manufacturer,
        drone.mac,
        drone.ipv4,
        drone.ipv6,
        drone.firmware,
      ],
      (err) => {
        if (err) throw err;
        else console.log("Drone added/updated");
      }
    );
  }
}

module.exports = insertDrone;
