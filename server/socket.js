const db = require("./db/database");
const { Server } = require("socket.io");

const socketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.on("connection", (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on("info", () => {
      sql = `SELECT * FROM pilots INNER JOIN drones ON pilots.serialNumber = drones.serialNumber WHERE pilots.timestamp > DATE_SUB(NOW(), INTERVAL 10 MINUTE)`;
      db.query(sql, (err, result) => {
        if (err) throw err;
        io.emit("getInfo", result);
      });
    });
    socket.on("disconnect", () => {
      console.log("🔥: A user disconnected");
    });
  });
};

module.exports = socketServer;
