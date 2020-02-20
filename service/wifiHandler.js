const wifi = require('node-wifi');

wifi.init({
	iface: null
});

async function scanNetworks() {
	return wifi.scan();
}

async function connectToNetwork(data) {
	wifi.connect({ ssid: data.ssid, password: data.password }, function(err) {
		if (err) {
			console.log(err);
		}
		console.log("Connected");
	});
}

module.exports = {
	scanNetworks,
	connectToNetwork,
};
