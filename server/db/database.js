const Pool = require("pg").Pool;
require("dotenv").config();

const db = new Pool({
  user: "postgres",
  host: "localhost",
  password: "123456",
  database: "drones_db",
  port: 5432,
});

db.connect();

db.query("CREATE DATABASE drones_db;", (err, res) => {
  if (err) console.log(err);
  console.log("drones_db created!");
});

db.query(
  "CREATE TABLE IF NOT EXISTS pilots (serialNumber VARCHAR(255) PRIMARY KEY, firstname VARCHAR(255), lastname VARCHAR(255), email VARCHAR(255), phone VARCHAR(255), distance DOUBLE PRECISION, time timestamp with time zone default current_timestamp);",
  (err) => {
    if (err) console.log(err);
    else console.log("pilots table created!");
  }
);

db.query(
  "CREATE TABLE IF NOT EXISTS drones (serialNumber VARCHAR(255) PRIMARY KEY, model VARCHAR(255), manufacturer VARCHAR(255), mac VARCHAR(255), ipv4 VARCHAR(255), ipv6 VARCHAR(255), firmware VARCHAR(255), time timestamp with time zone default current_timestamp);",
  (err) => {
    if (err) console.log(err);
    else console.log("drones table created!");
  }
);

module.exports = db;
