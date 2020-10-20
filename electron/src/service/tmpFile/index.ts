import path from 'path'
import fs from 'fs'

import { readWorkspace } from '../workspace'
import { createFolderIfNotPresent } from '../../utils/createIfNotPresent'

export const read = (file) => {
  try {
    const filePath = path.resolve(readWorkspace(), 'tmp', file)
    return fs.readFileSync(filePath, 'utf8')
  } catch (e) {
    return null
  }
}

export const write = (file, data) => {
  try {
    const filePath = path.resolve(readWorkspace(), 'tmp', file)
    const dir = path.dirname(filePath)
    createFolderIfNotPresent(dir)
    fs.writeFileSync(filePath, data, { recursive: true, mode: 0o755 })
    return true
  } catch(err) {
    return false
  }
}

export const append = (file, data) => {
  try {
    const filePath = path.resolve(readWorkspace(), 'tmp', file)
    if (!fs.existsSync(filePath)) {
      return write(filePath, data)
    } else {
      fs.appendFileSync(filePath, data);
    }
    return true
  } catch (e) {
    return false
  }
}
