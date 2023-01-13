const express = require("express");
const app = express();
const server = require("http").createServer(app);
const socketServer = require("./socket.js");

const cors = require("cors");
app.use(
  cors({
    origin: "https://birdnest-client-0et7.onrender.com",
  })
);

require("dotenv").config();
const port = process.env.PORT || 5001;

socketServer(server);

server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
