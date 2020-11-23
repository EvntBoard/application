import { ipcMain, shell } from 'electron';

import { HELP } from '../../preload/ipc';
import logger from '../LoggerService';

export const init = () => {
  logger.debug('IPC HELP init');
  ipcMain.handle(HELP.OPEN_ISSUE, () =>
    shell.openExternal('https://github.com/EvntBoard/application/issues')
  );
};
