const axios = require("axios");
const { XMLParser } = require("fast-xml-parser");
const parser = new XMLParser();
const baseUrl = "https://assignments.reaktor.com/birdnest/";

const getDistance = require("../utils/getDistance");
const insertPilotInfo = require("../utils/insertPilotInfo");
const insertDroneInfo = require("../utils/insertDroneInfo");
const db = require("../db/database");

/**
 ** Every 2 seconds a get request will be done to the XML url
 ** and the pilots (and their drones) that got in the NDZ will be added to database.
 ** After that the socket will emit the new arrays (i.e positions, deviceInfo and db result)
 ** to be shown to the client.
 ** Old pilots/drones will be deleted from the database.
 **/

const sendUpdatedInfo = (io) => {
	setInterval(() => {
		axios
			.get(baseUrl + "drones")
			.then((xml) => {
				let json = parser.parse(xml.data);
				let droneInfo = json.report.capture;
				let deviceInfo = json.report.deviceInformation;
				let serialNumbers = [];
				let positions = [];
				for (const drone of droneInfo.drone) {
					let distance = getDistance(
						drone.positionX,
						drone.positionY
					);
					if (distance < 100000) {
						serialNumbers = [...serialNumbers, drone.serialNumber];
						insertPilotInfo(baseUrl, serialNumbers, distance);
						insertDroneInfo(drone);
						positions.push({
							serialNumber: drone.serialNumber,
							positionX: drone.positionX,
							positionY: drone.positionY,
						});
						io.emit("radarPositions", positions); //used in the radar visualizer
					}
				}
				io.emit("deviceInfo", deviceInfo); //used in the Navbar
			})
			.catch((error) => console.error(error));

		let sql = `SELECT * FROM pilots INNER JOIN drones ON pilots.serialNumber = drones.serialNumber WHERE pilots.timestamp > DATE_SUB(NOW(), INTERVAL 10 MINUTE) ORDER BY pilots.timestamp DESC`;
		db.query(sql, (err, result) => {
			if (err) throw err;
			io.emit("getInfo", result); // the pilots and their drones
		});

		sql = `DELETE FROM pilots WHERE timestamp < DATE_SUB(NOW(), INTERVAL 10 MINUTE)`;
		db.query(sql, (err) => {
			if (err) throw err;
		});

		sql = `DELETE FROM drones WHERE timestamp < DATE_SUB(NOW(), INTERVAL 10 MINUTE)`;
		db.query(sql, (err) => {
			if (err) throw err;
		});
	}, 2000);
};

module.exports = sendUpdatedInfo;
