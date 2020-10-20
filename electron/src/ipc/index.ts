import registerIpcConfig from './config'
import registerIpcTrigger from './trigger'
import registerIpcButton from './button'
import registerIpcBoard from './board'
import registerIpcAccount from './account'
import registerUtils from './utils'
import registerWorkspace from './workspace'
import registerTemplate from './template'
import registerObs from './obs'
import registerWS from './ws'
import logger from '../logger'

export default () => {
  logger.debug('Load IPC')
  registerIpcConfig()
  registerIpcTrigger()
  registerIpcButton()
  registerIpcBoard()
  registerIpcAccount()
  registerWorkspace()
  registerTemplate()
  registerObs()
  registerWS()
  registerUtils()
}
