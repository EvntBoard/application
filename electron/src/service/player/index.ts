import { ipcMain } from 'electron'
import fs from 'fs'
import path from 'path'

import say from '../../utils/custom-say'
import { mainWindow } from '../../window/main'
import { PLAYER } from '../../../../common/ipc'
import { readWorkspace } from '../workspace'
import { createFolderIfNotPresent } from '../../utils/createIfNotPresent'
import logger from '../../logger'

export const play = (file, volume = 1) => {
  return new Promise((resolve, reject) => {
    const workspaceDir = readWorkspace()
    const uniqueId = Math.random()

    if (file.startsWith('workspace://')) {
      let filePath = path.join(workspaceDir, file.replace('workspace://', ''))
      if (fs.existsSync(filePath)) {
        mainWindow.webContents.send(PLAYER.PLAY, { file , volume, uniqueId })

        ipcMain.once(`audio-${uniqueId}`, () => {
          resolve()
        })
      } else {
        reject(`File don\'t exist : ${file} !`)
      }
    } else if (file.startsWith('http://') || file.startsWith('https://')) {
      mainWindow.webContents.send(PLAYER.PLAY, { file , volume, uniqueId })

      ipcMain.once(`audio-${uniqueId}`, () => {
        resolve()
      })
    } else {
      reject('File can only be in workspace:// or http:// or https:// !')
    }
  })
}

export const tts = (text, volume) => {
  const uniqueId = Math.random()
  const workspaceDir = readWorkspace()

  const dir = path.join(workspaceDir, 'tts')
  createFolderIfNotPresent(dir)

  const filepath = path.join(dir, `${uniqueId}.wav`)

  return new Promise((resolve, reject) => {
    try {
      say.export(text, 'Microsoft Hortense Desktop', 1, filepath, (err) => {
        if (err) {
          logger.error(err)
          reject(err)
        }
        mainWindow.webContents.send(PLAYER.TTS, { file: `workspace://tts/${uniqueId}.wav`, volume, uniqueId })
      })

      ipcMain.once(`tts-${uniqueId}`, () => {
        fs.unlink(filepath, () => {
          resolve()
        })
      })
    } catch (err) {
      reject(err)
    }
  })
}
