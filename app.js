const { app, BrowserWindow, ipcMain } = require('electron');
const url = require('url');
const path = require('path');
const wifi = require('node-wifi');

wifi.init({
	iface: null
});

let mainWindow;

app.on('ready', async () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'pages', 'html', 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.removeMenu();

    mainWindow.on('closed', () => {
        mainWindow = null;
        app.quit();
    });

    // mainWindow.webContents.openDevTools();

    mainWindow.webContents.on('did-finish-load', async () => {
	    wifi.scan(function(err, networks) {
		    if (err) {
			    console.log(err);
		    } else {
			    mainWindow.webContents.send('networks:payload', networks);
		    }
	    });
    });
});

ipcMain.on('omglol', function() {
	console.log('event happened!')
});




