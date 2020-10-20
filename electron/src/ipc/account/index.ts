import { ipcMain } from 'electron'
import { isArray } from 'lodash'

import model from '../../model/account'
import { ACCOUNT } from '../../../../common/ipc'
import modalTwitch from '../../window/twitch'
import { connect as connectTwitch, isConnected as isConnectedTwitch, reload as reloadTwitch } from '../../service/twitch'
import logger from '../../logger'

export default () => {
  logger.debug('Load IPC : ACCOUNT')

  ipcMain.handle(ACCOUNT.READ, (evt, data) => {
    const accounts = model.read(data)

    if (accounts) {
      if (isArray(accounts)) {
        accounts.forEach(provider => {
          switch (provider.type) {
            case "twitch-main":
              provider.status = isConnectedTwitch()
              break
            default:
              logger.info(`Get status for ${provider.type} is not supported`)
              break
          }
        })
      } else {
        switch (accounts.type) {
          case "twitch-main":
            accounts.status = isConnectedTwitch()
            break
          default:
            logger.info(`Get status for ${accounts.type} is not supported`)
            break
        }
      }
    }
    return accounts
  })

  ipcMain.handle(ACCOUNT.CONNECT, async (evt, type) => {
    console.log(type)
    try {
      switch (type) {
        case 'twitch-main':
          let datatmain = await modalTwitch()
          const main = model.create({ type: 'twitch-main', ...datatmain })
          connectTwitch()
          return main
        case 'twitch-bot':
          const databot = await modalTwitch()
          const bot = model.create({ type: 'twitch-bot', ...databot })
          connectTwitch()
          return bot
        default:
          throw new Error(`${type} is not supported ^^`)
      }
    } catch (e) {
      return e
    }
  })

  ipcMain.handle(ACCOUNT.RELOAD, async (evt, { id }) => {
    try {
      const account = model.read({ id })
      switch (account.type) {
        case 'twitch-main':
          reloadTwitch()
          break
        case 'twitch-bot':
          reloadTwitch()
          break
        default:
          throw new Error(`${account.type} is not supported ^^`)
      }
    } catch (e) {
      return e
    }
  })

  ipcMain.handle(ACCOUNT.DELETE, async (evt, { id, type }) => {
    try {
      model.delete({ id })
      switch (type) {
        case 'twitch-main':
          reloadTwitch()
          break
        case 'twitch-bot':
          reloadTwitch()
          break
        default:
          throw new Error(`${type} is not supported ^^`)
      }
    } catch (e) {
      return e
    }
  })

}
