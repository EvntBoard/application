import 'core-js/stable'
import 'regenerator-runtime/runtime'

import { app, BrowserWindow } from 'electron'

import logger from './logger'

import registerIpc from './ipc'
import { createDatabase } from './model/database'
import { registerProtocol } from './protocol'
import { connect as connectTwitch } from './service/twitch'
import { connect as connectObs } from './service/obs'
import { connect as createWs } from './service/socketIo'
import { init as initWorkspace } from './service/workspace'
import { initTriggers, newEvent } from './service/trigger'
import { init as initVariable } from './service/variable'
import { init as initJar } from './service/jar'
import { createMainWindow } from './window/main'

app.on('ready', () => {
  logger.info('Evntboard start !')
  initWorkspace()
  createDatabase()
  registerIpc()
  registerProtocol()
  initTriggers()
  initVariable()
  initJar()
  newEvent({ event: 'app-started' })
  createWs()
  connectTwitch()
  connectObs()
  createMainWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
})
