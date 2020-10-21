import { init as initIpcTriggerService } from './IpcTriggerService';
import { init as initIpcBoardService } from './IpcBoardService';
import { init as initIpcButtonService } from './IpcButtonService';

import * as logger from '../LoggerService';

export const init = () => {
  logger.info('[SERVICE.IPC] => INIT');
  initIpcTriggerService();
  initIpcBoardService();
  initIpcButtonService();
};
