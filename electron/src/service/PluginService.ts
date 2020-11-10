import { database } from '../database/local';
import { IPlugin } from '../types';
import { loadPlugin, unloadPlugin } from './PluginManagerService';
import logger from './LoggerService';

export const pluginGet = (): IPlugin[] => {
  logger.debug('Plugin Service GET');
  return database.get('plugins').value();
};

export const pluginAdd = (plugin: IPlugin): IPlugin => {
  logger.debug('Plugin Service add');
  if (database.get('plugins').findIndex(plugin).value() === -1) {
    database.get('plugins').push(plugin).write();
    loadPlugin(plugin).then(() => {});
  }
  return database.get('plugins').find(plugin).value();
};

export const pluginRemove = (plugin: IPlugin): void => {
  logger.debug('Plugin Service remove');
  unloadPlugin(plugin).then(() => {});
  database.get('plugins').remove(plugin).write();
};
