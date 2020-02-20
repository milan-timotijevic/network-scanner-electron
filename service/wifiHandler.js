const { ipcMain } = require('electron');
const wifi = require('node-wifi');

wifi.init({
	iface: null
});

function scanNetworks(webContents) {
	wifi.scan((err, networks) => {
		const result = {};
		if (err) {
			result.successful = false;
			result.error = err;
		} else {
			result.successful = true;
			result.networks = networks;
		}

		webContents.send('network-scan:result', result);
	});
}

function connectToNetwork(data, webContents) {
	wifi.connect({ ssid: data.ssid, password: data.password }, err => {
		const result = {};
		if (err) {
			result.successful = false;
			result.error = err;
		} else {
			result.successful = true;
		}

		webContents.send('connect:result', result);
	});
}

module.exports = {
	scanNetworks,
	connectToNetwork,
};
