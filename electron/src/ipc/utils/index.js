import electronIsDev from 'electron-is-dev'
import path from "path"
import fs from "fs"

import { ipcMain, dialog } from 'electron'
import { UTILS } from '../../../../common/ipc'
import logger from '../../logger'

export default () => {
    logger.debug('Load IPC : UTILS')

    ipcMain.handle(UTILS.SELECT_DIR, (evt) => {
        return dialog.showOpenDialog({ properties: ['openDirectory'] })
    })

    ipcMain.handle(UTILS.LOCALE_GET, (e, locale) => {
        return new Promise((resolve, reject) => {
            let pathLang

            if (electronIsDev) {
                pathLang = path.join(process.cwd(), 'build', 'lang', `${locale}.json` )
            } else {
                pathLang = path.join(__dirname, 'lang', `${locale}.json` )
            }

            fs.readFile(pathLang, (err, data) => {
                if (err) reject(err);
                try {
                    resolve(JSON.parse(data.toString('utf8')))
                } catch (e) {
                    reject(e)
                }
            })
        })
    })
}
