import { first, get as getLodash } from 'lodash'

import { boardRead } from '../../model/board'
import { buttonRead } from '../../model/button'

const variable = {}

export const init = () => {
  const boards = boardRead()
  const buttons = buttonRead()

  const defaultBoard = first(boards)

  set('default_board', defaultBoard ? defaultBoard.id : null)
  set('boards', boards)
  set('buttons', buttons)
}

// pour le client
export const set = (key, data) => {
  variable[key] = data
  return get(key)
}

// pour le client
export const get = (key) => {
  return getLodash(variable, key)
}

export const getAll = () => {
  return variable
}
