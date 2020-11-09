import { v4 as uuid } from 'uuid';

import { database } from '../database/local';
import { IModule } from '../types';
import { loadModule, reloadModule, unloadModule } from './ModuleManagerService';
import logger from './LoggerService';

export const moduleCreate = (module: IModule): IModule => {
  logger.debug('Module Service CREATE');
  const id = uuid();
  database
    .get('modules')
    .push({ ...module, id })
    .write();
  const created = moduleFindOne(id);
  loadModule(created).then(() => {});
  return created;
};

export const moduleFindAll = (): IModule[] => {
  logger.debug('Module Service FIND ALL');
  return database.get('modules').value();
};

export const moduleFindOne = (id: string): IModule => {
  logger.debug('Module Service FIND ONE');
  return database.get('modules').find({ id }).value();
};

export const moduleUpdate = (module: Partial<IModule>): IModule => {
  logger.debug('Module Service UPDATE');
  database
    .get('modules')
    .find({ id: module.id })
    .assign({ ...module })
    .write();

  const updated = moduleFindOne(module.id);
  reloadModule(updated).then(() => {});
  return updated;
};

export const moduleDelete = (module: IModule): void => {
  logger.debug('Module Service DELETE');
  unloadModule(module).then(() => {});
  database.get('modules').remove({ id: module.id }).write();
};
