const express = require("express");
const app = express();
const server = require("http").createServer(app);
const socketServer = require("./socket.js");

const cors = require("cors");
app.use(cors());

require("dotenv").config();
const port = process.env.PORT || 5001;

socketServer(server);

server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
