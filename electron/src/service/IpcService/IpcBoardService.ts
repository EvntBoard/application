import { ipcMain } from 'electron';

import { boardUpdate, boardDelete, boardCreate, boardFindAll, boardFindOne } from '../BoardService';
import { BOARD } from '../../utils/ipc';
import { IBoard } from '../../types';

import logger from '../LoggerService';

export const init = () => {
  logger.debug('IPC BOARD init');
  ipcMain.handle(BOARD.CREATE, (_, data: IBoard) => boardCreate(data));
  ipcMain.handle(BOARD.FIND_ALL, () => boardFindAll());
  ipcMain.handle(BOARD.FIND_ONE, (_, id: string) => boardFindOne(id));
  ipcMain.handle(BOARD.UPDATE, (_, data: IBoard) => boardUpdate(data));
  ipcMain.handle(BOARD.DELETE, (evt, data: IBoard) => boardDelete(data));
};
