const express = require("express");
const router = express.Router();

const getPilots = require("../models/getPilots");
const getDevice = require("../models/getDevice");

router.get("/device", getDevice);
router.get("/", getPilots);


module.exports = router;