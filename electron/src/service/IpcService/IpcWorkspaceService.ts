import { ipcMain, shell, dialog } from 'electron';

import { workspaceGetCurrent, workspaceSwitchTo, workspaceFindAll } from '../WorkspaceService';
import { WORKSPACE } from '../../utils/ipc';
import logger from '../LoggerService';

export const init = () => {
  logger.debug('IPC WORKSPACE init');
  ipcMain.handle(WORKSPACE.GET_CURRENT, () => workspaceGetCurrent());
  ipcMain.handle(WORKSPACE.GET_ALL, () => workspaceFindAll());
  ipcMain.handle(WORKSPACE.SWITCH, (_, workspace: string) => workspaceSwitchTo(workspace));
  ipcMain.handle(WORKSPACE.OPEN_CURENT, (_) => {
    const currentWorkspace = workspaceGetCurrent();
    shell.openPath(currentWorkspace.path);
  });
  ipcMain.handle(WORKSPACE.SELECT_NEW, (_) => {
    return dialog.showOpenDialog({ properties: ['openDirectory'] });
  });
};
