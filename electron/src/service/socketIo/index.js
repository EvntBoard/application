import http from 'http'
import path from 'path'
import IO from 'socket.io'
import fs from 'fs'
import { isNull, isEmpty } from 'lodash'
import nStatic from 'node-static'
import electronIsDev from 'electron-is-dev'

import logger from '../../logger'
import model from '../../model/ws'
import { get as getConfig } from '../../model/config'
import { getMimeType } from '../../utils/mimeType'
import { newEvent } from '../trigger'
import { getAll } from '../variable'
import { buttonRead } from '../../model/button'
import { readWorkspace } from '../workspace'

let fileServer
let server
let socketio
let connected = false

let cache = new Map()

const isOkSocket = (socket) => {
  if (cache.get(socket.id)) {
    return true
  } else {
    socket.disconnect(true)
    return false
  }
}

export const connect = () => {
  logger.debug(`Socket io try start ...`)
  const provider = model.get()

  if (provider && provider.port && provider.host) {

    if (electronIsDev) {
      // fonctionne que si le projet est sur le disque principal ...
      fileServer = new nStatic.Server(path.join(process.cwd(), 'build', 'web'))
    } else {
      fileServer = new nStatic.Server(path.join(__dirname, 'web'))
    }

    server = http.createServer((req, res) => {
      if (req.url.startsWith('/workspace') && req.method === 'GET') {
        try {
          const filePath = path.join(readWorkspace(), req.url.replace('/workspace', ''))
          const stat = fs.statSync(filePath)

          res.writeHead(200, {
            'Content-Type': getMimeType(req.url),
            'Content-Length': stat.size
          })

          fs.createReadStream(filePath).pipe(res)
        } catch (e) {
          res.writeHead(404, {"Content-Type": "text/plain"})
          res.write(e)
          res.end()
        }
      } else {
        fileServer.serve(req, res, (err, result) => {
          if (err) { // There was an error serving the file
            logger.error("Error serving " + req.url + " - " + err.message);

            // Respond to the client
            res.writeHead(err.status, err.headers);
            res.end();
          }
        })
      }
    })

    socketio = IO(server, { serveClient: false })

    socketio.on('connection', socket => {
      cache.set(socket.id, false)
      logger.info('New Socket io connection')

      setTimeout(() => {
        if (!cache.get(socket.id)) {
          logger.error(`${socket.id} timeout client dont send init !`)
          socket.disconnect(true)
        }
      }, 5000)

      socket.on('init', (password) => {
        if (!isNull(provider.password) && !isEmpty(provider.password) && password !== provider.password) {
          logger.error(`${socket.id} try to connect with wrong password`)
          socket.disconnect(true)
        } else {
          cache.set(socket.id, true)
          logger.info(`${socket.id} login successfully`)

          const allData = getAll()
          socket.emit('init', {
            ...allData,
            id: socket.id,
            dark: getConfig('dark')
          })
        }
      })

      socket.on('click', (data) => {
        if (isOkSocket(socket)) {
          const button = buttonRead(data)
          newEvent({ event: 'click', socketId: socket.id, ...button })
        }
      })

      socket.on('disconnect', () => {
        if (isOkSocket(socket)) {
          cache.delete(socket.id)
        }
      })

      socket.on('error', () => {
        if (isOkSocket(socket)) {
          cache.delete(socket.id)
        }
      })
    })

    server.on('error', (e) => {
      connected = true
      console.log(e)
      logger.error(`Socket io cannot start on ${provider.host}:${provider.port}!`)
    })

    server.listen(provider.port, provider.host, () => {
      connected = true
      logger.info(`Socket io start on ${provider.host}:${provider.port}!`)
    })
  } else {
    connected = false
    logger.error('Socket io cannot start ...')
  }
}

// broadcast to all other client !
export const broadcast = (event, data, type) => {
  if (socketio) {
    socketio.emit(event, data, type)
  }
}

export const disconnect = () => {
  if (socketio) {
    broadcast('reset')
    socketio.close()
    cache = new Map()
  }
}

export const isConnected = () => {
  return connected
}
