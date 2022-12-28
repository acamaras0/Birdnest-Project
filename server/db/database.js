const mysql = require("mysql2");

// create the connection to database
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "123456",
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  db.query("CREATE DATABASE IF NOT EXISTS drones_db", (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0) console.log("Database already exists!");
    else console.log("Database created!");
  });

  db.query("USE drones_db", (err, result) => {
    if (err) throw err;
    console.log("Using drones_db.");
  });

  db.query(
    "CREATE TABLE IF NOT EXISTS pilots (id INT AUTO_INCREMENT PRIMARY KEY, firstname VARCHAR(255), lastname VARCHAR(255) , email VARCHAR(255), phone VARCHAR(255), timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",
    (err, result) => {
      if (err) throw err;
      if (result.affectedRows === 0) console.log("Table already exists!");
      else console.log("Pilots table created!");
    }
  );
});

module.exports = db;
