const db = require("../db/database");

/**
 ** This function adds or updates the drones table
 **/

function getDroneInfo(drone) {
	let sql = `SELECT * FROM drones WHERE serialNumber = '${drone.serialNumber}'`;
	db.query(sql, (err, result) => {
		if (err) throw err;
		if (result.length > 0 || result != "") {
			sql = `UPDATE drones SET model = '${drone.model}', manufacturer = '${drone.manufacturer}', mac = '${drone.mac}', ipv4 = '${drone.ipv4}', ipv6 = '${drone.ipv6}', firmware = '${drone.firmware}' WHERE serialNumber = '${drone.serialNumber}'`;
		} else {
			sql = `INSERT INTO drones (serialNumber, model, manufacturer, mac, ipv4, ipv6, firmware) VALUES ('${drone.serialNumber}', '${drone.model}', '${drone.manufacturer}', '${drone.mac}', '${drone.ipv4}', '${drone.ipv6}', '${drone.firmware}')`;
			db.query(sql, (err, result) => {
				if (err) throw err;
			});
		}
	});
}

module.exports = getDroneInfo;
