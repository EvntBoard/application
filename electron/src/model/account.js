import { v4 as uuid } from 'uuid'

import { createModel, readModel, updateModel, deleteModel } from './database'

const CONFIG = { id: 'id', path: 'account' }

export const accountRead = (id) => {
  return readModel(id, CONFIG)
}

export const accountCreate = (data) => {
  return createModel({...data, id: uuid()}, CONFIG)
}

export const accountUpdate = (data) => {
  return updateModel(data, CONFIG)
}

export const accountDelete = (data) => {
  return deleteModel(data, CONFIG)
}

export default {
  read: accountRead,
  update: accountUpdate,
  create: accountCreate,
  delete: accountDelete
}
