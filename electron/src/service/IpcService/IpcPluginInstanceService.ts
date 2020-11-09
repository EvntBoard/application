import { ipcMain } from 'electron';

import {
  pluginInstanceFindAll,
  pluginInstanceCreate,
  pluginInstanceDelete,
  pluginInstanceFindOne,
  pluginInstanceUpdate,
} from '../PluginInstanceService';
import { PLUGIN_INSTANCE } from '../../utils/ipc';
import { IPluginInstance } from '../../types';

import logger from '../LoggerService';

export const init = () => {
  logger.debug('IPC PLUGIN INSTANCE init');
  ipcMain.handle(PLUGIN_INSTANCE.CREATE, (_, data: IPluginInstance) => pluginInstanceCreate(data));
  ipcMain.handle(PLUGIN_INSTANCE.FIND_ALL, () => pluginInstanceFindAll());
  ipcMain.handle(PLUGIN_INSTANCE.FIND_ONE, (_, id: string) => pluginInstanceFindOne(id));
  ipcMain.handle(PLUGIN_INSTANCE.UPDATE, (_, data: IPluginInstance) => pluginInstanceUpdate(data));
  ipcMain.handle(PLUGIN_INSTANCE.DELETE, (evt, data: IPluginInstance) =>
    pluginInstanceDelete(data)
  );
};
