import { v4 as uuid } from 'uuid';

import { database } from '../database/local';
import { IPluginInstance } from '../types';
import {loadPluginInstance, reloadPluginInstance, unloadPluginInstance} from './PluginInstanceManagerService';
import logger from './LoggerService';

export const pluginInstanceCreate = (module: IPluginInstance): IPluginInstance => {
  logger.debug('Plugin instance service CREATE');
  const id = uuid();
  database
    .get('pluginsInstance')
    .push({ ...module })
    .write();
  const created = database.get('pluginsInstance').find({ id }).value();
  loadPluginInstance(created);
  return created;
};

export const pluginInstanceFindAll = (): IPluginInstance[] => {
  logger.debug('Plugin instance service FIND ALL');
  return database.get('pluginsInstance').value();
};

export const pluginInstanceFindOne = (id: string): IPluginInstance => {
  logger.debug('Plugin instance service FIND ONE');
  return database.get('pluginsInstance').find({ id }).value();
};

export const pluginInstanceUpdate = (module: Partial<IPluginInstance>): IPluginInstance => {
  logger.debug('Plugin instance Service UPDATE');
  database
    .get('pluginsInstance')
    .find({ id: module.id })
    .assign({ ...module })
    .write();

  const updated = database.get('pluginsInstance').find({ id: module.id }).value();
  reloadPluginInstance(updated);
  return updated;
};

export const pluginInstanceDelete = (module: IPluginInstance): void => {
  logger.debug('Plugin instance service DELETE');
  unloadPluginInstance(module)
  database.get('pluginsInstance').remove({ id: module.id }).write();
};
