import { ipcMain } from 'electron';

import { getStatus, openApp, getUrl } from '../WebServerService';
import { WEB_SERVER } from '../../utils/ipc';

import logger from '../LoggerService';

export const init = () => {
  logger.debug('IPC WEB SERVER init');
  ipcMain.handle(WEB_SERVER.GET_STATUS, () => getStatus());
  ipcMain.handle(WEB_SERVER.GET_URL, () => getUrl());
  ipcMain.handle(WEB_SERVER.OPEN, () => openApp());
};
