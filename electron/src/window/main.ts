import { BrowserWindow } from 'electron';
import * as url from 'url';
import * as path from 'path';
import * as isDev from 'electron-is-dev';

export let mainWindow: BrowserWindow = null;

export const createMainWindow = () => {
  // logger.debug('Load window : Main')
  // Create the browser window.
  mainWindow = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    width: 1400,
    height: 700,
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
    mainWindow.show();
    mainWindow.loadURL('http://localhost:4123');
    // mainWindow.webContents.openDevTools({ mode: 'detach' });
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: '/index.html',
        protocol: 'file:',
        slashes: true,
      })
    );
    mainWindow.webContents.once('did-finish-load', () => mainWindow.show());
    mainWindow.setMenu(null);
  }
};
