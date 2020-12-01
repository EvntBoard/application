import { ipcMain } from 'electron';

import { appDebugGet, appDebugSet } from '../DebugConfigService';
import { DEBUG } from '../../preload/ipc';
import { IAppDebug } from '../../types';
import logger from '../LoggerService';

export const init = () => {
  logger.debug('IPC APP DEBUG init');
  ipcMain.handle(DEBUG.GET, () => appDebugGet());
  ipcMain.handle(DEBUG.SET, (_, id: IAppDebug) => appDebugSet(id));
};
