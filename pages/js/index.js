const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

const networksSelect = document.getElementById('networks-select');
const connectButton = document.getElementById('connect-button');
const passwordInput = document.getElementById('password-input');

function clearNetworks() {
	while (networksSelect.firstChild) {
		networksSelect.removeChild(networksSelect.lastChild);
	}
}

function populateNetworks(networks) {
	clearNetworks();
	networks.forEach(network => {
		const opt = document.createElement('option');
		opt.appendChild( document.createTextNode(network.ssid + ' / ' + network.mac) );
		opt.value = network.mac;
		networksSelect.appendChild(opt);
	});
}

ipcRenderer.on('networks:payload', (event, networks) => {
    populateNetworks(networks);
});

connectButton.addEventListener('click', function() {
	const password = passwordInput.value;
	const selectedNetworkOption = networksSelect.options[networksSelect.selectedIndex];
});
