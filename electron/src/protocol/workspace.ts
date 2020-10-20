import * as path from 'path'
import * as fs from 'fs'

import { readWorkspace } from '../service/workspace'
import { getMimeType } from '../utils/mimeType'
import logger from '../logger'

export const config = {
  scheme: 'workspace',
  privileges: {
    secure: true,
    standard: true
  }
}

export const requestHandler = (request, callback) => {
  let url = request.url.substr(12)
  if (url[url.length - 1] === '/') {
    url = url.slice(0, -1)
  }

  const mimeType = getMimeType(url)

  if (!mimeType) {
    return logger.error(`Unsupported mimetype for '${url}'.`)
  }

  const workspaceDir = readWorkspace()

  const newFilePath = path.join(workspaceDir, url)
  const normalize = path.normalize(newFilePath)

  callback({
    data: fs.createReadStream(normalize)
  })
}
