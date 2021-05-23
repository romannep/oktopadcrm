const { app, BrowserWindow } = require('electron');
const os = require('os');
const fs = require('fs');
const path = require('path');
const serverLib = require('./libserver/server');
const sharedData = require('./shared');

const dataDirname = 'Oktopad CRM';
const dataFilename = 'oktopad.db';
const updatesFilename = 'updatelog';
// const dbversionFilename = 'dbversion';

const homeDir = os.homedir();

const dataDir = path.join(homeDir, dataDirname);
const dataFile = path.join(dataDir, dataFilename);
const updatesFile = path.join(dataDir, updatesFilename);

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

let win;
let server;
let updatesFinished;

function startServer() {
  // TODO: check dbversion and do dbsync
  server = serverLib.getServer(dataFile, updatesFile);
  server.run();

  const checkReadyTimer = setInterval(() => {
    if (server.app.updatesFinished) {
      console.log('Updates finished');
      clearInterval(checkReadyTimer);
      win.webContents.send('server-ready');
      updatesFinished = true;
    }
  }, 100);
}

function createWindow() {
  win = new BrowserWindow({
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

  startServer();
  win.webContents.on('did-finish-load', () => {
    if (updatesFinished) {
      win.webContents.send('server-ready');
    }
  });
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
