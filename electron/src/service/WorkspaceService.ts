import * as path from 'path';
import { app } from 'electron';

import { database } from '../database/global';
import { IWorkspace } from '../database/types';

export const workspaceSwitchTo = (workspace: string): IWorkspace => {
  database.get('workspaces').find({ current: true }).assign({ current: false }).write();

  const index: number = database.get('workspaces').findIndex({ path: workspace }).value();

  if (index === -1) {
    database.get('workspaces').push({ path: workspace, current: true }).write();
  } else {
    database.get('workspaces').get(index).assign({ current: true }).write();
  }

  return database.get('workspaces').find({ current: true }).value();
};

export const workspaceFindAll = (): IWorkspace[] => {
  return database.get('workspaces').value();
};

export const workspaceGetCurrent = (): IWorkspace => {
  const currentWorkspace = workspaceGetCurrent();
  if (!currentWorkspace) {
    workspaceSwitchTo(path.join(app.getPath('home'), 'new-evntboard'));
  }
  return database.get('workspaces').find({ current: true }).value();
};
