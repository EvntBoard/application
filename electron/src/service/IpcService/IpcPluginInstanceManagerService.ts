import { ipcMain } from 'electron';

import { reloadPluginInstance } from '../PluginInstanceManagerService';
import { PLUGIN_INSTANCE_MANAGER } from '../../utils/ipc';
import { IPluginInstance } from '../../types';

import logger from '../LoggerService';

export const init = () => {
  logger.debug('IPC PLUGIN INSTANCE MANAGER init');
  ipcMain.handle(PLUGIN_INSTANCE_MANAGER.RELOAD, (_, data: IPluginInstance) => reloadPluginInstance(data));
};
