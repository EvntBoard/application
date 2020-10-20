import fs from 'fs'

export const createFolderIfNotPresent = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}
