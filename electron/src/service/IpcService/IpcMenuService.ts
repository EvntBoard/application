import { ipcMain } from 'electron';

import { menuGet, menuSet } from '../MenuService';
import { MENU } from '../../utils/ipc';
import { IMenu } from '../../database/types';

import logger from '../LoggerService';

export const init = () => {
  logger.debug('IPC MENU init');
  ipcMain.handle(MENU.GET, () => menuGet());
  ipcMain.handle(MENU.SET, (_, id: IMenu) => menuSet(id));
};
