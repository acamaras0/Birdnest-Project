const axios = require("axios");
const db = require("../db/database");

/**
 ** This function will insert/update the pilots data in the table
 ** after a get request to the json url
 **/

function insertPilotInfo(baseUrl, serialNumbers, distance) {
	let pilotInfo = [];
	if (serialNumbers) {
		serialNumbers.forEach((element) => {
			axios.get(baseUrl + `pilots/` + element).then((res) => {
				pilotInfo = res.data;
				let firstname = pilotInfo.firstName.replace("'", "\\'");
				let lastname = pilotInfo.lastName.replace("'", "\\'");
				let email = pilotInfo.email.replace("'", "\\'");
				let phone = pilotInfo.phoneNumber;

				let sql = `INSERT INTO pilots (serialNumber, firstname, lastname, phone, email, distance) VALUES ('${element}','${firstname}', '${lastname}', '${email}', '${phone}', '${distance}' ) \
				ON DUPLICATE KEY UPDATE distance=IF(distance<VALUES(distance),distance,VALUES(distance))`

				db.query(sql, (err, result) => {
					if (err) throw err;
					else console.log("Pilot added/updates")
				})

				// let sql = `SELECT * FROM pilots WHERE serialNumber = '${element}'`;
				// db.query(sql, (err, result) => {
				// 	if (err) throw err;
				// 	if (result.length > 0 || result != "") {
				// 		sql = `UPDATE pilots SET firstname = '${firstname}', lastname = '${lastname}', email = '${email}', distance = '${distance}', serialNumber = '${element}' WHERE phone = '${phone}'`;
				// 		console.log("Pilot info updated!");
				// 	} else {
				// 		sql = `INSERT INTO pilots (firstname, lastname, email, phone, distance, serialNumber) VALUES ('${firstname}', '${lastname}', '${email}', '${phone}', '${distance}', '${element}')`;
				// 		db.query(sql, (err, result) => {
				// 			if (err) throw err;
				// 			console.log("Pilot info inserted!");
				// 		});
				// 	}
				// });
			});
		});
	}
}

module.exports = insertPilotInfo;
