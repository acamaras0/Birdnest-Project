const axios = require("axios");

const baseUrl = "https://assignments.reaktor.com/birdnest/";

const db = require("../db/database");
const { XMLParser } = require("fast-xml-parser");
const parser = new XMLParser();

const getPilotInfo = require("../utils/getPilotInfo");
const getDistance = require("../utils/getDistance");
const getDroneInfo = require("../utils/getDroneInfo");

const getPilots = (req, res) => {
	axios.get(baseUrl + "drones").then((xml) => {
		let json = parser.parse(xml.data);
		let droneInfo = json.report.capture;
		let serialNumbers = [];
		for (const drone of droneInfo.drone) {
			let distance = getDistance(drone.positionX, drone.positionY);
			if (distance < 100000) {
				serialNumbers = [...serialNumbers, drone.serialNumber];
				getPilotInfo(baseUrl, serialNumbers, distance);
				getDroneInfo(drone);
			}
		}
	});

	sql = `DELETE FROM pilots WHERE timestamp < DATE_SUB(NOW(), INTERVAL 11 MINUTE)`;
	db.query(sql, (err, result) => {
		if (err) throw err;
	});

	sql = `DELETE FROM drones WHERE timestamp < DATE_SUB(NOW(), INTERVAL 11 MINUTE)`;
	db.query(sql, (err, result) => {
		if (err) throw err;
	});
};

module.exports = getPilots;
