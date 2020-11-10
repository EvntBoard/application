import { ipcMain } from 'electron';

import { pluginGet, pluginAdd, pluginRemove } from '../PluginService';
import { PLUGIN } from '../../utils/ipc';
import { IPlugin } from '../../types';
import logger from '../LoggerService';

export const init = () => {
  logger.debug('IPC PLUGIN init');
  ipcMain.handle(PLUGIN.ADD, (_, data: IPlugin) => pluginAdd(data));
  ipcMain.handle(PLUGIN.GET, () => pluginGet());
  ipcMain.handle(PLUGIN.REMOVE, (evt, data: IPlugin) => pluginRemove(data));
};
