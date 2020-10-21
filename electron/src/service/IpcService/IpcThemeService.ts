import { ipcMain } from 'electron';

import { themeGet, themeSet } from '../ThemeService';
import { THEME } from '../../utils/ipc';
import { ITheme } from '../../database/types';

import logger from '../LoggerService';

export const init = () => {
  logger.debug('IPC THEME init');
  ipcMain.handle(THEME.GET, () => themeGet());
  ipcMain.handle(THEME.SET, (_, id: ITheme) => themeSet(id));
};
