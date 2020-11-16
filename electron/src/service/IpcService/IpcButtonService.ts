import { ipcMain } from 'electron';

import {
  buttonUpdate,
  buttonDelete,
  buttonCreate,
  buttonFindAll,
  buttonFindOne,
  buttonFindAllByBoardId,
} from '../ButtonService';
import { BUTTON } from '../../preload/ipc';
import { IButton } from '../../types';

import logger from '../LoggerService';

export const init = () => {
  logger.debug('IPC BUTTON init');
  ipcMain.handle(BUTTON.CREATE, (_, data: IButton) => buttonCreate(data));
  ipcMain.handle(BUTTON.FIND_ALL, () => buttonFindAll());
  ipcMain.handle(BUTTON.FIND_ALL_BOARD_ID, (_, id: string) => buttonFindAllByBoardId(id));
  ipcMain.handle(BUTTON.FIND_ONE, (_, id: string) => buttonFindOne(id));
  ipcMain.handle(BUTTON.UPDATE, (_, data: IButton) => buttonUpdate(data));
  ipcMain.handle(BUTTON.DELETE, (evt, data: IButton) => buttonDelete(data));
};
