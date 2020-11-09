import { v4 as uuid } from 'uuid';

import { database } from '../database/local';
import { IModule } from '../types';
import logger from './LoggerService';

export const moduleCreate = (module: IModule): IModule => {
  logger.debug('Module Service CREATE');
  const id = uuid();
  database
    .get('modules')
    .push({
      ...module,
      id,
    })
    .write();
  return moduleFindOne(id);
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
    .assign({
      ...module,
      updatedAt: new Date(),
    })
    .write();

  return moduleFindOne(module.id);
};

export const moduleDelete = (module: Partial<IModule>): void => {
  logger.debug('Module Service DELETE');

  database.get('modules').remove({ id: module.id }).write();
};
