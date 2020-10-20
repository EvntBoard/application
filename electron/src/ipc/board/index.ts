import { ipcMain } from 'electron'

import model from '../../model/board'
import { buttonDeleteForBoard } from '../../model/button'
import { BOARD } from '../../../../common/ipc'
import { broadcast } from '../../service/socketIo'
import logger from '../../logger'

export default () => {
  logger.debug('Load IPC : BOARD')

  ipcMain.handle(BOARD.CREATE, (evt, data) => {
    const created = model.create(data)
    broadcast('sync', { boards: model.read() })
    return created
  })

  ipcMain.handle(BOARD.READ, (evt, data) => model.read(data))

  ipcMain.handle(BOARD.UPDATE, (evt, data) => {
    const updated = model.update(data)
    broadcast('sync', { boards: model.read() })
    return updated
  })

  ipcMain.handle(BOARD.DELETE, (evt, id) => {
    const result = model.delete(id)
    broadcast('sync', id, 'delete-board')
    buttonDeleteForBoard(id)
    return result
  })
}
