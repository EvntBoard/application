import { v4 as uuid } from 'uuid';

import { database } from '../database/local';
import { IPlugin } from '../types';
import { reloadPlugin, unloadPlugin, loadPlugin } from './PluginManagerService';
import logger from './LoggerService';

export const pluginCreate = (module: IPlugin): IPlugin => {
  logger.debug('Plugin service CREATE');
  const id = uuid();
  database
    .get('plugins')
    .push({ ...module, id })
    .write();
  const created = database.get('plugins').find({ id }).value();
  loadPlugin(created).catch((e) => logger.error(e));
  return created;
};

export const pluginFindAll = (): IPlugin[] => {
  logger.debug('Plugin service FIND ALL');
  return database.get('plugins').value();
};

export const pluginFindOne = (id: string): IPlugin => {
  logger.debug('Plugin service FIND ONE');
  return database.get('plugins').find({ id }).value();
};

export const pluginUpdate = (module: Partial<IPlugin>): IPlugin => {
  logger.debug('Plugin instance Service UPDATE');
  database
    .get('plugins')
    .find({ id: module.id })
    .assign({ ...module })
    .write();

  const updated = database.get('plugins').find({ id: module.id }).value();
  reloadPlugin(updated).catch((e) => logger.error(e));
  return updated;
};

export const pluginDelete = (module: IPlugin): void => {
  logger.debug('Plugin service DELETE');
  unloadPlugin(module).catch((e) => logger.error(e));
  database.get('plugins').remove({ id: module.id }).write();
};
