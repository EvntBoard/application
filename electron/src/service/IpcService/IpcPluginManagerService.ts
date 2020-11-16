import { ipcMain } from 'electron';

import { reloadPlugin, infoPlugin, preloadPlugin } from '../PluginManagerService';
import { PLUGIN_MANAGER } from '../../preload/ipc';
import { IPlugin } from '../../types';

import logger from '../LoggerService';

export const init = () => {
  logger.debug('IPC PLUGIN MANAGER init');
  ipcMain.handle(PLUGIN_MANAGER.INFO, (_, data: IPlugin) => infoPlugin(data));
  ipcMain.handle(PLUGIN_MANAGER.PRELOAD, (_, data: IPlugin) => preloadPlugin(data));
  ipcMain.handle(PLUGIN_MANAGER.RELOAD, (_, data: IPlugin) => reloadPlugin(data));
};
