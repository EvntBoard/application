import { BrowserWindow } from 'electron';
import * as url from 'url';
import * as path from 'path';
import * as isDev from 'electron-is-dev';

import { loadingWindow } from './loading';

export let mainWindow: BrowserWindow = null;

export const createMainWindow = () => {
  // logger.debug('Load window : Main')
  // Create the browser window.
  mainWindow = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      preload: isDev
        ? path.join(process.cwd(), 'build', 'preload.js')
        : path.join(__dirname, 'preload.js'),
      allowRunningInsecureContent: false,
      contextIsolation: true,
      enableRemoteModule: false,
      sandbox: true,
      worldSafeExecuteJavaScript: true,
      devTools: isDev,
    },
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:4123');
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: '/index.html',
        protocol: 'file:',
        slashes: true,
      })
    );

    mainWindow.setMenu(null);
  }

  mainWindow.webContents.on('did-start-loading', () => {
    mainWindow.hide();
    loadingWindow.show();
  });

  mainWindow.webContents.on('did-stop-loading', () => {
    loadingWindow.hide();
    mainWindow.show();
  });

  mainWindow.webContents.once('did-finish-load', () => {
    loadingWindow.hide();
    mainWindow.show();
  });
};
