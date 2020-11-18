import { ipcMain } from 'electron';

import { newEvent } from '../EventBusService';
import { EVENT_BUS } from '../../preload/ipc';
import logger from '../LoggerService';

export const init = () => {
  logger.debug('IPC EVENT BUS init');
  ipcMain.handle(EVENT_BUS.NEW, (_, data) => {
    newEvent({
      ...data,
      meta: {
        ...data.meta,
        sender: 'ipc',
      },
    });
  });
};
