const { app, BrowserWindow } = require('electron');
const os = require('os');
const fs = require('fs');
const path = require('path');
const serverLib = require('./libserver/server');
const sharedData = require('./shared');

const DBVERSION = 1;

const dataDirname = 'Oktopad CRM';
const dataFilename = 'oktopad.db';
const updatesFilename = 'updatelog';
const dbversionFilename = 'dbversion';

const homeDir = os.homedir();

const dataDir = path.join(homeDir, dataDirname);
const dataFile = path.join(dataDir, dataFilename);
const updatesFile = path.join(dataDir, updatesFilename);
let dbversionFile = path.join(dataDir, dbversionFilename);

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
let env;

async function doDbsyncIfNeed(server) {
  if (!fs.existsSync(dbversionFile)) {
    fs.writeFileSync(dbversionFile, '0');
  }
  const currentDbVersion = +fs.readFileSync(dbversionFile);
  if (currentDbVersion < DBVERSION) {
    await server.syncDatabase();
    fs.writeFileSync(dbversionFile, DBVERSION);
    console.log('dbsync done');
  }
}

async function startServer() {
  if (process.env.ENV) {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    env = require(`./env.${process.env.ENV.trim()}.json`);
    if (env.dbversion) {
      dbversionFile = env.dbversion;
    }
  }

  server = serverLib.getServer(dataFile, updatesFile);
  await doDbsyncIfNeed(server);
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
