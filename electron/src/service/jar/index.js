import childProcess from 'child_process'
import path from 'path'
import electronIsDev from 'electron-is-dev'

export { KEYBOARD } from './constant'

import logger from '../../logger'

let jar = null

export const init = () => {
  try {
    let pathLang

    if (electronIsDev) {
      pathLang = path.join(process.cwd(), 'lib', 'keyboard.jar')
    } else {
      const newDirname = __dirname.replace(path.join('resources', 'app.asar', 'build'), '')
      if (process.platform === 'darwin') {
        pathLang = path.join(newDirname,'Contents', 'Resources', 'lib', 'keyboard.jar')
      } else {
        pathLang = path.join(newDirname, 'resources', 'lib', 'keyboard.jar')
      }
    }

    jar = childProcess.spawn('java', ['-jar', pathLang])

    jar.on('error', (e) => {
      logger.error('Error when loading jar ...')
      logger.error(`${e.name} : ${e.message}`)
    })

    jar.stdout.on('data', (data) => {
      logger.info(data.toString())
    })

    jar.stderr.on('data', (data) => {
      logger.error('Error: ' + data.toString())
    })

    logger.info('Jar loaded ! :D')
  } catch (e) {
    logger.error('Error when loading jar ...')
    logger.error(`${e.name} : ${e.message}`)
  }
}

export const press = (key) => {
  try {
    const data = {
      action: 'press',
      key
    }
    jar.stdin.write(`${JSON.stringify(data)}\n`);
  } catch (e) {
    logger.error('Cannot use jar !')
  }
}

export const release = (key) => {
  try {
    const data = {
      action: 'release',
      key
    }
    jar.stdin.write(`${JSON.stringify(data)}\n`);
  } catch (e) {
    logger.error('Cannot use jar !')
  }
}
