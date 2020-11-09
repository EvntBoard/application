import { ipcMain } from 'electron';

import {
  moduleUpdate,
  moduleDelete,
  moduleCreate,
  moduleFindAll,
  moduleFindOne,
} from '../ModuleService';
import { MODULE } from '../../utils/ipc';
import { IModule } from '../../types';

import logger from '../LoggerService';

export const init = () => {
  logger.debug('IPC MODULE init');
  ipcMain.handle(MODULE.CREATE, (_, data: IModule) => moduleCreate(data));
  ipcMain.handle(MODULE.FIND_ALL, () => moduleFindAll());
  ipcMain.handle(MODULE.FIND_ONE, (_, id: string) => moduleFindOne(id));
  ipcMain.handle(MODULE.UPDATE, (_, data: IModule) => moduleUpdate(data));
  ipcMain.handle(MODULE.DELETE, (evt, data: IModule) => moduleDelete(data));
};
