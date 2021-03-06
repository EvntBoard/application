import { protocol } from 'electron';

import logger from '../service/LoggerService';

import { config as configWorkspace, requestHandler as requestHandlerWorkspace } from './workspace';
import { config as configFile, requestHandler as requestHandlerFile } from './file';

protocol.registerSchemesAsPrivileged([configWorkspace]);

export const registerProtocol = () => {
  logger.debug('PROTOCOL init');
  protocol.interceptFileProtocol(configFile.scheme, requestHandlerFile);
  protocol.registerStreamProtocol(configWorkspace.scheme, requestHandlerWorkspace);
};
