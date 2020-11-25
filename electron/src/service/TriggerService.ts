import { shell } from 'electron';
import { v4 as uuid } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';

import { reload, unload, load } from './TriggerManagerService';
import { workspaceGetCurrent } from './WorkspaceService';
import { database } from '../database/local';
import { ITrigger } from '../types';
import logger from './LoggerService';

const DEFAULT_CONTENT = `// EVNTBOARD - New Trigger - 
const conditions = {
  'click': (idTrigger, { payload: evntData }) => idTrigger === evntData.idTrigger
}

const reaction = async ({ payload: evntData }, services) => {
  console.log('from reaction')
  console.debug(JSON.stringify(evntData, 0, 2))
  console.debug(JSON.stringify(services, 0, 2))
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

  const currentWorkspace = workspaceGetCurrent();

  database
    .get('triggers')
    .find({ id: trigger.id })
    .assign({
      ...trigger,
      updatedAt: new Date(),
    })
    .write();

  const updated = triggerFindOne(trigger.id);

  // Update file header
  const triggerFilePath = path.join(currentWorkspace.path, 'trigger', `${updated.id}.js`);

  updateFileHeader(triggerFilePath, updated);

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
  fs.unlinkSync(triggerFilePath);
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

const updateFileHeader = (filePath: string, plugin: ITrigger) => {
  let data = fs.readFileSync(filePath, 'utf-8').toString();

  if (data.startsWith('// EVNTBOARD')) {
    const position = data.toString().indexOf('\n'); // find position of new line element
    if (position != -1) {
      // if new line element found
      data = data.substr(position + 1); // subtract string based on first line length
    }
  }

  fs.writeFileSync(filePath, `// EVNTBOARD - ${plugin.name} - ${plugin.description}\n${data}`);
};

export const triggerDuplicate = (trigger: ITrigger): ITrigger => {
  logger.debug('Trigger Service DUPLICATE');
  const currentWorkspace = workspaceGetCurrent();

  const oldTrigger: ITrigger = triggerFindOne(trigger.id);
  const newTrigger: ITrigger = triggerCreate({
    ...oldTrigger,
    name: `${oldTrigger.name} - NEW`,
    id: null,
  });

  // create default file :)
  const triggerDirPath = path.join(currentWorkspace.path, 'trigger');
  const triggerOldFilePath = path.join(triggerDirPath, `${oldTrigger.id}.js`);
  const triggerNewFilePath = path.join(triggerDirPath, `${newTrigger.id}.js`);

  if (!fs.existsSync(triggerDirPath)) {
    fs.mkdirSync(triggerDirPath);
  }

  fs.copyFileSync(triggerOldFilePath, triggerNewFilePath);

  load(newTrigger);
  return newTrigger;
};
