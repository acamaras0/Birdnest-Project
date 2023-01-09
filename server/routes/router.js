const express = require("express");
const router = express.Router();

const getDevice = require("../models/getDevice");

router.get("/device", getDevice);

module.exports = router;
