import { ipcMain } from 'electron';

import { pluginGet, pluginAdd, pluginRemove } from '../PluginService';
import { PLUGIN } from '../../utils/ipc';
import { IPlugin } from '../../types';
import logger from '../LoggerService';

export const init = () => {
  logger.debug('IPC PLUGIN init');
  ipcMain.handle(PLUGIN.CREATE, (_, data: IPlugin) => pluginAdd(data));
  ipcMain.handle(PLUGIN.FIND_ALL, () => pluginGet());
  ipcMain.handle(PLUGIN.DELETE, (evt, data: IPlugin) => pluginRemove(data));
};
