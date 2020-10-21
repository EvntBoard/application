import { ipcMain } from 'electron';

import {
  triggerUpdate,
  triggerDelete,
  triggerCreate,
  triggerFindAll,
  triggerFindOne,
} from '../TriggerService';
import { TRIGGER } from '../../utils/ipc';
import { ITrigger } from '../../database/types';

import * as logger from '../LoggerService';

export const init = () => {
  logger.debug('[SERVICE.IPC.TRIGGER] => INIT');
  ipcMain.handle(TRIGGER.CREATE, (_, data: ITrigger) => triggerCreate(data));
  ipcMain.handle(TRIGGER.FIND_ALL, () => triggerFindAll());
  ipcMain.handle(TRIGGER.FIND_ONE, (_, id: string) => triggerFindOne(id));
  ipcMain.handle(TRIGGER.UPDATE, (_, data: ITrigger) => triggerUpdate(data));
  ipcMain.handle(TRIGGER.DELETE, (evt, data: ITrigger) => triggerDelete(data));
};
