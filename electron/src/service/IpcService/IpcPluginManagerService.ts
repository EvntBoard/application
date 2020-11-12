import { ipcMain } from 'electron';

import { infoPlugin, reloadPlugin } from '../PluginManagerService';
import { PLUGIN_MANAGER } from '../../utils/ipc';
import { IPlugin } from '../../types';
import logger from '../LoggerService';

export const init = () => {
  logger.debug('IPC PLUGIN MANAGER init');
  ipcMain.handle(PLUGIN_MANAGER.INFO, (_, data: IPlugin) => infoPlugin(data));
  ipcMain.handle(PLUGIN_MANAGER.RELOAD, (evt, data: IPlugin) => reloadPlugin(data));
};
