import path from 'path'
import winston from 'winston'

import { readWorkspace } from '../service/workspace'

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.splat(),
      winston.format.json()
    ),
    transports: [new winston.transports.File({ filename: path.join(readWorkspace(), 'logs', 'evntboard.txt') })]
  })

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    level: 'debug',
    format: winston.format.combine(
      winston.format.colorize({ all: true }),
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      winston.format.printf(({ level, message, timestamp }) => `${timestamp} - ${level}: ${message}`)
    )
  }))
}

export const reloadLogger = () => {
  logger.clear()

  logger.add(new winston.transports.File({ filename: path.join(readWorkspace(), 'logs', 'evntboard.txt') }))

  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.printf(({ level, message, timestamp }) => `${timestamp} - ${level}: ${message}`)
      )
    }))
  }
}

export default logger
