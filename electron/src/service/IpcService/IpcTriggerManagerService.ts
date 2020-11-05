import { ipcMain } from 'electron';

import { newEvent } from '../TriggerManagerService/eventBus';
import { TRIGGER_MANAGER } from '../../utils/ipc';
import logger from '../LoggerService';

export const init = () => {
  logger.debug('IPC TRIGGER_MANAGER init');
  ipcMain.handle(TRIGGER_MANAGER.NEW_EVENT, (_, data) => {
    newEvent(data);
  });
};
