import { shell } from 'electron';
import { v4 as uuid } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';

import { reload, unload, load } from './TriggerManagerService';
import { workspaceGetCurrent } from './WorkspaceService';
import { database } from '../database/local';
import { ITrigger } from '../types';
import logger from './LoggerService';

const DEFAULT_CONTENT = `const conditions = {
  'click': (idTrigger, evntData) => {
    console.log('waza')
  }
}

const reaction = async (evntData, services) => {
  console.log('testt')
}
  
module.exports = {
  conditions,
  reaction
}`;

export const triggerCreate = (trigger: ITrigger): ITrigger => {
  logger.debug('Trigger Service CREATE');
  const currentWorkspace = workspaceGetCurrent();
  const id = uuid();
  database
    .get('triggers')
    .push({
      ...trigger,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .write();
  const created = triggerFindOne(id);

  // create default file :)
  const triggerDirPath = path.join(currentWorkspace.path, 'trigger');
  const triggerFilePath = path.join(triggerDirPath, `${created.id}.js`);

  if (!fs.existsSync(triggerDirPath)) {
    fs.mkdirSync(triggerDirPath);
  }
  fs.appendFileSync(triggerFilePath, DEFAULT_CONTENT);

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
    .assign({
      ...trigger,
      updatedAt: new Date(),
    })
    .write();

  const updated = triggerFindOne(trigger.id);
  reload(updated);
  return updated;
};

export const triggerDelete = (trigger: Partial<ITrigger>): void => {
  logger.debug('Trigger Service DELETE');
  const currentWorkspace = workspaceGetCurrent();

  unload(trigger);
  database.get('triggers').remove({ id: trigger.id }).write();

  const triggerDirPath = path.join(currentWorkspace.path, 'trigger');
  const triggerFilePath = path.join(triggerDirPath, `${trigger.id}.js`);
  fs.unlinkSync(triggerFilePath)
};

export const triggerEditFile = (trigger: Partial<ITrigger>): void => {
  logger.debug('Trigger Service EDIT CURRENT TRIGGER FILE');
  const currentWorkspace = workspaceGetCurrent();
  shell.openPath(path.join(currentWorkspace.path, 'trigger', `${trigger.id}.js`));
};

export const triggerReload = (trigger: ITrigger): void => {
  logger.debug('Trigger Service RELOAD TRIGGER FILE');
  reload(trigger);
};
