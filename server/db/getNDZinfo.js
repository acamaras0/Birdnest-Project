const db = require("./init");

function getNDZinfo(callback) {
  const query = `SELECT * FROM pilots INNER JOIN drones ON pilots.serialNumber = drones.serialNumber WHERE pilots.time > NOW() - INTERVAL '10 MINUTES' ORDER BY pilots.time DESC`;
  db.query(query, (err, result) => {
    if (err) console.error(err);
    if (result && result.rows.length > 0) {
      callback(result.rows);
    }
  });
}

module.exports = getNDZinfo;
