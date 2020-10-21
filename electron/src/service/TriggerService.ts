import { v4 as uuid } from 'uuid';

import { database } from '../database/local';
import { ITrigger } from '../database/types';
import * as logger from './LoggerService';

export const triggerCreate = (trigger: ITrigger): ITrigger => {
  logger.debug('[SERVICE.TRIGGER] => CREATE');
  const id = uuid();
  database
    .get('triggers')
    .push({ id, ...trigger })
    .write();
  return triggerFindOne(id);
};

export const triggerFindAll = (): ITrigger[] => {
  logger.debug('[SERVICE.TRIGGER] => FIND ALL');
  return database.get('triggers').value();
};

export const triggerFindOne = (id: string): ITrigger => {
  logger.debug('[SERVICE.TRIGGER] => FIND ONE');
  return database.get('triggers').find({ id }).value();
};

export const triggerUpdate = (trigger: Partial<ITrigger>): ITrigger => {
  logger.debug('[SERVICE.TRIGGER] => UPDATE');
  database
    .get('triggers')
    .find({ id: trigger.id })
    .assign({ ...trigger })
    .write();
  return triggerFindOne(trigger.id);
};

export const triggerDelete = (trigger: Partial<ITrigger>): void => {
  logger.debug('[SERVICE.TRIGGER] => DELETE');
  database.get('triggers').remove({ id: trigger.id }).write();
};
