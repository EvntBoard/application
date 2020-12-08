import { BrowserWindow } from 'electron';
import * as url from 'url';

export let loadingWindow: BrowserWindow = null;

export const createLoadingWindow = () => {
  // logger.debug('Load window : Main')
  // Create the browser window.
  loadingWindow = new BrowserWindow({
    width: 600,
    height: 200,
    resizable: false,
    movable: false,
    show: false,
    frame: false,
    transparent: true,
    webPreferences: {
      allowRunningInsecureContent: false,
      contextIsolation: true,
      enableRemoteModule: false,
      sandbox: true,
      worldSafeExecuteJavaScript: true,
      devTools: false,
    },
  });

  loadingWindow.setMenu(null);

  loadingWindow.loadURL(url.format({
    pathname: 'loading.html',
    protocol: 'file:',
    slashes: true,
  }));

  loadingWindow.webContents.once('did-finish-load', () => loadingWindow.show());
};
