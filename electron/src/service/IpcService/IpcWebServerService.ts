import { ipcMain } from 'electron';

import { getStatus } from '../WebServerService';
import { WEB_SERVER } from '../../utils/ipc';

import logger from '../LoggerService';

export const init = () => {
  logger.debug('IPC WEB SERVER init');
  ipcMain.handle(WEB_SERVER.GET_STATUS, () => getStatus());
};
