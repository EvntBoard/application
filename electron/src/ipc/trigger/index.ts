import { ipcMain } from 'electron'

import model from '../../model/trigger'
import { load, reload, unload } from '../../service/trigger'
import { TRIGGER } from '../../../../common/ipc'
import logger from '../../logger'

export default () => {
  logger.debug('Load IPC : TRIGGER')
  ipcMain.handle(TRIGGER.CREATE, (evt, data) => {
    const created = model.create(data)
    load(created)
    return created
  })

  ipcMain.handle(TRIGGER.READ, (evt, data) =>  model.read(data))

  ipcMain.handle(TRIGGER.UPDATE, (evt, data) => {
    const updated = model.update(data)
    reload(updated)
    return updated
  })

  ipcMain.handle(TRIGGER.DELETE, (evt, id) => {
    const result = model.delete(id)
    unload({ id })
    return result
  })

}
