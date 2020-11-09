import { app, BrowserWindow } from 'electron';

import { init as initGlobalDB } from './database/global';
import { init as initLocalDB } from './database/local';
import { registerProtocol as initRegisterProtocol } from './protocol';
import { init as initIpc } from './service/IpcService';
import { init as initTriggerManager } from './service/TriggerManagerService';
import { init as initWebServer } from './service/WebServerService';
import { init as initModuleManager } from './service/ModuleManagerService';
import { createMainWindow } from './window/main';
import logger from './service/LoggerService';

app.on('ready', async () => {
  logger.info('Application init');
  await initGlobalDB();
  await initLocalDB();
  await initRegisterProtocol();
  await initIpc();
  await initTriggerManager();
  await initWebServer();
  await initModuleManager();
  createMainWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
});
