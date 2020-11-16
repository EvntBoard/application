import { createSelector } from '@reduxjs/toolkit'

const basic = state => state.cache


export const currentBoardsData = createSelector(
  basic,
  state => state.boards
)

export const currentButtonsData = createSelector(
  basic,
  state => state.buttons
)
