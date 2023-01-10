const axios = require("axios");

const baseUrl = "https://assignments.reaktor.com/birdnest/";

const { XMLParser } = require("fast-xml-parser");
const parser = new XMLParser();

/**
 ** Getting the device information in order to display it in the navbar
 **/

const getDeviceInfo = (req, res) => {
	try {
		axios.get(baseUrl + "drones").then((xml) => {
			let json = parser.parse(xml.data);
			let device = json.report.deviceInformation;

			res.send(device);
		});
	} catch (error) {
		console.error(error);
	}
};

module.exports = getDeviceInfo;