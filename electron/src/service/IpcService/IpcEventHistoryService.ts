import { ipcMain } from 'electron';

import { getHistory } from '../EventHistoryService';
import { EVENT_HISTORY } from '../../preload/ipc';
import logger from '../LoggerService';

export const init = () => {
  logger.debug('IPC EVENT HISTORY init');
  ipcMain.handle(EVENT_HISTORY.GET, () => getHistory());
};
