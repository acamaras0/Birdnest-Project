const db = require("./db/database.js");
const { Server } = require("socket.io");

const sendUpdatedInfo = require("./models/sendUpdatedInfo");

/**
 ** In order to get less network request, I decided to pass the
 ** pilots data to the client through sockets.
 **/

const socketServer = (server) => {
	const io = new Server(server, {
		cors: {
			origin: "http://localhost:3000",
		},
	});
	sendUpdatedInfo(io);
};

module.exports = socketServer;
