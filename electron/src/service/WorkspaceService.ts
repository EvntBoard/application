import { database } from '../database/global';
import { IWorkspace } from '../types';
import { init as initLocalDB } from '../database/local';
import {
  init as initTriggerManager,
  unloadAll as triggerManagerUnloadAll,
} from './TriggerManagerService';

import { reload as reloadWebServer } from './WebServerService';
import { init as reloadSessionService } from './SessionService';
import { mainWindowsSend } from './MainWindowService';
import { WORKSPACE } from '../preload/ipc';

export const workspaceSwitchTo = async (workspace: string): Promise<IWorkspace> => {
  database.get('workspaces').find({ current: true }).assign({ current: false }).write();

  const index: number = database.get('workspaces').findIndex({ path: workspace }).value();

  if (index === -1) {
    database.get('workspaces').push({ path: workspace, current: true }).write();
  } else {
    database.get('workspaces').get(index).assign({ current: true }).write();
  }

  const newWorkspace = database.get('workspaces').find({ current: true }).value();

  // reload database
  await triggerManagerUnloadAll();
  await initLocalDB();
  await initTriggerManager();
  await reloadWebServer();
  await reloadSessionService();

  mainWindowsSend(WORKSPACE.ON_CHANGE);

  return newWorkspace;
};

export const workspaceFindAll = (): IWorkspace[] => {
  return database.get('workspaces').value();
};

export const workspaceGetCurrent = (): IWorkspace => {
  return database.get('workspaces').find({ current: true }).value();
};
