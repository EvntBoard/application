import { ipcMain } from 'electron'

import { WORKSPACE } from '../../../../common/ipc'
import { readWorkspace, writeConfig } from '../../service/workspace'
import logger from '../../logger'

export default () => {
  logger.debug('Load IPC : WORKSPACE')
  ipcMain.handle(WORKSPACE.GET, () => {
    return readWorkspace()
  })

  ipcMain.handle(WORKSPACE.SET, (evt, data) => {
    writeConfig(data)
    return readWorkspace()
  })
}
