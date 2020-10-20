import { protocol } from "electron"

import logger from '../logger'

import { config as configWorkspace, requestHandler as requestHandlerWorkspace } from './workspace'
import { config as configFile, requestHandler as requestHandlerFile } from './file'

protocol.registerSchemesAsPrivileged([configWorkspace])

export const registerProtocol = () => {
  logger.debug('Load protocols')
  protocol.interceptFileProtocol(configFile.scheme, requestHandlerFile)
  protocol.registerStreamProtocol(configWorkspace.scheme, requestHandlerWorkspace)
}
