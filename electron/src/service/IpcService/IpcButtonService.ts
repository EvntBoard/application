import { ipcMain } from 'electron';

import {
  buttonUpdate,
  buttonDelete,
  buttonCreate,
  buttonFindAll,
  buttonFindOne,
} from '../ButtonService';
import { BUTTON } from '../../utils/ipc';
import { IButton } from '../../database/types';

import * as logger from '../LoggerService';

export const init = () => {
  logger.debug('[SERVICE.IPC.BUTTON] => INIT');
  ipcMain.handle(BUTTON.CREATE, (_, data: IButton) => buttonCreate(data));
  ipcMain.handle(BUTTON.FIND_ALL, () => buttonFindAll());
  ipcMain.handle(BUTTON.FIND_ONE, (_, id: string) => buttonFindOne(id));
  ipcMain.handle(BUTTON.UPDATE, (_, data: IButton) => buttonUpdate(data));
  ipcMain.handle(BUTTON.DELETE, (evt, data: IButton) => buttonDelete(data));
};
