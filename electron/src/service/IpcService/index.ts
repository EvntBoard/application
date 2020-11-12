import { init as initIpcTriggerService } from './IpcTriggerService';
import { init as initIpcBoardService } from './IpcBoardService';
import { init as initIpcButtonService } from './IpcButtonService';
import { init as initIpcMenuService } from './IpcMenuService';
import { init as initIpcThemeService } from './IpcThemeService';
import { init as initIpcLangService } from './IpcLangService';
import { init as initIpcAppConfigService } from './IpcAppConfigService';
import { init as initIpcWorkspaceService } from './IpcWorkspaceService';
import { init as initIpcWebServerService } from './IpcWebServerService';
import { init as initIpcTriggerManagerService } from './IpcTriggerManagerService';
import { init as initIpcPluginService } from './IpcPluginService';
import { init as initIpcPluginInstanceService } from './IpcPluginInstanceService';
import { init as initIpcPluginManagerService } from './IpcPluginManagerService';
import { init as initIpcPluginInstanceManagerService } from './IpcPluginInstanceManagerService';

import logger from '../LoggerService';

export const init = () => {
  logger.debug('IPC init');
  initIpcTriggerService();
  initIpcBoardService();
  initIpcButtonService();
  initIpcMenuService();
  initIpcThemeService();
  initIpcLangService();
  initIpcAppConfigService();
  initIpcWorkspaceService();
  initIpcWebServerService();
  initIpcTriggerManagerService();
  initIpcPluginInstanceService();
  initIpcPluginService();
  initIpcPluginManagerService();
  initIpcPluginInstanceManagerService();
};
