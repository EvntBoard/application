import { findIndex } from 'lodash'
import { set } from './'
import { boardRead } from '../../model/board'

import { broadcast } from '../socketIo'

export const current = async (id, socketId) => {
  const boards = boardRead()
  if (findIndex(boards, { id }) !== -1 || socketId === null) {
    await set(`${socketId}_current_board`, id)
    broadcast('sync', { [`${socketId}_current_board`]: id })
  } else {
    throw new Error(`impossible de mettre a jour la current_board pour ${socketId}`)
  }
}
