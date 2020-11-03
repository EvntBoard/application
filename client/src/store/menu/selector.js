import { createSelector } from '@reduxjs/toolkit'

const basic = state => state.menu

export const open = createSelector(
  basic,
  state => state.open
)
