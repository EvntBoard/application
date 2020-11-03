import { createSelector } from '@reduxjs/toolkit'
import { find } from 'lodash'

const basic = state => state.board

export const boards = createSelector(
  basic,
  state => state.boards
)

export const currentId = createSelector(
  basic,
  state => state.currentBoardId
)

export const findAllLoading = createSelector(
  basic,
  state => state.boardFindAllLoading
)

export const getCurrent = createSelector(
  boards,
  currentId,
  (boards, id) => find(boards, { id })
)
