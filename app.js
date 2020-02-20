const { app, BrowserWindow, ipcMain } = require('electron');
const url = require('url');
const path = require('path');
const wifiHandler = require('./service/wifiHandler');

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
		const networks = await wifiHandler.scanNetworks();

		mainWindow.webContents.send('networks:payload', networks);
    });
});

ipcMain.on('connect:request', (event, data) => {
	wifiHandler.connectToNetwork(data);
});




