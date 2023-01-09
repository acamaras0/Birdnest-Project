const db = require("./db/database");
const axios = require("axios");
const { Server } = require("socket.io");
const { XMLParser } = require("fast-xml-parser");
const parser = new XMLParser();
const baseUrl = "https://assignments.reaktor.com/birdnest/";

const getPilotInfo = require("./utils/getPilotInfo");
const getDistance = require("./utils/getDistance");
const getDroneInfo = require("./utils/getDroneInfo");

const socketServer = (server) => {
	const io = new Server(server, {
		cors: {
			origin: "http://localhost:3000",
		},
	});

	io.on("connection", (socket) => {
		setInterval(() => {
			axios.get(baseUrl + "drones").then((xml) => {
				let json = parser.parse(xml.data);
				let droneInfo = json.report.capture;
				let serialNumbers = [];
				for (const drone of droneInfo.drone) {
					let distance = getDistance(
						drone.positionX,
						drone.positionY
					);
					if (distance < 100000) {
						serialNumbers = [...serialNumbers, drone.serialNumber];
						getPilotInfo(baseUrl, serialNumbers, distance);
						getDroneInfo(drone);
					}
				}
			});
			const sql = `SELECT * FROM pilots INNER JOIN drones ON pilots.serialNumber = drones.serialNumber WHERE pilots.timestamp > DATE_SUB(NOW(), INTERVAL 10 MINUTE)`;
			db.query(sql, (err, result) => {
				if (err) throw err;
				io.emit("getInfo", result);
			});
		}, 20000);
	});
};

module.exports = socketServer;
