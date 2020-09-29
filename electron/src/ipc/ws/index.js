import { ipcMain } from "electron"
import { WS } from '../../../../common/ipc'
import { set, get } from '../../model/ws'
import { connect, isConnected } from '../../service/socketIo'
import logger from '../../logger'

export default () => {
    logger.debug('Load IPC : WS')
    ipcMain.handle(WS.SET, (evt, value) => {
        const data = set(value)
        connect()
        return data
    })

    ipcMain.handle(WS.GET, () => {
        const data = get()
        data.status = isConnected()
        return data
    })
}
