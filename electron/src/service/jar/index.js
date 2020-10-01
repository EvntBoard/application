import childProcess from 'child_process'
import path from 'path'
import electronIsDev from 'electron-is-dev'

import logger from '../../logger'

let jar = null

export const init = () => {
  try {
    let pathLang

    if (electronIsDev) {
      pathLang = path.join(process.cwd(), 'keyboard-0.0.1-SNAPSHOT.jar')
    } else {
      pathLang = path.join(__dirname, 'keyboard-0.0.1-SNAPSHOT.jar')
    }

    jar = childProcess.spawn('java', ['-jar', pathLang])

    jar.stdout.on('data', (data) => {
      logger.info(data.toString())
    })

    jar.stderr.on('data', (data) => {
      logger.error('Error: ' + data.toString())
    })

    logger.info('Jar loaded ! :D')
  } catch (e) {
    logger.error('Error when loading jar ...')
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
