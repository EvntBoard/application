import { ipcMain } from 'electron';

import { langGet, langSet } from '../LangService';
import { LANG } from '../../preload/ipc';
import { ILang } from '../../types';

import logger from '../LoggerService';

export const init = () => {
  logger.debug('IPC LANG init');
  ipcMain.handle(LANG.GET, () => langGet());
  ipcMain.handle(LANG.SET, (_, id: ILang) => langSet(id));
};
