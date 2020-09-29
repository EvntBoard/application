import { ipcMain } from "electron"
import { CONFIG } from '../../../../common/ipc'
import { set, get } from '../../model/config'
import logger from '../../logger'

export default () => {
    logger.debug('Load IPC : CONFIG')
    ipcMain.handle(CONFIG.SET, (evt, key, value) => {
        return set(key, value)
    })

    ipcMain.handle(CONFIG.GET, (evt, key) => {
        return get(key)
    })
}
