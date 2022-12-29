const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db/database");
const port = 3001;
const getPilotInfo = require("./utils/getPilotInfo");
const getDroneInfo = require("./utils/getDroneInfo");

app.use(cors());

app.get("/pilot-info", async (req, res) => {
  let serialNumbers = getDroneInfo();

  getPilotInfo(serialNumbers);

  sql = `SELECT * FROM pilots WHERE timestamp > DATE_SUB(NOW(), INTERVAL 10 MINUTE)`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
