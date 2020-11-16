import { ipcMain } from 'electron';

import {
  triggerUpdate,
  triggerDelete,
  triggerCreate,
  triggerFindAll,
  triggerFindOne,
  triggerEditFile,
  triggerReload,
} from '../TriggerService';
import { TRIGGER } from '../../preload/ipc';
import { ITrigger } from '../../types';

import logger from '../LoggerService';

export const init = () => {
  logger.debug('IPC TRIGGER init');
  ipcMain.handle(TRIGGER.CREATE, (_, data: ITrigger) => triggerCreate(data));
  ipcMain.handle(TRIGGER.FIND_ALL, () => triggerFindAll());
  ipcMain.handle(TRIGGER.FIND_ONE, (_, id: string) => triggerFindOne(id));
  ipcMain.handle(TRIGGER.UPDATE, (_, data: ITrigger) => triggerUpdate(data));
  ipcMain.handle(TRIGGER.DELETE, (evt, data: ITrigger) => triggerDelete(data));
  ipcMain.handle(TRIGGER.EDIT_FILE, (evt, data: ITrigger) => triggerEditFile(data));
  ipcMain.handle(TRIGGER.RELOAD, (evt, data: ITrigger) => triggerReload(data));
};
