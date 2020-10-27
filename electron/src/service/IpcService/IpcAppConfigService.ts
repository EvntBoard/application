import { ipcMain } from 'electron';

import { appGet, appSet } from '../AppConfigService';
import { APP } from '../../utils/ipc';
import { IApp } from '../../types';
import logger from '../LoggerService';

export const init = () => {
  logger.debug('IPC APP init');
  ipcMain.handle(APP.GET, () => appGet());
  ipcMain.handle(APP.SET, (_, id: IApp) => appSet(id));
};
