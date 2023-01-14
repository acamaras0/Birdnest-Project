const db = require("./init");

/**
 ** This function deletes the data from the tables
 ** that are older than 10 minutes
 **/

function deleteData() {
  let query = `DELETE FROM pilots WHERE time < NOW() - INTERVAL '10 MINUTES'`;
  db.query(query, (err) => {
    if (err) console.error(err);
  });

  query = `DELETE FROM drones WHERE time < NOW() - INTERVAL '10 MINUTES'`;
  db.query(query, (err) => {
    if (err) console.error(err);
  });
}

module.exports = deleteData;
