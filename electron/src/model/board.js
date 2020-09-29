import { v4 as uuid } from 'uuid'
import { pick } from 'lodash'

import { createModel, readModel, updateModel, deleteModel } from './database'

const CONFIG = { id: 'id', path: 'boards' }

const REQUIRED_PROPS = ['id', 'name', 'description', 'width', 'height']

export const boardRead = (id) => {
  return readModel(id, CONFIG)
}

export const boardCreate = (data) => {
  const requiredData = pick(data, REQUIRED_PROPS)
  return createModel({...requiredData, id: uuid()}, CONFIG)
}

export const boardUpdate = (data) => {
  const requiredData = pick(data, REQUIRED_PROPS)
  return updateModel(requiredData, CONFIG)
}

export const boardDelete = (data) => {
  return deleteModel(data, CONFIG)
}

export default {
  read: boardRead,
  update: boardUpdate,
  create: boardCreate,
  delete: boardDelete
}
