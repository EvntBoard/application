import { ipcMain } from 'electron';

import { pluginGetEnhanced, pluginAdd, pluginRemove, reloadPlugin } from '../PluginService';
import { PLUGIN } from '../../utils/ipc';
import { IPlugin } from '../../types';
import logger from '../LoggerService';

export const init = () => {
  logger.debug('IPC PLUGIN init');
  ipcMain.handle(PLUGIN.ADD, (_, data: IPlugin) => pluginAdd(data));
  ipcMain.handle(PLUGIN.GET, () => pluginGetEnhanced());
  ipcMain.handle(PLUGIN.REMOVE, (evt, data: IPlugin) => pluginRemove(data));
  ipcMain.handle(PLUGIN.RELOAD, (evt, data: IPlugin) => reloadPlugin(data));
};
