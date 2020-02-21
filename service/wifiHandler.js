const wifi = require('node-wifi');

wifi.init({
	iface: null,
});

function scanNetworks(cb) {
	wifi.scan((err, networks) => {
		const result = {};
		if (err || !Array.isArray(networks) || networks.length === 0) {
			result.successful = false;
			result.error = err;
		} else {
			result.successful = true;
			result.networks = networks;
		}

		cb(result);
	});
}

function getCurrentConnections(cb) {
	wifi.getCurrentConnections((err, currentConnections) => {
		const result = {};
		if (err) {
			result.successful = false;
			result.error = err;
		} else {
			result.successful = true;
			result.connections = currentConnections;
		}

		cb(result);
	});
}

function connectToNetwork(data, cb) {
	wifi.connect({ ssid: data.ssid, password: data.password }, err => {
		const result = {};
		if (err) {
			result.successful = false;
			result.error = err;
		} else {
			result.successful = true;
			result.ssid = data.ssid;
		}

		cb(result);
	});
}

module.exports = {
	scanNetworks,
	connectToNetwork,
	getCurrentConnections,
};
