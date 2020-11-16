import { ipcMain } from 'electron';

import { getCache } from '../CacheService';
import { CACHE } from '../../preload/ipc';
import logger from '../LoggerService';

export const init = () => {
  logger.debug('IPC CACHE init');
  ipcMain.handle(CACHE.GET, () => getCache());
};
