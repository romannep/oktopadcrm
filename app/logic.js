const { shell, ipcRenderer } = require('electron');

const sharedData = require('electron').remote.require('./shared');
const systemAddress = `http://${sharedData.localAddress}:1122/`;

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('dataDir').innerText = sharedData.dataDir;
  document.getElementById('localAddress').innerText = sharedData.localAddress;
});

function openApp() {
  shell.openExternal(systemAddress);
}

function openDir() {
  shell.openPath(sharedData.dataDir);
}

function copyAddress() {
  copyTextToClipboard(systemAddress);
}

function copyTextToClipboard(text) {
  const textArea = document.createElement("textarea");

  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;
  textArea.style.width = '2em';
  textArea.style.height = '2em';
  textArea.style.padding = 0;
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  textArea.style.background = 'transparent';
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
  } catch (err) {
    console.log('Oops, unable to copy');
  }
  document.body.removeChild(textArea);
}

ipcRenderer.on('server-ready', () => {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('ready').style.display = 'block';
});
