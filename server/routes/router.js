const express = require("express");
const router = express.Router();

const getDeviceInfo = require("../models/getDeviceInfo");

router.get("/device", getDeviceInfo);

module.exports = router;
