const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const { XMLParser } = require("fast-xml-parser");
const parser = new XMLParser();
const port = 3001;

app.use(cors());

app.get("/drone-info", async (req, res) => {
  const xml = await axios.get(
    "https://assignments.reaktor.com/birdnest/drones"
  );
  const json = parser.parse(xml.data);
  console.log(json.report.capture);
  res.send(json.report.capture);
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
