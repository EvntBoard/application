import { v4 as uuid } from 'uuid';

import { reload, unload, load } from './TriggerManagerService';
import { database } from '../database/local';
import { ITrigger } from '../types';
import logger from './LoggerService';

export const triggerCreate = (trigger: ITrigger): ITrigger => {
  logger.debug('Trigger Service CREATE');
  const id = uuid();
  database
    .get('triggers')
    .push({ ...trigger, id })
    .write();
  const created = triggerFindOne(id);
  load(created);
  return created;
};

export const triggerFindAll = (): ITrigger[] => {
  logger.debug('Trigger Service FIND ALL');
  return database.get('triggers').value();
};

export const triggerFindOne = (id: string): ITrigger => {
  logger.debug('Trigger Service FIND ONE');
  return database.get('triggers').find({ id }).value();
};

export const triggerUpdate = (trigger: Partial<ITrigger>): ITrigger => {
  logger.debug('Trigger Service UPDATE');
  database
    .get('triggers')
    .find({ id: trigger.id })
    .assign({ ...trigger })
    .write();

  const updated = triggerFindOne(trigger.id);
  reload(updated);
  return updated;
};

export const triggerDelete = (trigger: Partial<ITrigger>): void => {
  logger.debug('Trigger Service DELETE');
  unload(trigger);
  database.get('triggers').remove({ id: trigger.id }).write();
};
