import { app } from 'electron'
import path from 'path'
import fs from 'fs'
import { isEmpty } from 'lodash'

import { createDatabase } from "../../model/database"
import { initTriggers, unloadAll } from '../trigger'
import { connect as connectTwitch, disconnect as disconnectTwitch } from "../../service/twitch"
import { connect as connectObs, disconnect as disconnectObs } from "../../service/obs"
import { connect as connectSocketIO, disconnect as disconnectSocketio } from "../../service/socketIo"
import { init as initVariable } from "../../service/variable"
import { createFolderIfNotPresent } from '../../utils/createIfNotPresent'
import logger, { reloadLogger } from '../../logger'

const defaultWorkspacePath = path.join(app.getPath('home'), 'evntboard')
const fileConfigWorkspace = path.join(app.getPath('userData'), 'workspace.txt')

export const init = () => {
  const currentWorkspace = readWorkspace()
  if (currentWorkspace === null || isEmpty(currentWorkspace)) {
    writeConfig(defaultWorkspacePath)
  }
}

export const readWorkspace = () => {
  try {
    return fs.readFileSync(fileConfigWorkspace, 'utf8')
  } catch (e) {
    return defaultWorkspacePath
  }
}

export const writeConfig = (data) => {
  const dir = path.dirname(fileConfigWorkspace)
  try {
    createFolderIfNotPresent(dir)
    fs.writeFileSync(fileConfigWorkspace, data, { recursive: true, mode: 0o755 })

    logger.debug(`Loading workspace ${data}`)

    unloadAll()

    disconnectTwitch()
    disconnectObs()
    disconnectSocketio()

    reloadLogger()

    // reload database
    createDatabase()

    initVariable()

    // reload triggers
    initTriggers()

    connectTwitch()
    connectSocketIO()
    connectObs()

    return true
  } catch(err) {
    console.log(err)
    return false
  }
}
