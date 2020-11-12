import { ipcMain } from 'electron';

import {
  pluginUpdate,
  pluginDelete,
  pluginCreate,
  pluginFindAll,
  pluginFindOne,
} from '../PluginService';
import { PLUGIN } from '../../utils/ipc';
import { IPlugin } from '../../types';

import logger from '../LoggerService';

export const init = () => {
  logger.debug('IPC PLUGIN init');
  ipcMain.handle(PLUGIN.CREATE, (_, data: IPlugin) => pluginCreate(data));
  ipcMain.handle(PLUGIN.FIND_ALL, () => pluginFindAll());
  ipcMain.handle(PLUGIN.FIND_ONE, (_, id: string) => pluginFindOne(id));
  ipcMain.handle(PLUGIN.UPDATE, (_, data: IPlugin) => pluginUpdate(data));
  ipcMain.handle(PLUGIN.DELETE, (evt, data: IPlugin) => pluginDelete(data));
};
