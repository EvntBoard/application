import { ipcMain } from 'electron';

import { historyGet, historyProcessGet } from '../EventHistoryService';
import { EVENT_HISTORY } from '../../preload/ipc';
import logger from '../LoggerService';

export const init = () => {
  logger.debug('IPC EVENT HISTORY init');
  ipcMain.handle(EVENT_HISTORY.GET, () => historyGet());
  ipcMain.handle(EVENT_HISTORY.GET_PROCESS, () => historyProcessGet());
};
