import { v4 as uuid } from 'uuid'
import { pick } from 'lodash'

import { createModel, readModel, updateModel, deleteModel } from './database'

const CONFIG = { id: 'id', path: 'triggers' }
const REQUIRED_PROPS = ['id', 'type', 'locker', 'name', 'description', 'events', 'reaction']

export const triggerRead = (id) => {
  return readModel(id, CONFIG)
}

export const triggerCreate = (data) => {
  const requiredData = pick(data, REQUIRED_PROPS)
  return createModel({...requiredData, id: uuid()}, CONFIG)
}

export const triggerUpdate = (data) => {
  const requiredData = pick(data, REQUIRED_PROPS)
  return updateModel(requiredData, CONFIG)
}

export const triggerDelete = (id) => {
  return deleteModel(id, CONFIG)
}

export default {
  read: triggerRead,
  update: triggerUpdate,
  create: triggerCreate,
  delete: triggerDelete
}
