const express = require("express");
const app = express();
const server = require("http").createServer(app);
const socketServer = require("./socket.js");

const cors = require("cors");
app.use(cors());

require("dotenv").config();
const router = require("./routes/router");
const port = 5001;

app.use(router);

socketServer(server);

server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
