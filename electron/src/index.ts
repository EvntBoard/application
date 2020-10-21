import { app, BrowserWindow } from 'electron';

import { init as initGlobalDB } from './database/global';
import { init as initLocalDB } from './database/local';
import { init as initIpc } from './service/IpcService';
import { createMainWindow } from './window/main';
import * as logger from './service/LoggerService';

app.on('ready', async () => {
  logger.info('[EVNTBOARD] => START');
  await initIpc();
  await initGlobalDB();
  await initLocalDB();
  createMainWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
});
