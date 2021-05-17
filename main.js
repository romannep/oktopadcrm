const { app, BrowserWindow } = require('electron');
const serverLib = require('./lib/server');
const os = require('os');
const fs = require('fs');
const path = require('path');
const sharedData = require('./shared');

const dataDirname = 'Oktopad CRM';
const dataFilename = 'oktopad.db';

function createWindow () {
  const win = new BrowserWindow({
    width: 600,
    height: 650,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
    autoHideMenuBar: true,
  });

  win.loadFile('app/index.html');
  // win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

const homeDir = os.homedir();

const dataDir = path.join(homeDir, dataDirname);
const dataFile = path.join(dataDir, dataFilename);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}
if (!fs.existsSync(dataFile)) {
  fs.copyFileSync(dataFilename, dataFile);
  console.log('Created starter db');
} else {
  console.log('Using existing database');
}
const allInterfaces = os.networkInterfaces();
const addresses = [];
Object.keys(allInterfaces).forEach((ifName) => {
  const ifAddresses = allInterfaces[ifName].filter(ifc => ifc.family === 'IPv4').map(ifc => ifc.address);
  addresses.push(...ifAddresses);
});
let localAddress = addresses.find(addr => addr.startsWith('192.16'));
if (!localAddress) {
  localAddress = 'localhost';
}

sharedData.dataDir = dataDir;
sharedData.localAddress = localAddress;
const server = serverLib.getServer(dataFile);
server.run();
