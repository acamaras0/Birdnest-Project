const mysql = require("mysql2");
require("dotenv").config();

/**
 **  Create the connection to database and the tables
 **/

const db = mysql.createConnection({
	user: process.env.U,
	host: process.env.HOST,
	password: process.env.PASS,
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
		"CREATE TABLE IF NOT EXISTS pilots (id INT AUTO_INCREMENT PRIMARY KEY, firstname VARCHAR(255), lastname VARCHAR(255) , email VARCHAR(255), phone VARCHAR(255), distance DOUBLE, serialNumber VARCHAR(255),timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",
		(err, result) => {
			if (err) throw err;
			if (result.affectedRows === 0) console.log("Table already exists!");
			else console.log("Pilots table created!");
		}
	);

	db.query(
		"CREATE TABLE IF NOT EXISTS drones (id INT AUTO_INCREMENT PRIMARY KEY, serialNumber VARCHAR(255), model VARCHAR(255), manufacturer VARCHAR(255), mac VARCHAR(255), ipv4 VARCHAR(255), ipv6 VARCHAR(255), firmware VARCHAR(255), timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",
		(err, result) => {
			if (err) throw err;
			if (result.affectedRows === 0) console.log("Table already exists!");
			else console.log("Drones table created!");
		}
	);
});

module.exports = db;
