const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

require("dotenv").config();
const router = require("./routes/router");
const port = 3001;

app.use(router);


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
