import { init as initIpcTriggerService } from './IpcTriggerService';
import { init as initIpcBoardService } from './IpcBoardService';
import { init as initIpcButtonService } from './IpcButtonService';
import { init as initIpcMenuService } from './IpcMenuService';
import { init as initIpcThemeService } from './IpcThemeService';
import { init as initIpcLangService } from './IpcLangService';
import { init as initIpcAppConfigService } from './IpcAppConfigService';
import { init as initIpcWorkspaceService } from './IpcWorkspaceService';
import { init as initIpcWebServerService } from './IpcWebServerService';
import { init as initIpcPluginService } from './IpcPluginService';
import { init as initIpcPluginManagerService } from './IpcPluginManagerService';
import { init as initIpcSessionService } from './IpcSessionService';
import { init as initIpcCacheService } from './IpcCacheService';
import { init as initIpcEventHistoryService } from './IpcEventHistoryService';
import { init as initIpcEventBusService } from './IpcEventBusService';

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
  initIpcPluginService();
  initIpcPluginManagerService();
  initIpcSessionService();
  initIpcCacheService();
  initIpcEventHistoryService();
  initIpcEventBusService();
};
