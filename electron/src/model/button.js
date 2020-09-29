import { pick } from 'lodash'

import { createModel, readModel, updateModel, deleteModel } from './database'
import generateStringId from '../utils/generateStringId'

const CONFIG = { id: 'id', path: 'buttons' }

const REQUIRED_PROPS = [
  'id',
  'id_trigger',
  'id_board',
  'text',
  'image',
  'color',
  'column_start',
  'column_end',
  'row_start',
  'row_end'
]

export const buttonRead = (data) => {
  return readModel(data, CONFIG)
}

export const buttonReadForBoard = (data) => {
  return readModel(data, { ...CONFIG, filter: 'id_board' })
}

export const buttonCreate = (data) => {
  const requiredData = pick(data, REQUIRED_PROPS)
  return createModel({...requiredData, id: generateStringId()}, CONFIG)
}

export const buttonUpdate = (data) => {
  const requiredData = pick(data, REQUIRED_PROPS)
  return updateModel(requiredData, CONFIG)
}

export const buttonDelete = (data) => {
  return deleteModel(data, CONFIG)
}

export const buttonDeleteForBoard = (data) => {
  return deleteModel(data, { ...CONFIG, id: 'id_board' })
}

export default {
  read: buttonRead,
  update: buttonUpdate,
  create: buttonCreate,
  delete: buttonDelete
}

