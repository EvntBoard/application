import { database } from '../database/global';
import { IWorkspace } from '../types';
import { init as initLocalDB } from '../database/local';
import {
  init as initTriggerManager,
  unloadAll as triggerManagerUnloadAll,
} from './TriggerManagerService';

import { broadcast, reload as reloadWebServer } from './WebServerService';
import { init as reloadSessionService } from './SessionService';
import { mainWindowReload } from './MainWindowService';
import { init as reloadPlugins, unloadAllPlugin } from './PluginManagerService';
import { init as reloadEventHistoryService } from './EventHistoryService';

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
  await unloadAllPlugin();
  await reloadEventHistoryService();

  await initLocalDB();
  await initTriggerManager();

  await reloadSessionService();
  await reloadPlugins();

  broadcast('workspaceUpdate');
  await reloadWebServer();

  // force reload mainwindow
  mainWindowReload();

  return newWorkspace;
};

export const workspaceFindAll = (): IWorkspace[] => {
  return database.get('workspaces').value();
};

export const workspaceGetCurrent = (): IWorkspace => {
  return database.get('workspaces').find({ current: true }).value();
};
