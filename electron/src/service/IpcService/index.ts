import { init as initIpcTriggerService } from './IpcTriggerService';
import { init as initIpcBoardService } from './IpcBoardService';
import { init as initIpcButtonService } from './IpcButtonService';
import { init as initIpcMenuService } from './IpcMenuService';
import { init as initIpcThemeService } from './IpcThemeService';
import { init as initIpcLangService } from './IpcLangService';

import logger from '../LoggerService';

export const init = () => {
  logger.debug('IPC init');
  initIpcTriggerService();
  initIpcBoardService();
  initIpcButtonService();
  initIpcMenuService();
  initIpcThemeService();
  initIpcLangService();
};
