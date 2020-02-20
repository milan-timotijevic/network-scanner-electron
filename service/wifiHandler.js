const wifi = require('node-wifi');

wifi.init({
	iface: null
});

async function scanNetworks() {
	return wifi.scan();
}

module.exports = {
	scanNetworks,
};
