const db = require("../db/database");

/**
 ** This function adds or updates the drones table
 **/

function insertDroneInfo(drone) {
	let sql = `INSERT INTO drones (serialNumber, model, manufacturer, mac, ipv4, ipv6, firmware) VALUES \
	('${drone.serialNumber}', '${drone.model}', '${drone.manufacturer}', '${drone.mac}', '${drone.ipv4}', '${drone.ipv6}', '${drone.firmware}') \
	ON DUPLICATE KEY UPDATE serialNumber=serialNumber`;

	db.query(sql, (err, result) => {
		if (err) throw err;
		else console.log("Drone added/updates");
	});
}

module.exports = insertDroneInfo;
