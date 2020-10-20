import * as fs from 'fs'
import * as path from 'path'

export const extTypeMap = {
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.bm': 'image/bmp',
  '.bmp': 'image/bmp',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml'
}

export default (file) => {
  const image = fs.readFileSync(file)
  const ext = path.extname(file);
  const contentType = extTypeMap[ext] || 'image/jpeg'
  return `data:${contentType};base64,${image.toString('base64')}`
}
