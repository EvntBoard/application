import { ipcMain } from 'electron'
import { OBS } from '../../../../common/ipc'
import { set, get } from '../../model/obs'
import { reload, isConnected } from '../../service/obs'
import logger from '../../logger'

export default () => {
    logger.debug('Load IPC : OBS')
    ipcMain.handle(OBS.SET, (evt, key, value) => {
        const data = set(key, value)
        reload()
        return data
    })

    ipcMain.handle(OBS.GET, (evt, key) => {
        const data = get(key)
        data.status = isConnected()
        return data
    })

    ipcMain.handle(OBS.RELOAD, (evt, key) => {
        reload()
    })
}
