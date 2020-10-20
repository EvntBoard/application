import { ipcMain } from 'electron'
import path from 'path'
import fs from 'fs'

import model, { buttonReadForBoard } from '../../model/button'
import { readWorkspace } from '../../service/workspace'
import { BUTTON } from '../../../../common/ipc'
import { broadcast } from '../../service/socketIo'
import { createFolderIfNotPresent } from '../../utils/createIfNotPresent'
import logger from '../../logger'

const moveFileToWorkspace = (file, type) => {
  const workspace = readWorkspace()

  if (file && !file.startsWith('workspace') && !file.startsWith('http')) {
    if (file.includes(workspace)) {
      return `workspace://${file.replace(workspace, '')}`
    } else {
      const fileName = path.basename(file)
      const dir = path.join(workspace, type)
      const newFilePath = path.join(dir, fileName)
      createFolderIfNotPresent(dir)
      fs.copyFileSync(file, newFilePath)
      return `workspace://${type}/${fileName}`
    }
  }
  return file
}

export default () => {
  logger.debug('Load IPC : BUTTON')
  ipcMain.handle(BUTTON.CREATE, (evt, data) => {
    data.image = moveFileToWorkspace(data.image, 'image')
    const created = model.create(data)
    broadcast('sync', { buttons: model.read() })
    return created
  })

  ipcMain.handle(BUTTON.READ, (evt, data) => model.read(data))

  ipcMain.handle(BUTTON.READ_FOR_BOARD, (evt, data) => buttonReadForBoard(data))

  ipcMain.handle(BUTTON.UPDATE, (evt, data) => {
    data.image = moveFileToWorkspace(data.image, 'image')
    const updated = model.update(data)
    broadcast('sync', { buttons: model.read() })
    return updated
  })

  ipcMain.handle(BUTTON.DELETE, (evt, id) => {
    const result = model.delete(id)
    broadcast('sync', id, 'delete-button')
    return result
  })
}
