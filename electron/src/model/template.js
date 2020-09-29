import { v4 as uuid } from 'uuid'
import { pick } from 'lodash'

import { createModel, readModel, updateModel, deleteModel } from './database'

const CONFIG = { id: 'id', path: 'templates' }
const REQUIRED_PROPS = ['id', 'name', 'description', 'events']

export const templateRead = (id) => {
  return readModel(id, CONFIG)
}

export const templateCreate = (data) => {
  const requiredData = pick(data, REQUIRED_PROPS)
  return createModel({...requiredData, id: uuid()}, CONFIG)
}

export const templateUpdate = (data) => {
  const requiredData = pick(data, REQUIRED_PROPS)
  return updateModel(requiredData, CONFIG)
}

export const templateDelete = (id) => {
  return deleteModel(id, CONFIG)
}

export default {
  read: templateRead,
  update: templateUpdate,
  create: templateCreate,
  delete: templateDelete
}
