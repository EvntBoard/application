import { createSelector } from '@reduxjs/toolkit'

const basic = state => state.board

export const boards = createSelector(
  basic,
  state => state.boards
)
