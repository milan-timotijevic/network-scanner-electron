const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

const connectedToElement = document.getElementById('connected-to-element');
const networksSelect = document.getElementById('networks-select');
const connectButton = document.getElementById('connect-button');
const passwordInput = document.getElementById('password-input');
const notificationsElement = document.getElementById('notifications-element');

let notificationTimeout;
function notify(message, temp) {
	clearTimeout(notificationTimeout);

	notificationsElement.innerText = message;

	if (temp) {
		notificationTimeout = setTimeout(() => {
			notificationsElement.innerText = '';
		}, 5000)
	}
}

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
		opt.value = network.ssid;
		networksSelect.appendChild(opt);
	});
}

ipcRenderer.on('ready', () => {
	notify('Scanning for networks...');
});

ipcRenderer.on('network-scan:result', (event, result) => {
	if (result.successful) {
		notify('Network scan complete', true);
		populateNetworks(result.networks);
	} else {
		notify('Network scan failed: unable to find any networks');
	}
});

connectButton.addEventListener('click', function() {
	const ssid = networksSelect.options[networksSelect.selectedIndex].value;
	const password = passwordInput.value;

	notify('Attempting to connect...');
	connectedToElement.innerText = ``;
	ipcRenderer.send('connect:request', { ssid, password })
});

ipcRenderer.on('connect:result', (event, result) => {
	if (result.successful) {
		notify('Successfully connected', true);
		connectedToElement.innerText = `Connected to: ${result.ssid}`;
	} else {
		notify('Failed to connect', true);
	}
});


