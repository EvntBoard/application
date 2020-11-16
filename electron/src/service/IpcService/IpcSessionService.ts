import { ipcMain } from 'electron';

import { getSession } from '../SessionService';
import { SESSION } from '../../preload/ipc';
import logger from '../LoggerService';

export const init = () => {
  logger.debug('IPC SESSION init');
  // Default IPC ( in getSession method )
  ipcMain.handle(SESSION.GET, () => getSession());
};
