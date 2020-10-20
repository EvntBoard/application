import { ipcMain } from 'electron'

import model from '../../model/template'
import { TEMPLATE } from '../../../../common/ipc'
import logger from '../../logger'

export default () => {
  logger.debug('Load IPC : TEMPLATE')
  ipcMain.handle(TEMPLATE.CREATE, (evt, data) => model.create(data))

  ipcMain.handle(TEMPLATE.READ, (evt, data) => model.read(data))

  ipcMain.handle(TEMPLATE.UPDATE, (evt, data) => model.update(data))

  ipcMain.handle(TEMPLATE.DELETE, (evt, id) => model.delete(id))
}
