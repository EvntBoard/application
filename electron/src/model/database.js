import low from 'lowdb'
import path from 'path'
import FileSync from 'lowdb/adapters/FileSync'
import { isBoolean, isObject } from 'lodash'

import { readWorkspace } from '../service/workspace'
import { createFolderIfNotPresent } from '../utils/createIfNotPresent'
import logger from '../logger'

import DEFAULT_DATA from './constant'

export let db = null

export const createDatabase = () => {
  const defaultPath = readWorkspace()
  createFolderIfNotPresent(defaultPath)
  db = null
  const dbPath = path.join(defaultPath, "db.json")
  logger.debug(`Load database : ${dbPath}`)
  const adapter = new FileSync(dbPath);
  db = low(adapter)
  db.defaults(DEFAULT_DATA).write()
}

export const createModel = (data, config = { id: 'id', path: null }) => {
  if (db) {
    logger.debug(`Database : create ${config.path}`)
    db
    .get(config.path)
    .push(data)
    .write();

    return db.get(config.path)
    .find({[config.id]: data[config.id]})
    .value();
  }
  throw new Error(`${JSON.stringify(data)} - ${JSON.stringify(config)} - Wtf ?! db not initiliazed`)
}

export const readModel = (data, config = { filter: null, id: 'id', path: null }) => {
  if (db) {
    logger.debug(`Database : read ${config.path}`)
    if (data && data[config.id]) {
      return db.get(config.path)
      .find({ [config.id]: data[config.id] })
      .value() || null;
    } else {
      if (config.filter && data && data[config.filter]) {
        return db.get(config.path).filter({ [config.filter]: data[config.filter] }).value() || [];
      }
      return db.get(config.path).value() || [];
    }
  }
  throw new Error(`${JSON.stringify(data)} - ${JSON.stringify(config)} - Wtf ?! db not initiliazed`)
}

export const updateModel = (data, config = { id: 'id', path: null }) => {
  if (db) {
    logger.debug(`Database : update ${config.path}`)

    db.get(config.path)
    .find({ [config.id]: data[config.id] })
    .assign(data)
    .write();

    return db.get(config.path)
    .find({ [config.id]: data[config.id] })
    .value();
  }
  throw new Error(`${JSON.stringify(data)} - ${JSON.stringify(config)} - Wtf ?! db not initiliazed`)
}


export const createOrUpdateModel = (data, config = { id: 'id', path: null }) => {
  if (db) {
    logger.debug(`Database : create or update ${config.path}`)
    const test = readModel(data, config)
    if (test) {
      return updateModel(data, config)
    } else {
      return createModel(data, config)
    }
  }
  throw new Error(`${JSON.stringify(data)} - ${JSON.stringify(config)} - Wtf ?! db not initiliazed`)
}

export const deleteModel = (data, config = { id: 'id', path: null }) => {
  if (db) {
    logger.debug(`Database : delete ${config.path}`)
    try {
      db.get(config.path)
      .remove({ [config.id]: isObject(data) ? data[config.id] : data })
      .write()
      return true
    } catch (e) {
      return false
    }
  }
  throw new Error(`${JSON.stringify(data)} - ${JSON.stringify(config)} - Wtf ?! db not initiliazed`)
}

export const getModel = (config = { path: null, default: false }) => {
  if (db) {
    logger.debug(`Database : get ${config.path}`)
    return db.get(config.path).value()
  }
  throw new Error(`${JSON.stringify(config)} - Wtf ?! db not initiliazed`)
}

export const setModel = (value, config = { path: null, default: false }) => {
  if (db) {
    logger.debug(`Database : set ${config.path}`)
    db.update(config.path, n => value !== undefined ? value : n).write()
    return db.get(config.path).value()
  }
  throw new Error(`${value} - ${JSON.stringify(config)} - Wtf ?! db not initiliazed`)
}
